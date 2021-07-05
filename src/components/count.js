export default function Count() {
  const { useState, useEffect } = this;
  const [count, setCount] = useState(0);

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
    css: `
      .CountInner {
        color: red;
      }
    `,
    jsx: `
      <div class="CountInner" >
        <h1>카운트: ${count}</h1>
        <button data-onClick="onPlus">증가</button>
        <button data-onClick="onMinus">감소</button>
        <Word></Word>
        <Word></Word>
      </div>
    `,
  };
}
