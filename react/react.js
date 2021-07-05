import getID from "./getID.js";
import { memoset } from "../index.js";
import { Closure } from "./Closure.js";
import { setMethods } from "./methods.js";
import { getTag, isComponent } from "./tags.js";
import styled from "./styled-component.js";

const React = function () {
  // 클로저 내부
  let global = {
    hooks: [],
  };
  let i = 0;
  // 루트 타겟
  let $target = null;
  // 훅 교체해주기
  function setHooks(_hooks) {
    global.hooks = _hooks;
  }
  // 스타일링
  // 초기 렌더링
  function render(Component, target) {
    // 메모셋 가져오기
    // 루트 타겟 잡기
    $target = target;
    // 글로벌 컴포넌트 세팅, instance 만들기
    let El = null;
    // 초기 init 세팅
    // 내부 클로저 global에 함수 인스턴스와 원형 달기
    global.Component = Component;
    const instance = global.Component();
    i = 0;
    global.instance = instance;
    // Jsx
    let Jsx = global.instance.jsx;
    // 새로운 element
    El = document.createElement("div");
    El.id = getID();
    // 아우터 달기
    El.className = Component.name + "Outer" + " Outer";
    // global 변수에 나중에 쓸 id, name, className 달기
    global.id = El.id;
    global.name = Component.name;
    global.className = El.className;
    // 키 생성
    const jsxs = isComponent(Jsx) || [];
    // 등록 컴포넌트 지우기
    for (let jsx of jsxs) {
      Jsx = Jsx.replace(jsx, "");
    }
    // 재귀함수 부분
    El.innerHTML = Jsx;
    const modules = memoset.getModules();
    for (let jsx of jsxs) {
      // 태그 가져와서 컴포넌트 모듈 찾기
      const tag = getTag(jsx);
      const _Component = modules[tag];
      // 클로저 잡기
      const [_react, _cb, _target] = new Closure(_Component, El);
      // 렌더링 되기 직전
      _react.render(_cb, El);
      // 재귀함수 후
      // 마운트 준비
      const _global = _react.global;
      const _id = _react.global.id;
      // 훅 메모리제이션
      memoset.setMemo(_id, _global);
      // css 있으면
      if (_global.instance.css) {
        memoset.setCss(_id, _global.instance.css);
      }
    }
    target.appendChild(El);
    // 컴포넌트 jsx가 있을 경우
    return global;
  }

  // 리렌더링
  function rerender(Component, target, head) {
    // 메모셋 가져오기
    const _memo = memoset.getMemo();
    // 루트 타겟 잡기
    $target = target;
    if (target === head) {
      const child = [];
      const now = document.getElementById(global.id);
      for (let c of now.childNodes) {
        if (c.classList) {
          if (c.classList.contains("Outer")) {
            child.push(c.cloneNode(true));
          }
        }
      }
      // 글로벌 컴포넌트 세팅, instance 만들기
      // 있을 때
      // 메모리제이션 교체
      global = _memo[global.id];
      let El = document.getElementById(global.id);
      global.Component = Component;
      const instance = global.Component();
      i = 0;
      global.instance = instance;
      let Jsx = global.instance.jsx;
      // 컴포넌트 뽑기
      const jsxs = isComponent(Jsx) || [];
      // 등록 컴포넌트 지우기
      for (let jsx of jsxs) {
        Jsx = Jsx.replace(jsx, "");
      }
      // 렌더링 부분
      El.innerHTML = Jsx;
      const modules = memoset.getModules();
      for (let jsx of jsxs) {
        // 태그 가져와서 컴포넌트 모듈 찾기
        const tag = getTag(jsx);
        const _Component = modules[tag];
        // 클로저 잡기
        const [_react, _cb, _target] = new Closure(_Component, El);
        // 렌더링 되기 직전
        _react.rerender(_cb, El, head);
        // 재귀함수 후
        // 마운트 준비
        const _global = _react.global;
        const _id = _react.global.id;
        // 훅 메모리제이션
        memoset.setMemo(_id, _global);
      }
      // 메서드 달아주기
      setMethods(global.id);
      // 컴포넌트 jsx가 있을 경우
      for (let c of child) {
        El.appendChild(c);
      }
      // 시작 전 css 실행
      const _csstext = memoset.getCss(global.id);
      if (_csstext) {
        styled(root, global.name + "Outer", _csstext);
      }
      // 클로저 재생성 재귀함수 실행
      resetClosure(target, now, Component);
      return global;
    }
  }
  // 클로저 재생성 함수
  function resetClosure(root, now, Component) {
    const memo = memoset.getMemo();
    const [_react, _cb, _] = new Closure(Component, root);
    // 있을 때
    // 루트 타겟 잡기
    const El = document.getElementById(now.id);
    _react.global = memo[now.id];
    // 메모리제이션에서 css 가져오기
    // 스타일링
    const _csstext = memoset.getCss(_react.global.id);
    if (_csstext) {
      styled(root, _react.global.name + "Outer", _csstext);
    }
    // 메서드 초기화
    setMethods(_react.global.id);
    // 해당 노드에 자식 중 컴포넌트가 있는지 확인 후 있으면 재귀함수 실행
    for (let child of El.childNodes) {
      if (child.classList) {
        if (child.classList.contains("Outer")) {
          const name = memo[child.id].name.split(" ")[1];
          // 메모리제이션에서 Component 가져오기
          const _Component = memoset.getModules()[name];
          // 클로저 실행

          resetClosure(now, child, _Component);
        }
      }
    }
  }
  // 스타일링
  function renderStyle(root, className, csstext) {
    // 해당 노드에 자식 중 컴포넌트가 있는지 확인 후 있으면 재귀함수 실행
    // csstext 있으면 스타일링 실행
    if (csstext) styled(root, `.${className}`, csstext);
    const memo = memoset.getMemo();
    for (let child of root.childNodes) {
      if (child.classList) {
        if (child.classList.contains("Outer")) {
          const _className = memo[child.id].name + "Outer";
          // 메모리제이션에서 css 가져오기
          const _csstext = memoset.getCss(child.id);
          // 클로저 실행
          renderStyle(child, _className, _csstext);
        }
      }
    }
  }
  // useState
  function useState(initialState) {
    // 훅에서 상태 찾기
    const hooks = global.hooks;
    const _state = global.hooks[i] || initialState;
    hooks[i] = _state;

    // setState(클로저 내의 클로저)
    const setState = (function () {
      // 내부 클로저 index 고정
      let _i = i;
      let target = $target;
      return function (value) {
        global.hooks[_i] = value;
        // 리렌더링 함수로
        rerender(global.Component, target, target);
      };
    })();
    // 인덱스 늘리기
    i++;
    return [_state, setState];
  }

  // useEffect
  function useEffect(cb, value) {
    const hooks = global.hooks;
    let _value = hooks[i];
    let changed = true;
    // value에서 변한 것이 있는지 찾음
    if (_value) changed = value.some((d, i) => d !== _value[i]);
    // 바뀌었으면 콜백 함수 실행
    if (changed) cb();
    hooks[i] = value;
    // 인덱스 늘리기
    i++;
  }
  return {
    render,
    rerender,
    useState,
    useEffect,
    global,
    setHooks,
    renderStyle,
  };
};

export default React;
