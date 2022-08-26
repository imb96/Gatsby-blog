---
date: '2022-07-22'
title: 'Closure'
categories: ['JS']
summary: '자바스크립트의 클로저에 대해'
thumbnail: './js1.png'
---

# Closure
자바스크립트는 함수가 호출될 때 스코프가 아닌 정의된 시점의 변수 스코프를 사용하여 실행된다는 Lexical scope (어휘적 스코프)를 사용한다.
Lexical sccope를 구현하기 위해서는 함수 객체의 내부 상태에 함수의 코드뿐만 아니라 함수가 정의된 스코프에 대한 참조가 반드시 포함되어야 한다.
이렇게 함수 객체와 스코프를 조합한 것을 클로저라 부른다.

클로저는 함수형 프로그래밍언어에서 사용되는 중요한 특성이다.
클로저는 함수가 정의된 곳과 다른 스코프에서 호출될때 주로 사용된다. 가장 흔한 경우로는 함수가 함수를 정의해 반환하는 경우가 있다.
클로저는 함수 객체와 스코프를 조합한 것 즉 외부 변수를 기억하고 이 외부 변수에 접근할 수 있는 함수를 의미한다.

```js
let avengers = ['Ironman','Captin','Hulk'];
let char = 'H';
let strong = avengers.filter(hero => hero.startsWith(char));
```
hero => hero.startsWith(char) 에서 char변수를 사용하지만 char는 함수 외부에서 정의된다. 이것은 클로저다

```js
function person() {
  let age = 27; // 변수 age 선언

  function old() {
    console.log(age + ' years old'); // age 읽음
  }
  old();
}

person();
```

전역에서 person 함수가 선언 되었고 즉시호출 된다. 함수 내에 지역변수 age 와 old함수가 포함되어 있다. old가 호출되고 old가 person 내부에 있기 때문에 age 변수를 읽을 수 있다.
이것이 클로저다.

함수가 외부에서 선언된 변수를 읽거나 사용할 때 클로저가 있다고 말한다.
```js
function person() {
  let age = 27;

  function old() {
    console.log(age + ' years old');
  }

  // 5초 뒤에 실행
  setTimeout(old, 5000);
}

person();
```
old는 person 함수의 내부의 지역변수다. person 내부에서 5초 뒤에 old를 호출한다. 그리고 old는 age 변수를 읽는다. 따라서 자바스크립트 엔진은 old가 호출될 때까지 person의 age 변수를 사용할 수 있다.

클로저를 만들 때는 this가 변수가 아닌 키워드라는 점을 기억해야 한다.
화살표 함수는 자신을 포함한 함수의 this값을 상속하지만, function 키워드로 정의한 함수는 그렇지 않다.
따라서 외부 함수의 this값을 사용하는 클로저를 만들 때는 화살표 함수를 사용하거나, 클로저를 반환하기 전에 bind()를 호출하거나, 외부의 this값을 클로저가 상속할 변수에 할당해야 한다.

**외부 함수 안에서 정의되고 반환된 함수는 외부 함수의 어휘적 스코프에 대한 접근을 유지하고 있으므로, 외부 함수에서 정의한 변수에 접근할 수 있다. 이런 함수를 클로저라 부른다.**





