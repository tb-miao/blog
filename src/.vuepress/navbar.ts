import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      { text: "vue主题命令", icon: "pen-to-square", link: "helo-world" },
      { text: "hexo", icon: "pen-to-square", link: "hexo" },
      { text: "java", icon: "pen-to-square", link: "java-1" },
      { text: "永久激活Windows", icon: "pen-to-square", link: "windows-jh" },
      { text: "TurboWarp", icon: "pen-to-square", link: "TurboWarp" },
      { text: "结束了", icon: "pen-to-square", link: "jieshule" },
    ],
  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
  {
    text: "列表",
    icon: "pen-to-square",
    prefix: "banana/",
    children: [
      {
        text: "我的hexo博客",
        icon: "pen-to-square",
        link: "https://tb-miao.github.io",
      },
      {
        text: "我的Github",
        icon: "pen-to-square",
        link: "https://github.com/tb-miao/blog",
      },
    ],
  },
]);
