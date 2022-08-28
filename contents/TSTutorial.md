---
date: '2022-08-27'
title: 'TypeScript Tutorials'
categories: ['TS']
summary: 'W3Schools TypeScript Toturials 따라해보기'
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
```ts
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
```ts
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
## TypeScript Union Type
### Union | (OR)
```ts
function print(code: string | number) {
	console.log(`my code is ${code}`)
}
print(404);
print('404');
```
### Union Type Error
```ts
function print(code: string | number) {
	console.log(`My code is ${code.toUpperCase()}.`) // error: Property 'toUpperCase' does not exist ontype 'string | number'
}
```
## TypeScript Functions
TS에는 함수 매개변수 및 반환 값을 입력하기 위한 특정 구문이 있다.
### Return Type
```ts
// 여기서 number는 이 함수가 숫자를 반환하도록 한다.
function getTime(): number {
	return new Date().getTime();
}
```
> 반환 유형이 정의되지 않은 경우 TS는 반환된 변수 또는 표현식의 유형을 통해 이를 추론하려 시도한다.
### Void Return Type
함수가 값을 반환하지 않을 때 사용
```ts
function print(): void {
	console.log('Hello!');
}
```
### Parameters
```ts
function multiply(a: number, b: number) {
	return a * b;
}
```
### Optional Parameters
기본적으로 TS는 모든 매개변수가 필수라고 가정하지만 명시적으로 선택사항으로 표시할 수 있다.
```ts
function add(a: number, b: number, c?: number) {
	return a + b + (c || 0);
}
```
### Default Parameters
기본값이 있는 매개변수의 경우 기본값은 타입 뒤에 온다.
```ts
function pow(value: number, exponent: number = 10) {
	return value ** exponent;
}
```
### Named Parameters
명명된 매개변수를 입력하는 것은 일반 매개변수를 입력하는 것과 동일한 패턴을 따른다.
```ts
function divide({ dividend, divisor }: { dividend: number, divisor: number }) {
  return dividend / divisor;
}
```
### Rest Parameters
나머지 매개변수는 일반 매개변수처럼 입력할 수 있지만 나머지 매개변수는 항상 배열이므로 타입은 배열이어야 한다.
```js
function add(a: number, b: number, ...rest: number[]) {
	return a + b + rest.reduce((p,c) => p+c, 0);
}
```
### Type alias
함수 타입은 alias 타입이 있는 함수와 별도로 지정할 수 있다.
이러한 유형은 화살표 함수와 유사하게 작성되었다.
```js
type Negate = (value: number) => number;
// 이 함수에서, 매개변수 value는 함수 Negate 타입에서 number타입이 자동으로 할당된다.
const negateFunction: Negate = (value) => value * -1;
```
## TypeScript Casting
### Casting as
변수를 캐스팅하는 간단한 방법은 as 키워드를 사용하는 것인데, 이는 주어진 변수의 유형을 직접 변경한다.
```ts
let x: unknown = 'hello'
console.log((x as string).length);
```
> 캐스팅은 실제로 변수 내의 데이터 유형을 변경하지 않는다. TS는 정확하지 않은 캐스트를 방지하기 위해 여전히 typecheck 캐스트를 시도한다. 예를 들어 TS는 데이터를 변환하지 않고는 문자열을 숫자로 캐스팅하는 것이 의미가 없다는 것을 알고 에러가 발생한다.
```ts
console.log((4 as string).length); // Error
```
### Casting <>
<>를 사용하는 것은 as로 캐스팅하는 것과 동일하게 작동한다.
```ts
let x: unknown = 'hello';
console.log((<string>x).length;)
```
> 이러한 타입의 캐스팅은 React 파일 작업과 같이 TSX에서 작동하지 않습니다.
### Force casting
캐스팅할 때 TS가 던질 수 있는 타입 오류를 재정의하려면 먼저 unknown으로 캐스트한 다음 대상 타입으로 캐스트한다.
```ts
let x = 'hello';
console.log(((x as unknown) as number).length); // x is not actually a number so this will return undefined
```
## TypeScript Classes
TS는 자바스크립트 클래스에 유형 및 가시성 수정자를 추가한다.
### Members: Type
클래스의 멤버(속성 및 메서드)는 변수와 유사한 타입을 사용하여 타입이 지정된다.
```ts
class Person {
	name: string;
}
const person = new Person();
person.name = "Minjae";
```
### Members: Visibility
> TS에는 세 가지 주요 가시성 수정자가 있다.
- public - (default) 어디에서나 클래스 멤버에 대한 접근을 허용.
- private - 클래스 내에서 클래스 멤버에 대한 접근만 허용.
- protected - 자신과 그것을 상속하는 모든 클래스에서 클래스 멤버에 대한 접근을 허용
```ts
class Person {
	private name: string;

	public constructor(name: string) {
		this.name = name;
	}
	public getName(): string {
		return this.name;
	}
}
const person = new Person("Minjae");
console.log(person.getName()); // person.name isn't accessible from outside the class since it's private
```
> 클래스의 this 키워드는 일반적으로 클래스의 인스턴스를 나타낸다.
### Parameter Properties
TS는 매개변수에 가시성 수정자를 추가하여 생성자에서 클래스 멤버를 정의하는 편리한 방법을 제공한다.
```ts
class Person {
	// name 은 private한 멤버 변수
	public constructor(private name: string) {}
	public getName(): string {
		return this.name;
	}
}
const person = new Person("Minjae");
console.log(person.getName());
```
### Readonly
배열과 유사하게 readonly 키워드는 클래스 멤버가 변경되는 것을 방지할 수 있다.
```ts
class Person {
	private readonly name: string;
	public constructor(name: string) {
		// name은 이 초기화 이후에 변경할 수 없다. 이 정의는 선언 또는 생성자에 있어야한다.
		this.name;
	}
	public getName(): string {
		return this.name;
	}
}
const person = new Person("Minjae");
console.log(person.getName());
```
## TypeScript Basic Generics
제네릭을 사용하면 사용하는 타입을 명시적으로 정의할 필요가 없는 클래스, 함수 및 타입 alias를 만드는 데 사용할 수 있는 '타입 변수'를 만들 수 있다. 제네릭을 사용하면 재사용 가능한 코드를 더 쉽게 작성할 수 있다.
### Function
함수가 있는 제네릭은 사용 및 반환된 타입을 보다 정확하게 나타내는 보다 일반화된 메서드를 만드는 데 도움이 된다.
```ts
function createPair<S, T>(v1: s, v2: T): [S, T] {
	return [v1, v2];
}
console.log(createPair<string, number>('minjae', 27)); // ['minjae', 27];
```
>TS는 함수 매개변수에서 일반 매개변수의 유형을 추론할 수도 있다.
### Class
제네릭을 사용하여 Map과 같은 일반화된 클래스를 만들 수 있다.
```ts
class NamedValue<T> {
	private _value: T | undefined;
	constructor(private name: string) {}
	
	public setValue(value: T) {
		this._value = value;
	}

	public getValue(): T | undefined {
		return this._value;
	}

	public toString(): string {
		return `${this.name}: ${this._value}`;
	}
}
let value = new NamedValue<number>('myNumber');
value.setValue(10);
console.log(value.toString()); // myNumber: 10
```
### Type Alias
타입 alias를 사용하면 더 재사용 가능한 유형을 만들 수 있다.
```ts
type Wrapped<T> = { value : T };
const wrappedValue: Wrapped<number> = { value: 10 }
```
### Default Value
제네릭에는 다른 값이 지정되거나 추론되지 않는 경우 적용되는 기본값이 할당 될 수있다.
```ts
class NamedValue<T = string> {
	private _value: T | undefined;

	constructor(private name: string) {}

	public setValue(value: T) {
		this._value = value;
	}

	public getValue(): T | undefined {
		return this._value;
	}

	public toString(): string {
		return `${this.name}: ${this._value}`
	}
}
let value = new NamedValue('myNumber');
value.setValue('myValue');
console.log(value.toString()); // myNumber: myValue
```
### Extends
제약 조건을 제네릭에 추가하여 허용되는 것을 제한할 수 있다. 제약 조건을 사용하면 제네릭 형식을 사용할 때 보다 구체적인 형식에 의존할 수 있다.
```ts
function createLoggedPair<S extends string | number, T extends string | number>(v1: S, v2: T): [S, T] {
	console.log(`creating pair: v1 = '${v1}', ${v2}'`);
	return [v1, v2];
}
```
## TypeScript Utility Type
TS는 일반적으로 유틸리티 타입이라고 하는 몇 가지 일반적인 타입 조작에 도움이 되는 많은 타입과 함께 제공된다.
### Partial
객체의 모든 속성을 선택 사항으로 변경한다.
```ts
interface Point {
	x: number;
	y: number;
}
let pointPart: Partial<Point> = {}; 'Partial' 은 x 와 y를 선택사항으로 허용한다.
pointPart.x = 10;
```
### Required
객체의 모든 속성을 필수로 변경한다.
```ts
interface Car{
	make: string;
	model: string;
	mileage?: number;
}
let myCar: Required<Car> {
	make: 'Ford',
	model: 'Focus',
	mileage: 12000 // Required는 mileage를 강제로 정의한다.
}
```
### Record
특정 키 타입 및 값 타입으로 객체 타입을 정의하는 바로가기이다.
```ts
const nameAgeMap: Record<string, number> = {
	'Alice': 21,
	'Bob': 25
};
```
> Record<string, number> 는 동등하다 { [key: string]: number}
### Omit
객체 유형에서 키를 제거한다.
```ts
interface Person {
	name: string;
	age: number;
	location?: string;
}
const bob: Omit<Person, 'age' | 'location'> = {
	name: 'Bob'
	// Omit은 타입에서 age, location을 제거했으며 여기에서 정의할 수 없다.
}
```
### Pick
객체 타입에서 지정된 키를 제외한 모든 키를 제거한다.
```ts
interface Person {
	name: string;
	age: number;
	location?: string;
}
const bob: Pick<Person, 'name'> = {
	name: 'Bob'
	// 'Pick'은 name 만 유지하므로 타입에서 age와 location이 제거되었고 여기에서 정의할 수 없다.
}
```

### Exclude
Union에서 타입을 제거한다.
```ts
type Primitive = string | number | boolean
const value: Exclude<Primitive, string> = true; // Exclude가 타입에서 문자열을 제거했기 때문에 여기에 문자열을 사용할 수 없습니다.
```
### ReturnType
함수 타입의 함수 타입을 반환한다.
```js
type PointGenerator = () => { x: number, y: number };
const point: ReturnType<PointGenerator> = {
	x: 10,
	y: 20
};
```
### Parameters
함수 타입의 매개변수 타입을 배열로 반환한다.
```js
type PointPrinter = (p: { x: number; y: number; }) => void;
const point: Parameters<PointPrinter>[0] = {
	x: 10,
	y: 20
}
```
## TypeScript Keyof
객체 타입에서 키 타입을 추출하는 데 사용되는 키워드
### keyof 명시적 키 사용
명시적 키가 있는 객체 타입에 사용되는 경우 keyof는 해당 키를 사용하여 union 타입을 만든다.
```ts
interface Person {
	name: string;
	age: number;
}
// 여기서 keyof Person은 'name'과 'age'의 union(공용) 타입을 생성하며 다른 문자열은 허용되지 않는다.
function printPersonProperty(person: Person, property: keyof Person) {
	console.log(`Printing person property ${property}: "${person[proprty]}"`);
}
let person = {
	name: "Max",
	age: 27
};
printPersonProperty(person, "name"); // Printing person property name: "Max"
```
## TypeScript Null 및 Undefined
TS에는 null 또는 undefined값을 처리하는 강력한 시스템이 있다.
> 기본적으로 null 과 undefined 처리는 비활성화 되어 있으며 strictNullChecks를 true로 설정하여 활성화 할 수 있다. 
### Types
null과 undefined는 기본 타입이며 string 같은 다른 타입처럼 사용할 수 있다.
```ts
let value: string | undefined | null = null;
value = 'hello';
value = undefined;
```
> strictNullChecks가 활성화되면 undefined 값이 타입에 명시적으로 추가되지 않는 한 TS에서 값을 설정해야 한다.
### Optional Chaining
옵셔널 체이팅은 TypeScript의 null처리와 잘 작동하는 JS 기능이다. 이를 통해 간결한 구문으로 존재하거나 존재하지 않을 수 있는 객체의 프로퍼티에 접근할 수 있다. 프로퍼티에 접근할떄 .? 연산자와 함께 사용할 수 있다.
```ts
interface House {
	sqft: number;
	yard?: {
		sqft: number;
	};
}
function printYardSize(house: House) {
	const yardSize = house.yard?.sqrt;
	if(yardSize === undefined) {
		console.log('No yard');
	}else {
		console.log(`Yard is ${yardSize} sqft`);
	}
}
let home: House = {
	sqft: 500;
};
printYardSize(home): // 'No yard'
```
### Nullish Coalescence
TS의 null 처리와도 잘 작동하는 JS 기능이다. null 또는 undefined를 처리할 때 특히 대체할 수 있는 표현식을 작성할 수 있다. 이는 표현식에서 다른 falsy 값이 발생할 수 있지만 여전히 유효한 경우에 유용하다. &&연산자를 사용하는 것과 유사하게 표현식에서 ??연산자를 사용할 수 있다.
### Null Assertion
TS의 추론시스템은 완벽하지 않다. null 또는 undefined의 값의 가능성을 무시하는 것이 합리적일 때가 있다. 이를 수행하는 쉬운 방법은 캐스팅을 사용하는 것이지만 편리하게도 TS에도 편리한 연산자 ! 가 있다.
```ts
function getValue(): string | undefined {
	return 'hello';
}
let value = getValue();
console.log('value length: ' + value!.length);
```
> 캐스팅과 마찬가지로 이것은 안전하지 않을 수 있으므로 주의해서 사용해야 한다.
### Array bounds handling
strictNullChecks가 활성화된 경우에도 기본적으로 TS는 배열이 undefined값을 반환하지 않는다고 가정한다. (undefined가 배열 타입의 일부가 아닌 경우)
noUncheckedIndexedAccess를 사용하여 이 동작을 변경할 수 있다.
```ts
let array: number[] = [1,2,3];
let value = array[0]; // `noUncheckedIndexedAccess` 를 사용하면 `number | undefined` 타입을 갖는다.
```