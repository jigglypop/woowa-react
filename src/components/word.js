export default function Word() {
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
      <h1 class="text" >글자A: ${wordA}</h1>
      <button data-onClick="onWordA">글자 + A</button>
      <WordB></WordB>
      <WordB></WordB>
    </div>
    `,
  };
}
