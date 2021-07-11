export default function Count({ title, name }) {
  const { useState, useEffect } = this;
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(document.querySelector(".CountInner"))
    console.log(`카운트 변경 : ${count}`);
  }, []);

  useEffect(() => {
    console.log(`카운트 변경 : ${count}`);
  }, [count]);

  return {
    onPlus() {
      setCount(count + 1);
    },
    onMinus() {
      setCount(count - 1);
    },
    css: ``,
    jsx: `
      <div class="CountInner" >
        <h1 class="titletext" >${title}님 ${name}</h1>
        <h1>카운트: ${count}</h1>
        <button data-onClick="onPlus">증가</button>
        <button data-onClick="onMinus">감소</button>
        <Word :title="글자A" />
      </div>
    `,
  };
}
