---
date: '2022-07-29'
title: 'this'
categories: ['JS']
summary: '자바스크립트에서의 this에 대해'
thumbnail: './DeepDive.png'
---
> JavaScrpitDeepDive를 읽고 정리한 글입니다.

# this 키워드
동작을 나타내는 메서드는 자신의 속한 객체의 상태, 즉 프로퍼티를 참조하고 변경할 수 있어야 한다.
이때 메서드가 자신이 속한 객체의 프로퍼티를 참조하려면 **먼저 자신이 속한 객체를 가리키는 식별자를 참조 할 수 있어야 한다.**

**this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(self-referencing variable)다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있다.**

함수를 호출하면 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다. 함수 내부에서 arguments 객체를 지역 변수처럼 사용할 수 있는 것처럼 this도 지역 변수처럼 사용할 수 있다. 단 this가 가리키는 값, 즉 this 바인딩은 함수 호출 방식에 의해 동적으로 결정된다.

객체 리터럴의 메서드 내부에서의 this는 메서드를 호출한 객체를 가리킨다.

생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
이처럼 this는 상황에 따라 가리키는 대상이 다르다.

**자바스크립트의 this는 함수가 호출되는 방식에 따라 this에 바인딩될 값, 즉 this 바인딩이 동적으로 결정된다.**

```
// this는 어디서든지 참조 가능하다.
// 전역에서 this는 전역 객체 window를 가리킨다.
console.log(this);	//	window

```
```
function square(number) {
  // 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.
  console.log(this)	//	window
  return number * number;
}
square(2);
```

```
const person = {
  name: 'Kim',
  getName() {
    // 메서드 내부에서 this는 메서드를 호출한 객체를 가리킨다.
    console.log(this);	//	{name: 'Kim', getName: f}
    return this.name;
  }
};

console.log(person.getName());	//	Kim

```

```
function Person(name) {
	this.name = name;
    // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
    console.log(this);	//	Person {name: 'Kim'}
}
const me = new Person('Kim');
```

## 함수 호출 방식과 this 바인딩
this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.

```
// this 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.
const foo = function () {
  console.dir(this);
};

// 동일한 함수도 다양한 방식으로 호출할 수 있다.

// 1. 일반 함수 호출
// foo 함수를 일반적인 방식으로 호출
// foo 함수 내부의 this는 전역 객체 window를 가리킨다.
foo();	//	window

// 2. 메서드 호출
// foo 함수를 프로퍼티 값으로 할당하여 호출
// foo 함수 내부의 this는 메서드를 호출한 객체 obj를 가리킨다.
const obj = { foo };
obj.foo();	//	obj

// 3. 생성자 함수 호출
// foo 함수를 new 연산자와 함께 생성자 함수로 호출
// foo 함수 내부의 this는 생성자 함수가 생성한 인스턴스를 가리킨다.
new foo();

```

### 일반 함수 호출
**기본적으로 this에는 전역 객체가 바인딩 된다.**
this는 객체의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서 this는 의미가 없다.

콜백함수가 일반 함수로 호출된다면 콜백 함수 내부의 this에도 전역 객체가 바인딩된다. 어떤 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩된다.

메서드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메서드의 this 바인딩과 일치시키기 위한 방법에는
자바스크립트가 제공하는 this를 명시적으로 바인딩할 수 있는
Function.prototype.apply, Function.prototype.call, Function.prototype.bind가 있다.

### 메서드 호출
메서드 내부의 this에는 메서드를 호출할 때 메서드 이름 앞의 마침표 연산자 앞에 기술한 객체가 바인딩된다.
주의할 것은 메서드 내부의 this는 메서드를 소유한 객체가 아닌 메서드를 호출한 객체에 바인딩 된다는 것이다.

프로토타입 메서드 내부에서 사용된 this도 일반 메서드와 마찬가지로 해당 메서드를 호출한 객체에 바인딩된다.

### 생성자 함수 호출
생성자 함수 내부의 this에는 생성자 함수가 생성할 인스턴스가 바인딩된다.

### Function.prototype.apply/call/bind 메서드에 의한 간접 호출
apply, call, bind 메서드는 Function.prototype의 메서드다. 즉, 이들 메서드는 모든 함수가 상속바다 사용할 수 있다. apply, call 메서드는 this로 사용할 객체와 인수 리스트를 인수로 전달받아 함수를 호출한다.

apply와 call 메서드의 본질적인 기능은 함수를 호출하는 것이다.
apply와 call 메서드는 호출할 함수에 인수를 전달하는 방식만 다를 뿐 동일하게 동작한다.

apply 메서드는 호출할 함수의 인수를 배열로 묶어 전달한다.
call 메서드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.

apply와 call 메서드의 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메서드를 사용하는 경우다. arguments 객체는 배열이 아니기 때문에 배열의 메서드를 사용할 수 없으나 apply와 call 메서드를 이용하면 가능하다.

bind 메서드는 apply와 call 메서드와 달리 함수를 호출하지 않는다. 다만 첫 번째 인수로 전달한 값으로 this 바인딩이 교체된 함수를 새롭게 생성해 반환한다.

bind 메서드는 메서드의 this와 메서드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.