---
date: '2022-09-26'
title: '이벤트 전파'
categories: ['JS']
summary: '이벤트전파에 대해'
thumbnail: './DeepDive.png'
---
> JavaScrpitDeepDive를 읽고 정리한 내용입니다.
## 이벤트 전파
DOM 트리 상에 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파된다. 이를 이벤트 전파라고 한다.
```html
<html>
  <body>
    <ul id="fruits">
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
  </body>
</html>
```
ul 요소의 두 번째 자식인 li 요소를 클릭하면 클릭 이벤트가 발생한다. 이떄 생성된 이벤트 객체는 이벤트를 발생시킨 DOM 요소인 이벤트 타깃을 중심으로 DOM 트리를 통해 전파된다. 이벤트 전파는 이벤트 객체가 전파되는 방향에 따라 3단계로 구분할 수 있다.
- 캡처링 단계 (capturing phase): 이벤트가 상위 요소에서 하위 요소 방향으로 전파
- 타깃 단계 (target phase): 이벤트가 이벤트 타깃에 도달
- 버블링 단계 (bubbling phase): 이벤트가 하위 요소에서 상위 요소 방향으로 전파
예를 들어, 다음 예제와 같이 ul 요소에 이벤트 핸들러를 바인딩하고 ul 요소의 하위 요소인 li 요소를 클릭하여 이벤트를 발생시켜 보자. 이떄 이벤트 타깃(event.target)은 li요소이고 커런트 타깃(event.currentTarget)은 ul 요소이다.
1. li 요소를 클릭하면 클릭 이벤트가 발생하여 이벤트 객체가 생성되고 클릭된 li 요소가 이벤트 타깃이 된다. 이때 클릭 이벤트 객체는 window에서 시작해서 이벤트 타깃 방향으로 전파된다. (캡처링단계)
2. 이후 이벤트 객체는 이벤트를 발생시킨 이벤트 타깃에 도달한다. (타깃 단계)
3. 이후 이벤트 객체는 이벤트 타깃에서 시작해서 window 방향으로 전파된다. (버블링 단계)
```html
<html>
  <body>
    <ul id="fruits">
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      const $fruits = document.getElementById('fruits');
      const $banana = document.getElementById('banana');
      // #fruits 요소의 하위 요소인 li 요소를 클릭한 경우 캡처링 단계의 이벤트를 캐치한다.
      $fruits.addEventListener('click', e => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 1: 캡처링 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
      }, true); // 캡처링 단계의 이벤트를 캐치하려면 addEventListener 메서드의 3번쨰 인수로 true를 전달
      // 타깃 단계의 이벤트를 캐치한다.
      $banana.addEventListener('click', e => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 2: 타깃 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLLIElement]
      });
      // 버블링 단계의 이벤트를 캐치한다.
      $fruits.addEventListener('click', e => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
      });
    </script>
  </body>
</html>
```
이처럼 이벤트는 이벤트를 발생시킨 이벤트 타깃은 물론 상위 DOM 요소에서도 캐치할 수 있다. 즉, DOM 트리를 통해 전파되는 이벤트는 이벤트 패스(이벤트가 통과하는 DOM 트리 상의 경로, Event.prototype.composedPath 메서드로 확인할 수 있다.) 에 위치한 모든 DOM 요소에서 캐치할 수 있다.
대부분의 이벤트는 캡처링과 버블링을 통해 전파되지만 다음 이벤트는 버블링을 통해 전파되지 않는다. (event.bubbles === false)
- 포커스 이벤트: focus/blur
- 리소스 이벤트: load/unload/abort/error
- 마우스 이벤트: mouseenter/mouseleave
다음은 캡처링 단계의 이벤트와 버블링 단계의 이벤트를 캐치하는 이벤트 핸들러가 혼용되는 경우다.
```html
<html>
  <head>
    <style>
      html, body { height: 100%; }
    </style>
  </head>
  <body>
    <p>버블링과 캡처링 이벤트 <button>버튼</button></p>
    <script>
      // 버블링 단계의 이벤트 캐치
      document.body.addEventListener('click', () => {
        console.log('Handler for body.');
      });
      // 캡처링 단계의 이벤트 캐치
      document.querySelector('p').addEventListener('click', () => {
        console.log('Handler for paragraph.');
      }, true);
      // 타깃 단계의 이벤트를 캐치
      document.querySelector('button').addEventListener('click', () => {
        console.log('Handler for button.');
      })
    </script>
  </body>
</html>
```
위 예제의 경우 body 요소는 버블링 단계의 이벤트만을 캐치하고 p 요소는 캡처링 단계의 이벤트만 캐치한다. 이벤트는 캡처링 - 타깃 - 버블링 단계로 전파되므로 만약 button 요소에서 클릭 이벤트가 발생하면 먼저 캡처링 단계를 캐치하는 p 요소의 이벤트 핸들러가 호출되고, 그 후 버블링 단계의 이벤트를 캐치하는 body 요소의 이벤트 핸들러가 순차적으로 호출된다.
콘솔:
```log
Handler for paragraph.
demo.html:28 Handler for button.
demo.html:16 Handler for body.
```
만약 p요소에서 클릭 이벤트가 발생하면 캡처링 단계를 캐치하는 p 요소의 이벤트 핸들러가 호출되고 버블링 단계를 캐치하는 body 요소의 이벤트 핸들러가 순차적으로 호출된다.
```log
Handler for paragraph.
demo.html:16 Handler for body.
```