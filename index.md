# E2E Docs Source Code Index

Last updated: 2026-05-06

This file is a navigation index for AI agents working on the E2E documentation system. Use it to find the likely frontend and backend source locations quickly before doing deeper extraction.

This index is not a source of truth for product behavior. It only points to source files and directories. Backend code, frontend code, OpenAPI specs, and verified registries remain the source of truth in the order defined by `AGENTS.md`.

## How to Use This Index

1. Start here before broad `rg` searches.
2. Use the relevant service row to identify likely frontend and backend directories.
3. Read the backend code first for actual behavior, validations, permissions, lifecycle, errors, billing, quota, and region restrictions.
4. Read the frontend code second for UI routes, labels, form fields, messages, dialogs, empty states, disabled states, and user journeys.
5. Update this index when you discover a better source location, a renamed module, or a new service area.
6. Do not record secrets, customer data, private URLs, credentials, or internal operational procedures in this file.

## Repository Entry Points

| Area                    | Start here                                              | Purpose                                                                     |
| ----------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------- |
| Agent instructions      | `AGENTS.md`                                             | Documentation workflow, truth-source order, security boundary, output rules |
| Design and stack        | `design-and-tech-stack.md`                              | Astro/Starlight/MDX/Tailwind/Scalar/Pagefind/TypeScript/Zod direction       |
| Frontend application    | `frontend/src/app/`                                     | Angular UI source for MyAccount journeys                                    |
| Frontend app routing    | `frontend/src/app/app.routing.ts`                       | Main UI route map and lazy-loaded product areas                             |
| Frontend API services   | `frontend/src/app/services/`                            | Shared frontend API wrappers, guards, resolvers                             |
| Frontend environments   | `frontend/src/environments/`                            | Environment-specific API/base URL config                                    |
| Backend application     | `backend/e2e_sites/`                                    | Django application root for MyAccount backend                               |
| Backend main URL router | `backend/e2e_sites/e2e_sites/urls.py`                   | Top-level route includes for APIs and server-rendered/admin flows           |
| Backend settings        | `backend/e2e_sites/e2e_sites/settings.py`               | Django settings and installed app context                                   |
| Backend tests           | `backend/tests_awakening/`, `backend/tests/`            | Backend test and smoke coverage                                             |
| Backend billing package | `backend/accounting/`, `backend/e2e_sites/e2e_billing/` | Billing/accounting-related implementation areas                             |
| Existing backend docs   | `backend/docs/`                                         | Existing backend-local docs; treat as weak reference only                   |
| Docs rules              | `rules/`                                                | Extracted rule files for public/internal/API/troubleshooting/LLM/agent docs |

## Source Priority Reminder

| Need                        | Use first                                           | Then use                                            |
| --------------------------- | --------------------------------------------------- | --------------------------------------------------- |
| Actual API behavior         | Backend views/services/serializers/models           | OpenAPI for public API docs only                    |
| Request and response fields | Backend serializers/views/services                  | OpenAPI comparison                                  |
| Validation rules            | Backend serializers/services/decorators             | Frontend client-side validation                     |
| Permissions/auth            | Backend decorators, IAM/PBAC/access-control modules | Frontend guards only for UI behavior                |
| User journey                | Frontend route/component/template files             | Backend to verify behavior                          |
| UI copy and messages        | Frontend templates/components/constants             | Backend errors if surfaced                          |
| Billing trigger             | Backend billing/accounting/services                 | Frontend pricing summaries only after backend check |
| Troubleshooting error       | Backend error response                              | Frontend UI message if present                      |

## Frontend Route Map

Main route file: `frontend/src/app/app.routing.ts`

| Public route segment          | Module/source area                                   | Notes                                                                          |
| ----------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| `accounts`                    | `frontend/src/app/auth/accounts/`                    | Login, signup, account activation, password, IndiaAI inventory route component |
| root dashboard                | `frontend/src/app/dashboard/`                        | Authenticated dashboard under admin layout                                     |
| `products`                    | `frontend/src/app/products/`                         | Compute, GPU, Kubernetes, load balancer, scaling, DR, EQS, FaaS, EFS           |
| `billing`                     | `frontend/src/app/billing/`                          | Billing dashboard, pay now, profile, TDS, auto-pay, account statement          |
| `services`                    | `frontend/src/app/service/`                          | SSH keys, API IAM/token detail, SSL, license management, datafarm              |
| `settings`                    | `frontend/src/app/settings/`                         | General settings, support, authentication, abuse action                        |
| `storage`                     | `frontend/src/app/storage/`                          | Block storage, object storage, backups, saved images, persistent volume        |
| `networking`                  | `frontend/src/app/networking/`                       | Security groups, reserved IP, floating IP, VPC, CDN, DNS/reverse DNS           |
| `monitoring`                  | `frontend/src/app/monitoring/`                       | Resource monitoring and alerts                                                 |
| `iam-admin`                   | `frontend/src/app/iam-admin/`                        | IAM users, identity provider, invite user                                      |
| `private-cluster`             | `frontend/src/app/private-cluster/`                  | Private cluster listing and details                                            |
| `datafactory`                 | `frontend/src/app/airbyte/`                          | Data integration / Airbyte UI                                                  |
| `apps`                        | `frontend/src/app/apps/`                             | One-click apps                                                                 |
| `documents`                   | `frontend/src/app/documents/`                        | EULA and declarations                                                          |
| `secret-management`           | `frontend/src/app/secret-management/`                | Vault and credential UI                                                        |
| `indiaai/inventory-dashboard` | `frontend/src/app/auth/accounts/india-ai-inventory/` | IndiaAI inventory dashboard component                                          |

## Backend API Route Map

Main route file: `backend/e2e_sites/e2e_sites/urls.py`

| API prefix or route family          | Backend include/source area                               | Notes                                                        |
| ----------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------ |
| `api/v1/nodes/`                     | `backend/e2e_sites/node/`                                 | Compute node create/list/detail/actions/monitoring/snapshots |
| `api/v1/images/`                    | `backend/e2e_sites/node/image/`                           | Node images and saved images                                 |
| `api/v1/reserve_ips/`               | `backend/e2e_sites/reserve_ip/`                           | Reserve IP APIs                                              |
| `api/v1/block_storage/`             | `backend/e2e_sites/blockstorage/`                         | Block storage APIs                                           |
| `api/v1/persistent_volume/`         | `backend/e2e_sites/persistent_volume/`                    | Persistent volume APIs                                       |
| `api/v1/e2e_zabbix/`                | `backend/e2e_sites/e2e_zabbix/`                           | Monitoring/Zabbix APIs                                       |
| `api/v1/scaler/`                    | `backend/e2e_sites/scaler/`                               | Scaling group APIs                                           |
| `api/v1/cdn/`                       | `backend/e2e_sites/cdn/`                                  | CDN APIs                                                     |
| `api/v1/hosted_ip/`                 | `backend/e2e_sites/hosted_ip/`                            | Hosted IP APIs                                               |
| `api/v1/apis/`                      | `backend/e2e_sites/apiiam/`                               | API token/API IAM area                                       |
| `api/v1/accounts/`                  | `backend/e2e_sites/account/`                              | Account APIs                                                 |
| `publicapi/v1/accounts/`            | `backend/e2e_sites/account/preapi/`                       | Public/pre-login account APIs                                |
| `api/v1/two-factor/`                | `backend/e2e_sites/accounts_twofactor/`                   | Two-factor authentication APIs                               |
| `api/v1/e2e_dns/`                   | `backend/e2e_sites/e2e_dns/`                              | DNS APIs                                                     |
| `api/v1/cdpbackup/`                 | `backend/e2e_sites/cdp/`                                  | Backup/CDP APIs                                              |
| `api/v1/vpc/`                       | `backend/e2e_sites/vpc/`                                  | VPC APIs                                                     |
| `api/v1/security_group/`            | `backend/e2e_sites/security_group/`                       | Security group APIs                                          |
| `api/v1/ticket_management/`         | `backend/e2e_sites/ticket_management/`                    | Support ticket APIs                                          |
| `api/v1/reserve_instance/`          | `backend/e2e_sites/reserve_instance/`                     | Committed/reserved instance APIs                             |
| `api/v1/kubernetes/`                | `backend/e2e_sites/kubernetes/`                           | Kubernetes APIs                                              |
| `api/v1/container_registry/`        | `backend/e2e_sites/container_registory/`                  | Container registry APIs                                      |
| `api/v1/faas/`                      | `backend/e2e_sites/knative/`                              | FaaS/Knative APIs                                            |
| `api/v1/snapshot/`                  | `backend/e2e_sites/storage_snapshot/`                     | Storage snapshot APIs                                        |
| `api/v1/data_integration/`          | `backend/e2e_sites/data_integration/`                     | Data integration APIs                                        |
| `api/v1/efs/`                       | `backend/e2e_sites/efs/`                                  | EFS APIs                                                     |
| `api/v1/epfs/`                      | `backend/e2e_sites/pfs/`                                  | PFS APIs                                                     |
| `api/v1/pbac/`                      | `backend/e2e_sites/pbac/`                                 | Project-based access control APIs                            |
| `api/v1/iam/`                       | `backend/e2e_sites/iam/`                                  | IAM APIs                                                     |
| `publicapi/v1/iam/`                 | `backend/e2e_sites/iam/preapi/`                           | Public/pre-login IAM APIs                                    |
| `api/v1/monitoring/`                | `backend/e2e_sites/monitoring/`                           | Monitoring APIs                                              |
| `api/v1/vault/`                     | `backend/e2e_sites/e2e_vault/`                            | Vault/secret management APIs                                 |
| `api/v1/private_cluster/`           | `backend/e2e_sites/private_cluster/`                      | Private cluster APIs                                         |
| `api/v1/draas/`                     | `backend/e2e_sites/draas/`                                | Disaster recovery APIs                                       |
| `api/v1/indiaai/`                   | `backend/e2e_sites/indiaai/urls_myaccount.py`             | MyAccount-side IndiaAI/TIR-related APIs                      |
| `indiaai-api/`                      | `backend/e2e_sites/indiaai/urls_indiaai.py`               | IndiaAI-side API entry point                                 |
| `indiaai/authapi/v2/generate_token` | `backend/e2e_sites/apiiam/`, `backend/e2e_sites/indiaai/` | IndiaAI token generation entry point                         |

## Service Locator

Use this table as the first stop for service-specific documentation extraction. Paths listed here are starting points only.

| Documentation service                                                   | Frontend start points                                                                                                             | Backend start points                                                                                                                                                                             | Extraction notes                                                                                                                                                 |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MyAccount Account                                                       | `frontend/src/app/auth/accounts/`, `frontend/src/app/settings/`, `frontend/src/app/iam-admin/`                                    | `backend/e2e_sites/account/`, `backend/e2e_sites/my_account/`, `backend/e2e_sites/iam/`, `backend/e2e_sites/pbac/`, `backend/e2e_sites/accounts_twofactor/`                                      | Verify auth, signup, profile, IAM, two-factor, PBAC, and validation flows from backend first.                                                                    |
| MyAccount Billing                                                       | `frontend/src/app/billing/`                                                                                                       | `backend/e2e_sites/payment/`, `backend/e2e_sites/e2e_billing/`, `backend/accounting/`, `backend/e2e_sites/reserve_instance/`                                                                     | Billing behavior must be backend-verified. Do not infer pricing from UI summaries alone.                                                                         |
| MyAccount Compute Nodes                                                 | `frontend/src/app/products/new-node/`, `frontend/src/app/products/nodes/`, `frontend/src/app/products/vcn/`, `frontend/src/app/services/nodes-api.service.ts`, `frontend/src/app/services/node-actions.service.ts`, `frontend/src/app/products/products-routing.module.ts` | `backend/e2e_sites/node/`, `backend/e2e_sites/node/api/v1/views.py`, `backend/e2e_sites/node/api/v1/serializers.py`, `backend/e2e_sites/node/api/v1/services/`, `backend/e2e_sites/node/urls.py`, `backend/e2e_sites/node/models.py`, `backend/e2e_sites/node/constants.py`, `backend/e2e_sites/node/error_messages.py` | First service to implement. Also check VPC, security group, reserve IP, backup, storage, monitoring, images, and billing modules for linked behavior.             |
| MyAccount Networking                                                    | `frontend/src/app/networking/`, `frontend/src/app/shared-components/new-security-group/`                                          | `backend/e2e_sites/vpc/`, `backend/e2e_sites/security_group/`, `backend/e2e_sites/reserve_ip/`, `backend/e2e_sites/hosted_ip/`, `backend/e2e_sites/e2e_dns/`, `backend/e2e_sites/cdn/`           | Separate reserve IP, floating IP, VPC, security group, DNS, CDN behavior when extracting.                                                                        |
| MyAccount Storage                                                       | `frontend/src/app/storage/`, `frontend/src/app/products/new-node/node-creation-volume/`                                           | `backend/e2e_sites/blockstorage/`, `backend/e2e_sites/eos/`, `backend/e2e_sites/efs/`, `backend/e2e_sites/pfs/`, `backend/e2e_sites/persistent_volume/`, `backend/e2e_sites/storage_snapshot/`   | Validate attach/detach, snapshot, volume, bucket, and file storage behavior separately.                                                                          |
| MyAccount Backup/CDP                                                    | `frontend/src/app/storage/backups/`, `frontend/src/app/products/new-node/node-creation-backup/`                                   | `backend/e2e_sites/cdp/`, `backend/e2e_sites/storage_snapshot/`, `backend/crons/backup_status.py`                                                                                                | Troubleshooting must be organized by extracted backend error messages.                                                                                           |
| MyAccount Disaster Recovery                                             | `frontend/src/app/disaster-recovery/`, routes under `frontend/src/app/products/products-routing.module.ts`                        | `backend/e2e_sites/draas/`                                                                                                                                                                       | Confirm public-safe states and support-assisted behavior from backend.                                                                                           |
| MyAccount Monitoring                                                    | `frontend/src/app/monitoring/`, `frontend/src/app/products/nodes/monitor-*`, `frontend/src/app/shared-utility/component/monitor/` | `backend/e2e_sites/monitoring/`, `backend/e2e_sites/e2e_zabbix/`, `backend/e2e_sites/alert_manager/`                                                                                             | Backend Zabbix/error behavior may differ from visible UI charts.                                                                                                 |
| MyAccount API Authentication                                            | `frontend/src/app/service/apiiam/`, `frontend/src/app/service/token-detail/`                                                      | `backend/e2e_sites/apiiam/`, `backend/e2e_sites/iam/`, `backend/e2e_sites/access_control_list/`                                                                                                  | Verify token creation, permissions, and public API auth from backend.                                                                                            |
| TIR Account Relationship                                                | `frontend/src/app/auth/accounts/`, `frontend/src/app/core/app-header/`, `frontend/src/app/iam-admin/`                             | `backend/e2e_sites/indiaai/`, `backend/e2e_sites/account/`, `backend/e2e_sites/my_account/`, `backend/e2e_sites/iam/`                                                                            | Current repo contains MyAccount-side TIR/IndiaAI integration signals. Full TIR product UI may live outside this frontend; mark missing sources if not available. |
| TIR Billing                                                             | Search frontend for `TIR`, `indiaai`, and `notebookURL`; start at auth/core header flows                                          | `backend/e2e_sites/e2e_billing/billing_handler/tir_*.py`, `backend/e2e_sites/indiaai/indiaai_billing/`, `backend/e2e_sites/indiaai/crons/`                                                       | Treat billing facts as backend-only until verified.                                                                                                              |
| TIR Inventory / IndiaAI                                                 | `frontend/src/app/auth/accounts/india-ai-inventory/`                                                                              | `backend/e2e_sites/indiaai/`, especially `api/v2`, `bom`, `usage`, `urls_indiaai.py`, `urls_myaccount.py`                                                                                        | IndiaAI appears in this repo; document as verified only after reading API/services/models.                                                                       |
| TIR Notebooks / Datasets / Inference / Training / GenAI API / Terraform | No complete frontend source confirmed in this repo yet                                                                            | Search `backend/e2e_sites/indiaai/`, `backend/e2e_sites/e2e_billing/billing_handler/tir_*.py`, OpenAPI specs when added                                                                          | Mark source status as missing or partial unless concrete source files are found.                                                                                 |

## Compute Nodes Fast Path

Use this section when working on the first service, MyAccount Compute Nodes.

| Need                                | Start here                                                                                                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UI route for compute list/details   | `frontend/src/app/products/products-routing.module.ts` route `products/compute`                                                                                                      |
| UI route for create node            | `frontend/src/app/products/products-routing.module.ts` route `products/create-node`                                                                                                  |
| Create-node route module            | `frontend/src/app/products/new-node/new-node-routing.module.ts`                                                                                                                      |
| Create-node main component          | `frontend/src/app/products/new-node/create-new-node/create-new-node.component.ts` and `.html`                                                                                        |
| Node plan and OS UI                 | `frontend/src/app/products/new-node/node-plan/`, `frontend/src/app/products/new-node/operating-system/`                                                                              |
| Node details form/UI                | `frontend/src/app/products/new-node/node-details/`                                                                                                                                   |
| SSH key step                        | `frontend/src/app/products/new-node/node-creation-ssh-keys/`                                                                                                                         |
| Security group step                 | `frontend/src/app/products/new-node/node-creation-security-group/`                                                                                                                   |
| Volume step                         | `frontend/src/app/products/new-node/node-creation-volume/`                                                                                                                           |
| Backup step                         | `frontend/src/app/products/new-node/node-creation-backup/`                                                                                                                           |
| Advanced settings                   | `frontend/src/app/products/new-node/node-creation-advanced-settings/`                                                                                                                |
| Summary and committed popup         | `frontend/src/app/products/new-node/node-summary/`, `frontend/src/app/products/new-node/node-creation-committed-popup/`                                                              |
| Frontend create-node API service    | `frontend/src/app/products/new-node/new-node.service.ts`                                                                                                                             |
| Frontend node list/detail UI        | `frontend/src/app/products/vcn/vcn.component.ts`, `frontend/src/app/products/vcn/vcn.component.html`, `frontend/src/app/products/vcn/specific-node-dashboard/`                       |
| Frontend node action UI/services    | `frontend/src/app/products/vcn/action-button/`, `frontend/src/app/services/nodes-api.service.ts`, `frontend/src/app/services/node-actions.service.ts`                                |
| Backend node URL map                | `backend/e2e_sites/node/urls.py`                                                                                                                                                     |
| Backend node API views              | `backend/e2e_sites/node/api/v1/views.py`                                                                                                                                             |
| Backend request/response validation | `backend/e2e_sites/node/api/v1/serializers.py`                                                                                                                                       |
| Backend create helpers              | `backend/e2e_sites/node/api/v1/services/node_create_helper.py`, `backend/e2e_sites/node/api/v1/services/launch_vm_api.py`, `backend/e2e_sites/node/api/v1/services/node_services.py` |
| Backend node models/states/errors   | `backend/e2e_sites/node/models.py`, `backend/e2e_sites/node/constants.py`, `backend/e2e_sites/node/error_messages.py`                                                                |
| Node actions                        | `backend/e2e_sites/node/api/v1/services/action_services.py`                                                                                                                          |
| Node upgrades                       | `backend/e2e_sites/node/api/v1/services/node_upgrade_services.py`, `backend/e2e_sites/node/api/v1/services/node_root_storage_upgrade_services.py`                                    |
| Node snapshots                      | `backend/e2e_sites/node/api/v1/services/node_snapshot.py`                                                                                                                            |
| Node monitoring                     | `backend/e2e_sites/node/api/v1/services/monitoring_alerts.py`, `backend/e2e_sites/node/api/v1/zabbix_helper.py`                                                                      |
| Terraform/CLI behavior              | `backend/e2e_sites/node/api/v1/services/terraform_cli_helper.py`, `backend/e2e_sites/node/api/v1/decorators/terraform_api_changes.py`                                                |

Backend node route prefix: `api/v1/nodes/`

Important node route names visible in `backend/e2e_sites/node/urls.py`:

- create/list fallback: `NodeListView` at `api/v1/nodes/`
- detail: `api/v1/nodes/<node_id>/`
- actions: `api/v1/nodes/<node_id>/actions/`
- bulk actions: `api/v1/nodes/action-on-multiple-nodes/`
- scheduled actions: `api/v1/nodes/<node_id>/scheduled_actions/`
- attached volumes: `api/v1/nodes/<node_id>/attached-volumes/`
- root storage upgrade: `api/v1/nodes/<node_id>/root-storage-upgrade/`
- snapshots: `api/v1/nodes/<node_id>/snapshots/`
- VNC: `api/v1/nodes/vnc/<node_id>`
- upgrade: `api/v1/nodes/upgrade/<node_id>`
- dashboard: `api/v1/nodes/dashboard/`
- network detail: `api/v1/nodes/<node_id>/networkdetail/`
- action logs: `api/v1/nodes/nodeactionlog/<vm_id>`
- billing logs: `api/v1/nodes/nodebillinglog/<vm_id>`
- IPv6: `api/v1/nodes/ipv6/`
- backup/BitNinja customer status: `api/v1/nodes/customerbackupstatus/`, `api/v1/nodes/customerbitninjastatus/`
- lifecycle and saved-image polling: `api/v1/nodes/<node_id>/check-lcm-state/`, `api/v1/nodes/<node_id>/saved-image-status/`

## Common Search Patterns

Use targeted searches before broad repository scans.

```bash
rg -n "class .*View|def (get|post|put|patch|delete)" backend/e2e_sites/<app>/
rg -n "serializer|validate|ValidationError|permission|quota|billing|limit|region" backend/e2e_sites/<app>/
rg -n "urlpatterns|re_path|path\\(" backend/e2e_sites/<app>/ backend/e2e_sites/e2e_sites/urls.py
rg -n "toastr|MatDialog|mat-dialog|FormGroup|Validators|required|disabled|error" frontend/src/app/<area>/
rg -n "getApi|postApi|putApi|deleteApi|http|get\\(|post\\(|put\\(|delete\\(" frontend/src/app/<area>/
rg -n "TIR|tir|IndiaAI|indiaai|notebookURL" frontend/src/app backend/e2e_sites
```

## What to Add When You Learn More

When a documentation task uncovers source locations, update this file with:

- service name
- frontend route/module/component files
- backend URL include and route prefix
- backend views, serializers, services, models, decorators, and billing files
- OpenAPI spec file path, when available
- existing docs path, when available
- known missing source areas, marked as missing or partial

Do not add:

- unverified behavior claims
- pricing claims
- region availability claims
- private infrastructure details
- customer-specific data
- exact internal-only procedures
- secrets, tokens, keys, or credentials

## Known Gaps in This Index

- No repository-local OpenAPI source directory was confirmed during this index pass.
- Complete TIR frontend source for notebooks, datasets, inference, training, GenAI API, and Terraform was not confirmed in `frontend/src/app/`.
- Existing documentation source folders for MyAccount and TIR were not confirmed outside `backend/docs/` and `rules/`.
- This index has not yet been converted into structured YAML. If agents need machine validation later, create `registry/source-code-index.yaml` from this file.
