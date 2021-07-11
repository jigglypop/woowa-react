// 전역 클로저
const MemoSet = function () {
  // 훅 저장소
  let memo = {};
  let modules = {};
  let css = {};
  let callback = {}

  return {
    // 훅 저장하기
    setMemo(id, value) {
      memo[id] = value;
      return memo;
    },
    getMemo() {
      return memo;
    },
    // useEffect callback 함수 저장하기
    setCallback(id, index, cb) {
      // 없으면 빈 객체 생성
      if (!callback[id]) callback[id] = {}
      callback[id][index] = cb
      return callback[id];
    },
    getCallbackById(id) {
      return callback[id];
    },
    getCallback() {
      return callback
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
