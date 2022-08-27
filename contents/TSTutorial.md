---
date: '2022-08-27'
title: 'TypeScript Tutorials'
categories: ['TS']
summary: 'TypeScript Toturials'
thumbnail: './ts1.jpeg'
---
# TypeScript Tutorials
“타입스크립트는 타입이 정의된 자바스크립트의 상위집합이다”
## TypeScript Simple Types
JS와 TS에는 세 가지 주요 기본 요소가 있다.
- boolean - true or false 값
- number - 정수 및 부동 소수점 값
- string - 문자열 값
### 타입 할당
### 명시적 타입
```ts
let lastName: string = "Minjae";
```
명시적 타입 할당은 읽기 쉽고 의도적이다.
### 암시적 타입
```ts
let lastName: string = "Minjae";
```
> TS에서 값 유형을 “추측”하는 것을 타입 추론이라고 한다.
암시적 타입은 TS가 값을 유추 하도록 한다.
암시적 타입 할당은 더 짧고 유형이 빠르며 개발 및 테스트할 때 자주 사용된다.
## TypeScript Special Types
### Type: any
any는 타입 검사를 비활성화 하고 모든 유형을 효과적으로 사용할 수 있게 한다.
### Type: unknown
any와 비슷하지만 더 안전하다.
unknown은 입력되는 데이터의 타입을 모를 때 가장 잘 사용된다. 나중에 타입을 추가하려면 캐스팅해야 한다.
### Type: never
정의될 때마다 오류를 던진다.
### Type: undefined, null
JS의 undefined, null을 참조하는 타입.
## TypeScript Arrays
```ts
const names: string[] = [];
names.push("minjae"); // no error
names.push(3); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.
```
### readonly
readonly 키워드는 배열이 변경되는 것을 방지한다.
```
const names: readonly string[] = ["minjae"];
names.push('minter'); // Error: Property 'push' does not exist on type 'readonly string[]'.
```

### 타입추론
TS는 값이 있는 경우 배열의 유형을 추론할 수 있다.
```ts
const numbers = [1,2,3]; // number[] 타입으로 추론된다
numbers.push(4); // no error
numbers.push('3'); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.
let head: number = numbers[0]; // no error
```
## TypeScript Tuples
튜플은 각 인덱스에 대해 미리 정의된 길이와 유형이 지정된 배열.
```ts
let Tuple: [number, boolean, string];
Tuple = [5, false, 'Thanks to visiting my Blog']
```
순서가 중요
### readonly tuple
```ts
const readonlyTuple: readonly [number, boolean, string = [5, true, 'Thanks to visiting my Blog'];
```
### named tuple
네임드 튜플을 사용하면 각 인덱스에서 값에 대한 컨텍스트를 제공할 수 있다.
```ts
const graph: [x: number, y: number] = [55.2, 41.3];
```
### destructuring tuple
튜플은 배열이므로 구조분해할당 할 수 있다.
```ts
const graph : [x: number, y: number] = [55.2, 41.3];
const [x, y] = graph;
```
## TypeScript Object Type
```ts
const car: { type: string, model: string, tear: number } = {
	type: 'Mercedes-Benz',
	model: 'S-Class',
  tear: '1954'
}
```
### 타입 추론
TS는 값을 기반으로 속성 유형을 추론할 수 있다.
```ts
const car = {
	type: "Mercedes-Benz",
};
car.type = "BMW"; // no error
car.type = 2; // Error: Type 'number' is not assignable to type 'string'.
```
### optional properties
```ts
const car: { type: string, mileage?: number } = { // no error
	type: "BMW"
};
car.mileage = 2000;
```
### index signatures
인덱스 시그니처는 정의된 속성 목록이 없는 객체에 사용할 수 있다.
```
const nameAgeMap: { [index: string]: number } = {};
nameAgeMap.Jack = 25; // no error
nameAgeMap.Mark = "Twenty"; // Error: Type 'string' is not assignable to type 'number'.
```
## TypeScript Enums
Enums 는 상수 그룹을 나타내는 특별한 “클래스”다
Enums 는  StringEnums 와 NumericEnums가 있다.
### NumericEnums - default
기본적으로 Enumssms 첫 번째 값을 0으로 초기화하고 각 추가 값에 1을 추가한다.
```ts
enum CardinalDirections {
	North,
	East,
  South,
  West
}
let currentDirection = CardinalDirections.North;
// logs 0
console.log(currentDirection);
// 'North' 가 유효한 enums가 아니므로 에러 발생
currentDirection = 'North'; // Error: "North" is not assignable to type 'CardinalDirections'.
```
### NumericEnums-Initialized
첫 번째 숫자 enums의 값을 설정하고 그 값에서 자동 증가하도록 할 수 있다.
```ts
enum CardinalDirections {
	North = 1,
	East,
  South,
  West
}
// logs 1
console.log(CardinalDirections.North);
// logs 4
console.log(CardinalDirections.West);
```

### NumericEnums-Fully Initialized
각 Enums에 고유한 숫자 값을 할당할 수 있다. 그러면 값이 자동으로 증가하지 않는다.
```ts
enum StatusCodes {
	NotFound = 404,
	Success = 200,
	Accepted = 202,
	BadRequest = 400
}
// logs 200
console.log(StatusCodes.Success);
```
### String Enums
```ts
enum CardinalDirections {
	North = 'North',
	East = 'East',
  South = 'South',
  West = 'West'
}
log 'South'
console.log(CardinalDirections.South)
```
## TypeScript Type Aliases and Interfaces
TS를 사용하면 타입을 사용하는 변수와 별도로 타입을 정의할 수 있다.
Aliases 및 Interface를 사용하면 서로 다른 변수/객체 간에 타입을 쉽게 공유할 수 있다.
### Type Aliases
사용자 지정 이름으로 타입을 정의할 수 있다.
Type Aliases는 string 같은 기본 유형이나 .Objects arrays 같은 복잡한 유형에 사용할 수 있다.
```ts
type CarYear = number
type CarType = string
type CarModel = string
type Car = {
	year: CarYear,
  type: CarType,
  model: CarModel
}
const carYear: CarYear = 2002
const carType: CarType = "Benz"
const carModel: CarModel = "S-Class"
const car: Car = {
	year: CarYear,
  type: CarType,
  model: CarModel
};
```
interface는 타입에만 적용 된다는 점을 제외하면 type aliases와 비슷하다
```ts
interface Rectangle {
	height: number,
	width: number
}
const rectangle: Ractangle = {
	height: 120;
	width: 80;
}
```
### 인터페이스 확장
> 인터페이스를 확장 한다는 것은 원본과 동일한 속성에 새로운 것을 더한 새 인터페이스를 생성한다는 의미이다.
```ts
interface Rectangle {
	height: number,
	width: number,
}
interface ColorRectangle extends Rectangle {
  color: string
}
const colorRectangle: ColorRectangle = {
  height: 20,
  width: 10,
  color: "red"
};
```