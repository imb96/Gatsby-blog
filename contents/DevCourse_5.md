---
date: '2023-06-08'
title: '[Day 5] JavaScript 주요 문법 (5)'
categories: ['DevCourse', 'TIL', 'Algorithm', 'JS']
summary: '프로그래머스 데브코스 TIL'
thumbnail: './til.jpg'
---

> 프로그래머스 데브코스 프론트엔드 4기 과정중 몰랐던, 헷갈렸던 혹은 더 알고싶은 내용을 정리합니다. 😁

**실습 - 프로그래머스 연습문제 가장 먼 노드**

```js
function solution(n, edge) {
    const graph = Array.from(Array(n + 1), () => []);
    const count = Array(n + 1).fill(0);
    
    count[1] = 1;
    
    for(const [a, b] of edge) {
        graph[a].push(b);
        graph[b].push(a);
    }
    
    const queue = [1];
    
    while(queue.length) {
        const current = queue.shift();
        
        for(const node of graph[current]) {
            if(count[node] === 0) {
                queue.push(node);
                count[node] = count[current] + 1;
            }
        }
    }
    
    const max = Math.max(...count);
    return count.filter(x => x === max).length;
}
```

**트리**

방향 그래프의 일종으로 정점을 가리키는 간선이 하나 밖에 없는 구조를 가지고 있다.

- `Root` - 가장 상위의 정점
- `Leaf Node` - 더 이상 자식이 없는 노드
- `Level` - 루트로부터 몇 번째 깊이
- `Degree(차수)` - 한 정점에서 뻗어나가는 간선의 개수

**트리의 특징**

- 루트 정점을 제외한 모든 정점은 반드시 하나의 부모 정점을 가진다.
- 정점이 N개인 트리는 반드시 N-1개의 간선을 가진다
- 루트에서 특정 정점으로 가는 경로는 유일하다.

**이진 트리**

각 정점이 최대 2개의 자식을 가지는 트리

- `완전 이진 트리`: 마지막 레벨을 제외하고 모두 채워질 경우
- `포화 이진 트리`: 마지막 레벨까지 모두 채워질 경우
- `편향 트리`: 한 방향으로만 정점이 이어질 경우

**이진 트리의 특징**

- 정점의 N개인 이진 트리는 최악의 경우 높이가 N이 될 수 있다.
- 정점이 N개인 포화 또는 완전 이진 트리의 높이는 log N이다.
- 높이가 h인 포화 이진 트리는 2^h - 1개의 정점을 가진다.
- 일반적인 이진 트리를 사용하는 경우는 많지 않다. 다음 자료구조에 응용된다.
    - `이진 탐색 트리`
    - `힙`
    - `AVL 트리`
    - `레드 블랙 트리`

**트리의 구현 방법**

그래프와 마찬가지로 `인접행렬`과 `인접리스트`로 구현할 수 있다.
- 0번 인덱스는 편의를 위해 비워둔다.
- Left = Index * 2;
- Right = Index * 2 + 1;
- Parent = floor(Index / 2);

```js
// 배열로 구현
const tree = [
  undefined,
  9,
  3,
  8,
  2,
  5,
  undefined,
  7,
  undefined,
  undefined,
  undefined,
  4,
];

// 연결리스트로 구현
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Queue {
  constructor() {
    this.queue = [];
    this.front = 0;
    this.rear = 0;
  }

  enqueue(node) {
    this.queue[this.rear++] = node;
  }

  deque() {
    const node = this.queue[this.front];
    delete this.queue[this.front];
    this.front += 1;
    return node;
  }

  size() {
    return this.rear - this.front;
  }
}

class Tree {
  constructor(node) {
    this.root = node;
  }

  display() {
    // Level Order
    const queue = new Queue();
    queue.enqueue(this.root);
    while(queue.size()) {
      const currentNode = queue.dequeue();
      console.log(currentNode.value);
      if(currentNode.left) queue.enqueue(currentNode.left);
      if(currentNode.right) queue.enqueue(currentNode.right);
    }
  }
}
// tree 생성
const tree = new Tree(new Node(10));
tree.root.left = new Node(5);
tree.root.right = new Node(9);
tree.root.left.left = new Node(2);
tree.root.left.right = new Node(7);
tree.root.right.right = new Node(8);
tree.root.left.right.right = new Node(6);
```

`전위순회(preorder traverse)` : 루트를 먼저 방문 [루트 → 왼쪽 자식 → 오른쪽 자식]

`중위순회(inorder traverse)` : 왼쪽 하위 트리를 방문 후 루트를 방문 [왼쪽 자식 → 루트 → 오른쪽 자식]

`후위순회(postorder traverse` : 하위 트리 모두 방문 후 루트를 방문 [왼쪽 자식 → 오른쪽 자식 → 루트]

**우선 순위 큐**

FIFO인 큐와 달리 우선 순위가 높은 요소가 먼저 나가는 큐 → 자료구조가 아닌 `개념`이다.

**힙**

이진 트리 형태를 가지며 우선순위가 높은 요소가 먼저 나가기 위해 요소가 삽입, 삭제 될 때 바로 `정렬`되는 특징이 있다. (힙 ≠ 우선순위 큐)

**힙의 특징**

- 우선 순위가 높은 요소를 루트로 배치하고 항상 루트가 먼저 나간다.
- 루트가 가장 큰 값이 되는 `최대 힙(Max heap)`과 가장 작은 값이 되는 `최소힙(Min heap)`이 있다.
- 자바스크립트에서는 직접 구현해야 한다.

**힙 요소 추가 알고리즘**

- 요소가 추가될 때는 트리의 가장 마지막에 정점에 위치한다.
- 추가 후 부모 정점보다 우선순위가 높다면 부모 정점과 순서를 바꾼다.
- 이 과정을 반복하면 가장 우선순위가 높은 정점이 루트 정점이 된다.
- 완전 이진 트리의 높이는 log N이기에 힙의 요소 추가 알고리즘은 O(log N) 시간복잡도를 가진다.

**힙 요소 제거 알고리즘**

- 요소 제거는 루트 정점만 가능하다.
- 루트 정점이 제거된 후 가장 마지막 정점이 루트에 위치한다.
- 루트 정점의 두 자식 정점 중 더 우선순위가 높은 정점과 바꾼다.
- 두 자식 정점이 우선순위가 더 낮을 때 까지 반복한다.
- 완전 이진 트리의 높이는 log N이기에 힙의 요소 제거 알고리즘은 O(log N) 시간복잡도를 가진다.

**최대 힙(Max heap) 구현**

```js
class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let currentIndex = this.heap.length - 1;
    let parentIndex = Math.floor(currentIndex / 2);

    while(parentIndex !== 0 && this.heap[parentIndex] < value) {
      const temp = this.heap[parentIndex];
      this.heap[parentIndex] = value;
      this.heap[currentIndex] = temp;

      currentIndex = parentIndex;
      parentIndex = Math.floor(currentIndex / 2);
    }
  }

  pop() {
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let currentIndex = 1;
    let leftIndex = 2;
    let rightIndex = 3;

    
  }
}

const heap = new MaxHeap();
heap.push(35);
heap.push(23);
heap.push(89);
heap.push(56);
heap.push(62);
heap.push(33);
console.log(heap.heap); // [null, 89, 62, 35, 23, 56, 33];
```

**트라이**

문자열을 저장하고 효율적으로 탐색하기 위한 트리 형태의 자료구조

**트라이의 특징**

- 검색어 자동완성, 사전 찾기 등에 응용될 수 있다.
- 문자열을 탐색할 때 단순하게 비교하는 것보다 효율적으로 찾을 수 있다.
- L이 문자열의 길이일 때 탐색, 삽입은 O(L)만큼 걸린다.
- 대신 각 정점이 자식에 대한 링크를 전부 가지고 있기에 저장 공간을 더 많이 사용한다.

**트라이 구조**

- 루트는 비어있다.
- 각 간선(링크)은 추가될 문자를 키로 가진다.
- 각 정점은 이전 정점의 값 + 간선의 키를 값으로 가진다.
- 해시 테이블과 연결 리스트를 이용하여 구현할 수 있다.

**트라이 구현**

```js
class Node {
  constructor(valie = "") {
    this.value = value;
    this.children = new Map();
  }
}

class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(str) {
    let curNode = this.root;

    for (const char of str) {
      if (!curNode.children.has(char)) {
        curNode.children.set(char, new Node(curNode.val + char));
      }

      curNode = curNode.children.get(char);
    }
  }

  has(str) {
    let currentNode = this.root;

    for (const char of str) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char);
    }

    return true;
  }
}

const trie = new Trie();
trie.insert('hat');
trie.insert('hand');
console.log(trie.has('hat')); // true
console.log(trie.has('hand')); // true
console.log(trie.has('hot')); // false
```

**정렬**

요소들을 일정한 순서대로 열거하는 알고리즘

**정렬의 특징**

- 정렬 기준은 사용자가 정할 수 있다.
- 크게 `비교식`과 `분산식` 정렬로 나눌 수 있다.
- 대부분의 언어가 빌트인으로 제공해준다.
- `삽입`, `선택`, `버블`, `머지`, `힙`, `퀵` 정렬 등 다양한 정렬 방식이 존재한다.

### 비교식 정렬

**버블 정렬**

서로 인접한 두 요소를 검사하여 정렬하는 알고리즘 O(n^2) 시간복잡도를 가진다.

**선택 정렬**

선택한 요소와 가장 우선순위가 높은 요소를 교환하는 정렬 알고리즘 O(n^2) 시간복잡도를 가진다.

**삽입 정렬**

선택한 요소를 삽입 할 수 있는 위치를 찾아 삽입하는 방식의 정렬 알고리즘 O(n^2) 시간복잡도를 가진다.

### 분산식 정렬

**분할 정복**

문제를 작은 2개의 문제로 분리하고 더 이상 분리가 불가능 할 때 처리한 후 합치는 전략.

**합병 정렬**

분할 정복 알고리즘을 이용한 최선과 최악이 같은 안정적인 정렬 알고리즘 O(n log n) 시간복잡도를 가진다.

**퀵 정렬**

분할 정복 알고리즘을 이용한 매우 빠르지만 최악의 경우가 존재하는 불안정 정렬 O(n log n) 시간복잡도를 가진다.

**실습 - 프로그래머스 연습문제 가장 큰 수**

```js
function solution(numbers) {
    let strings = numbers.map(x => x.toString());
    strings.sort((a,b) => (b+a) - (a+b));
    if (strings[0] === '0') return '0';
    return strings.join("");
}
```

**선형 탐색**

순서대로 하나씩 찾는 탐색 알고리즘 O(n) 시간복잡도를 가진다.

**이진 탐색**

정렬 되어있는 요소들을 반씩 제외하며 찾는 알고리즘 O(log n) 시간복잡도를 가진다.

**이진 탐색의 특징**

- 반드시 정렬이 되어있어야 한다.
- 배열 혹은 이진트리를 이용하여 구현할 수 있다.
- O(log n)시간복잡도인 만큼 빠르다.

**이진 탐색 트리**

이진 탐색을 위한 이진 트리로 왼쪽 서브 트리는 루트보다 작은 값이 모여있고 오른쪽 서브 트리는 루트보다 큰 값이 모여있다.

**이진 탐색 트리의 문제점**

- 최악의 경우 한쪽으로 편향된 트리가 될 수 있다.
- 그런 경우 탐색과 동일한 시간복잡도를 가진다.
- 이를 해결하기 위해 다음과 같은 자료구조를 이용할 수 있다.
- AVL트리
- 레드 블랙 트리
**과제 - 이진탐색트리의 요소를 제거하는 메서드 구현하기**

[이진탐색트리 전체코드 보기](http://colorscripter.com/s/Vf3BP4B)