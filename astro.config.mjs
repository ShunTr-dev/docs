// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
    site: 'https://docs.shuntr.dev',
    integrations: [
        starlight({
            title: 'Docs for dummies',
            social: [
                //{ icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/pablo-martinez-developer' },
                { icon: 'github', label: 'GitHub', href: 'https://github.com/ShunTr-dev/docs' },
            ],
            sidebar: [
                {
                    label: 'CSS',
                    collapsed: true,
                    autogenerate: { directory: 'CSS' },
                },
                {
                    label: 'Docker',
                    collapsed: true,
                    autogenerate: { directory: 'Docker' },
                },
                {
                    label: 'English',
                    collapsed: true,
                    autogenerate: { directory: 'English' },
                },
                {
                    label: 'GIT',
                    collapsed: true,
                    autogenerate: { directory: 'GIT' },
                },
                {
                    label: 'HTML',
                    collapsed: true,
                    autogenerate: { directory: 'HTML' },
                },
                {
                    label: 'JavaScript',
                    collapsed: true,
                    autogenerate: { directory: 'JavaScript' },
                },
                {
                    label: 'MongoDB',
                    collapsed: true,
                    autogenerate: { directory: 'MongoDB' },
                },
                {
                    label: 'Node.js',
                    collapsed: true,
                    autogenerate: { directory: 'Node.js' },
                },
                {
                    label: 'NPM',
                    collapsed: true,
                    autogenerate: { directory: 'NPM' },
                },
                {
                    label: 'PHP',
                    collapsed: true,
                    autogenerate: { directory: 'PHP' },
                },
                {
                    label: 'Postgres',
                    collapsed: true,
                    autogenerate: { directory: 'Postgres' },
                },
                {
                    label: 'React',
                    collapsed: true,
                    autogenerate: { directory: 'React' },
                },
                {
                    label: 'Shell',
                    collapsed: true,
                    autogenerate: { directory: 'Shell' },
                },
                {
                    label: 'Tools',
                    collapsed: true,
                    autogenerate: { directory: 'Tools' },
                },
                {
                    label: 'VSCode',
                    collapsed: true,
                    autogenerate: { directory: 'VSCode' },
                },
                {
                    label: 'Wordpress',
                    collapsed: true,
                    autogenerate: { directory: 'Wordpress' },
                },

                /*
                {
                    label: 'Guides',
                    items: [
                        // Each item here is one entry in the navigation menu.
                        { label: 'Example Guide', slug: 'guides/example' },
                    ],
                },
                {
                    label: 'Reference',
                    autogenerate: { directory: 'reference' },
                },
*/
            ],
        }),
    ],
})
