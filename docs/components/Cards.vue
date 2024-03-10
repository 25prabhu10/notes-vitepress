<template>
  <article class="row">
    <a
      v-bind:href="topic.url"
      :class="`card card__` + topic.id"
      v-for="topic in topics"
    >
      <img
        v-bind:src="topic.imgScr"
        v-bind:alt="topic.title"
        class="card__img"
      />
      <div :class="`card__text--container card__text--container-` + topic.id">
        <h3 class="card__text">{{ topic.title }}</h3>
      </div>
    </a>
  </article>
</template>
<script>
export default {
  data() {
    return {
      topics: [
        {
          id: 1,
          title: "Markdown",
          url: "/Languages/Markdown/",
          imgScr: "/markdown-logo.svg",
        },
        {
          id: 2,
          title: "Bash",
          url: "/Languages/Shell-Scripting/Bash.html",
          imgScr: "/bash-logo.svg",
        },
        {
          id: 3,
          title: "Python",
          url: "/Languages/Python/",
          imgScr: "/python-logo.svg",
        },
        {
          id: 4,
          title: "HTML",
          url: "/Languages/HTML/",
          imgScr: "/html5-logo.svg",
        },
        {
          id: 5,
          title: "CSS",
          url: "/Languages/CSS/",
          imgScr: "/css-logo.svg",
        },
        {
          id: 6,
          title: "JavaScript",
          url: "/Languages/JavaScript/",
          imgScr: "/javascript-logo.svg",
        },
        {
          id: 7,
          title: "TypeScript",
          url: "/Languages/JavaScript/TypeScript/TypeScript/",
          imgScr: "/typescript-logo.svg",
        },
        {
          id: 8,
          title: "Angular",
          url: "/Languages/JavaScript/Angular/Angular/",
          imgScr: "/angular-logo.svg",
        },
        {
          id: 9,
          title: "React",
          url: "/Languages/JavaScript/React/",
          imgScr: "/react-logo.svg",
        },
        {
          id: 10,
          title: "Gulp.js",
          url: "/Languages/JavaScript/Tools/Gulp.js/Gulp.js/",
          imgScr: "/gulp-logo.svg",
        },
        {
          id: 11,
          title: "Vue.js",
          url: "/Languages/JavaScript/Vue.JS/",
          imgScr: "/vuejs-logo.svg",
        },
        {
          id: 12,
          title: "C#",
          url: "/Languages/C-Sharp/",
          imgScr: "/c-sharp-logo.svg",
        },
        {
          id: 13,
          title: "Concepts",
          url: "/Concepts/",
          imgScr: "/open-book.svg",
        },
        {
          id: 14,
          title: "Languages",
          url: "/Languages/",
          imgScr: "/programming-code.svg",
        },
        {
          id: 15,
          title: "Android",
          url: "/Collection/Android/Uninstall_Android_Apps/",
          imgScr: "/android-logo.svg",
        },
        {
          id: 16,
          title: "Collection",
          url: "/Collection/",
          imgScr: "/collection.svg",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
:root {
  scroll-behavior: smooth;
  --c-grey-vl: rgba(0, 0, 0, 0.05);
}

html.dark {
  --c-grey-vl: rgba(158, 158, 158, 0.2);
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  grid-auto-rows: 15em;
  grid-gap: 3em;
  padding: 2em;
  margin: 3em 0;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  text-align: center;
  text-transform: uppercase;
  overflow: hidden;

  text-decoration: none;

  background-color: rgba(65, 184, 131, 0.05);

  outline: 1px solid rgba(65, 184, 131, 0.2);
  border: none;
  border-radius: 5px;
  box-shadow: 0 0.5em 1em rgba(65, 184, 131, 0.15);

  transition: all 0.2s ease-out;
  backface-visibility: hidden;
  opacity: 0.8;
}

@media (hover: hover) and (pointer: fine) {
  a:hover.card {
    text-decoration: none;
  }
}

.card__img {
  margin: 0.8em;
  font-size: 1.5rem;
  height: 100%;
  max-height: 60%;
}

.card__text--container {
  background-color: rgba(65, 184, 131, 0.2);
  height: 25%;
}

h3.card__text,
h3:first-child.card__text {
  margin: 8% 0;
  padding: 0;

  color: var(--c-text);
  font-weight: 700;
  font-size: 1.5rem;

  word-break: break-word;
  word-wrap: anywhere;
}

@media (hover: hover) and (pointer: fine) {
  .card:hover {
    transform: scale(1.1) translateY(-1em);
    box-shadow: 0 2.5em 4em rgba(65, 184, 131, 0.5);
    border: none;
    outline: 3px solid rgba(65, 184, 131, 1);
    transition: all 0.2s ease-out;
  }
}

.card:active {
  transform: translateY(-1em);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__img {
    opacity: 1;
    transition: all 0.2s ease-out;
  }
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text {
    opacity: 1;
    color: #000000;
    transition: all 0.2s ease-out;
  }
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container {
    transform: scale(1.1);
    background-color: rgba(65, 184, 131, 1);
    transition: all 0.2s ease-out;
  }
}

.card:active .card__text--container {
  transform: scale(1);
}

.card__1 {
  background-color: var(--c-grey-vl);
  outline: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__1:hover {
    outline: 2px solid rgba(0, 0, 0, 1);
    box-shadow: 0 2.5em 4em rgba(0, 0, 0, 0.5);
  }
}

@media (hover: hover) and (pointer: fine) {
  .card__1:hover .card__text {
    color: #ffffff;
  }
}

.card__text--container-1 {
  background-color: rgba(0, 0, 0, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-1 {
    background-color: rgba(0, 0, 0, 1);
  }
}

.card__2 {
  background-color: rgba(62, 71, 74, 0.05);
  outline: 1px solid rgba(62, 71, 74, 0.2);
  box-shadow: 0 0.5em 1em rgba(62, 71, 74, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__2:hover {
    outline: 2px solid rgba(62, 71, 74, 1);
    box-shadow: 0 2.5em 4em rgba(62, 71, 74, 0.5);
  }
}

@media (hover: hover) and (pointer: fine) {
  .card__2:hover .card__text {
    color: #ffffff;
  }
}

.card__text--container-2 {
  background-color: rgba(62, 71, 74, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-2 {
    background-color: rgba(62, 71, 74, 1);
  }
}

.card__3 {
  background-color: rgba(255, 215, 72, 0.05);
  outline: 1px solid rgba(255, 215, 72, 0.2);
  box-shadow: 0 0.5em 1em rgba(255, 215, 72, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__3:hover {
    outline: 2px solid rgba(255, 215, 72, 1);
    box-shadow: 0 2.5em 4em rgba(255, 215, 72, 0.5);
  }
}

.card__text--container-3 {
  background-color: rgba(255, 215, 72, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-3 {
    background-color: rgba(255, 215, 72, 1);
  }
}

.card__4 {
  background: rgba(227, 79, 38, 0.05);
  outline: 1px solid rgba(227, 79, 38, 0.2);
  box-shadow: 0 0.5em 1em rgba(227, 79, 38, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__4:hover {
    outline: 2px solid rgba(227, 79, 38, 1);
    box-shadow: 0 2.5em 4em rgba(227, 79, 38, 0.5);
  }
}

.card__text--container-4 {
  background-color: rgba(227, 79, 38, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-4 {
    background-color: rgba(227, 79, 38, 1);
  }
}

.card__5 {
  background-color: var(--c-grey-vl);
  outline: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__5:hover {
    outline: 2px solid rgba(0, 0, 0, 1);
    box-shadow: 0 2.5em 4em rgba(0, 0, 0, 0.5);
  }
}

@media (hover: hover) and (pointer: fine) {
  .card__5:hover .card__text {
    color: #ffffff;
  }
}

.card__text--container-5 {
  background-color: rgba(0, 0, 0, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-5 {
    background-color: rgba(0, 0, 0, 1);
  }
}

.card__6 {
  background-color: rgba(247, 223, 30, 0.05);
  outline: 1px solid rgba(247, 223, 30, 0.2);
  box-shadow: 0 0.5em 1em rgba(247, 223, 30, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__6:hover {
    outline: 2px solid rgba(247, 223, 30, 1);
    box-shadow: 0 2.5em 4em rgba(247, 223, 30, 0.5);
  }
}

.card__text--container-6 {
  background-color: rgba(247, 223, 30, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-6 {
    background-color: rgba(247, 223, 30, 1);
  }
}

.card__7 {
  background-color: rgba(0, 122, 204, 0.05);
  outline: 1px solid rgba(0, 122, 204, 0.2);
  box-shadow: 0 0.5em 1em rgba(0, 122, 204, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__7:hover {
    outline: 2px solid rgba(0, 122, 204, 1);
    box-shadow: 0 2.5em 4em rgba(0, 122, 204, 0.5);
  }
}

.card__text--container-7 {
  background-color: rgba(0, 122, 204, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-7 {
    background-color: rgba(0, 122, 204, 1);
  }
}

.card__8 {
  background-color: rgba(214, 26, 72, 0.05);
  outline: 1px solid rgba(214, 26, 72, 0.2);
  box-shadow: 0 0.5em 1em rgba(214, 26, 72, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__8:hover {
    outline: 2px solid rgba(214, 26, 72, 1);
    box-shadow: 0 2.5em 4em rgba(214, 26, 72, 0.5);
  }
}

.card__text--container-8 {
  background-color: rgba(214, 26, 72, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-8 {
    background-color: rgba(214, 26, 72, 1);
  }
}

.card__9 {
  background-color: rgba(97, 218, 251, 0.05);
  outline: 1px solid rgba(97, 218, 251, 0.2);
  box-shadow: 0 0.5em 1em rgba(97, 218, 251, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__9:hover {
    outline: 2px solid rgba(97, 218, 251, 1);
    box-shadow: 0 2.5em 4em rgba(97, 218, 251, 0.5);
  }
}

.card__text--container-9 {
  background-color: rgba(97, 218, 251, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-9 {
    background-color: rgba(97, 218, 251, 1);
  }
}

.card__10 {
  background-color: rgba(218, 70, 72, 0.05);
  outline: 1px solid rgba(218, 70, 72, 0.2);
  box-shadow: 0 0.5em 1em rgba(218, 70, 72, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__10:hover {
    outline: 2px solid rgba(218, 70, 72, 1);
    box-shadow: 0 2.5em 4em rgba(218, 70, 72, 0.5);
  }
}

.card__text--container-10 {
  background-color: rgba(218, 70, 72, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-10 {
    background-color: rgba(218, 70, 72, 1);
  }
}

.card__11 {
  background-color: rgba(50, 222, 132, 0.05);
  outline: 1px solid rgba(50, 222, 132, 0.2);
  box-shadow: 0 0.5em 1em rgba(50, 222, 132, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__11:hover {
    outline: 2px solid rgba(50, 222, 132, 1);
    box-shadow: 0 2.5em 4em rgba(50, 222, 132, 0.5);
  }
}

.card__text--container-11 {
  background-color: rgba(50, 222, 132, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-11 {
    background-color: rgba(50, 222, 132, 1);
  }
}

.card__12 {
  background-color: rgba(161, 121, 219, 0.05);
  outline: 1px solid rgba(161, 121, 219, 0.2);
  box-shadow: 0 0.5em 1em rgba(161, 121, 219, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__12:hover {
    outline: 2px solid rgba(161, 121, 219, 1);
    box-shadow: 0 2.5em 4em rgba(161, 121, 219, 0.5);
  }
}

.card__text--container-12 {
  background-color: rgba(161, 121, 219, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-12 {
    background-color: rgba(161, 121, 219, 1);
  }
}

.card__13 {
  background-color: var(--c-grey-vl);
  outline: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__13:hover {
    outline: 2px solid rgba(0, 0, 0, 1);
    box-shadow: 0 2.5em 4em rgba(0, 0, 0, 0.5);
  }
}

@media (hover: hover) and (pointer: fine) {
  .card__13:hover .card__text {
    color: #ffffff;
  }
}

.card__text--container-13 {
  background-color: rgba(0, 0, 0, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-13 {
    background-color: rgba(0, 0, 0, 1);
  }
}

.card__14 {
  background-color: var(--c-grey-vl);
  outline: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__14:hover {
    outline: 2px solid rgba(0, 0, 0, 1);
    box-shadow: 0 2.5em 4em rgba(0, 0, 0, 0.5);
  }
}

@media (hover: hover) and (pointer: fine) {
  .card__14:hover .card__text {
    color: #ffffff;
  }
}

.card__text--container-14 {
  background-color: rgba(0, 0, 0, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-14 {
    background-color: rgba(0, 0, 0, 1);
  }
}

.card__15 {
  background-color: rgba(50, 222, 132, 0.05);
  outline: 1px solid rgba(50, 222, 132, 0.2);
  box-shadow: 0 0.5em 1em rgba(50, 222, 132, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__15:hover {
    outline: 2px solid rgba(50, 222, 132, 1);
    box-shadow: 0 2.5em 4em rgba(50, 222, 132, 0.5);
  }
}

.card__text--container-15 {
  background-color: rgba(50, 222, 132, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-15 {
    background-color: rgba(50, 222, 132, 1);
  }
}

.card__16 {
  background-color: var(--c-grey-vl);
  outline: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 0.5em 1em rgba(0, 0, 0, 0.15);
}

@media (hover: hover) and (pointer: fine) {
  .card__16:hover {
    outline: 2px solid rgba(0, 0, 0, 1);
    box-shadow: 0 2.5em 4em rgba(0, 0, 0, 0.5);
  }
}

@media (hover: hover) and (pointer: fine) {
  .card__16:hover .card__text {
    color: #ffffff;
  }
}

.card__text--container-16 {
  background-color: rgba(0, 0, 0, 0.2);
}

@media (hover: hover) and (pointer: fine) {
  .card:hover .card__text--container-16 {
    background-color: rgba(0, 0, 0, 1);
  }
}
</style>
