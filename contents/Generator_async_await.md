---
date: '2022-07-15'
title: 'Generator_async_await'
categories: ['JS']
summary: '제네레이터와 async, await 에 대해'
thumbnail: './DeepDive.png'
---
> JavaScrpitDeepDive를 읽고 정리한 글입니다.

# 제네레이터와 async/await
## 제네레이터란?
ES6에서 도입된 제네레이터(generator)는 코드블록의 실행을 일시 중지했다가 필요할 시점에 재개할 수 있는 특수한 함수다. 제네레이터와 일반 함수의 차이는 다음과 같다.

1. 제네레이터 함수는 함수 호출자에게 함수 실행의 제어권을 양도할 수 있다.
일반 함수를 호출하면 제어권이 함수에게 넘어가고 함수 코드를 일괄 실행한다. 즉, 함수 호출자(caller)는 함수를 호출한 이후 함수 실행을 제어할 수 없다. 제네레이터 함수는 함수 실행을 함수 호출자가 제어할 수 있다. 함수 호출자가 함수 실행을 일시 중지시키거나 재개시킬 수 있다. 이는 함수의 제어권을 함수가 독점하는 것이 아니라 함수 호출자에게 양도(yield)할 수 있다는 것을 의미한다.

2. 제네레이터 함수는 함수 호출자와 함수의 상태를 주고받을 수 있다.
일반 함수를 호출하면 매개변수를 통해 함수 외부에서 값을 주입받고 함수 코드를 일괄 실행하여 결과값을 함수 외부로 반환한다. 즉, 함수가 실행되고 있는 동안에는 함수 외부에서 함수 내부로 값을 전달하여 함수의 상태를 변경할 수 없다. 제네레이터 함수는 함수 호출자와 양방향으로 함수의 상태를 주고받을 수 있다. 다시 말해, 제네레이터 함수는 함수 호출자에게 상태를 전달할 수 있고 함수 호출자로부터 상태를 전달받을 수 있다.

3. 제네레이터 함수를 호출하면 제네레이터 객체를 반환한다.
일반 함수를 호출하면 함수 코드를 일괄 실행하고 값을 반환한다. 제네레이터 함수를 호출하면 함수 코드를 실행하는 것이 아니라 이터러블 이면서 동시에 이터레이터인 제네레이터 객체를 반환한다.

## 제네레이터 함수의 정의
제네레이터 함수는 function* 키워드로 선언한다. 그리고 하나 이상의 yield 표현식을 포함한다. 이걸을 제외하면 일반 함수를 정의하는 것과 같다.

```js
// 제네레이터 함수 선언문
function* genDecFunc() {
	yield 1;
}

// 제네레이터 함수 표현식
const genExpFunc = function* () {
	yield 1;
}

// 제네레이터 메서드
const obj = {
 * genObjMethod() {
	yield 1;
  }
};

// 제네레이터 클래스 메서드
class MyClass {
  * genClsMethod() {
    yield 1;
  }
}
```

애스터리스크(*)의 위치는 function 키워드와 함수 이름 사이라면 어디든지 상관없다. 하지만 일관성을 유지하기 위해 function 키워드 바로 뒤에 붙이는 것을 권장한다.

제네레이터 함수는 화살표 함수로 정의할 수 없다.
제네레이터 함수는 new연산자와 함께 생성자 함수로 호출할 수 없다.

## 제네레이터 객체
**제네레이터 함수를 호출하면 일반 함수처럼 함수 코드 블록을 실행하는 것이 아니라 제네레이터 객체를 생성해 반환한다. 제네레이터 함수가 반환한 제네레이터 객체는 이터러블이면서 동시에 이터레이터다.

```js
// 제네레이터 함수
function* genFunc() {
  yield 1;
  yield 2;
  yield 3;
}

// 제네레이터 함수를 호출하면 제네레이터 객체를 반환한다.
const generator = genFunc();
// 제네레이터 객체는 이터러블이면서 동시에 이터레이터다.
// 이터러블은 Symbol.iterator 메서드를 직접 구현하거나 프로토타입 체인을 통해 상속받은 객체다.
console.log(Symbol.iterator in generator); // true
// 이터레이터는 next 메서드를 갖는다.
console.log('next' in generator); // true

```

제네레이터 객체는 next 메서드를 갖는 이터레이터이지만 이터레이터에는 없는 return, throw 메서드를 갖는다. 제네레이터 객체의 세 개의 메서드를 호출하면 다음과 같이 동작한다.

- next 메서드를 호출하면 제네레이터 함수의 yield 표현식까지 코드 블록을 실행하고 yield된 값을 value 프로퍼티 값으로, false를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

- return 메서드를 호출하면 인수로 전달받은 값을 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

```js
function* genFunc() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.error(e);
  }
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.return('End!')); // {value: "End!", done: true}
```

throw 메서드를 호출하면 인수로 전달받은 에러를 발생시키고 undefined를 value 프로퍼티 값으로, true를 done 프로퍼티 값으로 갖는 이터레이터 리절트 객체를 반환한다.

```js
function* genFunc() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.error(e);
  }
}

const generator = genFunc();

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.throw('Error!')); // {value: undefined, done: true}
```

## async/await
ES8(ECMAScript 2017)에서는 제네레이터보다 간단하고 가독성 좋게 비동기 처리를 동기처럼 동작하도록 구현할 수 있는 async/await가 도입되었다.

async/await는 프로미스를 기반으로 동작한다. async/await를 사용하면 프로미스의 then/catch/finally 후속 처림 메서드에 콜백 함수를 전달해서 비동기 처리 결과를 후속 처리할 필요 없이 마치 동기 처리 처럼 프로미스를 사용할 수 있다. 다시 말해, 프로미스의 후속 처리 메서드 없이 마치 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현할 수 있다.

### async 함수
await 키워드는 반드시 async 함수 내부에서 사용해야 한다. async 함수는 async 키워드를 사용해 정의하며 언제나 프로미스를 반환한다. async 함수가 명시적으로 프로미스를 반환하지 않더라도 async 함수는 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.

```js
// async 함수 선언문
async function foo(n) {return n;}
foo(1).then(v => console.log(v)); // 1

// async 함수 표현식
const bar = async function (n) {return n;};
bar(2).then(v => console.log(v)); // 2

// async 화살표 함수
const baz = async n => n;
baz(3).then(v => console.log(v)); // 3

// async 메서드
const obj = {
  async foo(n) {return n;}
};
obj.foo(4).then(v => console.log(v)); // 4

// async 클래스 메서드
class MyClass {
  async bar(n) {return n;}
}
const myClass = new MyClass();
myClass.bar(5).then(v => console.log(v));
```

클래스의 constructor 메서드는 async 메서드가 될 수 없다. 클래스의 constructor 메서드는 인스턴스를 반환해야 하지만 async 함수는 언제나 프로미스를 반환해야 한다.

```js
class MyClass {
  async constructor() { }
	// SynyaxError: Class constructor may not be an async method
}
const myClass = new MyClass();
```

### await 키워드
await 키워드는 프로미스가 settled 상태(비동기 처리가 수행된 상태)가 될 때까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다. await 키워드는 반드시 프로미스 앞에서 사용해야 한다.
```js
const fetch = require('node-fetch');

const getGithubUserName = async id => {
  const res = await fetch(`https://api.github.com/users/${id}`);
  const { name } = await res.json();
  console.log(name);
}

getGithubUserName('imb96');
```
### 에러 처리
비동기 처리를 위한 콜백 패턴의 단점 중 가장 심각한 것은 에러 처리가 곤란하다는 것이다. 에러는 호출자 방향으로 전파된다. 즉, 콜 스택의 아래방향 으로 전파된다. 하지만 비동기 함수의 콜백 함수를 호출한 것은 비동기 함수가 아니기 때문에 try...catch문을 사용해 에러를 캐치할 수 없다.

async/await 에서 에러 처리는 try...catch문을 사용할 수 있다. 콜백 함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다.

```js
const fetch = require('node-fetch');

const foo = async () => {
  try {
    const wronngUrl = 'https://wrong.url';

    const response = await fetch(wronngUrl);
    const data = await response.json();
    console.log(data);
  }catch (err) {
    console.error(err);
  }
};

foo();
```

위 예제의 foo 함수의 catch 문은 HTTP 통신에서 발생한 네트워크 에러뿐 아니라 try 코드 블록 내의 모든 문에서 발생한 일반적인 에러까지 모두 캐치할 수 있다.
**async 함수 내에서 catch 문을 사용해서 에러 처리를 하지 않으면 async 함수는 발생한 에러를 reject하는 프로미스를 반환한다.** 따라서 async 함수를 호출하고 Promise.prototype.catch 후속 처리 메서드를 사용해 에러를 캐치할 수도 있다.

```js
const fetch = require('node-fetch');

const foo = async () => {
  const wrongUrl = 'https://wrong.url';

  const response = await fetch(wrongUrl);
  const data = await response.json();
  return data;
};

foo()
  .then(console.log)
  .catch(console.error); // TypeError: Failed to fetch
```




