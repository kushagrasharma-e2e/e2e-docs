import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const base = process.env.ASTRO_BASE ?? '/e2e-docs';
const site =
  process.env.ASTRO_SITE ??
  (process.env.GITHUB_REPOSITORY_OWNER
    ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`
    : undefined);

export default defineConfig({
  site,
  base,
  integrations: [
    starlight({
      title: 'E2E Cloud Docs',
      description:
        'Public-safe, source-backed documentation for E2E Cloud, MyAccount, TIR, APIs, troubleshooting, LLM context, and agent workflows.',
      customCss: ['./src/styles/global.css'],
      pagination: true,
      head: [
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
        },
        {
          tag: 'link',
          attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
        },
        {
          tag: 'link',
          attrs: {
            href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Mono:ital,wght@0,400;0,500;1,400&display=swap',
            rel: 'stylesheet'
          }
        }
      ],
      components: {
        Head: './src/components/StarlightHead.astro',
        Header: './src/components/StarlightHeader.astro',
        Sidebar: './src/components/ContextSidebar.astro',
        Footer: './src/components/PageFooter.astro',
      },
      social: [{ icon: 'github', label: 'E2E Networks', href: 'https://www.e2enetworks.com/' }],
      sidebar: [
        {
          label: 'Start Here',
          items: [{ label: 'Overview', slug: 'start-here' }],
        },
        {
          label: 'MyAccount',
          items: [
            { label: 'Overview', slug: 'myaccount', attrs: { class: 'si-overview' } },
            {
              label: 'Documentation',
              collapsed: false,
              items: [
                { label: 'All documentation', slug: 'myaccount/documentation', attrs: { class: 'si-docs' } },
                {
                  label: 'Compute',
                  collapsed: false,
                  items: [
                    {
                      label: 'Nodes',
                      collapsed: false,
                      items: [
                        { label: 'Overview', link: '/myaccount/documentation/nodes/' },
                        { label: 'Create and manage', link: '/myaccount/documentation/nodes/create-and-manage/' },
                        { label: 'Lifecycle and states', link: '/myaccount/documentation/nodes/lifecycle-states/' },
                        { label: 'Networking, storage, security', link: '/myaccount/documentation/nodes/networking-storage-security/' },
                        { label: 'Billing and plans', link: '/myaccount/documentation/nodes/billing-plans/' },
                        { label: 'Troubleshooting', link: '/myaccount/documentation/nodes/troubleshooting-edge-cases/' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: 'Guides',
              collapsed: false,
              items: [
                { label: 'All guides', slug: 'myaccount/guides', attrs: { class: 'si-guides' } },
                {
                  label: 'Compute',
                  collapsed: true,
                  items: [
                    { label: 'Create a node', slug: 'myaccount/compute/getting-started/create-node' },
                    { label: 'Access a node', slug: 'myaccount/compute/how-to/access-node' },
                    { label: 'Node states', slug: 'myaccount/compute/reference/node-states' },
                    { label: 'Troubleshooting', slug: 'myaccount/compute/troubleshooting' },
                  ],
                },
              ],
            },
            { label: 'Developer', slug: 'myaccount/api-automation', attrs: { class: 'si-api' } },
            { label: 'Troubleshooting', slug: 'myaccount/troubleshooting', attrs: { class: 'si-troubleshoot' } },
          ],
        },
        {
          label: 'TIR',
          items: [
            { label: 'Overview', slug: 'tir', attrs: { class: 'si-overview' } },
            {
              label: 'Documentation',
              collapsed: false,
              items: [
                { label: 'All documentation', slug: 'tir/documentation', attrs: { class: 'si-docs' } },
              ],
            },
            { label: 'Guides', slug: 'tir/guides', attrs: { class: 'si-guides' } },
            { label: 'Developer', slug: 'tir/api-automation', attrs: { class: 'si-api' } },
            { label: 'Troubleshooting', slug: 'tir/troubleshooting', attrs: { class: 'si-troubleshoot' } },
          ],
        },
      ],
    }),
  ],
});
