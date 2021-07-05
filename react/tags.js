// 컴포넌트 인지
export const isComponent = (text) => {
  const openTag = "(<.*>)";
  const closeTag = "(</.*>)";
  const componentSetTag = `${openTag}${closeTag}`;
  const regex = new RegExp(componentSetTag, "g");
  return text.match(regex);
};
// 태그 찾기
export const getTag = (text) => {
  const componentTag = "[A-Z]([a-zA-Z])*";
  const regex = new RegExp(componentTag, "g");
  return text.match(regex) ? text.match(regex)[0] : null;
};
