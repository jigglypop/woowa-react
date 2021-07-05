export default function App() {
  const { useEffect } = this;

  useEffect(() => {
    console.log("---앱 시작---");
  }, []);

  const Arr = [1, 2, 3];

  return {
    css: `
      .AppInner {
        color: yellow;
      }
    `,
    jsx: `
    <div class="AppInner" >
      <h1>앱부분</h1>
      ${Arr.map((item) => {
        return "<Count></Count>\n";
      }).join("")}
    </div>
    `,
  };
}
