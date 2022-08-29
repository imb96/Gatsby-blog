---
date: '2022-08-29'
title: '리액트 문서 보기'
categories: ['React']
summary: 'React 문서(기본 사용법)보며 따라하기'
thumbnail: './react.jpeg'
---
> reactjs.org를 보고 번역,정리한 내용 입니다.
### I will Learn
- How to create and nest components (어떻게 컴포넌트를 만들고 중첩하는지)
- How to add markup and styles (어떻게 마크업과 스타일을 추가하는지)
- How to display data (어떻게 데이터를 표시하는지)
- How to render conditions and lists (어떻게 상태와 리스트들을 렌더하는지)
- How to respond to events and update the screen (어떻게 이벤트를 받고 화면을 업데이트 하는지)
- How to share data between components (어떻게 컴포넌트끼리 데이터를 공유하는지)
## 컴포넌트 생성 및 중첩
React App은 컴포넌트로 구성된다. 컴포넌트는 고유한 논리와 모양을 가진 UI의 일부이다. 컴포넌트는 버튼처럼 작거나 전체 페이지만큼 클 수 있다.
React 컴포넌트는 마크업을 반환하는 JavaScript 함수이다.
```jsx
function Button() {
  return (
    <button>I'm a Button</button>
  )
}
```
Button을 선언 했으므로 다른 컴포넌트에 중첩할 수 있다.
```jsx
export default function App() {
  return(
    <div>
      <h1>Tanks to visiting my blog<h1>
      <Button />
    </div>
  );
}
```
React 컴포넌트 이름은 항상 대문자로 시작해야 하며 HTML 태그는 소문자여야 한다.
### JSX로 마크업 작성하고
위에서 본 마크업 구문을 JSX라 한다. 선택 사항이지만 대부분의 React 프로젝트는 JSX를 사용한다.
JSX는 HTML보다 더 엄격하다. 컴포넌트는 여러 JSX태그를 반환할 수 없다. 같은 부모로 감싸야한다.
```jsx
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there. <br /> How do you do?</p>
    </>
  );
}
```
### 스타일 추가
React에서는 className으로 CSS 클래스를 지정합니다. HTML class attribute: 와 같은 방식으로 동작한다.
```jsx
<img className='avatar' />
```
### 데이터 표시
JSX를 사용하면 JavaScript에 마크업을 넣을 수 있다. 중괄호 {} 를 사용하면 JavaScript로 "escape back"하여 코드에서 일부 변수를 포함하고 사용자에게 표시할 수 있다.
```jsx
return (
  <h1>
    {user.name}
  </h1>
)
```
JSX 속성에서 JavaScript로 나올수 있지만 따옴표 대신 중괄호를 사용해야 한다.
또한 JSX 중괄호 안에 더 복잡한 표현식을 넣을 수도 있다.
```jsx
//App.js
const user = {
  name: 'Minjae Kim',
  imageUrl: 'https://imb96.github.io/minjae.jpg',
  imageSize: 80,
};
export default function Profile() {
  return (
    <>
      <h1>{user.name}</h1>
      <img
        className='avatar'
        src={user.imageUrl}
        alt={'Photo of '+ user.name}
        style = {{
          width: user.imageSize,
          height: user.imageSize,
        }}
      >
    </>
  )
}
```
위의 예에서 style={{}}는 특별한 구문이 아니라 style={} JSX 중괄호 안에 있는 일반 {} 객체이다. 스타일이 JavaScript 변수에 의존하는 경우 style 속성을 사용할 수 있다.
### 조건부 렌더링
React에는 특별한 조건문이 없다. 대신 일반 JS 코드를 사용한다.
```jsx
let content;
if(isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />
}
return (
  <div>
    {content}
  </div>
);
```
삼항연산자를 사용할 수도 있다. if문과 달리 jsx 내에서 작동한다.
```jsx
<div>
  {isLoggedIn ? (
    <AdminPanel />
  ): (
    <LoginForm />
  )}
</div>
```
단축평가도 사용할 수 있다.
```jsx
<div>
  {isLoggedIn && <AdminPanel />}
</div>
```
### 렌더링 리스트
for 루프 및 배열 map() 함수 같은 JS기능에 의존하여 컴포넌트 리스트를 렌더링 한다.
```jsx
const products = [
  { title: 'iPhone', id: 1},
  { title: 'AppleWatch', id: 2},
  { title: 'MacBook', id: 3},
];
```
```jsx
const listItems = products.map(product => 
  <li key={products.id}>
    {products.title}
  </li>
);
return (
  <ul>{listItems}</ul>
);
```
'<li>'에 키 속성이 있는 것을 주목하자. 리스트의 각 항목에 대해 형제 중에서 해당 항목을 고유하게 식별하는 문자열 또는 숫자를 전달해야한다. 일반적으로 키는 데이터 베이스 ID와 같은 데이터에서 가져와야 한다. React는 나중에 항목을 삽입, 삭제 또는 재정렬하는 경우 어떤일이 발생했는지 이해하기 위해 키에 의존한다.
```jsx
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3},
];

export default function shoppingList() {
  const listItems = products.map(product => 
    <li
      key = {products.id}
      style = {{
        color: products.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
      {products.title}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
```
### 이벤트 응답
컴포넌트 내에서 이벤트 핸들러 함수를 선언하여 이벤트에 응답할 수 있다.
```jsx
  function Button() {
    function handleClick() {
      alert('I Clicked~!');
    }
    return (
      <button onClick={handleClick}>Click</button>
    );
  }
```
handleClick 뒤에 괄호가 없다. 호출하는 것이 아닌 전달하기만 하면 React가 사용자가 버튼을 클릭할때 이벤트 핸들러를 호출한다.

### 화면 업데이트
컴포넌트가 일부 정보를 기억하고 표시하기를 원할 때 컴포넌트에 State를 추가할 수 있다.
먼저 React에서 import 한다.
```jsx
  import { useState } from 'react';
```
이제 컴포넌트 내부에서 State 변수를 선언할 수 있다.
```jsx
function Button() {
  const [count, setCount] = useState(0);
}
```
useState()에서 현재 상태와 이를 업데이트할 수 있는 함수의 두가지를 얻을 수 있다. 어떤 이름도 가능하지만 관례로는 [something, setSomething] 이런식으로 한다.

아래 예시에서 버튼이 처음 표시될 때 useState()에 0을 전달했기 때문에 count는 0이 된다. 상태를 변경하려면 setCount()를 호출하고 새 값을 전달하면 된다. 버튼을 누를 때 마다 count가 1씩 증가한다.
```jsx
function Button() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count+1);
  }
  return (
    <button onClick = {handleClick}>
      clicked {count} times
    </button>
  );
  export default function App() {
    return (
      <div>
        <h1>Counters that update separately</h1>
        <Button />
        <Button />
      </div>
    );
  }
}
```
동일한 컴포넌트를 여러 번 렌더링하면 각각 고유한 상태를 갖게 된다.
### use Hooks
'use'로 시작하는 함수를 Hook이라고 한다. useState는 React에서 제공하는 내장 Hook이다. 기존 Hook을 결합하여 자신만의 Hook을 작성할 수도 있다.
Hook는 일반 함수보다 더 제한적이다. 컴포넌트(또는 다른 Hook)의 최상위 레벨에서만 Hook을 호출할 수 있다. 조건이나 루프에서 useState를 사용하려면 새 컴포넌트를 추출하여 거기에 넣어야한다.
### 컴포넌트간 데이터 공유
데이터를 공유하고 항상 함께 업데이트 하려면 컴포넌트가 필요한 경우가 많다.
두 컴포넌트 요소가 동일하게 표시 되고 함께 업데이트되도록 하려면 개별 버튼에서 상태를 위쪽으로 모두 포함하는 가장 가까운 컴포넌트로 이동해야 한다.
이제 두 버튼 중 하나를 클릭하면 입력이 변경되어 두 카운트가 모두 변경된다.

먼저 State를 Button에서 App으로 이동한다.
그런 다음 공유 클릭 핸들러와 함께 State를 각각으로 전달한다. JSX 중괄호를 사용하여 정보를 전달할 수 있다.
```jsx
function Button() {
  // ... we are moving code from here
}
export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }
  return (
    <div>
      <h1>Counters that update separately</h1>
      <Button count={count} onClick={handleClick} />
      <Button count={count} onClick={handleClick} />
    </div>
  )
}
```
이렇게 전달하는 정보를 props라고 한다. 이제 App 컴포넌트에는 count State와 이벤트 핸들러가 포함되어 있으며 이 둘을 각각의 버튼에 props로 전달한다.
마지막으로 부모 컴포넌트에 전달한 props를 읽도록 Button을 변경한다.
```jsx
//App.js
import { useState } from 'react';

function Button( {count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Counters that update together</h1>
      <Button count = {count} onClick = {handleClick} />
      <Button count = {count} onClick = {handleClick} />
    </div>
  );
}
```