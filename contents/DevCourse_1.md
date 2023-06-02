---
date: '2023-06-02'
title: '[Day 1] JavaScript 주요 문법 (1)'
categories: ['DevCourse', 'TIL']
summary: '프로그래머스 데브코스 TIL'
thumbnail: './til.jpg'
---
# [Day 1] JavaScript 주요 문법 (1)
> 몰랐던, 헷갈렸던 혹은 더 알고싶은 내용을 정리합니다. 😁

### 프론트엔드 개발자의 역할은 무엇일까?
프론트엔드 개발자의 역할이자 기본은 브라우저에서 동작하는 UI를 개발하는 것.
프론트엔드 개발자는 디자인과 백엔드 사이에서 협업능력과 소통능력이 필요하다. 

💪 프론트엔드 개발자의 핵심역량은?
- 커뮤니케이션
- UI
- 네트워크
- 보안
- 브라우저
- 디자인

🚫 프론트엔드 개발자가 무시하면 안되는것
- 컴퓨터 과학
- CSS
- 단순한 코더가 되는것 (프레임워크나 라이브러리의 기능만 가져다 쓰는 것)

### 브라우저의 동작원리
브라우저는 크게 통신 / 렌더링 / 스크립트 실행 으로 동작한다.

웹페이지를 서버에 요청(Request)하고 서버의 응답(Response)을 받아 브라우저에 표시하는 것이다. 브라우저는 서버로부터 HTML, CSS, Javascript, 이미지 파일 등을 응답받는다. HTML, CSS 파일은 렌더링 엔진의 HTML 파서와 CSS 파서에 의해 파싱(Parsing)되어 DOM, CSSOM 트리로 변환되고 렌더 트리로 결합된다. 이렇게 생성된 렌더 트리를 기반으로 브라우저는 웹페이지를 표시한다.

1. HTML 마크업을 처리하고 DOM 트리를 빌드한다. (**"무엇을"** 그릴지 결정한다.)
2. CSS 마크업을 처리하고 CSSOM 트리를 빌드한다. (**"어떻게"** 그릴지 결정한다.)
3. DOM 및 CSSOM 을 결합하여 렌더링 트리를 형성한다. (**"화면에 그려질 것만"** 결정)
4. 렌더링 트리에서 레이아웃을 실행하여 각 노드의 기하학적 형태를 계산한다. (**"Box-Model"** 을 생성한다.)
5. 개별 노드를 화면에 페인트한다. (or 래스터화)

https://poiemaweb.com/js-browser
https://d2.naver.com/helloworld/59361
https://blog.areumsheep.vercel.app/contents/how-browser-works/

### 호이스팅 (var를 사용하지 않는 이유)
> MDN 문서에서 : JavaScript에서 **호이스팅**(hoisting)이란, 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미합니다. `var`로 선언한 변수의 경우 호이스팅 시 `undefined`로 변수를 초기화합니다. 반면 `let`과 `const`로 선언한 변수의 경우 호이스팅 시 변수를 초기화하지 않습니다.
https://developer.mozilla.org/ko/docs/Glossary/Hoisting

JavaScript 는 함수의 코드를 실행하기 전에 함수 선언에 대한 메모리 부터 할당한다. 따라서 함수를 호출하는 코드를 함수 선언보다 앞서 배치할 수 있다.
```js
// 일반적으로 코드를 작성하는 순서
function getName(name) {
	console.log("제 이름은 " + name + "입니다.");
}
getName("민재");
// 제 이름은 민재입니다.
```
```js
getName("민재");

function getName(name) {
	console.log("제 이름은 " + name + "입니다.");
}
// 제 이름은 민재입니다.
```
함수 호출이 함수 자체보다 앞서 존재하지만, 잘 작동한다. 이것이 JavaScript에서 실행컨텍스트가 동작하는 방식이다.

JavaScript는 초기화를 제외한 선언만 호이스팅한다. 변수를 먼저 사용하고 그 후에 선언 및 초기화가 나타나면, 사용하는 시점의 변수는 기본 초기화 상태(var 선언시 undefined, 그 외에는 초기화하지 않음)이다.
var 키워드로 선언된 모든 변수 선언은 호이스팅된다. 호이스팅이란 변수의 정의가 그 범위에 따라 선언과 할당으로 분리되는 것을 의미한다. 즉, 변수가 함수 내에서 정의되었을 경우, 선언이 함수의 최상위로, 함수 바깥에서 정의되었을 경우, 전역 컨텍스트의 최상위로 변경이 된다.
```js
console.log(num); // 호이스팅한 var 선언으로 인해 undefined 출력
var num;  // 선언
num = 6; // 초기화
```
초기화만 존재한다면 호이스팅이 없고 변수를 읽으려는 시도에서 ReferenceError가 발생한다.
```js
console.log(num); // ReferenceError: num is not defined
num = 6; // 초기화
```
let과 const로 선언한 변수도 호이스팅 대상이지만, var와 달리 호이스팅 시 undefined로 변수를 초기화 하지 않는다. 따라서 변수의 초기화를 수행하기 전에 읽는 코드가 먼저 나타나면 예외가 발생한다.

### 변수와 상수
변수 사용 방법
키워드(let or var) 변수명(메모리 상 주소) = 값(주소에 해당하는 값)
```jsx
let variable = 127
```
상수 사용 방법
키워드(const) 변수명(메모리 상 주소) = 값 (주소에 해당하는 값)
```jsx
const variable = 127
```
### var와 let과 const의 차이점은?
**var**: 함수 스코프를 갖는다. 즉, 함수 내에서 선언된 경우 해당 함수 내에서만 접근할 수 있다. 함수 외부에서 선언되면 전역 변수가 된다. 변수의 재선언 및 재할당이 가능하기 때문에 예기치 않은 버그가 발생할 수 있다.

**let**: 블록 스코프를 갖는다. 재할당은 가능하지만 재선언은 불가능하다. let을 사용하여 선언된 변수를 선언되기 전에 접근하면 ReferenceError가 발생한다.

**const**: 블록 스코프를 갖다. 재할당이나 재선언이 불가능한 상수를 생성한다. 선언시 초기화되어야 하며 한번 초기화되면 값을 변경할 수 없다. const 를 사용하여 선언된 변수를 선언되기전에 접근하면 ReferenceError가 발생한다.

### 메모리
메모리는 할당 → 사용 → 해제 과정을 거친다.

메모리는 한정되어 있기 때문에 변수나 상수를 만들때마다 메모리 공간은 줄어든다.
자바스크립트 엔진은 가비지 컬렉터를 통해 사용하지 않는 메모리를 해제한다.
자바스크립트에서 원시타입의 값이 변경될때는 메모리가 새로 할당된다.

자바스크립트 엔진은 Virtual Machine으로 구성되어 있고 안에  Heap 과 Call Stack이라는 메모리 모델이 구현되어 있다. Heap에는 참조 타입, Call Stack은 원시타입이 들어간다.

Garbage Collector는 Mark and Sweep Algorithm을 통해 메모리를 정리한다. 브라우저의 최상위 객체인 window 부터 시작하여 닿을 수 없는 곳은 필요없는 것으로 생각하여 지운다.

### 표현식과 연산자
자바스크립트 프로그램은 표현식(Expressions)과 문장(Statements). 두가지 문법적 카테고리로 이루어져 있다.
표현식이란 어떠한 결과 값으로 평가되는 식이다.
Number, String, Boolean 같은 원시 값을 포함하여 변수, 상수, 함수 호출 등으로 조합할 수 있다.
```js
const a = 21 + 47; // 68
const b = a - 31;  // 37
const c = "String" + 5;  // "String5"
const d = true + false + false + true;  // 2연산자의 종류.
```
- 비교 연산자: 좌측 피연산자와 우측 피연산자를 비교하는 연산자 true 혹은 false를 반환한다.
- 산술 연산자: 덧셈 뺼셈, 곱셈, 나눗셈을 하는 연산자. Number를 반환한다.
- 비트 연산자: 비트를 직접 조작하는 연산자
- 논리 연산자: Boolean을 통해 참과 거짓을 검증하는 연산자
- 삼항 연산자: 조건에 따라 값을 선택하는 연산자
- 관계 연산자: 객체에 속성이 있는지 확인하는 연산자
```js
const x = {
	name: "Kim Minjae",
	email: "kimminje7810@gmail.com"
};

"name" in x; // true;
"age" in x; // false;
```
- typeof: 피연산자의 타입을 반환하는 연산자. 문자열로 반환된다.

### 흐름 제어
흐름 제어는 Control Flow, Data Flow 방식으로 가능하다.
Control Flow는 흐름을 제어하는 방법중 하나로 조건이나 반복을 통홰 상태를 제어하는 것.
Data Flow는 함수형 프로그래밍 방식으로 구현 가능하다.

**조건문**
조건이 맞을 때만 실행되는 문장(Statement) 문법이다.
- if: 괄호 안의 조건식이 참인 경우 실행되는 문법. else if, else도 같이 사용할 수 있다. false 뿐만 아니라 다음 값들도 거짓이 될 수 있다. false, undefined, null, 0, NaN, “”
- switch: 괄호 안 값에 따라 분기되는 문법 case, default와 함께 쓰인다.

**반복문**
반복적인 작업을 지시하는 문법
- for: 초기문, 조건문, 증감문으로 이루어져 있다. 조건문의 결과가 거짓이 되면 반복이 종료된다.
- while: 괄호안의 조건이 거짓이 될 때까지 반복된다.
- do while: 먼저 진입 후 로직을 실행한 다음 조건을 검사한다.

### 배열과 객체
**배열**
연관된 데이터를 연속적인 형태로 저장하는 복합 타입 배열에 포함된 원소는 순서대로 번호(index)가 붙는다.
```js
// 배열 메서드
// from()
const arr = Array.from(Array(5), function (v, k) {
	return k + 1;
}); // [1,2,3,4,5]
// concat()
const arr1 = [1,2,3];
const arr2 = [4,5,6];
arr1.concat(arr2); // [1,2,3,4,5,6]
// slice()
const arr3 = [1,2,3,4,5,6];
arr.slice(2,4); // [3,4] - 원본배열 변경 x
arr.splice(2,4); // [1,2,5,6] - 원본배열 부분 삭제
```
**객체**
여러 값을 키-값 형태로 결합시킨 복합 타입
```js
const obj = { name: "민재", gender: "Male" }
obj["email"] = "kimminje7810@gmail.com"
obj.age = 26;

delete obj.age; // 요소 삭제

"email" in obj // true;
"age" in obj // false;

Object.keys(obj); // ['name', 'gender', 'email']
Object.values(obj); // ['민재', 'Male', 'kimminje7810@gmail.com'] 

// 객체 순회
for (const key in obj) {
	console.log(key, obj[key])
}
```
### 스코프와 클로저
스코프
유효 범위라고 불리며 변수가 어느 범위까지 참조되는지를 뜻한다.
```js
const a = 123; // Global Scope
{
	// Local Scope
	const b = 234;
	console.log(a,b); // 123 234
}
console.log(a, b) // Uncaught ReferenceError: b is not defined
```
var를 사용하면 예상치 못한 오류가 생길 수 있다.
```js
var a = 5;
{
	// 호이스팅 되어 변수 선언이 상단으로 올라간다.
	var a = 10;
	console.log(a); // 10
}
console.log(a) = 10;
```
**클로저**
함수가 선언된 환경의 스코프를 기억하여 함수가 스코프 밖에서 실행될 때에도 기억한 스코프에 접근할 수 있게 만드는 문법
```js
function makeGreeting(name) {
  // 지역 스코프라서 함수가 종료되면 메모리에서 사라진다.
  const greeting = "Hello, ";

  return function () {
    console.log(greeting + name);
  };
}
const minjae = makeGreeting('minjae');
minjae(); // Hello, minjae
```
**은닉화**
클로저를 이용하여 내부 변수와 함수를 숨길 수 있다.
```js
function Counter() {
  let privateCounter = 0;
  function ChangeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      ChangeBy(1);
    },
    decrement: function () {
      ChangeBy(-1);
    },
    value: function () {
      return privateCounter;
    }
  }
}

const counter = Counter();

console.log(counter.value()); // 0
counter.increment();
counter.increment();
console.log(counter.value()); // 2
counter.decrement();
console.log(counter.value()); // 1
```
클로저를 잘 알아야하는 이유는 유용하게 사용하기보단 알기 힘든 버그를 잘 수정하기 위해서다.
```js
function counting() {
  let i = 0;
  for(i = 0; i < 5; i += 1) {
    setTimeout(function() {
      console.log(i);
    }, i * 100);
  }
}
counting(); // 5 5 5 5 5
```
출력결과가 0 1 2 3 4 순차적으로 출력될지 알았지만 5 5 5 5 5 가 출력된다. 
이유는 setTimeOut() 의 대기시간이 끝나 콜백함수가 실행되는 시점에는 루프가 종료되어 i가 5가 되었기 때문이다.
0 1 2 3 4 를 순차적으로 출력하고 싶다면? 

1.즉시실행함수(IIFE)를 사용하여 루프마다 클로저를 만든다.
```js
function counting() {
  let i = 0;
  for(i = 0; i < 5; i += 1) {
    (function (number) {
      setTimeout(function () {
        console.log(number);
      }, number * 100);
    })(i);
  }
}
```
2.let을 사용한다. let은 블록 수준 스코프이기 때문에 루프마다 클로저가 생성된다.
```js
function counting() {
  for (let i = 0; i < 5; i += 1) {
    setTimeout(function () {
      console.log(i);
    }, i * 100);
  }
}
counting();
```