---
date: '2023-06-07'
title: '[Day 4] JavaScript 주요 문법 (4)'
categories: ['DevCourse', 'TIL', 'JS', 'Algorithm']
summary: '프로그래머스 데브코스 TIL'
thumbnail: './til.jpg'
---
# [Day 4] JavaScript 주요 문법 (4)
> 프로그래머스 데브코스 프론트엔드 4기 과정중 몰랐던, 헷갈렸던 혹은 더 알고싶은 내용을 정리합니다. 😁
### 자료구조 & 알고리즘

**Queue**

First In First Out이라는 개념을 가진 선형 자료구조다.

Linear Queue와 Circular Queue가 존재한다.

**Linear Queue (선형 큐)**

Array 혹은 Linked List로 구현할 수 있다.

**Circular Queue (원형 큐)**

Front와 Rear가 이어져있는 Queue.

Circular Queue는 Linked List로 구현했을 때 이점이 없다.

**실습 - 프로그래머스 연습문제 프린터**

```js
class Queue {
    constructor() {
        this.queue = [];
        this.front = 0;
        this.rear = 0;
    }
    
    enque(value) {
        this.queue[this.rear++] = value;
    }
    
    deque() {
        const value = this.queue[this.front];
        delete this.queue[this.front];
        this.front += 1;
        return value;
    }
    
    peek() {
        return this.queue[this.front];
    }
}

function solution(priorities, location) {
    const queue = new Queue();
    let count = 0;
    
    priorities.forEach((x,i) => queue.enque([x,i]));
    priorities.sort((a,b) => b-a);
    
    while(1) {
        const currentValue = queue.peek();
        if(currentValue[0] < priorities[count]) {
          queue.enque(queue.deque());
        }else {
            const value = queue.deque();
            count += 1;
            if(location === value[1]) {
                return count;
            }
        }
    }
    return count;
}
```

**해시 테이블**

키와 값을 받아 키를 해싱하여 나온 index에 값을 저장하는 선형 자료구조이다.

삽입은 상수시간이 걸리며, 키를 알고 있다면 삭제, 탐색도 상수시간으로 수행한다.

**해시 함수**

입력받은 값을 특정 범위 내 숫자로 변경하는 함수

ex) “gender” → 해시함수 → 172661724

**해시 충돌**

해시 함수의 결과가 동일한 경우 해시 충돌이 일어난다.

**해시 충돌 해결법**

1. 선형 탐사법 - 충돌이 발생하면 index를 옆으로 한 칸 이동한다.
2. 제곱 탐사법 - 충돌이 발생하면 충돌이 발생한 지점에서 발생한 횟수의 제곱만큼 옆으로 이동한다. 
3. 이중 해싱 - 충돌이 발생하면 기존 해시 함수가 아닌 다른 해시 함수를 이용하여 새로운 index를 만들어 낸다.
4. 분리 연결법 - 버킷의 값을 연결 리스트로 사용하여 충돌이 발생하면 리시트에 값을 추가한다.

자바스크립트에서는 Array, Object, Map, Set 으로 사용할 수 있다.

**실습 - 프로그래머스 연습문제 베스트 앨범**

```js
function solution(genres, plays) {
    const result = [];
    const mostGenreMap = new Map();
    const genreMap = new Map();
    
    for(let i = 0; i < genres.length; i++) {
        mostGenreMap.set(genres[i], (mostGenreMap.get(genres[i]) || 0) + plays[i]);
        genreMap.set([genres[i], i], plays[i]);
    }
    
    const mostGenre = [...mostGenreMap].sort((a,b) => b[1] - a[1]);
    const genre = [...genreMap].sort((a,b) => b[1] - a[1]);

    for(let i = 0; i < mostGenre.length; i++) {
        let count = 0;
        genre.forEach(x => {
            if(x[0][0] === mostGenre[i][0] && count < 2) {
                result.push(x[0][1]);
                count += 1;
            }
        })
    }
    return result;
}
```

**그래프**

정점과 정점 사이를 연결하는 간선으로 이루어진 비선형 자료구조로 정점 집합과 간선 집합으로 표현할 수 있다.

정점은 Node, vertex 라고도 불리고 간선은 edge라고도 불림.

**그래프의 특징**

- 정점은 여러 개의 간선을 가질 수 있다.
- 크게 방향 그래프와 무방향 그래프로 나눌 수 있다.
- 간선은 가중치를 가질 수 있다.
- 사이클이 발생할 수 있다.

**무방향 그래프**

간선으로 이어진 정점끼리는 양방향으로 이동이 가능하다. 표현하기에 같은 간선으로 취급된다. (A, B) = (B, A)

**방향 그래프**

간선에 방향성이 존재하는 그래프. 양방향으로 갈 수 있더라도 다른 간선으로 취급된다.<A,B> ≠ <B,A>

**연결 그래프**

모든 정점이 서로 이동 가능한 상태인 그래프

**비연결 그래프**

특점 정점쌍 사이에 간선이 존재하지 않는 그래프

**완전 그래프**

모든 정점끼리 연결된 상태인 그래프

한 정점의 간선수는 모든 정점의 수 - 1, 모든 정점의 -1 * 정점의 수 = 모든 간선의 수

**사이클**

그래프의 정점과 간선의 부분 집합에서 순환이 되는 부분

**그래프의 구현 방법**

1. 인접행렬 → 2차원 배열
2. 인접 리스트 → 연결 리스트

**자바스크립트에서 구현**

```js
// 인접행렬
const graph = Array.from(
  Array(5), () => Array(5).fill(0)
);
graph[0][1] = 1;  // 0 -> 1
graph[0][2] = 1;  // 0 -> 2
graph[0][4] = 1;  // 0 -> 4
graph[2][3] = 1;  // 2 -> 3
graph[4][2] = 1;  // 4 -> 2

// 인접리스트
const graph2 = Array.from(
  Array(5), () => []
)
graph2[0].push(1);  // 0 -> 1
graph2[0].push(2);  // 0 -> 2
graph2[0].push(4);  // 0 -> 4
graph2[2].push(3);  // 2 -> 3
graph2[4].push(2);  // 4 -> 2
```