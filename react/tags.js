// 인자 찾기
export const getParams = (text) => {
  const componentTag = ":.*?=\".*?\"";
  const regex = new RegExp(componentTag, "g");
  const datas = text.match(regex) || []
  let _datas = {}
  datas.map(item => {
    const [name, value] = item.replace(/(\"|:)/g, "").split("=")
    _datas[name] = value
  })
  return _datas;
};
// 컴포넌트 인지
export const isComponent = (text) => {
  const openTag = "(<.*/>)";
  const componentSetTag = `${openTag}`;
  const jsxRegex = new RegExp(componentSetTag, "g");
  const jsxs = text.match(jsxRegex)
  const jsxDatas = jsxs ? jsxs.map((jsx) => {
    return {
      'jsx': jsx,
      "params": getParams(jsx)
    }
  }) : null
  return jsxDatas;
};
// 태그 찾기
export const getTag = (text) => {
  const componentTag = "[A-Z]([a-zA-Z])*";
  const regex = new RegExp(componentTag, "g");
  return text.match(regex) ? text.match(regex)[0] : null;
};
