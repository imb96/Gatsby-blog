---
date: '2022-08-30'
title: '이펙티브 타입스크립트 스터디'
categories: ['TS', Study]
summary: '이펙티브 타입스크립트 스터디 1~50p'
thumbnail: './EFTS.png'
---
> Effective TypeScript를 읽고 질문하고 답변하며 공부한 내용입니다.
### Q: 타입스크립트에서 변수에 값을 할당하고 타입을 부여하는 방법에는 타입 선언과 타입 단언이 있는데 타입 단언보다 타입 선언을 사용하는게 나은 이유는 무엇일까요?
A: 타입 선언은 할당되는 값이 해당 인터페이스를 만족하는지 검사하고 그렇지 못한다면 오류를 표시하지만 타입 단언은 강제로 타입을 지정했으니 타입체크에게 오류를 무시하라고 하는 것이기 때문입니다.
타입선언과 타입단언 예제
```ts
interface Person {name: string}
const alice : Person = {name: 'Alice'} // 타입 선언
const bob = {name : 'Bob'} as Person // 타입 단언
const bob = <Person>{name: 'Bob'} // 타입 단언 .tsx파일(리액트 + 타입스크립트)에서 컴포넌트로 인식되기 때문에 현재 잘 쓰이지 않는다.
```
Q: 타입 단언이 꼭 필요한 경우는 어떤게 있을까요?
A: 타입 체커가 추론한 타입보다 개발자가 판단하는 타입이 더 정확할 때 필요한데 예를 들어 DOM 엘리먼트의 타입을 지정할 때, 타입스크립트는 DOM에 접근할 수 없기 때문에 타입 단언문을 사용해야합니다.
Q: 타입스크립트를 포함한 자바스크립트에서는 함수 표현식을 사용하는 것이 좋은데 그 이유는 무엇인가요?
A: 함수의 매개변수부터 반환값까지 전체를 함수 타입으로 선언하여 함수 표현식에 재사용할 수 있기 때문입니다.
예제:
```ts
type DiceRollFn = (sides: number) => number;
const rillDice: DiceRollFn = sides => {/*...*/}
```
Q: 함수에서 매개변수로 매핑할 수 있는 값을 제한하기 위해서 타입 시스템을 사용하는 것처럼 제네릭 타입에서 매개변수를 제한할 수 있는 방법은 무엇인가요?
A: 제네릭 타입에서 매개변수를 제한할 수 있는 방법은 extends를 사용하는 것입니다.
Extends를 이용하면 제너릭 매개변수가 특정 타입을 확장한다고 선언 할 수 있다.
제네릭 타입 예제:
```ts
function createPair<S, T>(v1: S, v2: T): [S, T] {
	return [v1, v2];
}
console.log(createPair<string, number>('minjae', 27)); // ['minjae', 27];
```
### 추가:
- 타입으로 쓰이는 this는 일명 ‘다향성 this’라고 불리는 this의 타입스크립트 타입이다.서브클래스의 메서드 체인을 구현할 때 유용하다. 51p
- 타입에서 `&` 는 인터섹션 `|` 는 유니온이다.51p
- As const 는 리터럴 또는 리터럴 표현식의 추론된 타입을 바꾼다. 51p
- extends는 서브클래스(class A extends B) 또는 서브타입(interface A extends B) 또는 제너릭 타입의 한정자(Generic <T extends number>)를 정의할 수 있다.51p
- in은 루프 또는 매핑(mapped)타입에 등장한다. 51p
- Typeof, this 그리고 많은 다른 연산자들과 키워드들은 타입 공간과 값 공간에서 다른 목적으로 사용될 수 있으며 차이점을 알고 구별하는 방법을 터득해야 한다.52p
```ts
interface Person {name: string}
const alice : Person = {name: 'Alice'} // 타입 선언
const bob = {name : 'Bob'} as Person // 타입 단언
const bob = <Person>{name: 'Bob'} // 타입 단언 .tsx파일(리액트 + 타입스크립트)에서 컴포넌트로 인식되기 때문에 현재 잘 쓰이지 않는다.
```
- 타입 단언보다 타입 선언을 사용하는 게 낫다.53p
이유: 타입 선언은 할당되는 값이 해당 인터페이스를 만족하는지 검사하고 그렇지 못한다면 오류를 표시하지만 타입 단언은 강제로 타입을 지정했으니 타입체크에게 오류를 무시하라고 하는 것이다.
- 타입 단언이 꼭 필요한 경우55p
타입 체커가 추론한 타입보다 개발자가 판단하는 타입이 더 정확할 때
예를 들어 DOM 엘리먼트의 타입을 지정할 때. 타입스크립트는 DOM에 접근할 수 없기 때문에 타입 단언문을 사용하는 것이 좋다.
타입스크립트보다 타입 정보를 더 잘 알고 있는 상황에서는 타입 단언문과 null 아님 단언문을 사용하면 된다.
- 객체 리터럴을 변수에 할당하거나 함수에 매개변수로 전달할 때 잉여 속성 체크가 수행된다. 잉여 속성 체크를 이용하면 기본적으로 타입 시스템의 구조적 본질을 해치지 않으면서도 객체 리터럴에 알 수 없는 속성을 허용하지 않음으로써 문제점을 방지할 수 있다.( 그래서 ‘엄격한 객체 리터럴 체크’라고도 불림) 잉여 속성 체크는 오류를 찾는 효과적인 방법이지만, 타입스크립트 타입 체커가 수행하는 일반적인 구조적 할당 가능성 체크와 역할이 다르다. 잉여 속성 체크에는 한계가 있다. 임시 변수를 도입하면 잉여 속성 체크를 건너뛸 수 있다.
- 자바스크립트(타입스크립트)에서는 함수 표현식을 사용하는 것이 좋다. 함수의 매개변수부터 반환값까지 전체를 함수 타입으로 선언하여 함수 표현식에 재사용할 수 있는 장점이 있기 때문.
```ts
type DiceRollFn = (sides: number) => number;
const rillDice: DiceRollFn = sides => {/*...*/}
```
- 함수 타입의 선언은 불필요한 코드의 반복을 줄인다. 
```ts
function add(a: number, b: number) {return a + b}
function sub(a: number, b: number) {return a - b}
function mul(a: number, b: number) {return a * b}
function div(a: number, b: number) {return a / b}
```
반복되는 함수 시그니처를 하나의 함수 타입으로 통합할 수도 있습니다.
```ts
type BinaryFn = (a: number, b: number) => number;
const add: BinaryFn = (a, b) => a + b;
const sub: BinaryFn = (a, b) => a - b;
const mul: BinaryFn = (a, b) => a * b;
const div: BinaryFn = (a, b) => a - b;
```
- 다른 함수의 시그니처를 참조하려면 typeof fn을 사용하면 된다.
- 타입스크립트에서 명명된 타입(named type)을 정의하는 방법은 두 가지가 있다.
```ts
type TState = {
	name: string;
	capital: string;
}
interface IState {
	name: string;
	capital: string;
}
```
- 타입과 인터페이스의 비슷한 점: 인덱스 시그니처를 사용할 수 있다. 함수타입을 정의할 수 있다. 제너릭이 가능하다. 인터페이스는 타입을 확장할 수 있고 타입은 인터페이스를 확장할 수 있다.
- 타입과 인터페이스의 다른점: 유니온 타입은 있지만 유니온 인터페이스라는 개념은 없다. 인터페이스는 타입을 확장할 수 있지만, 유니온은 할 수 없다. 인터페이스로 튜플과 비슷하게 구현하면 concat 과 같은 메서드들을 사용할 수 없다. 그러므로 튜플은 type 키워드로 구현하는 것이 낫다. 인터페이스는 보강(augment)이 가능하다.
```ts
interface IState {
	name: string;
	capital: string;
}
interface IState {
	population: number;
}
const wyoming: IState = {
	name: 'Wyoming',
	capital: 'Cheyenne',
	population: 500_000,
}; // 정상
```
이처럼 속성을 확장하는 것을 ‘선언 병합(declaration merging)’ 이라고 한다. 타입 선언 파일을 작성할 때는 선언 병합을 지원하기 위해 반드시 인터페이스를 사용해야 하며 표준을 따라야 한다.
- 매핑된타입은 배열의 필드를 루프 도는 것과 같은 방식. 이 패턴은 표준 라이브러리에서도 일반적으로 찾을 수 있으며, Pick이라 한다.
`type Pick<T,K> = { [k in K]: T[K };`
정의가 완전하지는 않지만 다음과 같이 사용할 수 있다.
`type TopNavState = Pick<State, ‘userId’ | ‘pageTitle’ | ‘recentFiles’>;`
여기서 Pick은 제네릭 타입이다. Pick을 사용하는 것은 함수를 호출하는 것과 마찬가지다. 마치 함수에서 두 개의 매개변수 값을 받아서 결과값을 반환하는 것처럼, Pick은 T와 K 두 가지 타입을 받아서 결과 타입을 반환한다.
- 값의 형태에 해당하는 타입을 정의하고 싶을 때
```ts
const INIT_OPTIONS = {
  width: 640,
  height: 480,
  color: '#00FF00',
  lebel: 'VGA',
};
interface Options {
	width: number;
  height: number;
  color: string;
  lebel: string;
}
```
이런 경우 typeof 를 사용하면 된다.
`type Options = typeof INIT_OPTIONS`
이 코드는 자바스크립트의 런타임 연산자 typeof를 사용한 것처럼 보이지만, 실제로는 타입스크립트 단계에서 연산되며 훨씬 더 정확하게 타입을 표현한다.
타입 정의를 먼저하고 값이 그 타입에 할당 가능하다고 선언하는 것이 좋다. 그렇게 해야 타입이 더 명확해지고, 예상하기 어려운 타입 변동을 방지할 수 있따.
- 함수에서 매개변수로 매핑할 수 있는 값을 제한하기 위해서 타입 시스템을 사용하는 것처럼 제네릭 타입에서 매개변수를 제한할 수 있는 방법이 필요하다.
제네릭 타입에서 매개변수를 제한할 수 있는 방법은 extends를 사용하는 것이다. Extends를 사용하면 제너릭 매개변수가 특정 타입을 확장한다고 선언 할 수 있다.

- 타입들 간의 매핑을 위해 타입스크립트가 제공한 도구들을 공부하면 좋다. 여기에는 key, typeof, 인덱싱, 매핑된 타입들이 포함된다.
- 제네릭 타입은 타임을 위한 함수와 같다. 타입을 반복하는 대신 제너릭 타입을 사용하여 타입들 간에 매핑을 하는 것이 좋다. 제너릭 타입을 제한하려면 extends를 사용하면 된다.
- 표준 라이브러리에 정의된 Pick, Partial, ReturnType 같은 제너릭 타입에 익숙해져야 한다.
- 자바스크립트 객체는 문자열 키를 타입의 값에 관계없이 매핑한다.
```js
const rocket = {
	name: 'Falcon 9',
	variant: 'Block 5',
	thrust: '7,607 kN',
};
```
타입스크립트에서는 타입에 ‘인덱스 시그니처’를 명시하여 유연하게 매핑을 표현할 수 있다.
```ts
type Rocket = {[property: string]: string};
const rocket: Rocket = {
	name: 'Falcon 9',
	variant: 'Block 5',
	thrust: '7,607 kN',
}; // 정상
```
[property: string]: string이 인덱스 시그니처이며, 다음 세 가지 의미를 담고 있다.
- 런타임 때까지 객체의 속성을 알 수 없을 경우에만 인덱스 시그니처를 사용하도록 합니다.
- 안전한 접근을 위해 인덱스 시그니처의 값 타입에 undefhined를 추가하는 것을 고려해야 한다.
- 가능하다면 인터페이스, Record, 매핑된 타입 같은 인덱스 시그니처보다 정확한 타입을 사용하는 것이 좋다.
- 인덱스 시그니처에 number를 사용하기보다 Array나 튜플, 또는 ArrayLike타입을 사용하는 것이 좋다.