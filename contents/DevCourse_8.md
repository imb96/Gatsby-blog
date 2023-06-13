---
date: '2023-06-13'
title: '[Day 8] JavaScript 주요 문법 (8)'
categories: ['DevCourse', 'TIL', 'JS', 'FE']
summary: '프로그래머스 데브코스 TIL'
thumbnail: './til.jpg'
---

> 프로그래머스 데브코스 프론트엔드 4기 과정중 몰랐던, 헷갈렸던 혹은 더 알고싶은 내용을 정리합니다. 😁

### `HTML`은 문서의 `의미`와 `구조`를 담당하고 `CSS`는 문서의 `표현`을 담당한다.

CSS에서 id와 class의 차이점은?

- id의 정의 방법은 #id, class의 정의 방법은 .class
- id는 한페이지에서 한번만 사용이 가능하다. class는 중복가능하다.
- 우선순위가 id가 class 보다 높다. id > class > tag

만약 id가 여러 개 있다면 어떻게 처리될까?

- 특정 요소를 조작할 때 중복된 id를 가지고 있다면 코드가 원하는 결과를 생성하지 못할 수 있다.
- 웹 사이트의 브라우저 호환성에 문제가 있을 수 있다.

CSS의 선택자 종류

전체 선택자(*), 유형 선택자(ex) input), 클래스 선택자(class), id 선택자, 특성 선택자([attr]), 그룹 선택자(,)

**DOM (Document Object Model)**

DOM Tree 순회는 전위순회 (PreOrder)로 순회된다.

**DOM 렌더링**

- 브라우저는 HTML을 읽고 파싱한 후에 DOM 트리를 구성한다.
- StyleSheets를 파싱하여 Style Rules를 만들어 DOM요소에 스타일을 입힌다.
- Layout 혹은 Reflow 과정을 통해  DOM 로드의 위치를 정해준다.
- Render Tree가 완성되면 실제화면에 그려준다.

**DOM 선택**

- getElementById: DOM Tree에서 요소 노드를 id로 찾는다. 제일 먼저 찾은 요소 하나를 반환한다.
- getElementsByClassName: DOM Tree에서 요소 노드를 class로 찾는다. 일치하는 모든 요소를 반환한다.
- getElementsByTagName: DOM Tree에서 요소 노드를 태그 이름으로 찾는다. 일치하는 모든 요소를 반환한다.
- querySeletor: DOM Tree에서 요소 노드를 CSS Selector 문법으로 찾는다. 제일 먼저 찾은 요소 하나를 반환한다.
- querySelectorAll: DOM Tree에서 요소 노드를 CSS Selector 문법으로 찾는다. 일치하는 모든 요소를 반환한다.
- window.[id]: id가 있는 요소는 window 객체를 통해 찾을 수 있다. 여러 개라면 리스트로 반환된다.

**DOM 탐색**

- parentNode: 선택한 요소 노드의 부모 노드를 불러온다. document의 부모 노드는 null이다.
- firstElementNode: 선택한 요소 노드의 자식 요소 노드 중 첫 번째를 불러오며 없으면 null을 반환한다. ↔ lastElementNode
- children: 선택한 요소 노드의 모든 자식 요소 노드를 불러온다. 없다면 빈 배열을 반환한다.
- nextElementSibling: 선택한 요소 노드의 다음 형제 요소 노드를 불러온다. 없을 경우 null을 반환한다.
- previousElementSibling: 선택한 요소 노드의 이전 형제 요소 노드를 불러온다. 없을 경우 null을 반환한다.

**DOM 조작**

- class 접근: 선택한 요소 노드에서 className과 classList로 요소의 class 속성을 불러오고 변경할 수 있다.
- hasAttribute: 선택한 요소 노드에서 속성을 가지고 있는지 확인 할 수 있다.
- getAttribute: 선택한 요소 노드에서 속성의 값을 반환한다. 없다면 null을 반환한다.
- setAttribute: 선택한 요소 노드에서 속성을 정의한다.
- removeAttribute: 선택한 요소 노드에서 속성을 제거한다.
- textContent: 선택한 요소 노드에서 텍스트 노드에 접근, 변경할 수 있다.
- innerHTML: 선택한 요소 노드 내부 HTML을 수정한다. XSS 위험이 있다.
- createElement: 요소 노드를 생성할 수 있다.
- appendChild: 선택한 요소 노드 마지막 자식 요소로 추가한다.
- removeChild: 선택한 요소 노드 자식 노드 중 해당하는 요소를 제거한다.

**Virtual DOM** 가상 돔

실제 DOM Tree를 자바스크립트 객체로 만든 것으로 필요한 정보만 담아 만들어진다.

이벤트나 DOM이 수정되는 한 틱 내에 직접 DOM을 수정하지 않고 가상돔을 바뀌는 부분만 수정한 후 렌더링 하면 브라우저 렌더링 프로세스가 줄어들게 된다.

**DOM 조작 실습 - 간단한 에디터 만들어보기**

[간단한 에디터](https://codepen.io/qlvcbvqv-the-scripter/pen/PoxPYaL)