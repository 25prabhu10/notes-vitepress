import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'en-GB',
  title: "Notes",
  description: "Anthology of Snippets",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2020-present Prabhu K Hiremath'
    },

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    outline: 'deep',

    cleanUrls: true,

    editLink: {
      pattern: 'https://github.com/25prabhu10/notes/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },

    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },

    darkModeSwitchLabel: 'Theme',

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/25prabhu10' }
    ]
  }
})
