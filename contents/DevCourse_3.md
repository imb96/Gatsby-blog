---
date: '2023-06-06'
title: '[Day 3] JavaScript 주요 문법 (3)'
categories: ['DevCourse', 'TIL']
summary: '프로그래머스 데브코스 TIL'
thumbnail: './til.jpg'
---
# [Day 3] JavaScript 주요 문법 (3)
> 프로그래머스 데브코스 프론트엔드 4기 과정중 몰랐던, 헷갈렸던 혹은 더 알고싶은 내용을 정리합니다. 😁
### 자료구조와 알고리즘
**자료구조**

메모리를 효율적으로 사용하며 빠르고 안정적으로 데이터를 처리하는 것이 궁극적인 목표로 상황에 따라 유용하게 사용될 수 있도록 `특정 구조`를 이루고 있다.

**알고리즘**

특정 문제룰 효율적이고 빠르게 해결하는 것이 궁극적인 목표로 정해진 일련의 절차나 방법을 공식화한 형태로 표현한 것을 말한다.

**선형 구조**

한 원소 뒤에 하나의 원소만이 존재하는 형태로 자료들이 선형으로 나열되어있는 구조를 가진다.
ex) Array, Linked List, Stack, Queue

**비선형 구조**

원소 간 다대다 관계를 가지는 구조로 계층적 구조나 망형 구조를 표현하기에 적절하다.
ex) Tree, Graph

**시간 복잡도**

Bit-O 표기법: 시간 복잡도를 나타내기 위한 방법.
![그림 넣을 곳]
O(1) < 0(log n) < 0(n) < O(n log n) < 0(n^2) < O(2^n) < O(n!)
빅오 표기법은 식이 계수가 있거나 상수를 더하거나 빼지 않는다. → 빅오 표기법은 점근적 표기법을 따르기 때문.
빅오 표기법의 규칙
- 계수 법칙 : n이 0보다 클 때 n이 무한에 가까울 수록 상수는 의미가 없어진다.
- 합의 법칙: 빅오끼리는 더해질 수 있다.
- 곱의 법칙: 빅오끼리는 곱해질 수 있다.
- 다항 법칙: f(n)이 k차 다항식이면 f(n)은 O(n^k)이다.
상수항은 무시, 가장 큰 항 외엔 무시.
성능 측정 방법: Date 객체를 이용해서 시작 시간을 구하고 로직을 실행시키고 끝시간에서 시작시간을 빼면 된다.

**배열 (Array)**

연관된 데이터를 연속적인 형태로 구성된 구조를 가지며 배열에 포함된 원소는 순서대로 `index`가 붙는다.

**배열의 특징**

- 고정된 크기를 가지며 동적으로 크기를 늘릴 수 없다.
    - JavaScript처럼 대부분의 스크립트 언어는 동적으로 크기가 증감되도록 만들어져 있다.
- 원하는 원소의 index를 알고 있다면 상수시간으로 원소를 찾을 수 있다.
- 원소를 삭제하면 해당 index에 빈자리가 생긴다.
- 배열의 요소를 삭제한 후 순서를 맞추려면 최대 선형시간이 소요된다.
- 배열의 요소를 추가하려면 최대 선형시간이 소요된다.
- 따라서 `추가`와 `삭제`가 반복되는 로직이라면 배열 사용을 권장하지 않는다. `탐색`하기 좋다.

**연결 리스트 (Linked List)**

연결 리스트는 각 요소를 포인터로 연결하여 관리하는 선형 자료구조다. 각 요소는 노드라구 부르며 데이터 영역과 포인터 영역으로 구성된다.

**연결 리스트의 특징**

- 메모리가 허용하는 한 요소를 제한없이 추가할 수 있다.
- 탐색은 선형시간이 소요된다.
- 요소를 추가하거나 제거할 때는 상수시간이 소요된다.
- Singly Linked List(단일 연결 리스트), Doubly Linked List(이중 연결 리스트), Circular Linked LIst(원형 연결 리스트) 가 존재한다.

**Singly Linked List**

Head에서 Tail까지 단방향으로 이어지는 연결 리스트

**과제_1**

[Singly Linked List 전체코드 보기](http://colorscripter.com/s/HH4NT6F)
1. SinglyLinkedList 클래스에 리스트 크기를 구하는 `size` 메서드 만들기.
```jsx
size() {
    let currNode = this.head;
    let count = 0;
    while(currNode !== null) {
      currNode = currNode.next;
      count += 1;
    }
    return size;
}
console.log(LinkedList.size())
```
2. 예외가 발생해도 동작하도록 `예외처리` 하기.
```js
// find 메서드
find(value) {
    let currNode = this.head;
    try {  // 찾는 노드가 존재하지 않을 때 예외처리.
      while (currNode.value !== value) {
        currNode = currNode.next;
      }
    } catch(error) {
      console.log(`Error: 찾으려는 노드가 존재하지 않습니다.`);
    }
    return currNode;
  }
// remove 메서드
remove(value) {
    let prevNode = this.head;
		// 지우려는 노드가 헤드일 떄 
    if(prevNode.value === value) {
      this.head = prevNode.next;
      return;
    }
    try {  // 삭제하려는 노드가 존재하지 않을 때 예외처리.
      while(prevNode.next.value !== value) {
        prevNode = prevNode.next;
      }
    } catch(error) {
      console.log(`Error: 지우려는 노드가 존재하지 않습니다.`);
    }

    if(prevNode.next !== null) {
      prevNode.next = prevNode.next.next;
    }
  }
// insert 메서드 -> find()메서드로 찾으려는 노드가 존재하지 않을 때. find()메서드로부터 null값을 반환 받았을떄
insert(node, newValue) {
    if(!node) {
      console.log(`Error: 노드를 찾지 못했습니다.`);
			return false;
    }
    const newNode = new Node(newValue);
    newNode.next = node.next;
    node.next = newNode;
  }
```
**Doubly Linked List**

양뱡항으로 이어지는 연결 리스트 Singly Linked List 보다 자료구조의 크기가 조금 더 크다.

**과제_2**

Singly Linked List 클래스를 참고하여 Doubly Linked List 구현하기

[Doubly Linked List 전체코드 보기](http://colorscripter.com/s/yFfyqGj)

**Circular Linked List**

Singly 혹은 Doubly Linked List 에서 Tail이 Head로 연결되는 연결 리스트이며 메모리를 아껴쓸 수 있고 원형 큐 등을 만들때도 사용된다.

**과제_3**

Singly Linked List 클래스를 참고하여 Circular Linked List 구현하기

[Circular Linked List 전체코드 보기](http://colorscripter.com/s/pMJDzc3)

**Stack**

LIFO(Last In First Out - 나중에 들어간 요소가 먼저 나온다)이라는 개념을 가진 선형 자료구조다.
Stack은 Array, Linked List로 구현할 수 있다.

**실습**

프로그래머스 코딩테스트 연습문제 - 올바른 괄호
```js
// 내 풀이
function solution(s){
    const stack = [];
    for(let i = 0; i < s.length; i++) {
        if(s[i] === '(') {
            stack.push('(');
        }else {
            if(stack[stack.length-1] === '(') {
                stack.pop();
            }else {
                return false;
            }
        }
    }
    return stack.length > 0 ? false : true;
}
```
```js
// 강사님 풀이1 - 스택 활용
function solution(s) {
	const stack = [];
	
	for (const c of s) {
		if (c === '(') {
			stack.push(c);
		} else {
			if (stack.length === 0) {
				return false;
			}
			stack.pop();
		}
	}
	return stack.length === 0;
}
```
```js
// 강사님 풀이2 - 카운트 활용
function solution(s) {
	let count = 0;

	for(const c of s) {
		if(c === '(') {
			count += 1;
		}else {
			if(count === 0) {
				return false;
			}
			count -= 1;
		}
	}
	return count === 0;
}
```