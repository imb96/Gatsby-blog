---
date: '2022-09-20'
title: 'Hooks'
categories: ['React']
summary: 'Hooks'
thumbnail: './react.jpeg'
---

> 리액트 다루는 기술을 읽고 정리한 내용입니다.

# Hooks

### useState

함수 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해주며 만약 함수 컴포넌트에서 상태를 관리해야 한다면 useState Hook을 사용하면 된다.

```jsx
import React, { useState } from 'react'
const Counter = () => {
	const [value, setValue] = useState(0);
}
return(
	<div>
		<p>
			현재 카운터 값은 <b>{value}<b> 입니다.
		</p>
		<button onClick={setValue(value + 1)}>+1</button>
		<button onClick={setValue(value - 1)}>-1</button>
	</div>
)
```

하나의 useState 함수는 하나의 상태 값만 관리할 수 있다. 관리해야 할 상태가 여러개라면 useState를 여러번 사용하면 된다.

### useEffect

리액트 컴포넌트가 렌더링될때마다 특정 작업을 수행하도록 설정할 수 있다. 클래스형 컴포넌트의 componentDidMount와 componentDidUpdate를 합친 형태로 보아도 무방하다.

useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 빈 배열을 넣어주면 된다.

```jsx
useEffect(() => {
  console.log('마운트될 때만 실행된다.')
}, [])
```

useEffect를 사용할 때, 특정 값이 변경될 때만 호출하고 싶을때는 useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값을 넣어 주면 된다.

```jsx
useEffect(() => {
  console.log(name)
}, [name])
```

배열 안에는 useState를 통해 관리하고 있는 상태를 넣어 주어도 되고, props로 전달받은 값을 넣어 주어도 된다.

useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며, 두 번째 파라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라진다.

컴포넌트가 언마운트되기 전이나 업데이트 되기 직전에 어떠한 작업을 수행하고 싶다면 useEffect에서 뒷정리(cleanup) 함수를 반환해 주어야한다.

```jsx
useEffect(() => {
  console.log('effect')
  console.log(name)
  return () => {
    console.log('cleanup')
    console.log(name)
  }
}, [name])
```

렌더링될 때마다 뒷정리 함수가 호출되며 업데이트되기 직전의 값을 보여준다.

오직 언마운트될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수의 두 번째 파라미터에 빈 배열을 넣으면 된다.

```jsx
useEffect(() => {
  console.log('effect')
  return () => {
    console.log('unmount')
  }
}, [])
```

### useReducer

useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook. 리듀서는 현재 상태, 업데이트를 위해 필요한 정보를 담은 액션(action)값을 전달받아 새로운 상태를 반환하는 함수. 리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜 주어야 한다.

```jsx
function reducer(state, action) {
	return {...}; // 불변성을 지키면서 업데이트한 새로운 상태를 반환
}
```

액션 값은 주로 다음과 같은 형태로 이루어져 있다.

```jsx
{
	type: 'INCREMENT',
	// 다른 값들이 필요하다면 추가로 들어감
}
```

리덕스에서 사용하는 액션 객체에는 어떤 액션인지 알려 주는 type 필드가 꼭 있어야 하지만, useReducer에서 사용하는 액션 객체는 반드시 type을 지닐필요가 없다. 객체가 아니라 문자열이나 숫자여도 상관없다.

```jsx
import React, { useReducer } from 'react'

function reducer(state, action) {
  // action.type에 따라 다른 작업 수행
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 }
    case 'DECREMENT':
      return { value: state.value - 1 }
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 })
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b> 입니다.
      </p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
    </div>
  )
}

export default Counter
```

useReducer의 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어 준다. 이 Hook을 사용하면 state 값과 dispatch 함수를 받아 오는데 여기서 state는 현재 가리키고 있는 상태고, dispatch는 액션을 발생 시키는 함수이다. dispatch(action)과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조이다.

useReducer를 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 것이다.

## useMemo

함수 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있다. useMemo를 사용하면 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식이다.

```jsx
import React, { useState, useMemo } from 'react'

const getAverage = numbers => {
  console.log('평균값 계산 중...')
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((a, b) => a + b)
  return sum / numbers.length
}

const Average = () => {
  const [list, setList] = useState([])
  const [number, setNumber] = useState('')

  const onChange = e => {
    setNumber(e.target.value)
  }

  const onInsert = e => {
    const nextList = list.concat(parseInt(number))
    setList(nextList)
    setNumber('')
  }
  const avg = useMemo(() => getAverage(list), [list])
  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값: </b> {avg}
      </div>
    </div>
  )
}
export default Average
```

list 배열의 내용이 바뀔 때만 getAverage 함수가 호출된다.

## useCallback

useMemo와 상당히 비슷한 함수. 주로 렌더링 성능을 최적화해야 하는 상황에서 사용한다. 이 Hook을 사용하면 만들어 놨던 함수를 재사용할 수 있다. 위 의 Average 컴포넌트에서 onChange 와 onInsert 함수는 컴포넌트가 리렌더링될 때마다 새로 만들어진 함수를 사용하게 된다. 대부분의 경우 문제없지만 컴포넌트의 렌더링이 자주 발생하거나 렌더링해야 할 컴포넌트의 개수가 많아지면 이 부분을 최적화해 주는 것이 좋다.

```jsx
import React, { useState, useMemo, useCallback } from 'react'

const getAverage = numbers => {
  console.log('평균값 계산 중...')
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((a, b) => a + b)
  return sum / numbers.length
}

const Average = () => {
  const [list, setList] = useState([])
  const [number, setNumber] = useState('')

  const onChange = useCallback(e => {
    setNumber(e.target.value)
  }, []) // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(
    e => {
      const nextList = list.concat(parseInt(number))
      setList(nextList)
      setNumber('')
    },
    [number, list],
  ) // number 혹은 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list])

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값: </b> {avg}
      </div>
    </div>
  )
}
export default Average
```

useCallback의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 배열을 넣으면 된다. 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 한다. onChange 처럼 빈 배열을 넣게 되면 컴포넌트가 렌더링될 때 만들었던 함수를 계속해서 재사용하게 되며, onInsert 처럼 배열 안에 number와 list를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때 새로 만들어진 함수를 사용하게 된다.

함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜 주어야 합니다. 예를 들어 onChange의 경우 기존의 값을 조회하지 않고 바로 설정만 하기 때문에 배열이 비어 있어도 상관없지만, onInsert는 기존의 number와 list를 조회해서 nextList를 생성하기 때문에 배열 안에 number와 list를 꼭 넣어 주어야 한다.

## useRef

함수 컴포넌트에서 ref 를 쉽게 사용할 수 있도록 해준다. Average 컴포넌트에서 **등록** 버튼을 눌렀을 때 포커스가 인풋 쪽으로 넘어가도록 코드를 작성해 보자.

> ref : HTML에서 id를 사용하여 DOM에 이름을 다는 것처럼 리액트 프로젝트 내부에서 DOM에 이름을 다는 방법 혹은 개념. (reference의 줄임말)

```jsx
import React, { useState, useMemo, useCallback, useRef } from 'react'

const getAverage = numbers => {
  console.log('평균값 계산 중...')
  if (numbers.length === 0) return 0
  const sum = numbers.reduce((a, b) => a + b)
  return sum / numbers.length
}

const Average = () => {
  const [list, setList] = useState([])
  const [number, setNumber] = useState('')
  const inputEl = useRef(null)

  const onChange = useCallback(e => {
    setNumber(e.target.value)
  }, []) // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(
    e => {
      const nextList = list.concat(parseInt(number))
      setList(nextList)
      setNumber('')
      inputEl.current.focus()
    },
    [number, list],
  ) // number 혹은 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list])

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값: </b> {avg}
      </div>
    </div>
  )
}
export default Average
```

useRef를 사용하여 ref를 설정하면 useRef를 통해 만든 객체 안의 current 값이 실제 엘리먼트를 가리킨다.

추가로 컴포넌트 로컬 변수를 사용해야 할 때도 useRef를 활용할 수 있다. 여기서 로컬 변수란 렌더링과 상관없이 바뀔 수 있는 값을 의미한다.

```jsx
import React, { useRef } from 'react'

const RefSample = () => {
  const id = useRef(1)
  const setId = n => {
    id.current = n
  }
  const printId = () => {
    console.log(id.current)
  }
  return <div>RefSample</div>
}
export default RefSample
```

이렇게 ref 안의 값이 바뀌어도 컴포넌트가 렌더링되지 않는다는 점에는 주의해야 한다. 렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식을 사용하자.

## Custom Hooks

여러 컴포넌트에서 비슷한 기능을 공유할 경우, 이를 Hook으로 작성하여 로직을 재사용할 수 있다.

## 정리

리액트에서 Hooks 패턴을 사용하면 클래스형 컴포넌트를 작성하지 않고도 대부분의 기능을 구현할 수 있다. 이러한 기능이 리액트에 릴리즈되었다고 해서 기존의 setState를 사용하는 방식이 잘못된 것은 아니다.

리액트 매뉴얼에서 새로 작성하는 컴포넌트의 경우 함수 컴포넌트와 hooks를 사용할 것을 권장하고 있다.
