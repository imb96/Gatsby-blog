---
date: '2022-08-03'
title: 'ReactHook의 개요'
categories: ['React']
summary: 'React 공식 문서의 Hook의 개요'
thumbnail: './react.jpeg'
---
> 리액트 공식문서 (reactjs.org) 읽어보기

# React Hook 개요

Hooks는 React 16.8에 새로 추가되었다.
클래스를 작성하지 않고도 useState 및 React 기능을 사용할 수 있다.

Hooks는 React 개념에 대한 지식을 대체하지 않는다.
대신 Hooks는 React의 props, state, context, refs, lifecycle에 보다 직접적인 API를 제공한다.
Hooks를 사용하면 클래스 없이 React의 기능을 더 많이 사용할 수 있다.

# useState Hook
useState Hook을 사용한 카운터. 버튼을 클릭하면 값 증가.
```js
import React, { useState } from 'react';

function Example() {
  // count state 변수선언
  const [count, setCount] = useState(0);
  return (
	<div>
      <p>You clicked {count} times</p>
        <button onClick={() => setCount(count+1)}>
		  Click me
		</button>
	</div>
  );
}
```
### 여러 state 변수 선언
하나의 컴포넌트에서 State Hook을 여러번 사용 할 수있다.
```js
function ExampleWithManyStates() {
  // 여러개의 state 변수 선언
  const [age, setAge] = useState(25);
  const [fruit, setFruit] = useState('melon');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}
```
배열 구조 분해 할당(array destructuring)을 사용하면 state 변수에 다른 이름을 지정할 수 있다.

### 그래서 hook는 무엇인가?
hook는 함수 컴포넌트에서 react state 및 lifecycle 기능을 연결할 수 있도록 하는 함수(기능)이다.
hook는 클래스 내에서 작동하지 않으며 hook을 사용하면 클래스 없이 react를 사용할 수 있다.
react는 useState 같은 몇가지 내장 hook을 제공하며, 재사용 가능한 고유한 hook을 만들 수도 있다.

## ⚡️Effect Hook
react component에서 데이터를 가져오거나 구독하고, DOM을 수동으로 변경하는 작업을 사이드이펙트 혹인 이펙트 라고 한다.
다른 컴포넌트에 영향을 줄 수 있고 렌더링 중에는 수행할 수 없기 때문이다.
Effect Hook / useEffect는 함수 컴포넌트에서 사이드 이펙트를 수행하는 기능을 추가한다.

```js
import React, { useState, useEffect } fromt 'react';

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount와 componentDidUpdate와 유사하다.
  useEffect(() => {
    // 브라우저 API를 사용하여 문서의 타이틀을 업데이트한다.
    document.title = `you clicked ${count} times `;
});

  return (
	<div>
	  <p>You clicked {count} times</p>
	  <button onClick={() => setCount(count + 1)}>
		Click me
      </button>
	</div>
  );
}
```
useEffect를 호출하면 DOM에 대한 변경 사항을 상기시키고 effect 함수를 실행한다.
Effects는 컴포넌트 안에 선언되었기 때문에 props와 state에 접근할 수 있다.
기본적으로 React는 첫 번째 렌더링을 포함해 매번 렌더링 이후에 effects를 실행한다.

Effect를 해제할 때는 해제하는 함수를 반환시키면 된다.

예를들어 이 컴포넌트는 친구의 로그인 상태를 구독하는 effect를 사용했고, 구독을 해지함으로써 해제한다.
```js
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
	  return () => {
		ChatAPI.unsubscribeToFriendStatus(props.friend.id, handleStatusChange);
	  };
    });

	if (isOnline === null) {
	  return 'Loading...';
    }
	return isOnline ? 'Online' : 'Offline';
  }
```
이 예제에서 컴포턴트가 언마운트될 때 리액트는 ChatAPI에서 구독을 해지할 것이다.
또한 재 렌더링이 일어나 effect를 재실행하기 전에도 구독을 해지한다. (원한다면 props.friend.id가 바뀌지 않았을 때 재구독을 건너뛰도록 설정할 수 있다.)

useState와 마찬가지로 effect도 컴포넌트내에서 여러번 사용할 수 있다.

```js
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
}
```
Hook을 사용하면 구독을 추가하고 제거하는 로직과 같이 서로 관련 있는 코드들을 한군데에 모아서 작성할 수 있다.
반면 class 컴포넌트에는 lifecycle methods 각각에 넣어야만 했다.

## ✌️ Hook 사용 규칙
Hook은 그저 JavaScript 함수지만 두 가지 규칙을 준수해야 한다.
1. 최상위(at the top level)에서만 Hook을 호출해야 한다. 반복문, 조건문, 중첩된 함수내에서 Hook을 실행하면 안된다.
2. React 함수 컴포넌트 내에서만 Hook을 호출해야 한다. 일반 JavaScript 함수에서는 Hook을 호출하면 안된다.

## 💡 나만의 Hook 만들기
Custom Hook은 컴포넌트 트리에 새 컴포넌트를 추가하지 않고도 상태 관련 로직을 컴포넌트 간에 재사용 가능하게 해준다.

친구의 접속 상태를 구독하기 위해서 useState와 useEffect Hook을 사용한 FriendStatus 컴포넌트 예시를 들어보자.
이 로직을 다른 컴포넌트에서도 재 사용하고 싶다는 가정한다.

먼저 이 로직을 useFriendStatus라는 custom Hook으로 뽑아낸다.
```js
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
	ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeToFriendStatus(friendID, handleStatusChange);
    };
  });
  
  return isOnline;
}
```

이 Hook은 friendID를 인자로 받아서 친구의 접속 상태를 반환해준다.
이제 이것을 여러 컴포넌트에서 사용할 수 있다.

```js
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if(isOnline === null) {
	return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
```

```js
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }} >
	  {props.friend.name}
    </li>
  );
}
```

각 컴포넌트의 state는 완전히 독립적이다. Hook은 state 그 자체가 아니라, 상태 관련 로직을 재사용하는 방법이다.
실제로 각각의 Hook 호출은 완전히 독립된 state를 가진다. 그래서 한 컴포넌트 안에서 같은 CUstom Hook을 두 번 쓸 수도 있다.

Custom Hook은 기능보다는 컨벤션에 가깝다. 이름이 use로 시작하고 안에서 다른 Hook을 호출한다면 그 함수를 custom Hook이라고 부를 수 있다. useSomething 이라는 네이밍 컨벤션은 linter 플러그인이 Hook을 인식하고 버그를 찾을 수 있게 해준다.















