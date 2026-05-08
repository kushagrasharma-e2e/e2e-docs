# MyAccount Compute Nodes — Full Stack Technical Reference

**Verified from source:** `backend/e2e_sites/node/` · `frontend/src/app/products/new-node/`  
**Last updated:** 2026-05-08  
**Visibility:** internal — do not publish

---

## Source File Map

| Layer | Files |
|---|---|
| Backend model | `backend/e2e_sites/node/models.py` |
| Backend constants | `backend/e2e_sites/node/constants.py` |
| Backend error messages | `backend/e2e_sites/node/error_messages.py` |
| Backend URL routes | `backend/e2e_sites/node/urls.py` |
| Backend views | `backend/e2e_sites/node/api/v1/views.py` |
| Backend serializers | `backend/e2e_sites/node/api/v1/serializers.py` |
| Node create helper | `backend/e2e_sites/node/api/v1/services/node_create_helper.py` |
| Node services | `backend/e2e_sites/node/api/v1/services/node_services.py` |
| Action services | `backend/e2e_sites/node/api/v1/services/action_services.py` |
| Upgrade services | `backend/e2e_sites/node/api/v1/services/node_upgrade_services.py` |
| Root storage upgrade | `backend/e2e_sites/node/api/v1/services/node_root_storage_upgrade_services.py` |
| Snapshots | `backend/e2e_sites/node/api/v1/services/node_snapshot.py` |
| Monitoring alerts | `backend/e2e_sites/node/api/v1/services/monitoring_alerts.py` |
| Zabbix | `backend/e2e_sites/node/api/v1/zabbix_helper.py`, `backend/e2e_sites/node/api/v1/services/zabbix_monitoring.py` |
| Terraform/CLI decorator | `backend/e2e_sites/node/api/v1/decorators/terraform_api_changes.py` |
| Frontend routing | `frontend/src/app/products/products-routing.module.ts` |
| Frontend create-node | `frontend/src/app/products/new-node/create-new-node/` |
| Frontend node service | `frontend/src/app/products/new-node/new-node.service.ts` |
| Frontend node list | `frontend/src/app/products/nodes/` |

---

## Data Model: `Node`

Defined in `backend/e2e_sites/node/models.py`. Table: `node_node`.

### Core fields

| Field | Type | Notes |
|---|---|---|
| `id` | auto PK | Django internal ID, used in API paths |
| `vm_id` | IntegerField | OpenNebula VM ID (required, not null) |
| `name` | CharField(256) | Node display name, nullable |
| `state` | IntegerField | Maps to `NODE_STATE_OPTIONS`; see state table below |
| `customer` | FK → Customer | Owning account |
| `creator` | GenericFK | Who created the node (IAM sub-user or primary) |
| `node_image` | FK → NodeImage | Image/template used to launch; nullable |
| `location` | CharField(128) | Region slug: `Delhi`, `Mumbai`, `Chennai` |
| `vm_type` | CharField(50) | Node category; see VM type table below |
| `hypervisor` | CharField(128) | `KVM` (default) or `XEN` |
| `node_type` | CharField(128) | `e2e_public_cloud` (default) or `private_cloud` |
| `project` | FK → Project | PBAC project (required since PBAC introduction) |
| `is_active` | BooleanField | `True` while node is alive; `False` after Done |
| `is_locked` | BooleanField | Whether VM is locked (no destructive actions) |
| `is_accidental_protection` | BooleanField | Delete and reinstall are blocked when `True` |
| `abuse_flag` | BooleanField | Set by ops abuse detection; blocks all actions |
| `limited_access_abuse_vm` | BooleanField | Softer form of abuse restriction |
| `rescue_mode_flag` | IntegerField | `0` disabled, `1` in progress, `2` enabled |
| `ip_address_public` | CharField(256) | Public IPv4, nullable |
| `ip_address_private` | CharField(256) | Private IPv4(s), comma-separated in VPC |
| `ip_address_management` | CharField(256) | Management network IP, nullable |
| `zabbix_host_id` | IntegerField | Zabbix v1 host ID, nullable |
| `zabbix_host_id_v2` | IntegerField | Zabbix v2 host ID; presence = monitoring active |
| `last_backup_time` | DateTimeField | Timestamp of last CDP backup |
| `deprovision_status` | BooleanField | Whether deprovision has been initiated |
| `label` | CharField(100) | Grouping label; default `"Default"` |
| `is_on_private_cloud` | BooleanField | Private cloud flag |
| `tags` | M2M → Tag | User-defined tags |
| `ssh_keys` | M2M → SSHKey | SSH keys associated at launch |
| `start_scripts` | M2M → StartupScript | User-data scripts |
| `ngc_container` | FK → NgcContainer | NGC container reference; nullable |
| `scaler_id` | IntegerField | Auto-scaler group ID; nullable |
| `monitoring_tab_enabled` | BooleanField | Controls whether Monitoring tab is visible in UI |
| `cdp_tab_enabled` | BooleanField | Controls whether Backup/CDP tab is visible |
| `alert_tab_enabled` | BooleanField | Controls whether Alerts tab is visible |
| `isEncryptionEnabled` | BooleanField | Disk encryption enabled at launch |
| `is_billing_enabled` | BooleanField | Whether billing is currently active for this node |
| `security_group_status` | CharField(255) | SG status string; nullable |
| `custom_sku` | JSONField | Used only for `private_cloud` node_type |
| `is_backup_notify_mail_sent` | BooleanField | Prevent duplicate "no backup" notification emails |
| `is_image_deleted` | BooleanField | Source image has been deleted (affects Reinstall) |
| `saved_button_enable` | BooleanField | UI hint for Save Image button |
| `deleted_at` | DateTimeField | Soft-delete timestamp |

### Computed properties (not DB columns)

| Property | Source |
|---|---|
| `status` | `NODE_STATUS[self.state]` string |
| `plan` | `node_image.sku.name` or `PRIVATE_CLUSTER` for private |
| `region` | `node_image.region.name` |
| `vcpus` | `node_image.sku.cpu` or `custom_sku.get("cpu")` |
| `memory` | `node_image.sku.display_ram` + " GB" |
| `disk` | `node_image.sku.disk_space` + " GB", or from custom storage |
| `distro` | `node_image.node_os.name` |
| `gpu` | `node_image.get_gpu_card_name()` |
| `price` | From `SkuItemPrice` using customer currency, hourly |
| `backup_enabled` | `BackupDetail` exists with no `deactivated_at` and has `activated_at` |
| `backup` | `BackupDetail` exists with no `deactivated_at` (includes in-progress) |
| `backup_in_process` | `BackupDetail` exists with no `deactivated_at` and no `activated_at` |
| `committed_info` | `ReserveInstance` with `STATE_RUNNING` for same vm_id and location |
| `floating_ips` | Security groups named `sg-svc-00{id}` → `ReservedIP` |
| `is_upgradable` | `node_image.sku.series in ['C3', 'M3', 'SDC3', 'E1']` and not Done state |
| `is_snapshot_allowed` | `node_image.sku.series in ['C3', 'M3', 'SDC3', 'GDC3', 'WSDC3', 'E1', 'E1WC']` |
| `is_volume_attachable` | SKU series in `allowed_block_storage_sku` JsonVariable |
| `vpc_enabled` | `nodeattached_set.filter(is_active=True).exists()` |
| `next_billing_month` | First of next calendar month |
| `rescue_mode_status` | `{0: "Disabled", 1: "In progress", 2: "Enabled"}` |

### Supporting models

**`NodeAction`**: Audit record for each action performed on a node.  
Fields: `node` (FK), `action_type` (int from `NODE_ACTION_TYPES`), `status` (int: 0=in_progress, 1=done, 2=error, 3=undeploying, 4=deploying, 5=adding, 6=stopping)

**`NodeIPv6Address`**: IPv6 addresses attached to a node.  
Fields: `node` (FK), `ipv6_address` (GenericIP), `nic_position` (int), `is_active` (bool)

**`NodeScheduledAction`**: Cron-like scheduled lifecycle actions.  
Fields: `node` (FK), `action_tag`, `timezone`, `scheduled_action_id`, `scheduled_type` (relative/one_time/periodic), `action_type`, `end_type` (never/on/after), `repeat_type` (hourly/daily/weekly/monthly/yearly), `start_time`, `status` (pending/failed/completed)

**`StartupScript`**: User-data startup scripts.  
Fields: `customer` (FK), `label` (max 50), `script_content` (text), `project` (FK)

**`Inventry`**: Host-side inventory for dedicated/smart-dedicated plans.  
Fields: `sku` (FK), `total_inventry`, `available_inventry`

---

## API Routes

Base prefix: `api/v1/nodes/` (from `backend/e2e_sites/node/urls.py`)

### Node CRUD

| Method | Path | View | Description |
|---|---|---|---|
| `POST` | `api/v1/nodes/` | `NodeListView.post` | Create node(s) |
| `GET` | `api/v1/nodes/` | `NodeListView.get` | List customer's nodes |
| `GET` | `api/v1/nodes/{node_id}/` | `NodeView.get` | Get single node detail |
| `DELETE` | `api/v1/nodes/{node_id}/` | `NodeView.delete` | Delete (terminate) node |

### Node Actions

| Method | Path | View | Description |
|---|---|---|---|
| `POST` | `api/v1/nodes/{node_id}/actions/` | `NodeActionView` | Perform action on node |
| `POST` | `api/v1/nodes/action-on-multiple-nodes/` | `MultipleNodeActionView` | Bulk action on up to 10 nodes |

### Upgrades

| Method | Path | View | Description |
|---|---|---|---|
| `POST` | `api/v1/nodes/upgrade/{node_id}` | `NodeUpgradeView` | Upgrade/downgrade node plan |
| `POST` | `api/v1/nodes/{node_id}/root-storage-upgrade/` | `NodeRootStorageUpgradeView` | Expand root disk (E1/E1WC only) |

### Snapshots

| Method | Path | View | Description |
|---|---|---|---|
| `GET/POST` | `api/v1/nodes/{node_id}/snapshots/` | `SnapshotView` | List or create snapshots |
| `GET/DELETE` | `api/v1/nodes/{node_id}/snapshot/{snapshot_uuid}` | `NodeSnapshotView` | Get or delete specific snapshot |

### Scheduling

| Method | Path | View | Description |
|---|---|---|---|
| `GET/POST` | `api/v1/nodes/{node_id}/scheduled_actions/` | `NodeScheduledActionListView` | List or create scheduled actions |
| `GET/PUT/DELETE` | `api/v1/nodes/{node_id}/scheduled_actions/{action_id}/` | `NodeScheduledActionView` | Get, update, or delete scheduled action |

### Networking

| Method | Path | View | Description |
|---|---|---|---|
| `GET` | `api/v1/nodes/{node_id}/networkdetail/` | `NodeNetworkDetailView` | Network info (IPs, VPC, SG) |
| `POST/DELETE` | `api/v1/nodes/ipv6/` | `IPv6AddressView` | Attach/detach IPv6 |
| `GET` | `api/v1/nodes/vnc/{node_id}` | `NodeVNCView` | VNC console access credentials |

### Storage

| Method | Path | View | Description |
|---|---|---|---|
| `GET` | `api/v1/nodes/{node_id}/attached-volumes/` | `AttachVolumesView` | List attached block storage volumes |

### Monitoring

| Method | Path | View | Description |
|---|---|---|---|
| `GET` | `api/v1/nodes/{node_id}/monitor/server-health/` | `MonitorServerHealth` | Current health metrics |
| `GET` | `api/v1/nodes/{node_id}/monitor/server-health-info/` | `MonitorServerHealthInfo` | Extended health info |
| `GET` | `api/v1/nodes/{node_id}/monitoring/alerts/` | `MonitoringAlertView` | Alert list |
| `GET` | `api/v1/nodes/{node_id}/monitoring/volume/` | `MonitoringVolumeView` | Volume I/O monitoring |
| `GET/POST/DELETE` | `api/v1/nodes/{node_id}/monitoring/triggers/` | `MonitoringTriggerView` | Alert triggers |
| `GET` | `api/v1/nodes/{node_id}/monitoring/monitoring_status/` | `MonitoringTestAgentConnectionView` | Zabbix agent liveness check |
| `GET` | `api/v1/nodes/{node_id}/monitoring/test_monitoring_connection/` | `MonitoringZabbixAgentConnectionView` | Zabbix TCP connection test |

### Dashboard and Lists

| Method | Path | View | Description |
|---|---|---|---|
| `GET` | `api/v1/nodes/dashboard/` | `NodeDashBoardView` | Dashboard stats (legacy) |
| `GET` | `api/v1/nodes/new-dashboard` | `NewNodeDashBoardView` | Dashboard stats (new) |
| `GET` | `api/v1/nodes/active-monitoring-count` | `ActiveMonitoringCountView` | Count of nodes with active monitoring |
| `GET` | `api/v1/nodes/active-cdpbackup-count` | `ActiveCDPBackupCountView` | Count of nodes with active CDP backup |
| `GET` | `api/v1/nodes/label-list/` | `NodeLabelListView` | List all label groups |
| `GET` | `api/v1/nodes/windows/` | `NodeWindowView` | Windows-specific node list |

### Logs

| Method | Path | View | Description |
|---|---|---|---|
| `GET` | `api/v1/nodes/nodeactionlog/{vm_id}` | `NodeActionLogView` | Action audit log for a VM |
| `GET` | `api/v1/nodes/nodebillinglog/{vm_id}` | `NodeBillingLogView` | Billing history for a VM |

### Misc

| Method | Path | View | Description |
|---|---|---|---|
| `GET` | `api/v1/nodes/{node_id}/saved-image-status/` | `NodeSavedImageStatusView` | Status of save-image operation |
| `GET` | `api/v1/nodes/{node_id}/check-lcm-state/` | `CheckVmLCMStateView` | Check raw LCM state from OpenNebula |
| `GET` | `api/v1/nodes/customerbackupstatus/` | `NodeBackupStatusView` | Backup status summary across all nodes |
| `GET` | `api/v1/nodes/customerbitninjastatus/` | `NodeBitNinjaView` | BitNinja status across all nodes |
| `GET` | `api/v1/nodes/{node_id}/bitninjaDetails/` | `SpecificNodeBitninja` | BitNinja details for a single node |

### Query parameters

All list/detail endpoints require `?location=<region>` via the `@validate_location` decorator.  
Create endpoint also accepts `?project_id=<id>` for PBAC project scoping.

---

## Authentication and Permissions

- All endpoints: `IsAuthenticated` (JWT token)
- Location validation: `@validate_location` decorator on POST and GET
- Resource limit check: `@check_customer_resource_limit("NODE")` on create
- Credit check: Enforced in `node_create_helper` via `check_for_infra_credit()`
- Terraform/CLI: `@update_param_in_terraform_cli_request` normalizes agent-specific payloads; agent identified by `User-Agent` header (`terraform-e2e` or `cli-e2e`)

---

## Node States

### User-facing state table

All state integers are stored in `node.state`. The `NODE_STATUS` dict in `constants.py` maps them to display strings.

| State int | Display string | Billable | Description |
|---|---|---|---|
| 0 | Creating | No | VM instantiation requested on OpenNebula; awaiting PROLOG |
| 1 | Deploying | No | PROLOG phase: files being transferred to host |
| 2 | Boot | No | VM is booting for the first time |
| 3 | Running | **Yes** | VM is active and accessible |
| 4 | Stopped | **Yes** | VM stopped via `stop` action (billing suspended, resource reserved) |
| 6 | Done | No | VM has been terminated; record kept for history |
| 8 | Powered off | **Yes** | VM powered off but resources still reserved |
| 9 | Undeployed | **Yes** | VM undeployed (resources released on host, billing continues) |
| 10 | Saving | **Yes** | Save-image operation in progress |
| 11 | Terminating | **Yes** | Delete in progress (EPILOG) |
| 12 | Shutdown | No | VM shutdown state |
| 13 | Failed | No | Provisioning or operation failed |
| 15 | Reinstalling | No | Reinstall operation in progress |
| 16 | Unknown | No | State cannot be read from OpenNebula |
| 17 | Hotplug | No | Disk attach/detach operation in progress (LCM HOTPLUG) |
| 18 | Powering off | **Yes** | Transitioning to Powered off |
| 20 | Powering on | **Yes** | Transitioning to Running |
| 25 | Hotplug NIC | No | NIC hotplug operation in progress |
| 29 | Undeploying | No | Transitioning to Undeployed |
| 33 | Hotplug prolog poweroff | No | File transfers for disk attach from poweroff |
| 34 | Hotplug epilog poweroff | No | File transfers for disk detach from poweroff |
| 36 | Boot Failed | No | LCM boot failure |
| 37 | Boot Migrate Failure | No | LCM boot migrate failure |
| 38 | Prolog Migrate Failure | No | LCM prolog migrate failure |
| 39 | Prolog Failed | No | LCM prolog failure |
| 40 | Epilog Failure | No | LCM epilog failure (can block deletion) |
| 41 | Epilog Stop Failure | No | LCM epilog stop failure |
| 42 | Epilog Undeploy Failure | No | LCM epilog undeploy failure |
| 44 | Prolog Migrate Poweroff Failure | No | LCM state |
| 46 | Prolog Migrate Suspend Failure | No | LCM state |
| 47 | Boot Undeploy Failure | No | LCM state |
| 48 | Boot Stopped Failure | No | LCM state |
| 49 | Prolog Resume Failure | No | LCM state |
| 50 | Prolog Undeploy Failure | No | LCM state |
| 51 | Disk Snapshot Poweroff | No | LCM disk snapshot from poweroff |
| 56 | Initializing | No | Early provisioning state |
| 57 | Disk Snapshot | No | LCM disk snapshot from running |
| 62 | Suspended | No | VM suspended on hypervisor |
| 63 | Upgrading | No | Plan upgrade in progress |
| 64 | Live saving | **Yes** | Live snapshot save in progress |
| 65 | Hotplug NIC Poweroff | No | NIC hotplug from powered-off state |
| 66 | Downgrading | No | Plan downgrade in progress |
| 67 | Stopping | No | Transitioning to Stopped |
| 69 | Failed recreate | No | Failed during VM recovery/recreate attempt; deletion blocked |

### Billable state constant

```python
BILLABLE_NODE_STATES = [
    NODE_STATE_RUNNING,    # 3
    NODE_STATE_POWER_OFF,  # 8
    NODE_STATE_UNDEPLOY,   # 9
    TERMINATING,           # 11
    POWERING_OFF,          # 18
    POWERING_ON,           # 20
    NODE_STATE_LIVE_SAVING, # 64
    NODE_STATE_STOPPED,    # 4
]
```

### Failed state detection

Backend checks:
```python
FAILED_STATE_CHECK = [NODE_LCM_STATE_BOOT_FAILURE, NODE_LCM_STATE_PROLOG_FAILURE, NODE_STATE_FAILED]
# = [36, 39, 13]
FAILED_VM_STATE_CHECK = [NODE_VM_STATE_CLONING_FAILURE]  # = [11]
```

State 69 (`Failed recreate`) explicitly blocks deletion: `NODE_DELETION_RESTRICTION_MESSAGE`.  
State 40 (`Epilog Failure`) blocks deletion: `NODE_DELETION_FAILURE_STATES = [40]`.

---

## VM Types

Stored in `node.vm_type`. Each type implies different billing and behavior.

| Value | Description | Notes |
|---|---|---|
| `vm` | Standard virtual machine | Default |
| `dedicated_vm` | Dedicated/bare-metal server | |
| `committed_vm` | Committed (reserved) instance | Has `ReserveInstance` record |
| `database_vm` | Managed database node | `is_dbaas_node` |
| `managed_vm` | E2E-managed service VM | `is_e2e_managed_node`, also used by MaxScale |
| `master` | Kubernetes cluster master | Has `scaler_id` |
| `worker` | Kubernetes cluster worker | |
| `spot_vm` | Spot instance | Can be reclaimed |
| `eqs_node` | EQS service node | |
| `efs_node` | EFS service node | `is_efs_node` |

**Reserve IP eligible types:** `vm`, `dedicated_vm`, `committed_vm`, `master`  
**Actions allowed types (standard):** `vm`, `dedicated_vm`, `committed_vm`, `spot_vm`

---

## Node Types

Stored in `node.node_type`.

| Value | Description |
|---|---|
| `e2e_public_cloud` | Default public cloud node |
| `private_cloud` | Private cluster node; `custom_sku` JSON field used instead of `node_image.sku` |

---

## Node Creation Flow

### Entry point

`POST api/v1/nodes/?location=<region>` → `NodeListView.post` → `node_create_helper(request)`

### Validation chain (before any DB write)

1. `@validate_location` — confirms `location` query param is valid
2. `@update_param_in_terraform_cli_request` — normalizes Terraform/CLI agent payloads
3. `@check_customer_resource_limit("NODE")` — checks per-customer node quota
4. `validate_node_create_request(request)` — custom pre-serializer validation
5. `NodeCreateSerializer` — field-level validation (see field table below)
6. `check_for_infra_credit()` — verifies sufficient infra credits for the plan
7. `check_if_disk_size_is_valid()` — validates custom disk size for E1/E1WC series
8. GPU availability check via `GpuInventoryService.get_available_inventory_status()`
9. VPC state validation — returns error if VPC is in creating state

### Multiple node creation

When `number_of_instances` is present in the request body:
- Max 5 nodes per request (`MAX_ALLOWED_NODE = 5`)
- Min 1 node
- `reserve_ip` and `image_id` (volume attachment) are disallowed for multi-node requests
- Nodes created in a loop; stops on first failure
- Response includes `total_number_of_node_requested`, `total_number_of_node_created`, `node_create_response[]`

### Legacy path

When `number_of_instances` is absent: `handle_legacy_node_create_request()` → single node, no batch metadata in response.

### Single node creation steps

`single_node_create_helper(request, data)`:

1. `retrieve_or_upgrade_node_image_plan()` — resolves `node_image` from `plan` + `image` params
2. GPU inventory check
3. VPC condition check
4. `create_node_on_nebula()`:
   - Resolves default security group if none provided (from customer's `is_default` SG for the project)
   - Marks spot instance if applicable
   - Calls `NodeServices().create()` → `LaunchVMAPIService` → OpenNebula API
   - Returns `vm_one_id` (OpenNebula VM ID)
5. `save_detail_in_node_model()`:
   - Creates `Node` DB record with `vm_id = vm_one_id`
   - Sets initial `state = NODE_STATE_CREATE (0)`
   - Associates SSH keys, startup scripts, project, label, location
6. VPC entry creation if `vpc_id` provided
7. Backup enablement if `backups=True`
8. NGC container association
9. GPU inventory update
10. Post-deployment hooks (Celery tasks):
    - `check_node_deployed_after_instantiate` — polls OpenNebula until Running or Failed
    - `sync_sdc_inventory` (for SDC series)
    - `attach_ipv6_vm_running_state` (if IPv6 requested)
    - `AlertSchedulers.schedule_node_failed_alert`

### Create request fields

From `NodeCreateSerializer` (serializers.py):

| Field | Required | Type | Default | Validation |
|---|---|---|---|---|
| `name` | Yes | string (max 50) | — | Regex `^[A-Za-z0-9_-]{1,}$` |
| `ssh_keys` | Yes | list of strings | — | — |
| `plan` | No | string (max 1000) | — | Resolved to `NodeImage` |
| `image` | No | string (max 1000) | — | Image slug |
| `backups` | No | bool | `false` | |
| `is_encryption_required` | No | bool | `false` | |
| `isEncryptionEnabled` | No | bool | `false` | |
| `encryption_passphrase` | No | string (max 100) | `""` | |
| `backup_encryption_passphrase` | No | string (max 100) | — | |
| `label` | No | string (max 50) | `"Default"` | |
| `tags` | No | list of `{name}` | `{}` | |
| `start_scripts` | No | list of strings (max 2048) | — | |
| `disable_password` | No | bool | `false` | |
| `is_saved_image` | No | bool | `false` | |
| `saved_image_template_id` | No | string (max 10) | null | |
| `vpc_id` | No | string | `""` | |
| `enable_bitninja` | No | bool | `false` | Incompatible with VPC + no public IP |
| `reserve_ip` | No | string | — | Blocked for multi-node |
| `reserve_ip_pool` | No | string | — | |
| `default_public_ip` | No | bool | `false` | |
| `security_group_id` | No | int | `null` | Default SG used if not provided |
| `ngc_container_id` | No | string | null | |
| `image_id` | No | int | `null` | Block volume to attach; blocked for multi-node |
| `custom_sku` | No | JSON | — | Private cluster only |
| `host_ids` | No | list of ints | — | For dedicated host targeting |
| `is_private` | No | bool | `false` | Skips credit check |
| `disk` | No | int | `null` | Custom disk size (E1/E1WC only) |
| `number_of_instances` | No | int | — | 1–5; enables batch creation |
| `cn_id` | No | string (max 25) | — | Committed node SKU day ID |
| `node_type` | No | string | — | `e2e_public_cloud` or `private_cloud` |
| `kubernetes_master_ip` | No | string | `""` | K8s join params |
| `kubernetes_master_token` | No | string | `""` | |
| `kubernetes_master_hash` | No | string | `""` | |

### Custom storage (E1 / E1WC series only)

| Parameter | Value |
|---|---|
| Min disk size | 75 GB |
| Max disk size | 2400 GB |
| Default disk size | 150 GB |
| Upsize increment | 50 GB |
| Downsize increment | 25 GB |
| IOPS multiplier per upsize | 5 IOPS |

---

## Node Actions

### Endpoint

`POST api/v1/nodes/{node_id}/actions/?location=<region>`

Body: `{"action": "<action_string>", ...action-specific params}`

Handler: `NodeActionView` → `ActionServices` class in `action_services.py`

### Action gate checks (applied before routing to action handler)

From `node_validation_check_for_action` decorator and inline checks:

1. Node must exist and belong to authenticated customer
2. If `node.is_locked`: only `unlock_vm`, `enable_backup`, `disable_backup`, `enable_accidental_protection`, `disable_accidental_protection` are allowed — all others return `ACTION_ON_LOCKED_VM`
3. If `node.abuse_flag`: all actions blocked — returns `ACTION_ON_ABUSED_VM`
4. If node in `REINSTALLING` state: all actions blocked — returns `RESTRICT_ACTION_ON_REINSTALL_STATE`
5. If node in `NODE_STATE_CREATE` state: actions blocked — returns `NODE_IN_CREATING_STATE`
6. XEN hypervisor: blocks `save_images`, `reinstall`, `enable_accidental_protection`, `disable_accidental_protection`, `enable_recovery_mode`, `enable_node_compliance`

### All supported action strings

| Action string | Description | Blocked by |
|---|---|---|
| `power_off` | Powers off VM; also disables CDP backup | DR source check |
| `power_on` | Powers on VM | |
| `reboot` | Reboots VM | |
| `rename` | Renames VM (`name` param required); regex same as create | Also renames Zabbix hostname |
| `label_rename` | Renames label group | |
| `enable_backup` | Enables CDP backup (async Celery task) | Already enabled |
| `disable_backup` | Disables CDP backup (async Celery task) | Not enabled |
| `lock_vm` | Locks VM on OpenNebula; checks Nebula state before acting | |
| `unlock_vm` | Unlocks VM; same Nebula state check pattern | |
| `save_images` | Saves current disk as image; requires credits | `save_images` in `CREDIT_REQUIRED_ACTIONS` |
| `reinstall` | Reinstalls OS; requires non-deleted image | Accidental protection |
| `enable_recovery_mode` | Boots from rescue disk | XEN, unsuitable LCM state |
| `disable_recovery_mode` | Returns from rescue boot | |
| `undeploy` | Undeploys VM (releases host resources) | |
| `deploy` | Redeploys undeployed VM | |
| `update_password` | Updates VM root/admin password | Validation: 8–30 chars, mixed case + digit + special |
| `add_ssh_keys` | Injects SSH public keys into running VM | |
| `enable_accidental_protection` | Sets `is_accidental_protection=True`; blocks delete + reinstall | XEN |
| `disable_accidental_protection` | Clears accidental protection | XEN |
| `enable_node_compliance` | Enrolls node in Wazuh compliance | XEN |
| `disable_node_compliance` | Unenrolls from Wazuh compliance | |
| `stop` | Stops billing; transitions to Stopped state | Conditional — not all plans support stop |

**Allowed actions in Failed state:** `rename`, `deploy`, `undeploy`  
**Allowed actions in Stopped state:** `power_on` only

### Bulk action endpoint

`POST api/v1/nodes/action-on-multiple-nodes/`

- Takes a list of node IDs and an action string
- Max 10 nodes (`NODE_LIMIT = 10`)
- Returns `NO_ACTION_PERFORMED` if none succeed
- Includes per-node action descriptions from `ACTION_DESCRIPTIONS`

### Lock/Unlock flow (from `action_services.py`)

Lock is a two-phase operation:
1. Query Nebula for current lock state
2. If already locked by same customer → idempotent success (sync Django state)
3. If locked by different user → create internal alert ticket → return `LOCK_VM_FAILED`
4. If unlocked → call Nebula lock API → on failure, create internal alert ticket → return `LOCK_VM_FAILED`

Unlock follows same pattern in reverse.

### Power-off side effect

When power-off succeeds, `CdpBackupUpdatePolicyService.disable_cdpbackup()` is called to pause CDP backup.

---

## Scheduled Actions

### Action types (stored in `NodeScheduledAction.action_type`)

`hold`, `poweroff`, `reboot`, `release`, `resume`, `snapshot-create`, `snapshot-delete`, `snapshot-revert`, `stop`, `suspend`, `terminate`, `undeploy`

### Schedule types

| Type | Description |
|---|---|
| `one_time` | Single execution at `start_time` |
| `relative` | Execute after a relative offset |
| `periodic` | Repeat on a schedule |

### Repeat types (for periodic)

`hourly`, `daily`, `weekly`, `monthly`, `yearly`

OpenNebula uses integer codes: hourly→3, weekly→0, monthly→1, yearly→2, daily→3.

### End types

`never`, `on` (specific date), `after` (N occurrences)

### Status values

`pending` (default), `failed`, `completed`

---

## Monitoring (Zabbix)

### Monitoring states (from `Node.monitor_status()`)

| State string | Condition |
|---|---|
| `not_activated` | Node not in a running/powered-off/saving state, or default |
| `monitor_off` | Node in non-monitorable state (Done, Failed, Powered off without zabbix) |
| `activated` | Zabbix v2 host registered and agent responding |
| `monitor_disable` | `zabbix_host_id_v2` is None while node is in monitorable state |
| `no_data` | Zabbix agent not responding or returning error |

A node is considered monitored when `zabbix_host_id_v2` is set.

### Monitorable node states

States where monitoring is expected to work: Running (3), Powered off (8), Saving (10)

### Zabbix metric keys

| Metric | Linux key | Windows key |
|---|---|---|
| CPU load | `system.cpu.load[all,avg1]` | `system.cpu.load[percpu,avg1]` |
| CPU utilization | `system.cpu.util` | `system.cpu.util` |
| Memory (% used) | `vm.memory.size[pused]` | `vm.memory.size[pused]` |
| Memory utilization | `vm.memory.utilization` | — |
| Disk (% free) | `vfs.fs.size[/,pfree]` | `vfs.fs.size[C:,pfree]` |
| Disk read ops | `vfs.dev.read[,operations]` | `perf_counter[\\2\\16]` |
| Disk write ops | `vfs.dev.write[,operations]` | `perf_counter[\\2\\18]` |
| Network | `net.if.*` | — |
| Space utilization | `vfs.fs.dependent.size[/,pused]` | — |
| GPU mem used | `gpu.memused` | — |
| GPU temp | `gpu.temp` | — |
| GPU power | `gpu.power` | — |
| GPU mem free | `gpu.memfree` | — |
| GPU utilization | `gpu.utilization` | — |

### Monitoring ports

- Zabbix agent port: **10050** (TCP)
- Nodes created after 2024-08-12: new networking path applies (`is_node_created_after_12_aug_24()`)

### VPC monitoring router IPs

| Location | IP range |
|---|---|
| Delhi / NCR2 / Chennai | `192.168.0.0/18` |
| Mumbai | `192.168.128.0/17` |
| Default fallback | `192.168.1.0/25` |

### Alert trigger types

From `serializers.py TRIGGER_TYPES`:
CPU Load Average, % Free Memory, % Free Disk Space, Webcheck, Volume Read/Write Operations, GPU temperature/utilization/power/memory (per card, up to 4 cards)

---

## Snapshots

Controlled by `node.is_snapshot_allowed`.

**Allowed series:** `C3`, `M3`, `SDC3`, `GDC3`, `WSDC3`, `E1`, `E1WC`

**Allowed without poweroff (live snapshot):** `C3`, `M3`, `SDC3`, `GDC3`, `M3VPS`, `E1`, `E1WC`, `C3VPS`

Snapshot operations via Celery:
- `NODE_DELETE_SNAPSHOT_TASK = "node.node_delete_snapshot_task"`
- `NODE_SAVE_IMAGES_FROM_SNAPSHOT_TASK = "node.node_save_image_from_snapshot_task"`

---

## Upgrade / Downgrade

Handled by `NodeUpgradeView` → `NodeUpgradeService`.

**Upgradable series:** `C3`, `M3`, `SDC3`, `E1`

A node is not upgradable when in `Done` state.

**Credit checks:**
- `INSUFFICIENT_CREDITS_FOR_NODE_UPGRADE`: standard hourly
- `INSUFFICIENT_CREDITS_FOR_COMMITTED_NODE_UPGRADE`: for committed nodes (prorates remaining committed days)

Minimum free disk space required before upgrade: **500 MB**  
Error: `INSUFFICIENT_DISK_SPACE_MESSAGE`

Celery task: `NODE_UPGRADE_TASK = "node.node_upgrade_task"`

Cross-series upgrade supported plans: `C3VPS`, `M3VPS`, `SDC3`

---

## Rescue Mode

### States

| Integer | String |
|---|---|
| 0 | Disabled |
| 1 | In progress |
| 2 | Enabled |

### Allowed OS families for rescue

`centos`, `debian`, `ubuntu`, `opensuse`, `cloudlinux`, `redhat`, `almalinux`, `rockylinux`

### Rescue images (by location)

| Region | Image name |
|---|---|
| Delhi | `Rescue-disk` |
| Mumbai | `Rescue-disk-mumbai` |
| Chennai | `Rescue-disk-Chennai` |

Third-generation series (C3, SDC3, M3) use `Rescue-disk-{Location}-C3` variants.

Celery task: `RESCUE_MODE_BOOT_ORDER_TASK = "node.rescue_mode_change_boot_order_task"`

---

## Backup / CDP

Backup state is derived from the `BackupDetail` model (in `cdp` app), not from the Node model directly.

| `BackupDetail` condition | Node property |
|---|---|
| Exists, no `deactivated_at`, no `activated_at` | `backup_in_process = True` |
| Exists, no `deactivated_at`, has `activated_at` | `backup_enabled = True` |
| Exists, no `deactivated_at` | `backup = True` |

**Backup not available when:**
- Node OS slug contains `kubernetes`
- `CdpBackupRetentionPolicyPlansService.can_we_activate_cdp_backup()` returns `False` for the plan/location

Backup status keys: `backup_not_activated`, `backup_status_unsupported_key`

---

## Billing

### Hourly pricing lookup

`SkuItemPrice.get_sku_item_price_object(sku_id, customer_currency, location, HOURLY)`

Currency: from `customer.user_profile_currency`. INR → displayed as INR text.

### Committed node billing

`ReserveInstance` model joins on `vm_id + location + instance_state=STATE_RUNNING`.  
Committed fields returned in `Node.committed_info`:
- `committed_price`, `committed_period`, `committed_status`, `committed_until`
- `committed_hourly_rate`, `committed_percentage`

Next billing month: first of next calendar month (`relativedelta(months=1, day=1)`).

---

## Error Messages

From `backend/e2e_sites/node/error_messages.py`:

| Constant | Message |
|---|---|
| `ACTION_PERFORM_FAIL` | "Unable to perform action at this moment" |
| `ACTION_ON_LOCKED_VM` | "Actions cannot be performed on locked VM" |
| `ACTION_ON_ABUSED_VM` | "Actions cannot be performed on abused VM" |
| `ACTION_ON_ACCIDENTAL_PROTECTION` | "The 'Delete' action cannot be performed while the accidental protection mode is enabled." |
| `ACTION_ON_ACCIDENTAL_PROTECTION_REINSTALL` | "The 'Reinstall' action cannot be performed while the accidental protection mode is enabled." |
| `RESTRICT_ACTION_ON_REINSTALL_STATE` | "No action on node can be performed while the node is in reinstall state" |
| `NODE_IN_CREATING_STATE` | "Currently, Node is in creating state. Please try again later." |
| `NODE_DELETION_RESTRICTION_MESSAGE` | "Node deletion is not allowed in Failed-Recreate state." |
| `NODE_IN_STOPPED_STATE` | "Action cannot be performed on this node in stopped state" |
| `NOT_ALLOWED_TO_STOP_NODE` | "Not allowed to stop node" |
| `LOCK_VM_STATE_CHECK_FAILED` | "Lock action failed. Please try again after some time." |
| `LOCK_VM_FAILED` | "Lock action failed. Our team has been notified to investigate this issue." |
| `UNLOCK_VM_STATE_CHECK_FAILED` | "Unlock action failed. Please try again after some time." |
| `UNLOCK_VM_FAILED` | "Unlock action failed. Our team has been notified to investigate this issue." |

From `constants.py`:

| Constant | Message |
|---|---|
| `NODE_RENAME_FAILED_MESSAGE` | "Unable to process the rename request at the moment" |
| `NODE_DELETE_INVALID_STATE_MESSAGE` | "Invalid node state to perform 'Delete' action." |
| `NODE_DELETE_ACTION_FAILED_MESSAGE` | "Failed to delete node. Please try again later." |
| `GPU_PLAN_NOT_AVAILABLE` | "This GPU plan is temporarily not available." |
| `VPC_CREATING_STATE_ERROR` | "The VPC is currently in the creating state. Please try again later." |
| `INVALID_VPC_BITNINJA_CONFIG` | "Deploying a node in a Virtual Private Cloud (VPC) without a public IP address is incompatible with Bitninja." |
| `RESERVEIP_VOLUME_RESTRICTION_ERROR` | "The reserve IP and volume feature is restricted when multiple nodes are present." |
| `INVALID_NUMBER_OF_NODE_CREATE_ERROR` | "You can only create between 1 and 5 nodes." |
| `DIFFRENT_LOCATION_FOR_NODE_AND_VPC` | "The location for vpc and node are diffrent." |
| `XEN_HYPERVISOR_ACTION_DISALLOWED_MESSAGE` | "The Xen machine does not support this action." |
| `UPGRADE_ACTION_FAILED` | "The upgrade action has failed. Please contact our cloud support team for assistance." |
| `INSUFFICIENT_DISK_SPACE_MESSAGE` | "Insufficient disk space for upgrade. Please ensure at least 500 MB of free disk space is available." |
| `VM_ALREADY_IN_SAME_STATE` | "VM already in state of action to be performed" |
| `ERROR_MSG_RES_SAVED_IMAGE` | "Image name should be unique. Please retry with a new name." |
| `ERROR_MSG_RES_SAVED_IMAGE_2` | "Please poweroff '{vm_name}' and retry" |
| `ERROR_MSG_RES_SAVED_IMAGE_3` | "This node is not correct mapped with template or plan has been deprecated." |
| `NO_ACTION_PERFORMED` | "Action could not be performed on any of the nodes." |
| `FAILED_NODE_NOTIFICATION_MESSAGE` | "Provisioning is taking longer than expected. To create a ticket, <a href='...'>Click Here</a>" |
| `FAILED_NODE_TOOLTIP_MESSAGE` | "Slight delay in provisioning. We are on it! Contact support team if needed" |

---

## Frontend UI Flow

### Frontend routing

Source: `frontend/src/app/products/products-routing.module.ts`

| Route | Component area |
|---|---|
| `products/compute` | Node list page |
| `products/create-node` | Node creation wizard |
| `products/compute/:id` | Node detail page |

### Create-node wizard steps

Source: `frontend/src/app/products/new-node/`

| Step | Component directory | What it captures |
|---|---|---|
| 1 | `node-plan/` | Plan/SKU selection |
| 2 | `operating-system/` | OS and image selection |
| 3 | `node-details/` | Node name, region, label |
| 4 | `node-creation-ssh-keys/` | SSH key selection/creation |
| 5 | `node-creation-security-group/` | Security group |
| 6 | `node-creation-volume/` | Block storage attachment |
| 7 | `node-creation-backup/` | CDP backup opt-in |
| 8 | `node-creation-advanced-settings/` | VPC, startup scripts, bitninja, IPv6, NGC |
| 9 | `node-summary/` | Review and confirm |
| — | `node-creation-committed-popup/` | Popup shown if committed plan selected |

### Node list features

Source: `frontend/src/app/products/nodes/`

- Filter by label and location
- Search by name, IP, status
- Bulk action support
- Status chips match backend `NODE_STATUS` strings

---

## Known Gaps and Unresolved Questions

| ID | Question | Suspected source |
|---|---|---|
| compute-001 | When exactly does billing start for a newly created node? Is it at state 0 (Create) or state 3 (Running)? | `backend/e2e_sites/e2e_billing/` |
| compute-002 | What is the complete list of regions currently enabled for node creation? | `CLUSTER_LOCATION` in `cluster_management/constants.py` |
| compute-003 | Does `stop` action (`STOP_BILLING`) fully halt billing or merely pause? What state does it leave the VM in vs. `power_off`? | `action_services.py` — `stop` path not read in full |
| compute-004 | `XEN_SAVED_IMAGE_RESPONSE` references a deprecated plan. Which specific plans are XEN? Are any still active for new nodes? | `HYPERVISOR_LIST`, `HostsRegistered.hypervisor` |
| compute-005 | Maximum number of SSH keys per node — backend limit not found in `serializers.py` | `node_create_helper.py` |
| compute-006 | `ALLOWED_BLOCK_STORAGE_SKU` and `MUMBAI_BS_ALLOWED_SKU` are loaded from `JsonVariables` at runtime. Current values not extractable without DB access. | Database — `JsonVariables` table |
| compute-007 | Private cluster custom SKU schema — `ALLOWED_KEYS` and `MIN_ROOT_DISK_SIZE_IN_GB` from `private_cluster/api/v1/constants.py` not read | `private_cluster/api/v1/constants.py` |
| compute-008 | IPv6 count limit is 8 per node (`IPV6_COUNT_LIMIT = 8`) — needs verification this is enforced at serializer/view level | `views.py IPv6AddressView` |
| compute-009 | `saved_button_enable` field on Node — unclear what UI behavior this controls | Frontend node detail component |
| compute-010 | Password validation regex for `update_password` action — `ERROR_MSG_POSSWORD_NOT_VALID` describes the rule but exact regex is in `rds/helpers/rds_helper.py` | `rds/helpers/rds_helper.py` |
