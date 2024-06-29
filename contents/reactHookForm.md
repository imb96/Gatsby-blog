---
date: '2024-01-14'
title: 'React-Hook-Form으로 폼 관리하기'
categories: ['React']
summary: '리액트 훅 폼 미쳤다'
thumbnail: './til.jpg'
---
### React-Hook-Form을 사용한 이유 
사소하게는 폼을 제출할 때 자동으로 발생되는 새로고침을 막기위해 당연한 듯이 작성하게 되는 event.preventDefault() 같은 보일러 플레이트를 사용하지 않을 수 있는 것 부터 관리해야할 상태코드를 줄일 수 있고 폼 작성을 위한 여러 기능들을 제공하고 **비제어 컴포넌트** 로 작성할 수 있으며 보다 선언적으로 코드를 작성할 수 있다.

제어 컴포넌트와 비제어 컴포넌트는 무엇일까?
제어 컴포넌트는 일반적인 리액트 컴포넌트라고 할 수 있다. 사용자의 입력을 기반으로 자신의 state를 관리하고 업데이트 하는 컴포넌트이다. state를 기반으로 하기 때문에 사용자가 입력을 할 때마다 리렌더링을 발생시킨다.
비제어 컴포넌트는 리액트에 의해 값이 제어되지 않는 컴포넌트이다. state를 사용하지 않는 컴포넌트이다. state를 사용하지 않기 때문에 사용자가 직접 트리거하지 않는 이상 리렌더링을 발생시키지 않는다.

일반적으로 폼을 관리할 때는 어떻게 할 수 있을까? `state`를 사용하거나 `ref`를 사용할 수 있다.

state 사용:
```js
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (e) => {
  e.preventDefault();
}

return (
  <form onSubmit={handleSubmit}>
    <input name="input1" onChange={(e) => setInput1(e.target.value)} />
    <input name="input2" onChange={(e) => setInput2(e.target.value)} />
    <button type="submit"></button>
  </form>
)
```

ref 사용:
```js
const emailRef = useRef(null);
const passwordRef = useRef(null);

const handleSubmit = (e) => {
    e.preventDefault();
}

return (
  <form onSubmit={handleSubmit}>
    <input name="input1" ref={input1} />
    <input name="input2" ref={input2} />
    <button type="submit"></button>
  </form>
)
```

두 폼의 차이는 무엇이 있을까? 일반적으로 말하면, 입력값이 컴포넌트 상태에 의존적이고, 해당 값에 기반한 동적인 UI 업데이트가 필요하다면 state를 사용하는 것이 더 적절할 것이다. 그러나 간단한 폼이나 데이터가 비교적 단순하고, 상태에 의존하지 않는 경우에는 ref를 사용하면 입력이 될 때마다 리렌더링을 발생시키지 않을 수도 있다.

react-hook-form을 사용하면 다음과 같이 작성할 수 있다:

```js
const { register, handleSubmit } = useForm();
const onSubmit = handleSubmit((data) => {});

return (
  <form onSubmit={onSubmit}>
    <input {...register("email")} />
    <input {...register("password")} />
    <button type="submit">Submit</button>
  </form>
)
```

`register` 라는 함수의 첫 번째 인수로 input의 name을 지정해주면 react-hook-form 에서 name키에 입력값을 저장해준다.
두 번째 인수로는 required, minLength, pattern, validate 등 여러가지 유효성 검사를 위한 options를 지정해 줄 수 있다. register 함수의 내부동작은 ref를 사용한다.

useForm 함수에서 `handleSubmit` 함수를 받아와서 폼을 제출할 때 실행시킬 함수를 감싸준다. 이렇게 하면 함수의 첫번째 인자로 폼이 제출될 때 폼 데이터를 객체 형태로 받을 수 있다.

register 함수의 두 번째 인수로 **유효성 검사** 를 위한 여러가지 options를 지정해 줄 수 있다.

```js
const { register, handleSubmit, formState: { errors }} = useForm();
const onSubmit = handleSubmit((data) => {});

return (
  <form onSubmit={onSubmit}>
    <input {...register("firstName", { required: true, maxLength: 20 })} />
    {errors.firstName && <div>성은 20자를 넘을 수 없습니다.</div>}
    <input
      {...register("lastName", { required: true, pattern: /^[A-Za-z]+$/i/ })} />
    <input type="number" {...register("age", { min: 18, max: 99 })} />
    <button type="submit">Submit</button>
  </form>
)
```

입력이 필수인지 지정해주는 required 속성과 함께 정규식 표현도 사용할 수있다. 원한다면 useForm으로 부터 formState를 받아와서 각 입력요소에서 유효성검사를 만족하지 못할때 에러처리를 할 수도 있다.

물론 폼이 제출되기 전에도 input값에 접근할 수 있다.

```js
const { watch, getValues } = useForm();
const emailWatch = watch("email");
const email = getValues("email");
```

`watch`라는 함수의 인자로 input의 name을 넣어주면 입력할 때마다 동기화된 input값을 얻을 수 있다. 혹은
<br/>
`getValues` 함수의 인자로 input의 name을 넣어주면 입력되어있는 input값을 얻을 수 있다.

경우에 따라서 form에서 사용하는 input을 컴포넌트로 분리하여 재사용하고 싶을 수 있다. 이럴 땐 input 컴포넌트에 props로 register를 넘겨주면 된다. 예를 들면 이렇게 작성 할 수도있다.

```js
export const Input = ({ register, name }) => {
  return <input {...register(name)} />;
};
```

사용할 때는 이런식으로 사용한다.

```js
import { Input } './components'

const { register } = useForm();

return (
  <form>
    <Input register={register} name={'nickname'}/>
  </form>
)
```

만약 Input 컴포넌트가 다른 컴포넌트의 부모자식으로 사용되어야 할 경우, 컴포넌트가 중첩이 되었을 경우에는 어떻게 해야할까

```js
const { register, handleSubmit } = useForm();

<form onSubmit={onSubmit}>
  <Component register={ register } name={"nickname"} />
  <button type="submit">Submit</button>
</form>
```

```js
import { NestedInput } from "./NestedInput";
export const Component = ({ register, name }) => {
  return (
    <NestedInput register={ register } name={ name } />;
  )
};
```

```js
export const NestedInput = ({ register, name }) => {
  return <input {...register(name)} />;
};
```


이런식으로 props를 여러번 자식컴포넌트에게 전달해줘야 할 것이고 중첩된 컴포넌트가 많을 수록 props drilling이 일어날 것이다. 이러한 문제는 `FormProvider`와 `useFormContext` 훅을 사용하여 해결할 수 있다.

```js
const methods = useForm();
const onSubmit = methods.handleSubmit(() => {});

return (
  <FormProvider {...methods}>
    <form onSubmit={onSubmit}>
      <NestedInput />
      <button type="submit">Submit</button>
    </form>
  </FormProvider>
);
```

```js
import { useFormContext } from "react-hook-form";

export const NestedInput = () => {
  const { register } = useFormContext();
  return <input {...register("nickname")} />;
};

```

추가적으로, react-hook-form에서는 devtools를 제공한다. form 데이터를 콘솔에 출력해보면서 확인할 수도 있지만 매번 확인하는 것 보다 react-hook-form에서 사용하는 devtools를 사용하여 간편하게 폼 데이터를 추적할 수 있다.

```shell
npm i -D @hookform/devtools
```

```js
import { DevTool } from "@hookform/devtools";

const { control } = useForm();
return (
  <form>
    <Devtool control = {control} />
  </form>
)
```

다음과 같이 devtool을 설치하고 DevTool이라는 컴포넌트를 선언해주고 control을 지정해주면 사용할 수 있다.
control을 지정해준 폼이 있는 페이지에 가게 되면 우측 상단에 react-hook-form 뱃지가 생기며 혹은 hook-form-extension을 설치해서 확장 프로그램으로도 form 데이터를 확인할 수 있다.

다만, DevTool을 사용하는 코드를 배포를 진행할경우 주의해야한다. 빌드 환경에 따라 DevTool이 배포된 production에도 포함 될 수도 있다.

관련 issue: https://github.com/react-hook-form/devtools/issues/175
