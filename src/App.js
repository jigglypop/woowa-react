export default function App() {
  const { useEffect } = this;

  useEffect(() => {
    console.log("---앱 시작---");
  }, []);

  const Arr = [1, 2, 3];

  return {
    css: ``,
    jsx: `
    <div class="AppInner" >
      <h1>앱부분</h1>
      <Count :title="안녕하세요" :name="염동환" />
      <Count :title="저도 반갑습니다" :name="염동환" />
    </div>
    `,
  };
}
