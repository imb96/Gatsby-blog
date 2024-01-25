---
date: '2024-01-18'
title: 'React Hooks'
categories: ['react']
summary: 'React에서 자주 사용되는 훅들 파보기'
thumbnail: './til.jpg'
---

함수형 컴포넌트에서 상태를 사용하거나 생명주기 메서드를 대처하는 등의 다양한 작업을 하기위해 **Hook** 이란 것이 추가됐다. 
### useState
함수형 컴포넌트 내부에서 상태를 정의하고 관리할 수 있게 해주는 훅이다. 클로저를 사용함으로써 외부에 해당 값을 노출시키지 않고 오직 리액트에서만 쓸 수 있고 함수형 컴포넌트가 매번 실행되더라도 useState에서 이전의 값을 정확하게 꺼내 쓸 수 있다.

```js
const [count, setCount] = useState(0)
return (
	<>
		<h1>{count}</h1>
		<button onClick={() => setCount(count + 1)}>+</button>
		<button onClick={() => setCount((prev) => prev - 1)}>-</button>
		<button onClick={() => setCount(0)}>reset</button>
	</>
);
```

useState의 인수로는 초기화 값을 넘겨주고 반환값으로 배열을 받는다. 반환받은 배열의 첫 번째 요소는 상태이고, 두 번째 요소는 상태를 변화시키는 set함수이다. 상태를 변화시키기 위해서는 set함수를 사용해야한다.

위 코드에서는 click 이벤트가 발생할 때마다 setCount 함수를 사용하여 count의 상태를 변화시킨다. 첫 번째 버튼의 경우 직접적으로 현재 count에 1을 더하고, 두 번째 버튼의 경우 setCount의 인수로 콜백함수를 넣어주고 콜백함수의 인자로 이전 상태의 값을 받아서 1을 빼주었다.

리액트에서 리렌더링이 일어나는 상황은 여러가지가 있지만 대표적으로 state가 변할 때 리렌더링이 발생한다.
만약 useState를 사용하지 않고 일반 변수의 값을 변화시키면 값은 변화하지만 리렌더링은 발생하지 않는다.

```js
let count = 0;
function handleClick() {
	count += 1;
	console.log(count); // 1,2,3,4...
}

return (
	<>
		<h1>{count}</h1> // count는 최초렌더링에 초기값인 0만 출력된다.
		<button onClick={handleClick}>+</button>
	</>
);

```

useState는 **비동기**적으로 동작한다.

```js
const [count, setCount] = useState(0);

function handleClick() {
	setCount((prev) => prev + 1);
	console.log(count);
}

return (
	<>
		<h1>{count}</h1>
		<button onClick={handleClick}>+</button>
	</>
);
```

위 코드에서 브라우저 화면에서 렌더링되는 count는 의도한대로 0부터 최초렌더링이 되고 버튼을 클릭하면 1씩 증가하면서 리렌더링이 된다. 하지만 console에는 이전의 count 값이 표시된다. 버튼을 5번 클릭하면 화면의 렌더링된 count에서는 5가 출력되지만 console에는 4가 출력되게 된다.

useState는 비동기적으로 동작한다. 보다 정확히는 setState가 비동기적으로 동작한다고 할 수 있다.  
페이지를 구성하는데는 수많은 state가 존재하고 만약 하나하나의 state 변화에 리렌더링을 발생시킨다면 성능 저하가 발생할 것이다.  
이를 해결하기 위해서, React는 batch 처리를 통해 한번에 렌더링을 해서 많은 setState를 연속으로 사용해도 렌더링은 한번만 되는 것이다

일반적으로는 상태값을 초기화 하기위해 useState의 인수로 원시값을 사용하지만, useState의 인수로 특정한 값을 넘기는 함수를 인수로 넣어줄 수 있다. 이를 **게으른 초기화(lazy initialization)** 라고 한다. 

```js
// 일반적인 initialization
const [count, setCount] = useState(
	Number.parseInt(window.localStorage.getItem(key))
);

// lazy initialization
const [count, setCount] = useState(() =>
	Number.parseInt(window.localStorage.getItem(key))
)
```

 useState의 초깃값이 복잡하거나 무거운 연산을 포함하고 있을 때 사용한다. 게으른 초기화 함수는 오로지 state가 처음 만들어질 때만 사용된다. 이후에 리렌더링이 발생되면 이 함수의 실행은 무시된다.

### useEffect
컴포넌트가 렌더링된 후에 어떠한 **부수 효과(Side Effect)** 를 일으키고 싶을 때 사용하는 훅이다.
첫 번째 인수로는 실행할 부수 효과가 포함된 함수, 두 번째 인수로는 의존성 배열을 전달한다.  의존성 배열이 변경될 때마다 useEffect의 첫 번째 인수인 콜백을 실행한다. 

useEffect는 클래스형 컴포넌트의 라이프 사이클 메서드처럼 동작할 수 있다.
- 의존성 배열에 빈 배열을 넣으면 컴포넌트가 마운트 될 때만 실행된다.
- 클린업 함수를 반환할 수 있는데 클린업 함수는 언 마운트 될 때만 실행된다.
  
렌더링을 할 때마다 의존성에 있는 값을 보면서 이 의존성의 값이 이전과 다른 게 하나라도 있으면 부수효과를 실행하는 함수이다. 

```js
const [count, setCount] = useState(0);

function handleClick() {
	setCount((prev) => prev + 1);
}

useEffect(() => {
	window.addEventListener("click", handleClick);

	// 클린업 함수
	return () => {
		window.removeEventListener("click", handleClick);
	};
}, [count]);

return (
	<>
		<h1>{count}</h1>
	</>
);
```

위 코드에서는 첫 번째 마운트 될 때 window에 click 이벤트를 추가하고 다음 렌더링이 발생할 때는 콜백함수를 실행하기 전에 먼저 클린업 함수를 실행하여 window에 click 이벤트를 제거하고 콜백함수를 실행한다. 이렇게 함으로써 특정 이벤트 핸들러가 무한히 추가되는 것을 방지할 수 있다.

**클린업 함수**는 새로운 값을 기반으로 렌더링 뒤에 실행되지만 이 변경된 값을 읽는 것이 아니라 함수가 정의됐을 당시에 선언됐던 이전 값을 보고 실행된다는 것이다. useEffect는 콜백이 실행될 때마다 이전의 클린업 함수가 존재한다면 그 클린업 함수를 실행한 뒤에 콜백을 실행한다. 함수형 컴포넌트가 리렌더링됐을 때 의존성 변화가 있었을 당시 이전의 값을 기준으로 실행되는, 말 그대로 이전 상태를 청소해 주는 개념이다.

**의존성 배열**에 빈 배열을 두면 리액트가 이 useEffect는 비교할 의존성이 없다고 판단해 최초 렌더링 직후에 실행된 다음부터는 더 이상 실행되지 않는다. 아무런 값도 넘겨주지 않으면 의존성을 비교할 필요 없이 렌더링할 때마다 실행이 필요하다고 판단해 렌더링이 발생할 때마다 실행된다.

참고로, 개발환경에서 useEffect를 사용하면 useEffect가 두 번 실행되는 것을 볼 수 있다. 이는 strict mode로 인한것인데, 개발 환경에서 strict mode를 사용하게 되면, 컴포넌트를 unmount 시켰다가 다시 mount 시킨다. strict mode는 개발환경에서 잠재적인 버그를 찾게 해주는 모드라고 생각할 수 있다. 프로덕션으로 배포하게 되면 strict mode는 무시된다.
### useMemo
비용이 큰 연산에 대한 결과를 **메모이제이션**해 두고, 이 저장된 값을 반환하는 훅이다.

```js
const memoizedValue = useMemo(() => expensiveComputation(a,b), [a,b])
```

첫 번째 인수로는 어떠한 값을 반환하는 함수를, 두 번째 인수로는 해당 함수가 의존하는 값의 배열에 전달한다. 
useMemo는 렌더링 발생 시 의존성 배열의 값이 변경되지 않았으면 함수를 재실행하지 않고 이전에 기억해 둔 해당 값을 반환하고, 의존성 배열의 값이 변경되었다면 첫 번째 인수의 함수를 실행한 후에 그 값을 반환하고 그 값을 다시 기억해둔다.

### useCallback
인수로 넘겨받은 콜백 자체를 기억한다. 쉽게 말해 특정 함수를 새로 만들지 않고 재사용한다는 의미다.  
함수의 첫 번째 인수로 함수를, 두 번째 인수로 의존성 배열을 넣으면 의존성 배열이 변경되지 않는 한 함수를 재생성하지 않는다.  
useMemo와 useCallback의 유일한 차이점은 메모이제이션 하는 대상이 변수냐 함수이냐의 차이뿐이며, useMemo를 사용해 useCallback을 구현할 수 있다.

```js
const handleClick = useCallback(() => {
	setCount((prev) => prev + 1)
},[])

const handleClick = useMemo(() => {
	return() => setCount((prev) => prev + 1)
})
```

자바스크립트에서는 함수도 값으로 사용되기 때문에 useMemo로도 함수를 메모이제이션할 수 있지만 불필요하게 코드가 길어지고 혼동을 줄 수 있으므로 별도로 제공되는 것으로 추측된다.

### useRef
useState와 동일하게 컴포넌트 내부에서 렌더링이 일어나도 변경 가능한 상태값을 저장한다는 공통점이 있다.
차이점으로는 크게 두가지가 있다.
- useRef는 반환값인 객체 내부에 있는 current로 값에 접근 또는 변경 할 수 있다.
- useRef는 값이 변하더라도 렌더링을 발생시키지 않는다.

useRef는 컴포넌트가 렌더링될 때만 생성되며, 컴포넌트 인스턴스가 여러 개라도 각각 별개의 값을 바라본다.
일반적으로 DOM에 접근할 때 사용한다.

```js
function RefComponent() {
	const inputRef = useRef()

	console.log(inputRef.current) // undefined

	useEffect(() => {
		console.log(inputRef.current); // <input type="number">
	}, [inputRef])

	return <input ref={inputRef} type="number"/>
}
```

useRef를 사용할 수 있는 유용한 경우는 렌더링을 발생시키지 않고 원하는 상태값을 저장할 수 있다는 특징을 활용해 개발자가 원하는 시점의 값을 렌더링에 영향을 미치지 않고 보관해 두고 싶다면 사용하는 것이 좋다.

### useContext
context란 props drilling을 해결하기 위해 등장한 개념이다. props 전달 없이도 선언한 하위 컴포넌트 모두에서 자유롭게 원하는 값을 사용할 수 있다.

여기서 props drilling이란 컴포넌트가 여러번 중첩되어 있을 때, 부모 컴포넌트에서 자식 컴포넌트로 컴포넌트리에서 여러 단계를 거쳐야 하는 것을 의미한다. 여러 컴포넌트를 거치면서 데이터를 전달하는 것이기 때문에, 앱이 복잡해질수록 관리가 어려워질 수 있다.

useContext는 다음과 같이 사용할 수 있다.
```js
const Context = createContext();

function ParentComponent() {
	return (
			<>
				<Context.Provider value={{ hello: "react" }}>
					<Context.Provider value={{ hello: "javascript" }}>
						<ChildComponent />
					</Context.Provider>
				</Context.Provider>
			</>

	);
}

function ChildComponent() {
	const value = useContext(Context);
	return <>{value ? value.hello : ""}</>;
}

function App() {
	return <ParentComponent />; // javascript
}
```

useContext는 상위 컴포넌트에서 만들어진 Context를 함수형 컴포넌트에서 사용할 수 있게 만들어진 훅이다.
useContext를 사용하면 상위 컴포넌트 어딘가에서 <Context.provider />에서 제공한 값을 사용할 수 있게 된다. 만약 여러개의 provider가 있다면 가장 가까운 provider의 값을 가져온다.

useContext를 사용하면 provider에 의존성을 가진 셈이 되므로 아무데서나 컴포넌트를 재활용하는 것이 어려워진다.

리액트의 context와 useContext를 상태 관리를 위한 리액트의 APi로 오해할 수 있지만 엄밀히 따지면 context는 상태를 주입해주는 API이다. 상태 관리 라이브러리가 되기 위해서는 최소한 다음 두 가지 조건을 만족해야 한다.

1. 어떠한 상태를 기반으로 다른 상태를 만들어 낼 수 있어야 한다.
2. 필요에 따라 이러한 상태 변화를 최적화할 수 있어야 한다.

그러나 context는 한가지도 만족하지 못한다. 단순히 props 값을 하위로 전달해 줄 뿐, 렌더링이 최적화 되지는 않는다.

### useReducer
useState Hook의 심화 버전으로 볼 수 있다. useState와 비슷한 형태를 띄지만 좀 더 복잡한 상태값을 미리 정의해 놓은 시나리오에 따라 관리할 수 있다.

```js
function reducer(state, action) {...}

function Component() {
	const [state, dispatch] = useReducer(reducer, { count: 0 })
}
```

useReducer에서 사용되는 용어
- 반환 값은 useState와 동일하게 길이가 2인 배열이다.
	- **state**: 현재 useReducer가 현재 가지고 있는 상태이다. useState와 마찬가지로 배열을 반환하는데 동일하게 첫 번째 요소가 이 값이고 처음에 제공한 초기상태로 설정된다.
	- **dispatcher**: state를 업데이트 하는 함수. useReducer가 반환하는 배열의 두 번째 요소다. setState는 단순히 값을 넘겨주지만 여기서는 action을 넘겨준다는 점이 다르다. 이 action은 state를 변경할 수 있는 액션을 의미한다.

- useState의 인수와 달리 2개에서 3개의 인수를 필요로 한다.
	- **reducer**: useReducer의 기본 action을 정의하는 함수다. 이 reducer는 useReducer의 첫 번째 인수로 넘겨주어야 한다.
	- **initialState**: 두 번째 인수로, useReducer의 초깃값을 의미한다.
	- **init(option)**: 인수로 함수를 넘겨줄 때처럼 초깃값을 지연해서 생성시키고 싶을 때 사용하는 함수다. 만약 여기에 인수로 넘겨주는 함수가 존재한다면 useState와 동일하게 게으른 초기화가 일어나며 initialState를 인수로 init 함수가 실행된다.

<br/>

```ts
import { useReducer } from "react";

type State = {
	count: number;
};

type Action = {
	type: "up" | "down" | "reset";
	payload?: State;
};

function init(count: State): State {
	return count;
}

const initialState: State = { count: 0 };

function reducer(state: State, action: Action): State {
	switch (action.type) {
		case "up":
			return { count: state.count + 1 };
		case "down":
			return { count: state.count - 1 };
		case "reset":
			return init(action.payload || { count: 0 });
		default:
			throw new Error(`Unexpected action type ${action.type}`);
	}
}

export default function App() {
	const [state, dispatcher] = useReducer(reducer, initialState, init);
	
	function handleUpButtonClick() {
		dispatcher({ type: "up" });
	}

	function handleDownButtonClick() {
		dispatcher({ type: "down" });
	}

	function handleResetButtonClick() {
		dispatcher({ type: "reset", payload: { count: 0 } });
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<h1>{state.count}</h1>
			<button onClick={handleUpButtonClick}>+</button>
			<button onClick={handleDownButtonClick}>-</button>
			<button onClick={handleResetButtonClick}>reset</button>
		</main>
	);
}
```

언뜻 복잡해 보이지만 useReducer의 목적은 간단하다. 복잡한 형태의 state를 사전에 정의된 dispatch로만 수정할 수 있게 만들어 줌으로써 state 값에 대한 접근은 컴포넌트에서만 가능하게 하고, 이를 업데이트하는 방법에 대한 상세 정의는 컴포넌트 밖에다 둔 다음, state의 업데이트를 미리 정의해 둔 dispatcher로만 제한하는 것이다. state 값을 변경하는 시나리오를 제한적으로 두고 이에 대한 변경을 빠르게 확인할 수 있게끔 하는 것이 useReducer의 목적이다.

useReducer나 useState 둘 다 세부 작동과 쓰임에만 차이가 있을 뿐, 결국 클로저를 활용해 값을 가둬서 state를 관리한다는 사실에는 변함이 없다.

### useImperativeHandle
부모에게서 넘겨받은 ref를 원하는 대로 수정할 수 있는 훅이다.  
useImperativeHandle을 이해하기 위해 `forwardRef`를 먼저 알아보자.  

ref는 useRef에서 반환한 객체로, 리액트 컴포넌트의 props인 ref에 넣어 HTMLElement에 접근하는 용도로 흔히 사용된다. key와 마찬가지로 ref도 리액트에서 컴포넌트의 props로 사용할 수 있는 예약어이다.

만약 ref를 상위 컴포넌트에서 하위 컴포넌트로 전달하고 싶다면 어떻게 해야할까?
단순히 알고있는 ref와 props에 대한 상식으로 본다면 이렇게 할 수 있다.

```js
function ChildComponent({ ref }) {
	useEffect(() => {
		console.log(ref);
	}, [ref])

	return <div>안녕!</div>
}

function ParentComponent() {
	const inputRef = useRef();

	return (
		<>
			<input ref={inputRef} />
			{/* `ref` is not a prop... */}
			<ChildComponent ref={inputRef} />
		</>
	)
}
```

리액트에서는 ref를 props로 쓸 수 없고 접근을 시도할 경우 undefined를 반환한다고 경고메시지를 출력한다.
지정된 예약어인 ref 대신 다른 이름을 사용한다면 정상적으로 작동한다.

```js
function ChildComponent({ parentRef }) {
	useEffect(() => {
		console.log(parentRef);
	}, [parentRef]);

	return <div>안뇽!</div>;
}

function ParentComponent() {
	const inputRef = useRef();
	return (
		<>
			<input ref={inputRef} />
			<ChildComponent parentRef={inputRef} />
		</>
	);
}
```

forwardRef는 위의 코드와 동일한 작업을 하는 리액트 API다. 그럼에도 forwardRef가 탄생한 배경은 ref를 전달하는 데 있어서 일관성을 제공하기 위해서다. 어떤 props 명으로 전달할지 모르고, 이에 대한 완전한 네이밍의 자유가 주어진 props보다는 forwardRef를 사용하면 좀 더 확실하게 ref를 전달할 것임을 예측할 수 있고, 또 사용하는 쪽에서도 확실히 안정적으로 받아서 사용할 수 있다.

```js
const ChildComponent = forwardRef((props, ref) => {
	useEffect(() => {
		console.log(ref);
	});
	
	return <div>안뇽!</div>;
});

function ParentComponent() {
	const inputRef = useRef();
	return (
		<>
			<input ref={inputRef} />
			<ChildComponent ref={inputRef} />
		</>
	);
}
```

먼저 ref를 받고자 하는 컴포넌트를 forwardRef로 감싸고, 두 번째 인수로 ref를 전달받는다. 그리고 부모 컴포넌트에서 props.ref를 통해 ref를 전달해주면 된다. 이렇게 forwardRef를 사용해서 ref를 props로 전달할 수 있고, 전달받은 컴포넌트에서도 ref라는 이름을 그대로 사용할 수 있다.

useImperativeHandle은 부모에게서 넘겨받은 ref를 원하는 대로 수정할 수 있는 훅이다.

```js
const Input = forwardRef((props, ref) => {
	useImperativeHandle(
		ref,
		() => ({
			alert: () => alert(props.value),
		}),
		[props.value]
	);
	
	return <input ref={ref} {...props} />;
});

function App() {
	const inputRef = useRef();
	const [text, setText] = useState("");

	function handleClick() {
		inputRef.current.alert();
	}
	
	function handleChange(e) {
		setText(e.target.value);
	}
	
	return (
		<>
			<Input ref={inputRef} value={text} onChange={handleChange} />
			<button onClick={handleClick}>Focus</button>
		</>
	);
}
```

원래 ref는 {current: <HTMLElement>}와 같은 형태로 HTMLElement만 주입할 수 있는 객체였다. 그러나 여기서는 절답다은 ref에다 useImperativeHandle 훅을 사용해 추가적인 동작을 정의했다. 이로써 부모는 단순히 HTMLElement 뿐만 아니라 자식 컴포넌트에서 새롭게 설정한 객체의 키와 값에 대해서도 접근할 수 있게 됐다. useImperativeHandle을 사용하면 이 ref의 값에 원하는 값이나 액션을 정의할 수 있다.

### useLayoutEffect
공식문서에서는 다음과 같이 정의하고 있다.
> 이 함수의 시그너치는 useEffect와 동일하나, 모든 DOM의 변경 후에 동기적으로 발생한다.
<br />


```js
function App() {
	const [count, setCount] = useState(0);
	
	useEffect(() => {
		console.log("useEffect", count);
	}, [count]);

	useLayoutEffect(() => {
		console.log("useLayoutEffect", count);
	}, [count]);

	function handleClick() {
		setCount(count + 1);
	}

	return (
		<>
			<h1>{count}</h1>
			<button onClick={handleClick}>+</button>
		</>
	);
}
```

useLayoutEffect를 이해하기 위한 중요한 사실은 모든 DOM의 변경 후에 useLayoutEffect의 콜백 함수 실행이 동기적으로 발생한다는 점이다. 여기서 말하는 DOM 변경이란 렌더링이지, 브라우저에 실제로 해당 변경 사항이 반영되는 시점을 의미하는 것은 아니다. 즉, 실행 순서는 다음과 같다.
1. 리액트가 DOM을 업데이트
2. useLayoutEffect를 실행
3. 브라우저에 변경 사항을 반영
4. useEffect를 실행

이는 위 코드의 실행결과로도 알 수 있다시피 순서상으로는 useEffect가 먼저 선언돼 있지만 useLayoutEffect가 먼저 실행된다. 이는 useLayoutEffect가 브라우저에 변경 사항이 반영되기 전에 실행되는 반면 useEffect는 브라우저에 변경 사항이 반영된 이후에 실행되기 때문이다.

그리고 동기적으로 발생한다는 것은 리액트의 useLayoutEffect의 실행이 종료될 때까지 기다린 다음에 화면을 그린다는 것을 의미한다.즉, 리액트 컴포넌트는 useLayoutEffect가 완료될 때까지 기다리기 때문에 컴포넌트가 잠시 일시 중지되는 것과 같은 일이 발생하게 된다.

useLayoutEffect의 특징상 DOM은 계산됐지만 이것이 화면에 반영되기 전에 하고 싶은 작업이 있을 때와 같이 반드시 필요할 때만 사용하는 것이 좋다. 특정 요소에 따라 DOM 요소를 기반으로 한 애니메이션, 스크롤 위치를 제어하는 등 화면에 반영되기 전에 하고 싶은 작업에 useLayoutEffect를 사용한다면 useEffect를 사용했을 때보다 더 자연스러운 사용자 경험을 제공할 수 있다.

### useDebugValue
일반적으로 프로덕션 웹 서비스에서 사용하는 훅이 아닌 개발하는 과정에서 사용되는데, 디버깅하고 싶은 정보를 이 훅에다 사용하면 리액트 개발자 도구에서 볼 수 있다.

```js
function useDate() {
	const date = new Date();
	useDebugValue(date, (date) => `현재 시간: ${date.toISOString()}`);
	return date;
```

### Rules Of Hooks
리액트에서 제공하는 훅은 사용하는 데에 몇가지 규칙이있다.
1. 최상위에서만 훅을 호출해야 한다. 반복문이나 조건문, 중첩된 함수 내에서 훅을 실행할 수 없다. 이 규칙을 따라야만 컴포넌트가 렌더링될 때마다 항상 동일한 순서로 훅이 호출되는 것을 보장할 수 있다.
2. 훅을 호출할 수 있는 것은 리액트 함수형 컴포넌트, 혹은 사용자 정의 훅의 두 가지 경우뿐이다. 일반 자바스크립트 함수에서는 훅을 사용할 수 없다.

이 규칙은 어떤의미를 가지고 있을지 알아보자.

훅에 대한 정보는 리액트 어딘가에 있는 index와 같은 키를 기반으로 구현되어 있다. (객체 기반 링크드 리스트)
즉, useState나 useEffect는 모두 순서에 영향을 받는다.

```js
function Component() {
	const [count, setCount] = useState(0)
	const [required, setRequired] = useState(false)

	useEffect(() => {
		// do something...
	}, [count, required])
}
```

위 컴포넌트는 파이버에서 다음과 같이 저장된다.
```js
memoizedState: 0, // setCount
baseState: 0,
queue: {...},
baseUpdate: null,
next: { // setRequired
	memoizedState: false,
	baseState: false,
	queue: {...}
	baseUpdate: null,
	next: { // useEffect
		memoizedState: {
			tag: 192,
			create: () => {},
			destroy: undefined,
			depth: [0, false],
			next: {...}
		},
		baseState: null,
		queue: null,
		baseUpdate: null
	}
}
```

코드에서 볼 수 있듯이 리액트 훅은 파이버 객체의 링크드 리스트의 호출 순서에 따라 저장된다. 그 이유는 각 훅이 파이버 객체 내에서 순서에 의존해 state나 effect의 결과에 대한 값을 저장하고 있기 때문이다. 이렇게 고정된 순서에 의존해 훅과 관련된 정보를 저장함으로써 이전 값에 대한 비교와 실행이 가능해진다.

그러므로 훅은 절대 조건문, 반복문 등에 의해 리액트에서 예측 불가능한 순서로 실행되게 해서는 안된다. 훅은 실행 순서를 보장받을 수 있는 컴포넌트 최상단에 선언돼 있어야 한다. 조건문이 필요하다면 훅 내부에서 수행해야 한다.

> 참고  
> https://react.dev/  
> 모던 리액트 딥 다이브