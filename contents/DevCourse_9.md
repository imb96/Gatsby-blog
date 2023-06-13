---
date: '2023-06-14'
title: '[Day 9] VanillaJS를 통한 자바스크립트 기본 역량 강화 I (1)'
categories: ['DevCourse', 'TIL', 'JS']
summary: '프로그래머스 데브코스 TIL'
thumbnail: './til.jpg'
---

> 프로그래머스 데브코스 프론트엔드 4기 과정중 몰랐던, 헷갈렸던 혹은 더 알고싶은 내용을 정리합니다. 😁

**문제1. 다음 코드의 실행 결과는?**

```js
function Dog(name, age) {
  this.name = name;
  this.age = age;
}

const pet = Dog('choco', 3);
console.log(pet.name);
```

**결과: 오류가 발생한다**

Dog 함수 내부의 this는 전역객체 (window)를 가리킨다.

Dog 함수는 반환하는 값이 없기 때문에 변수 pet은 undefined 이다.

console.log(pet.name)에서 undefined.name에 접근하는 것이기 때문에 오류가 발생한다.

const pet =  new Dog(’choco’, 3); 이렇게 new를 붙여주면 this는 새로 생긴 객체를 가리킨다(인스턴스).

> > 자바스크립트에서 모든 함수는 실행될 때마다 함수 내부에 this 라는 객체가 추가됩니다. arguments라는 유사 배열 객체와 함께 함수 내부로 암묵적으로 전달되는 것입니다. 그렇기 때문에 자바스크립트에서의 this는 함수가 호출된 상황에 따라 그 모습을 달리합니다.
> 

> 1.객체의 메서드를 호출할 때
> 
> 
> 객체의 프로퍼티가 함수일 때 메서드라고 부릅니다. this는 함수를 실행할 때 함수를 소유하고 있는 객체를 참조합니다. 즉 해당 메서드를 호출한 객체로 바인딩 됩니다.
> 

> 2.함수를 호출할 때
> 
> 
> 특정 객체의 메서드가 아니라 함수를 호출하면, 해당 함수 내부 코드에서 사용된 this는 전역객체에 바인딩 됩니다.
> 

> 3.생성자 함수를 통해 객체를 생성할 때
> 
> 
> 그냥 함수를 호출하는 것이 아니라 new키워드를 통해 생성자 함수를 호출할 때는 new 키워드를 통해서 호출된 함수 내부에서의 this는 객체 자신이 됩니다.
> 

> 4.bind, call, apply를 통한 호출
> 
> 
> this를 자바스크립트 코드로 주입 또는 설정할 수 있는 방법입니다.
> 
> bind는 함수를 선언할 때, this와 파라미터를 지정해줄 수 있으며, call과 apply는 함수를 호출할 때, this와 파라미터를 지정해 줍니다.
> 
> apply 메소드에는 첫번째 인자로 this를 넘겨주고 두번째 인자로 넘겨줘야 하는 파라미터를 배열의 형태로 전달합니다. bind메서드와 call메서드는 각각의 파라미터를 하나씩 넘겨주는 형태입니다.
>

문제2. 다음 코드의 실행 결과는?

```js
(function(name) {
  console.log(`hello I am ${name}`)
})('minjae');
```

**결과: hello I am minjae**

즉시 실행 함수(IIFE)이며 정의되자 마자 즉시 실행되는 함수를 말한다.

**문제3. 다음 코드의 실행 결과는?**

```js
var avengers = {
  name: 'avengers',
  members: {
    ironman: {
      memberName: 'tony',
      play: function() {
        console.log(`i am ${this.memberName} in ${this.name}`)
      }
    }
  }
}

avengers.members.ironman.play();
```

**결과: i am tony in undefined**

this.memberName, [this.name](http://this.name) 에서 this는 ironman 객체를 가리킨다. 

memberName은 ironman 객체 내부에 있지만 name은 없다.

[this.name](http://this.name) 대신에 [avengers.name](http://avengers.name/) 이렇게 사용하면 avengers객체안의 name을 가리켜서 정상적으로 i am tony in avengers를 출력한다.

**문제4. 다음 코드를 실행하면 오류가 발생한다. 오류가 발생하는 원인과 해결볍은?**

```js
function Avengers(members) {
  this.members = members;
  this.perform = function() {
    setTimeout(function() {
      this.members.forEach(function(member) {
        member.perform();
      })
    }, 1000)
  }
}

var ironMan = new Avengers([
  {
    name: 'tony',
    perform: function() {
      console.log(`I am Ironman`);
    }
  }
])

ironMan.perform();
```

setTimeout 함수 안에 this.members 에서 this는 Avengers 함수를 가리키지 않고 setTimeout의 매개변수 함수를 가리키기 때문에 this.members는 undefined이다.

**해결법1 - arrow function을 사용한다.**

```js
setTimeout(() => {
	this.members...
})
```

arrow function은 자체의 스코프를 가지고 있지 않고 해당 arrow function의 상위 함수의 스코프를 찾아간다. 따라서 this가 Avengers의 this 를 가리키게 된다.

**해결법2 - bind를 사용한다.**

```js
setTimeout(function() {
	this.members.forEach(function(member) {
		member.perform();
	})
}.bind(this), 1000)
```

함수 끝에 bind 로 this를 넘기면 bind는 함수내의 this를 특정한 this로 변경된 함수로 만든다. 따라서 bind(this)의 this는 Avengers의 this가 되고 this.members의 this도 Avengers의 this를 가리키게 된다. 

**해결볍3 - 클로저 사용**

```js
function Avengers(members) {
	var that = this;
  this.members = members;
  this.perform = function() {
    setTimeout(function() {
      that.members.forEach(function(member) {
        member.perform();
      })
    }, 1000)
  }
}
```

함수 외부에서 Avengers의 this를 that 변수에 담아두고 that으로 접근한다.

> 외부 함수 호출이 종료되더라도 외부 함수의 지역 변수 및 변수 스코프 객체의 체인 관계를 유지할 수 있는 구조를 클로저라고 한다. 보다 정확히는 외부 함수에 의해 반환되는 내부 함수를 가리키는 말이다.

**문제5. 다음 코드를 실행하면 숫자가 0부터 4까지 출력되지 않고 undefined가 다섯번 출력이 되는데 그 이유는 무엇일까?**

```js
const numbers = [0, 1, 2, 3, 4]

for(var i = 0; i < numbers.length; i++) {
	setTimeout(function() {
		console.log(`[${i}] number ${numbers[i]} turn!)
}, i * 1000)
}
```

setTimeout 이후 참조한 i는 이미 for loop가 끝난 이후의 i이기 때문에 항상 5이다.

따라서 numbers[5]는 undefined이다.

**해결법1. IIFE(즉시 실행 함수)**

```js
for(var i = 0; i < numbers.length; i++) {
  (function(index) {
    setTimeout(function() {
      console.log(`[${index}] number ${numbers[index]} turn!`)
    }, i * 1000)
  })(i)
}
```

i가 0,1,2,3,4일 때를 각각의 함수스코프로 가두어서 처리한다. 이렇게 되면 setTimeout실행 시점에 참고하는 index는 IIFE에서 인자로 넘긴 i의 값을 쓰기 때문에 원하는 결과값이 나오게 된다.

**해결법2. var 대신 let 사용**

```js
for(let i = 0; i < numbers.length; i++) {
	...
}
```

var는 함수 스코프를 가지고 let은 블록 스코프를 갖는다. let 으로 선언할 경우 setTimeout내에서 let i가 0,1,2,3,4일 때 각각 참조되기 때문에 원하는 결과 값이 나오게 된다.

IIFE로 해결한 것과 유사한 케이스다.

**해결법3. for 대신 forEach 사용**

```js
numbers.forEach(function (number, i) {
  setTimeout(() => {
    console.log(`[${i}] number ${numbers[i]} turn!`)
  }, i * 1000)
})
```

forEach로 numbers 배열을 순회하면서 각각 함수를 만들기 때문에 i의 값이 고유해진다.

**문제6. var, let, const의 차이는 무엇일까?**

- var: function scope. 변수 재할당 가능
- let: block scope. 변수 재할당 가능
- const: block scope. 변수 재할당 불가능

var로 선언된 변수, 함수는 호이스팅이 일어난다. 실행할 때 함수 스코프상 맨 위로 var 선언이 끌어올려지게 된다. 함수 선언부 위로 끌어올려지기 때문에 값이 할당되기 전에 호출될 수 있다.

let, const는 block scope이다. if, for, while 등의 block 구문 단위로 범위를 갖는다.

let, const의 경우에도 hoisting은 일어나지만 TDZ(Temporary Dead Zone)라는 개념 덕분에 할당되기 전에 호출하면 에러가 난다.

**문제7. 클로저는 무엇일까?**

```js
function outFunction() {
  const name = 'minjae';

  return function () {
    console.log(name);
  }
}

const printName = outFunction();
printName();
```

outFunction 실행후 name 변수는 소멸해야하지만 console.log(name)이 잘 동작한다.

console.log(name)에서 외부에 있는 name을 참조하고 있다. 이렇게 만들어진 것을 클로저라고 한다.

클로저는 함수와 함수가 선언된 어휘적 환경의 조합이라고도 한다.

**클로저를 이용한 private 효과**

```js
function Counter() {
  let count = 0;

  function increase() {
    count++;
  }

  function printCount() {
    console.log(`count: ${count}`)
  }

  return {
    increase,
    printCount,
  }
}

const counter = Counter();
counter.increase();
counter.increase();
counter.printCount(); // count: 2
// 외부에서는 count 변수에 접근할 수 없다.
console.log(counter.count); // undefined
```

increase, printCount 함수 내부에서 함수 외부에 있는 count 변수를 참조하고 있다. 

이런식으로 클로저를 이용해서 외부에 노출하면 안되는 값들을 보호하고 내부에서만 변경할 수 있게 사용할 수 있다.