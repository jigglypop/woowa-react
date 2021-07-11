export default function Word({title}) {
  const { useState } = this;
  const [wordA, setWordA] = useState("");

  return {
    onWordA() {
      setWordA(wordA + "A");
    },
    css: `
      .text {
        font-size: 20px;
      }
    `,
    jsx: `
    <div class="WordInner" >
      <h1 class="text" >${title}: ${wordA}</h1>
      <button data-onClick="onWordA">글자 + A</button>
      <WordB :title="글자B1" />
      <WordB :title="글자B2" />
    </div>
    `,
  };
}
