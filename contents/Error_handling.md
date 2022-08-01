---
date: '2022-07-15'
title: 'Error_handling'
categories: ['JS']
summary: '에러처리에 대해'
thumbnail: './DeepDive.png'
---
> JavaScrpitDeepDive를 읽고 정리한 글입니다.

# Error Handling
## 에러 처리의 필요성
에러는 언제나 발생할 수 있다. 발생한 에러에 대해 대처하지 않고 방치하면 프로그램은 강제 종료된다.

```
console.log('[Start]');
foo(); // ReferenceError: foo is not defined
// 발생한 에러를 방치하면 프로그램은 강제 종료된다.

// 에러에 의해 프로그램이 강제 종료되어 아래 코드는 실행되지 않는다.
console.log('[End]');
```

try...catch 문을 사용해 발생한 에러에 적절하게 대응하면 프로그램이 강제 종료되지 않고 계속해도 코드를 실행시킬 수 있다.

```
console.log('[Start]');
try {
  foo();
} catch (error) {
  console.error('[에러 발생]', error);
  // [에러 발생] ReferenceError: foo is not defined
}
// 발생한 에러에 대해 적절한 대응을 하면 프로그램이 강제 종료되지 않는다.
console.log('[End]');

```

직접적으로 에러를 발생하지는 않는 예외적인 상황이 발생할 수도 있다. 예외적인 상황에 적절하게 대응하지 않으면 에러로 이어질 가능성이 크다.

```
// DOM에 button 요소가 존재하지 않으면 querySelector 메서드는 에러를 발생시키지 않고 null을 반환한다.
const $button = document.querySelector('button'); // null

$button.classList.add('disabled');
// TypeError: Cannot read property 'classList' of null
```

위 예제의 querySelector 메서드는 인수로 전달한 문자열이 CSS 선택자 문법에 맞지 않는 경우 에러를 발생시킨다.

하지만 querySelector 메서드는 인수로 전달한 CSS 선택자 문자열로 DOM에서 요소 노드를 찾을 수 없는 경우 에러를 발생시키지 않고 null을 반환한다. 이때 if 문으로 querySelector 메서드의 반환값을 확인하거나 단축 평가 또는 옵셔널 체이닝 연산자 ?. 를 사용하지 않으면 에러로 이어질 가능성이 크다.

```
// DOM에 button 요소가 존재하는 경우 querySelector 메서드는 에러를 발생시키지 않고 null을 반환한다.
const $button = document.querySelector('button'); // null
$button?.classList.add('disabled');
```

이처럼 에러나 예외적인 상황에 대응하지 않으면 프로그램은 강제 종료될 것이다.
에러나 예외적인 상황은 너무 다양하기 때문에 아무런 조치 없이 프로그램이 강제 종료된다면 원인을 파악하여 대응하기 어렵다. 따라서 작성한 코드에서는 언제나 에러나 예외적인 상황이 발생할 수 있다는 것을 전제하고 이에 대응하는 코드를 작성하는 것이 중요하다.

## try..catch..finally 문
기본적으로 에러 처리를 구현하는 방법은 크게 두가지가 있다.
예외적인 상황이 발생하면 반환하는 값(null 또는 -1)을 if 문이나 단축 평가 또는 옵셔널 체이닝 연산자를 통해 확인해서 처리하는 방법과 에러 처리 코드를 미리 등록해 두고 에러가 발생하면 에러 처리 코드로 점프하도록 하는 방법이 있다.

try...catch...finally 문은 두 번째 방법이다. 일반적으로 이 방법을 에러 처리라고 한다.
try...catch...finally 문은 다음과 같이 3개의 블록으로 구성된다. finally 문은 생략 가능하다.

```
try {
  // 샐행할 코드(에러가 발생할 가능성이 있는 코드)
} catch (err) {
  // try 코드 블록에서 에러가 발생하면 이 코드 블록의 코드가 실행된다.
  // err 에는 try 코드 블록에서 발생한 Error 객체가 전달된다.
} finally {
  // 에러 발생과 상관없이 반드시 한 번 실행된다.
}
```

## Error 객체
Error 생성자 함수는 에러 객체를 생성한다. Error 생성자 함수에는 에러를 상세히 설명하는 에러 메시지를 인수로 전달할 수 있다.

`const error = new Error('invalid');`

Error 생성자 함수가 생성한 에러 객체는 message 프로퍼티와 stack 프로퍼티를 갖는다.
message 프로퍼티의 값은 Error 생성자 함수에 인수로 전달한 에러 메시지이고,
stack 프로퍼티 값은 에러를 발생시킨 콜스택의 호출 정보를 나타내는 문자열이며 디버깅 목적으로 사용한다.

자바스크립트는 Error 생성자를 포함해 7가지 에러 객체를 생성할 수 있는 Error 생성자 함수를 제공한다. 
SyntaxError, ReferenceError, TypeError, RangeError, URIError, EvalError 생성자 함수가 생성한 에러 객체의 프로타입은 모두 Error.prototype을 상속받는다.

| 생성자 함수  | 인스턴스  |
|:----------|:----------|
| Error    | 일반적 에러 객체    |
| SynyaxError    | 자바스크립트 문법에 맞지 않는 문을 해석할 때 발생하는 에러 객체    |
| ReferenceError    | 참조할 수 없는 식별자를 참조했을 때 발생하는 에러 객체  |
| TypeError    | 피연산자 또는 인수의 데이터 타입이 유효하지 않을 때 발생하는 에러 객체 |
| RangeError    | 숫자값의 허용 범위를 벗어났을 때 발생하는 에러 객체 |
| URIError    | encodeURI 또는 decodeURI 함수에 부적절한 인수를 전달했을 떄 발생하는 에러 객체 |
| EvalError    | eval 함수에서 발생하는 에러 객체 |

## throw 문
Error 생성자 함수로 에러 객체를 생성한다고 에러가 발생하는 것은 아니다. 즉, 에러 객체 생성과 에러발생은 의미가 다르다.

에러를 발생시키려면 try 코드 블록에서 throw 문으로 에러 객체를 던져야 한다.

`throw 표현식;`

throw 문의 표현식은 어떤 값이라도 상관없지만 일반적으로 에러 객체를 지정한다. 
에러를 던지면 catch 문의 에러 변수가 생성되거 던져진 에러 객체가 할당된다. 그리고 catch 코드 블록이 실행되기 시작한다.

```
try {
  // 에러 객체를 던지면 catch 코드가 실행되기 시작한다.
  throw new Error('something wrong');
} catch (error) {
  console.log(error);
}
```

## 에러의 전파
에러는 호출바 방향으로 전파된다. 즉, 콜스택의 아래 방향으로 전파된다.
throw된 에러를 캐치하지 않으면 호출자 방향으로 전파된다. 이때 throw된 에러를 캐치하여 적절히 대응하면 프로그램을 강제 종료시키지 않고 코드의 실행 흐름을 복구할 수 있다. throw된 에러를 어디에서도 캐치하지 않으면 프로그램은 강제 종료된다.


