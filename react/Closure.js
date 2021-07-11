import React from "./react.js";
// 함수 내부에서 react 훅을 쓸 수 있게 바인딩
export const Closure = function (cb, $target, _value) {
  const react = new React();
  const _cb = cb.bind(react);
  return [react, _cb, $target];
};

export default Closure;
