---
date: '2022-07-16'
title: 'Module'
categories: ['JS']
summary: '자바스크립트와 모듈에 대해'
thumbnail: './DeepDive.png'
---
> JavaScrpitDeepDive를 읽고 정리한 글입니다.

# Module
## 모듈의 일반적인 의미
모듈(module)이란 애플리케이션을 구성하는 개별적 요소로서 재사용 가능한 코드 조각을 말한다. 일반적으로 모듈은 기능을 기준으로 파일 단위로 분리한다. 이때 모듈이 성립하려면 모듈이 성립하려면 모듈은 자신만의 **파일 스코프(모듈 스코프)를 가질 수 있어야 한다.**

자신만의 파일 스코프를 갖는 모듈의 자산(모듈에 포함되어 있는 변수, 함수, 객체 등)은 기본적으로 비공개 상태다.
다시 말해, 자신만의 파일 스코프를 갖는 모듈의 모든 자산은 캡슐화되어 다른 모듈에서 접근할 수 없다. 즉, 모듈은 개별적 존재로서 애플리케이션과 분리되어 존재한다.

하지만 애플리케이션과 완전히 분리되어 개별적으로 존재하는 모듈은 재사용이 불가능하므로 존재의 의미가 없다. 모듈은 애플리케이션이나 다른 모듈에 의해 재사용되어야 의미가 있다. 따라서 **모듈은 공개가 필요한 자산에 한정하여 명시적으로 선택적 공개가 가능하다. 이름 export**라 한다.

공개(export)된 모듈의 자산은 다른 모듈에서 재사용할 수 있다. 이때 공개된 모듈의 자산을 사용하는 모듈을 모듈 사용자 (module consumer)라 한다. **모듈 사용자는 모듈이 공개한 자산 중 일부 또는 전체를 선택해 자신의 스코프 내로 불러들여 재사용할 수 있다. 이를 import라 한다.**

## 자바스크립트와 모듈
자바스크립트는 모듈이 성립하기 위해 필요한 파일 스코프와 import, export를 지원하지 않았다.
자바스크립트를 클라이언트 사이드, 즉 브라우저 환경에 국한하지 않고 범용적으로 사용하려는 움직임이 생기면서 모듈 시스템은 반드시 해결해야 하는 핵심 과제가 되었다. 이런 상황에서 제안된 것이 CommonJS와 AMD(Asynchronous Module Definition)다.

Node.js는 모듈 시스템의 사실상 표준인 CommonJS를 채택했고 독자적인 진화를 거쳐, 현재는 기본적으로 CommonJS 사양을 따르고 있다. 즉, Node.js는 ECMAScript 표준 사양은 아니지만 모듈 시스템을 지원한다. 따라서 Node.js 환경에서는 파일별로 독립적인 파일 스코프(모듈 스코프)를 갖는다.

## ES6 모듈(ESM)
ES6에서는 클라이언트 사이드 자바스크립트에서도 동작하는 모듈 기능을 추가했다.
ESM의 사용법은 간단하다 script 태그에 type="module" 어트리뷰트를 추가하면 로드된 자바스크립트 파일은 모듈로서 동작한다.
ESM임을 명확히 하기 위해 ESM의 파일 확장자는 mjs를 사용할 것을 권장한다.
```html
<script type="module" src="app.mjs"></script>
```
### 모듈 스코프
ESM은 독자적인 모듈 스코프를 갖는다. ESM이 아닌 일반적인 자바스크립트 파일은 script 태그로 분리해서 로드해도 독자적인 모듈 스코프를 갖지 않는다.

ESM은 파일 자체의 독자적인 모듈 스코프를 제공한다.
모듈 내에서 선언한 식별자는 모듈 외부에서 참조할 수 없다. 모듈 스코프가 다르기 때문이다.

### export 키워드
export 키워드는 선언문 앞에 사용한다. 이로써 변수, 함수, 클래스 등 모든 식별자를 export할 수 있다.
선언문 앞에 매번 export 키워드를 붙이는 것이 번거롭다면 export할 대상을 하나의 객체로 구성하여 한 번에 export할 수도 있다.

```js
// lib.mjs
const pi = Math.PI;

function square(x) {
  return x * x;
}

class Person {
  constructor(name) {
	this.name = name;
  }
}

// 변수, 함수 클래스를 하나의 객체로 구성하여 공개
export {pi, square, Person};
```

### import 키워드
다른 모듈에게 export한 식별자를 자신의 모듈 스코프 내부로 로드하려면 import 키워드를 사용한다. 다른 모듈이 export한 식별자 이름으로 import해야 하며 ESM의 경우 파일 확장자를 생략할 수 없다.

```js
// app.mjs
// 같은 폴더 내의 lib.mjs 모듈이 export한 식별자 이름으로 import 한다.
import { pi, square, Person} from './lib.mjs';

console.log(pi); // 3.141592653589793
console.log(square(10)); // 100
console.log(new Person('Kim')); // Person { name: 'Kim' }
```

```html
<!DOCTYPE html>
<html>
  <body>
    <script type="module" src="app.mjs"></script>
  </body>
</html>
```

위 예제의 app.mjs는 애플리케이션의 진입점 이므로 반드시 script 태그로 로드해야 한다. 하지만 lib.mjs는 app.mjs의 import 문에 의해 로드되는 의존성이다. 따라서 lib.mjs는 script 태그로 로드하지 않아도 된다.

모듈이 export한 식별자 이름을 일일이 지정하지 않고 하나의 이름으로 한 번에 import할 수도 있다. 이때 import되는 식별자는 as 뒤에 지정한 이름의 객체에 프로퍼티로 할당된다.

```js
// app.mjs
// lib.mjs 모듈이 export한 모든 식별자를 lib 객체의 프로퍼티로 모아 import 한다.
import * as lib from './lib.mjs';

console.log(lib.pi); // 3.141592653589793
console.log(lib.square(10)); // 100
console.log(new lib.Person('Kim')); // Person { name: 'Kim' }

```
모듈이 export한 식별자 이름을 변경하여 import할 수도 있다.

```js
// app.mjs
// lib.mjs 모듈이 export한 식별자 이름을 변경하여 import한다.
import { pi as Pick, square as sq, Person as P } from './lib.mjs';

console.log(PI); // 3.141592653589793
console.log(sq(2)); // 4
console.log(new P('Min')) // Person { name: 'Min' }

```
모듈에서 하나의 값만 export한다면 default 키워드를 사용할 수 있다. default 키워드를 사용하는 경우 기본적으로 이름 없이 하나의 값을 export한다.

```js
// lib.mjs
export default x => x * x;

```
default 키워드를 사용하는 경우 var, let, const 키워드는 사용할 수 없다.

```js
// lib.mjs
export default const foo = () => {};
// => SyntaxError: Unexpected token 'const'
// export default () => {};

```
default 키워드와 함께 export한 모듈은 {} 없이 임의의 이름으로 import한다.

```js
// app.mjs
import square from './lib.mjs';

console.log(square(3)); // 9
```