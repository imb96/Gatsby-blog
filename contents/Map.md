---
date: '2022-07-20'
title: 'Map'
categories: ['JS']
summary: 'Map에 대해'
thumbnail: './DeepDive.png'
---
> JavaScrpitDeepDive를 읽고 정리한 글입니다.

Map 객체는 키와 값의 쌍으로 이루어진 컬렉션이다. Map 객체는 객체와 유사하지만 차이가 있다.

구분 객체 Map 객체
키로 사용할 수 있는 값 문자열 또는 심벌 값 객체를 포함한 모든 값
이터러블 X O
요소 개수 확인 Object.keys(obj).length map.size
Map 객체는 Map 생성자 함수로 생성한다. Map 생성자 함수에 인수를 전달하지 않으면 빈 Map 객체가 생성된다.

```
const map = new Map();
console.log(map);	// Map(0) {}

```

Map 생성자 함수는 이터러블을 인수로 전달받아 Map 객체를 생성한다.

이때 인수로 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 한다.

```
const map1 = new Map([['key1', 'value1'],['key2', 'value2']]);
console.log(map1);	// Map(2) {"key1" => "value1", "key2" => "value2"}
const map2 = new Map([1, 2])	// TypeError: Iterator value 1 is not an entry object

```

Map 생성자 함수의 인수로 전달한 이터러블에 중복된 키를 갖는 요소가 존재하면 값이 덮어써지기 때문에

Map 객체에는 중복된 키를 갖는 요소가 존재할 수 없다.

```
const map = new Map([['key1', 'value1'],['key1', 'value2']]);
console.log(map)	// Map(1) {"key1" => "value2"}

```

Map 객체의 요소 개수를 확인할 때는 Map.prototype.size 프로퍼티를 사용한다.

```
const {size} = new Map([['key1', 'value1'],['key2', 'value2']]);
console.log(size)	// 2

```

Map 객체에 요소를 추가할 때는 Map.prototype.set 메서드를 사용한다.

```
const map = new Map();
console.log(map)	// Map(0) {}
map.set('key1', 'value1');
console.log(map)	// Map(1) {"key1" => "value1"}

```

set 메서드는 새로운 요소가 추가된 Map 객체를 반환하기 때문에 set 메서드를 호출한 후에 set 메서드를 연속적으로 호출할 수 있다.

Map 객체에는 중복된 키를 갖는 요소가 존재할 수 없기 때문에 중복된 키를 갖는 요소를 추가하면 값이 덮어써지며 에러가 발생하지 않는다.

객체는 문자열 또는 심벌 값만 키로 사용할 수 있다. 하지만 Map 객체는 키 타입에 제한이 없다.

따라서 객체를 포함한 모든 값을 키로 사용할 수 있다.

```
const map = new Map();
const lee = {name: 'Lee'};
const kim = {name: 'Kim'};
// 객체도 키로 사용할 수 있다.
map.set(lee, 'developer')
   .set(kim, 'designer')
console.log(map);
// Map(2) {{name: "Lee"} => "developer", {name: "Kim"} => "designer"}

```

Map 객체에 특정 요소가 존재하는지 확인하려면 Map.prototype.has 메서드를 사용한다.

has 메서드는 특정 요소의 존재 여부를 나타내는 Boolean 값을 반환한다.

```
const lee = {name: 'Lee'};
const kim = {name: 'Kim'};
const map = new Map([[lee, 'developer'],[kim, 'designer']]);
console.log(map.has(lee));	// true
console.log(map.has('key'));	// false

```

Map 객체의 요소를 삭제하려면 Map.prototype.delete 메서드를 사용한다.

delete 메서드는 삭제 성공 여부를 나타내는 Boolean 값을 반환한다.

```
const lee = {name: 'Lee'};
const kim = {name: 'Kim'};
const map = new Map([[lee, 'developer'],[kim, 'designer']]);
map.delete(kim);
console.log(map);	// Map(1) {{name: "Lee"} => "developer"}

```

존재하지 않는 키로 Map 객체의 요소를 삭제하려 하면 에러 없이 무시된다.

delete 메서드는 삭제 성공 여부를 나타내는 불리언 값을 반환하기 때문에 set 메서드와 달리 연속적으로 호출할 수 없다.

Map 객체의 요소를 일괄적으로 삭제하려면 Map.prototype.celar 메서드를 사용한다.

clear 메서드는 언제나 undefined를 반환한다.

Map 객체의 요소를 순회하려면 Map.prototype.forEach 메서드를 사용한다.

Array.prototype.forEach 메서드와 유사하게 콜백 함수와 forEach 메서드의 콜백 함수 내부에서 this로 사용될 객체를 인수로 전달한다. 이때 콜백 함수는 3개의 인수를 전달받는다.

첫 번째 인수: 현재 순회 중인 요소값
두 번째 인수: 현재 순회 중인 요소키
세 번째 인수: 현재 순회 중인 Map 객체 자체
Map 객체는 이터러블이다. 따라서 for...of 문으로 순회할 수 있으며, 스프레드 문법과 배열 디스트럭처링 할당의 대상이 될 수도 있다.

Map 객체는 이터러블이면서 동시에 이터레이터인 객체를 반환하는 메서드를 제공한다.

Map 메서드 설명
Map.prototype.keys Map 객체에서 요소키를 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환한다.
Map.prototype.values Map 객체에서 요소값을 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환한다.
Map.prototype.entries Map 객체에서 요소키와 요소값을 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환한다.

```
const lee = {name: 'Lee'};
const kim = {name: 'Kim'};
const map = new Map([[lee, 'developer'],[kim, 'designer']]);

// Map.prototype.keys는 Map 객체에서 요소키를 값으로 갖는 이터레이터를 반환한다.
for(const key of map.keys()) {
	console.log(key);	// {name: "Lee"} {name: "Kim"}
}

// Map.prototype.values는 Map 객체에서 요소값을 값으로 갖는 이터레이터를 반환한다.
for(const value of map.values()) {
	console.log(value);	// developer designer
}

// Map.prototype.entries는 Map 객체에서 요소키와 요소값을 값으로 갖는 이터레이터를 반환한다.
for(const entry of map.entries()) {
	console.log(entry);	// [{name: "Lee"}, "developer"] [{name: "Kim"}, "designer"]
}
```