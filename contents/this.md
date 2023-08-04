---
date: '2023-08-04'
title: '자바스크립트에서의 this'
categories: ['JS']
summary: '자바스크립트에서의 this는 어떻게 동작할까?'
thumbnail: './til.jpg'
---

MDN에서 설명하는 this
> 대부분의 경우 this의 값은 함수를 호출하는 방법에 따라 결정됩니다. 실행중에는 할당으로 설정할 수 없으며, 함수를 호출할 때마다 다를 수 있다. ES5는 `함수를 어떻게 호출했는지 상관하지 않고 this 값을 설정할 수 있는` `bind` 메서드를 도입했고 ES2015는 스스로의 `this` 바인딩을 제공하지 않는 `화살표 함수` 를 추가했다. (이는 렉시컬 컨텍스트 안의 this값을 유지한다.)

this는 함수의 `실행 컨텍스트`(함수가 실행되는 환경)을 가리키는 키워드이다.
자바스크립트에서는 모든 함수는 실행될 때 마다 함수 내부에 this라는 객체가 추가되며 함수가 `호출된 방식`에 따라서 this의 바인딩이 달라진다.

기본적으로 this는 어디서든지 참조 가능하며 전역에서 this는 전역 객체를 가리킨다.
```js
console.log(this) // window
```

### 객체의 메서드를 호출할 때
this는 함수를 실행할 때 함수를 소유하고 있는 객체를 참조한다. 즉 해당 메서드를 호출한 객체로 바인딩 된다.

```js
const obj = {
	a: 10,
	b: 20,
	add() {
		return this.a + this.b
	},
	sub:() => {
		return this.a - this.b
	}
}
const addRes = obj.add()
console.log(addRes) // 30
const subRes = obj.sub()
console.log(subRes) // NaN
```

여기서 sub 메서드의 실행 결과는 NaN 값이 나온다. sub 메서드는 객체의 메서드로 호출되긴 하였지만 sub 메서드는 화살표 함수로 정의되어 있기 때문이다. 화살표함수의 this 대해서는 아래에서 알아보자.

### 일반 함수를 호출할 때
특정 객체의 메서드가 아닌 함수를 호출하면, 해당 함수 내부 코드에서 사용된 this는 전역객체에 바인딩 된다.
```js
function add(a, b) {
	return this;
}
const res = add(1,2)
console.log(res) // 브라우저에서는 window Node.js 환경에서는 global
```

### 생성자 함수를 통해 객체를 생성할 때
생상자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
new 키워드를 통해 생성자 함수를 호출할 때는 new 키워드를 통해서 호출된 함수 내부에서의 this는 객체 자신이 된다.

```js
function Add(a, b) {
	this.a = a
	this.b = b
}
const added = new Add(10, 29)
console.log(added.a) // 10
console.log(added.b) // 29
```

클래스 문법도 마찬가지이다.

```js
class Add {
  constructor(a, b) {
    this.a = a
    this.b = b  
  }
}
const added = new Add(10, 29)
console.log(added.a)
console.log(added.b)

```

### 화살표 함수를 호출할 때
위에서 설명한 객체의 메서드를 호출할때 예제를 다시 봐보자
```js
const obj = {
	a: 10,
	b: 20,
	add() {
		return this.a + this.b
	},
	sub:() => {
		return this.a - this.b
	}
}
const addRes = obj.add()
console.log(addRes) // 30
const subRes = obj.sub()
console.log(subRes) // NaN
```

다른 함수 호출 방법에서 this는 호출될 떄 this의 바인딩이 결정되지만 화살표 함수 에서 this는 선언될 때 결정 된다.
화살표 함수에서 this는 자신을 감싼 정적 범위(lexical context)이며 , 즉 함수가 `정의된 위치`에서 this를 결정하며 이후에는 변경되지 않는다. 
화살표 함수를 bind, call, apply를 통해 호출해도 무시된다.

```js
const obj = {
  message: 'Hello Arrow Function',
};

const arrowFunction = () => {
  console.log(this.message);
};

const bindFunction = arrowFunction.bind(obj);
const calledFunction = arrowFunction.call(obj);
const appliedFunction = arrowFunction.apply(obj);

arrowFunction();   // undefined
bindFunction();   // undefined
calledFunction();  // TypeError: 화살표 함수는 call메서드 사용할 수 없다.
appliedFunction(); // TypeError: 화살표 함수는 apply메서드 사용할 수 없다.

```

### bind, call, apply를 통한 호출
this의 바인딩을 지정할 수 있게 해주는 메서드이다.
- `bind`: bind 메서드는 함수를 호출하는 것이 아닌, 새로운 함수를 생성하며 새로운 함수는 원본 함수와 동일한 코드를 가지며 지정한 this와 파라미터들을 가지고 호출될 때 사용된다.
- `call`: call 메서드는 함수를 호출하는 것이지만, 첫 번째 인자로 전달한 값이 해당 함수의 this로 사용된다. 그리고 함수의 파라미터들을 순서대로 넘겨준다.
- `apply`: apply 메서드는 call과 마찬가지로 함수를 호출하며 두 번째 인자로 배열을 받아서 해당 함수의 파라미터들로 사용된다.
- 
```js
const obj1 = {
	message: 'Hello'
}

const obj2 = {
	message: 'Javascript'
}

const obj3 = {
  message: 'World'
}

function printMessage() {
	console.log(this.message)
}

const bindF = printMessage.bind(obj1)
bindF()
printMessage.call(obj2)
printMessage.apply(obj3)

// 출력: Hello Javascript World
```