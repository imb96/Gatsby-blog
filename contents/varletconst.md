---
date: '2022-07-30'
title: 'var, let, const'
categories: ['JS']
summary: '변수 선언 키워드 var, let, const에 대해'
thumbnail: './codingcat2.png'
---

# var, let, const

JavaScript에서 변수를 선언하고 할당 받을 수 있는 키워드로 `var`, `let`, `const` 가 있다.
ES5까지는 var 키워드가 유일한 변수를 선언할 수 있는 키워드였고 let과 const는 ES6에서 추가되었다.
### var 키워드에 어떤 문제가 있기 떄문에 let과 const를 추가했을까?
### var
var 키워드로 선언된 변수는 함수 스코프를 기준으로 동작한다.
재할당과 재선언이 가능하다.
```js
var a = 3;
var a = 5;
console.log(a); // 5;
```
이렇게 var 키워드로 변수를 선언할 경우에는 변수가 중복으로 선언이 되기 떄문에 의도치 않게 변수가 변경되는 일이 생길 수 있다.

var 키워드를 함수 외부에서 선언할 경우에는 전역 변수로 취급된다.

let과 const 키워드는 var 키워드와 다르게 블록 스코프를 기준으로 동작하고 재선언이 불가능하다. (블록은 중괄호 {} 로 이루어진 코드블록을 의미한다.)
### let
let 키워드로 선언된 변수는 재할당이 가능하지만 중복 선언은 불가능 하다.
재할당이 필요할 수 있는 변수에 사용한다.
```js
// 재할당은 가능하다.
let a = 3;
a = 5;
console.log(a); // 5

// 재선언 할 경우 에러가 발생한다.
let b = 5;
let b = 7;
console.log(b); // SyntaxError
```
### const
const키워드는 선언과 초기화를 동시에 해아하고 재선언과 재할당이 불가능하다.

재할당이 필요없는 상수를 선언할 때 사용한다.
```js
// 선언후 초기화를 할 경우 에러가 발생한다.
const a;
a = 30;
console.log(a); // SyntaxError

// 재할당할 경우 에러가 발생한다.
const a = 3;
a = 5;
console.log(a); // SyntaxError
```

### 호이스팅 (hoisting)
호이스팅은 `스코프안에 있는 선언들을 모두 스코프의 최상단으로 끌어올리는 것`

호이스팅에 대한 정보를 찾아보면서 이런 비슷한 문장을 제일 많이 보았다.

호이스팅은 인터프리터가 변수와 함수의 메모리 공간을 선언전에 미리 할당하는 것을 의미한다.

let 과 const로 선언한 변수의 경우 호이스팅 시 변수를 초기화 하지 않는다.
```js
// var 키워드로 선언한 변수의 경우 호이스팅 시 undefined로 변수를 초기화 한다.
console.log(name); // undefined
var name = 'minjae';

// let 혹은 const로 선언한 변수의 경우는 에러가 발생한다.
console.log(gender); // ReferenceError
let gender = 'male'
```

var 키워드로 선언할 경우 선언과 함께 undefined로 초기화가 된다.

let과 const는 선언은 되어있지만 아직 초기화가 되지 않아서 메모리에 할당되지 않은 상태(TDZ)에 있게된다.

### 그렇다면 어떤 키워드를 사용해야 할까?
var 키워드는 앞으로 사용할 일이 없지 않을까? 하는 생각이 든다.

재할당이 필요한 경우에만 let 키워드를 사용하고 재할당이 필요없는 상수 원시 값과 객체에는 const 키워드를 사용하는 것이 좋은 방법이라고 생각된다. 