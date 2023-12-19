---
date: '2023-12-19'
title: '자바스크립트 Event Loop'
categories: ['JS']
summary: 'Event Loop에 대해 정리한 글입니다.'
thumbnail: './til.jpg'
---

자바스크립트는 `단일 스레드` 입니다.

스레드가 하나라는 말은 동시에 하나의 작업만 처리할 수 있다는 뜻이고 자바스크립트 엔진이 단일 호출 스택을 사용한다는 뜻입니다.

자바스크립트가 구동되는 환경인 브라우저에서는 여러 개의 스레드가 사용됩니다.

브라우저는 자바스크립트 엔진이 제공하지 않는 웹 API를 제공하며 이를 통해서 비동기 방식으로 동작할 수 있습니다.

이러한 구동 환경이 단일 호출 스택을 사용하는 자바스크립트 엔진과 상호 연동하기 위한 장치가 `이벤트 루프` 입니다.

자바스크립트는 이벤트 루프를 이용해서 비동기 방식으로 동시성을 지원합니다.

<img alt="스크린샷 2023-12-19 오후 1 30 09" src="https://github.com/imb96/imb96.github.io/assets/71740032/8db3adba-67bb-4c16-91e2-5367e3235480">

### Heap
메모리 할당이 되는 곳, 선언현 변수와 함수가 담겨져 있습니다.
### Call Stack
코드가 실행될 때 쌓이는 곳입니다.

요청이 들어올 때마다 순차적으로 호출 스택을 담아서 처리합니다.

함수가 실행되면 Call Stack에 프레임이 생기고 처리가 끝나면 없어집니다.

### Web APIs
브라우저에서 제공하는 API로 비동기인 setTimeout, Promise등이 있습니다.

Call Stack에서 실행된 비동기 함수들은 모두 Web API를 호출합니다.

그리고 Web API는 콜백 함수를 Callback Queue에 넣습니다.


### Callback Queue 
비동기적으로 실행된 콜백 함수가 보관되는 곳입니다.
- **Microtask Queue**: Promise callback, async callback과 같은 코드.
- **Task Queue(Macrotask Queue)**: setTimeout, setInterval과 같은 코드.
- **Animation Frames**: requestAnimationFrame과 같은코드
<br />
큐 들의 실행 우선순위는 이렇습니다.

Microtask Queue -> Animation Frame -> Task Queue


### Event Loop
Call Stack과 Callback Queue들을 감시하면서 어떤게 비어져있고 어떤것을 채워야할지 정하며 수행합니다.

예를 들어서 DOM 요소에 이벤트를 등록하는 코드를 작성했다고 해보겠습니다.

```js
document.getElementById('btn').addEventListener('click', () => console.log('hi'));
```

1. getElementById 함수가 호출되어 해당 함수가 Call Stack에 들어가고 id가 'btn'인 요소를 찾아 반환하고 pop됩니다.

2. addEventListener('click', () => console.log('hi')) 이 코드가 Call Stack에 들어가고 실행되어

이벤트 핸들러 함수 () => console.log('hi')가 DOM 요소의 클릭 이벤트에 등록됩니다.

3. 이벤트 핸들러 함수는 Web API의 이벤트 리스너 목록에 등록되어 클릭 이벤트가 발생할 때까지 대기합니다.

4. 사용자가 해당 버튼을 클릭하면, 브라우저는 해당 이벤트를 감지하고 이벤트 핸들러 함수를 호출하기 위해 Web API에서 Callback Queue로 이동시킵니다.

5. Event Loop는 Call Stack이 비어있을 때, Microtask Queue (Promise의 경우)와 Callback Queue를 확인하고, 우선순위에 따라 Microtask Queue를 먼저 처리합니다.

6. 이벤트 핸들러 함수는 Callback Queue (Microtask Queue)에서 Call Stack으로 이동되어 실행됩니다.

따라서 클릭 이벤트가 발생하면 해당 이벤트 핸들러 함수가 Callback Queue를 통해 호출되어 실행되고,
console.log('hi')가 출력됩니다.

<br />

다음 코드로 동작 과정을 다시 살펴 보겠습니다.

```js
console.log('hi');
setTimeout(() => console.log('timeout'));
Promise.resolve('promise').then((res) => console.log(res));
console.log('bye');
```

1. console.log(’hi’) 가 CallStack에 쌓이게 되고 실행되고 제거됩니다.
2. setTimeout(() ⇒ console.log(’timeout’)) 이 Call Stack에 쌓이고 Callback 함수를 Web APIs로 보내면서 나옵니다.
3. Web APIs에서 () ⇒ console.log(’timeout’)을 Task Queue로 보냅니다.
4. Promise.resolve, then((res) ⇒ console.log(res))가 Call Stack에 쌓이고 (res) ⇒ console.log(res)를 Microtask Queue에 보냅니다.
5. console.log('bye')가 Call Stack에 쌓이게 되고 실행되고 제거됩니다.
6. Microtask Queue에있던 (res) ⇒ console.log(res)가 Call Stack에 쌓이게 되고 실행되고 제거됩니다.
7. Task Queue에 있던 () ⇒ console.log(’timeout’)가 Call Stack에 쌓이게 되고 실행되고 제거됩니다.
<br />

따라서 실행 결과는 이렇게 됩니다.

```
hi
bye
promise
timeout
```

참고

https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif

https://talkwithcode.tistory.com/89