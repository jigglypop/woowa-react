import { memoset } from "../index.js";
import Closure from "./Closure.js";
import { setMethods } from "./methods.js";

// 앱만 따로 클로저를 잡아주는 함수
const initApp = (App, root) => {
  const [_react, _cb, _] = new Closure(App, root);
  _react.render(_cb, root);
  let _memoset = memoset.getMemo();
  // 메서드 잡아주기
  for (let _id of Object.keys(_memoset)) {
    setMethods(_id);
  }
  // App 스타일 세팅
  memoset.setCss(_react.global.id, _react.global.instance.css);
  // 스타일링
  _react.renderStyle(
    document.querySelector(".AppOuter"),
    "AppOuter",
    _react.global.instance.css
  );
};
export default initApp;
