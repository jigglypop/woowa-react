import { memoset } from "../index.js";

// 메서드 미리 만들기
export const setMethods = (_id) => {
  const _memoset = memoset.getMemo();
  const Outer = document.getElementById(_id);
  if (Outer) {
    const buttons = Outer.querySelectorAll("button");
    const _global = _memoset[_id];
    for (let button of buttons) {
      // 버튼일때
      if (button.nodeName === "BUTTON") {
        const onClick = button.dataset.onclick;
        if (onClick) {
          const methods = _global.instance;
          const method = methods[onClick];
          // 오류 방지
          if (typeof method === "function") {
            button.addEventListener("click", () => {
              method();
            });
          }
        }
      }
    }
  }
};
