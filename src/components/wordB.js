export default function WordB({title}) {
  const { useState, useEffect } = this;
  const [wordB, setWordB] = useState("");

  useEffect(() => {
    console.log("wordB 변경: " + wordB);
  }, [wordB]);

  return {
    onWordB() {
      setWordB(wordB + "B");
    },
    css: `
    .WordBInner {
      background-color: green;
    }`,
    jsx: `
    <div class="WordBInner" >
      <h1>${title}: ${wordB}</h1>
      <button data-onClick="onWordB">글자 + B</button>
    </div>
    `,
  };
}
