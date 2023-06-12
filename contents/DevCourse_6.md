---
date: '2023-06-09'
title: '[Day 6] JavaScript 주요 문법 (6)'
categories: ['DevCourse', 'TIL', 'Algorithm', 'JS']
summary: '프로그래머스 데브코스 TIL'
thumbnail: './til.jpg'
---

> 프로그래머스 데브코스 프론트엔드 4기 과정중 몰랐던, 헷갈렸던 혹은 더 알고싶은 내용을 정리합니다. 😁

**실습 - 프로그래머스 연습문제 입국심사**

```js
function solution(n, times) {
    times.sort((a,b) => a - b);

    let left = 1;
    let right = times[times.length - 1] * n;
    
    while(left <= right) {
        let mid = Math.floor((left + right) / 2);
        let sum = 0;
        
        for(let i = 0; i < times.length; i++) {
            sum += Math.floor(mid / times[i], 0);
        }
        
        if(sum < n) {
            left = mid + 1;
        }else right = mid - 1;
    }
    
    return left;
}
```

**너비 우선 탐색 (BFS)**

그래프 탐색 알고리즘으로 같은 깊이에 해당하는 정점부터 탐색하는 알고리즘

**BFS의 특징**

- Queue를 사용하여 구현할 수 있다.
- 시작부터 가까운 정점부터 탐색한다.
- 시간복잡도는 O(V(정점의 수) + E(간선의 수))다.

**깊이 우선 탐색(DFS)**

그래프 탐색 알고리즘으로 최대한 깊은 정점부터 탐색하는 알고리즘

- Stack을 사용하여 구현할 수 있다.
- 시작부터 깊은 것부터 탐색한다.
- 시간복잡도는 O(V(정점의 수) + E(간선의 수))다.

**실습 - 프로그래머스 연습문제 여행경로**

```js
function solution(tickets) {
    const graph = {};
    
    for(const [start, end] of tickets) {
        if(graph[start] === undefined) graph[start] = [end];
        else graph[start].push(end);
    }
    
    for(const key in graph) {
        graph[key].sort((a,b) => a > b ? -1 : 1);
    }
    
    const stack = ["ICN"];
    const result = [];
    
    while(stack.length) {
        const current = stack[stack.length - 1];
        
        if(graph[current] && graph[current].length > 0) {
            stack.push(graph[current].pop());
        }else {
            result.push(stack.pop());
        }
    }
    
    return result.reverse();
}
```

**그리디**

매 선택에서 지금 이 순간에 최적의 답을 선택하는 알고리즘 - 최적의 해를 보장하지 않는다.

**그리디 알고리즘의 특징**

- 보통 최적해를 구하는 알고리즘보다 빠른 경우가 많다.
- 크루스칼, 다익스트라 알고리즘 등에 사용된다.
- 직관적인 문제풀이에 사용하기 적합하다.

**실습 - 프로그래머스 연습문제 큰 수 만들기**

```js
function solution(number, k) {
    const answer = [];
    
    for(let i = 0; i < number.length; i++) {
        while(k) {
            if(answer[answer.length-1] < Number(number[i])) {
                answer.pop();
                k--;
            }else break;
        }
        answer.push(number[i]);
    }
    
    while(k > 0) {
        answer.pop();
        k--;
    }
    
    return answer.join("");
}
```