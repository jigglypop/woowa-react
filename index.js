import Count from "./src/components/count.js";
import WordB from "./src/components/wordB.js";
import Word from "./src/components/word.js";
import App from "./src/App.js";
import MemoSet from "./react/memo.js";
import initApp from "./react/initApp.js";

// 전역 클로저 실행
export const memoset = new MemoSet();
// 앱 등록해줘야 함
memoset.setModules([App, Word, WordB, Count]);
// 렌더링
const root = document.getElementById("root");
initApp(App, root);
