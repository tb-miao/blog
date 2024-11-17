import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/demo/",
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "苹果",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
          { text: "苹果1", icon: "pen-to-square", link: "1" },
          { text: "苹果2", icon: "pen-to-square", link: "2" },
          "3",
          "4",
        ],
      },
      {
        text: "香蕉",
        icon: "pen-to-square",
        prefix: "banana/",
        children: [
          {
            text: "香蕉 1",
            icon: "pen-to-square",
            link: "1",
          },
          {
            text: "香蕉 2",
            icon: "pen-to-square",
            link: "2",
          },
          "3",
          "4",
        ],
      },
      { text: "樱桃", icon: "pen-to-square", link: "cherry" },
      { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
      { text: "vue主题命令", icon: "pen-to-square", link: "helo-world" },
      { text: "hexo", icon: "pen-to-square", link: "hexo" },
      { text: "java", icon: "pen-to-square", link: "java-1" },
      "tomato",
      "strawberry",
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
