// 전역 클로저
const MemoSet = function () {
  // 훅 저장소
  let memo = {};
  let modules = {};
  let css = {};

  return {
    // 훅 저장하기
    setMemo(id, value) {
      memo[id] = value;
      return memo;
    },
    getMemo() {
      return memo;
    },
    // css
    setCss(id, value) {
      css[id] = value;
      return css;
    },
    // 아이디로 가져오기
    getCss(id) {
      if (css[id]) {
        return css[id];
      } else {
        return null;
      }
    },
    getCssAll() {
      return css;
    },
    // 모듈
    setModules(Components) {
      for (let comp of Components) {
        modules[comp.name] = comp;
      }
      return modules;
    },
    getModules() {
      return modules;
    },
  };
};

export default MemoSet;
