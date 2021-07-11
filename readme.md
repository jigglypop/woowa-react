

# 우아한 리액트 with 우아한 테크 캠프

![](https://avatars.githubusercontent.com/u/86336942?s=200&v=4)



* 우아한 형제들과 같이 만드는 바닐라 자바스크립트 리액트입니다

* 우아한 테크 캠프 캠퍼들과 함께합니다



## 도움 주신 컨트리뷰터

* 염동환



## 버전별 업데이트

* 1.0.0 : useState, useEffect 갱신 기능 추가 (염동환)
* 1.1.0 : 하위 컴포넌트 내에서 useState, useEffect 각각 동작, onClick 메서드 사용 가능(염동환)
* 1.2.0 : 컴포넌트 내에 스타일 시트 삽입 가능(염동환)
* 1.3.0 : 하위 컴포넌트 파라미터 넘기기 가능, useEffect에서 돔 선택 가능(염동환)



### 1) 특징

---

```javascript
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

// index.js
```

```javascript
export default function App() {
  const { useEffect } = this;

  useEffect(() => {
    console.log("---앱 시작---");
  }, []);

  return {
    css: ``,
    jsx: `
    <div class="AppInner" >
      <h1>앱부분</h1>
      <Count :title="안녕하세요" :name="형제들" />
      <Count :title="저도 반갑습니다" :name="우아한" />
    </div>
    `,
  };
}

// App.js
```

* 다음과 같이 리액트처럼 사용할 수 있습니다



```javascript
export default function WordB({title}) {
  // this에서 넘어옴
  const { useState, useEffect } = this;
  const [wordB, setWordB] = useState("");

  useEffect(() => {
    console.log("wordB 변경: " + wordB);
  }, [wordB]);

  return {
    onWordB() {
      setWordB(wordB + "B");
    },
    // 스타일링
    css: `
    .WordBInner {
      background-color: green;
    }`,
    /// jsx
    jsx: `
    <div class="WordBInner" >
      <h1>${title}: ${wordB}</h1>
      <button data-onClick="onWordB">글자 + B</button>
    </div>
    `,
  };
}
```

* useState, useEffect : this에서 넘어옵니다. 다음과 같이 사용합니다.
* data-onClick  : 버튼에서 함수를 사용할 수 있습니다
* **주의! 반드시 onClick에서 사용하고자 하는 ex) onWordB 등을 리턴해 주세요**
* **주의! css 시트는 스타일이 있지 않더라도 리턴해 주세요**
* **주의! css를 사용할 때 클래스를 달아서 리턴해 주시고 h1, h2와 같이 태그를 사용할 경우 다른 컴포넌트와 겹치지 않게 해주세요**





```javascript
export default function Word({title}) {
  const { useState } = this;
  const [wordA, setWordA] = useState("");

  return {
    onWordA() {
      setWordA(wordA + "A");
    },
    css: `
      .text {
        font-size: 20px;
      }
    `,
    jsx: `
    <div class="WordInner" >
      <h1 class="text" >${title}: ${wordA}</h1>
      <button data-onClick="onWordA">글자 + A</button>
      <WordB :title="글자B1" />
      <WordB :title="글자B2" />
    </div>
    `,
  };
}
```

* 하위 컴포넌트에 파라미터를 넘길 시 `:title="글자B1"`처럼 앞에 `:`를 붙여주세요

