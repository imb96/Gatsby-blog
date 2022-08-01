---
date: '2022-07-30'
title: 'Set'
categories: ['JS']
summary: '자바스크립트의 Set에 대해'
thumbnail: './DeepDive.png'
---
> JavaScrpitDeepDive를 읽고 정리한 글입니다.

Set 객체는 중복되지 않는 유일한 값 들의 집합이다.
Set 객체는 배열과 유사하지만 Set 객체는 동일한 값을 중복하여 포함할 수 없고 요소 순서에 의미가 없다. 또한 인덱스로 요소에 접근할 수 없다.

Set 객체는 Set 생성자 함수로 생성한다. Set 생성자 함수에 인수를 전달하지 않으면 빈 Set 객체가 생성된다.

```js
const set = new Set();
console.log(set);    // Set(0) {}

```

Set 생성자 함수는 이터러블을 인수로 전달받아서 Set 객체를 생성한다. 이때 이터러블의 중복된 값은 Set 객체에 요소로 저장되지 않는다.

```js
const set1 = new Set([1,2,3,4,4,5]);
console.log(set1)    // Set(3) {1,2,3,4,5}

const set2 = new Set('javascript');
console.log(set2);    // Set(9) { 'j', 'a', 'v', 's', 'c', 'r', 'i', 'p', 't' }

```

Set 객체의 요소 개수를 확인할 때는 Set.prototype.size 프로퍼티를 사용한다.

```js
const {size} = new Set([1,4,3,4,3,2,4,5]);
console.log(size)    // 5

```

size 프로퍼티는 setter 함수 없이 getter 함수만 존재하는 접근자 프로퍼티 이기 때문에 size 프로퍼티에 숫자를 할당하여 Set 객체의 요소 개수를 변경할 수 없다.

Set 객체에 요소를 추가할 때는 Set.prototype.add 메서드를 사용한다.

```js
const set = new Set();
set.add(10);
console.log(set)    // Set(1) { 10 }

```

add 메서드는 새로운 요소가 추가된 Set 객체를 반환하기 때문에 add 메서드를 연속적으로 호출할 수 있다.
Set 객체에 중복된 요소를 추가하려고 하면 에러가 발생되지 않고 무시된다.
Set 객체는 객체나 배열과 같이 자바스크립트의 모든 값을 요소로 저장할 수 있다.

Set 객체에 특정 요소가 존재하는지 확인하려면 Set.prototype.has 메서드를 사용한다.
has 메서드는 특정 요소의 존재 여부를 확인하여 Boolean 값을 반환한다.

```js
const set = new Set([1,2]);
console.log(set.has(1));    // true
console.log(set.has(3));    // false

```

Set 객체의 특정 요소를 삭제하려면 Set.prototype.delete 메서드를 사용한다.
delete 메서드는 특정 요소의 존재 여부를 확인하여 Boolean 값을 반환한다.
Set 객체는 순서에 의미가 없기 때문에 delete 메서드는 인수로 삭제하려는 요소값을 전달 받아야 한다.

```js
const set = new Set([1,2]);
set.delete(1);
console.log(set);    // Set(1) { 2 }

```

delete 메서드는 삭제 성공 여부를 Boolean 값으로 반환하기 때문에 연속적으로 호출할 수 없다.

Set 객체의 모든 요소를 일괄적으로 삭제하려면 Set.prototype.clear 메서드를 사용한다.
clear 메서드는 항상 undefined를 반환한다.

```js
const set = new Set([1,3,5,7,9,2,4,6,8]);
set.clear();
console.log(set);    // Set(0) {}

```

Set 객체의 요소를 순회하려면 Set.prototype.forEach 메서드를 사용한다.
Array.prototype.forEach와 유사하게 콜백 함수와 forEach 메서드의 콜백 함수 내부에서 this로 사용될 객체를 인수로 전달한다.
이때 콜백 함수는 다음과 같이 3개의 인수를 전달받는다.

첫 번째 인수: 현재 순회 중인 요소값
두 번째 인수: 현재 순회 중인 요소값
세 번째 인수: 현재 순회 중인 Set 객체 자체
Set 객체는 이터러블이기 때문에 for...of 문으로 순회할 수 있고 스프레드 문법과 배열 디스트럭처링의 대상이 될 수도 있다.

```js
const set = new set([1,2,3]);

// Set 객체는 Set.prototype의 Symbol.iterator 메서드를 상속받는 이터러블이다.
console.log(Symbol.iterator in set);    // true

// 이터러블인 Set 객체는 for...of 문으로 순회할 수 있다.
for(const value of set) {
    console.log(value);    // 1 2 3
}

// 이터러블인 Set 객체는 스프레드 문법의 대상이 될 수 있다.
console.log([...set]);    // [1,2,3]

// 이터러블인 Set 객체는 배열 디스트럭처링 할당의 대상이 될 수 있다.
const [a, ...rest] = set;
console.log(a, rest);    // 1, [2, 3]
```