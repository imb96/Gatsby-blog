---
date: '2023-06-12'
title: '[Day 7] JavaScript 주요 문법 (7)'
categories: ['DevCourse', 'TIL', 'Algorithm', 'JS']
summary: '프로그래머스 데브코스 TIL'
thumbnail: './til.jpg'
---

> 프로그래머스 데브코스 프론트엔드 4기 과정중 몰랐던, 헷갈렸던 혹은 더 알고싶은 내용을 정리합니다. 😁

**백트래킹**

- 모든 경우의 수를 탐색하는 알고리즘
- DFS 혹은 BFS를 사용할 수 있다.
- 효율을 위해 탐색하지 않아도 되는 것을 미리 막는것을 `가지치기(Pruning)` 라고 한다.
- 자바스크립트는 재귀 효율이 안좋기 때문에 DFS를 구현할 경우 스택으로 구현하는것이 좋다.
- 탐색에서 순환(Cycle)이 발생할 수 있다면 BFS를 이용하는 것이 좋다.

백트래킹의 핵심은 `가지치기` !

**백트래킹을 어떻게 작성해야할까**

- 모든 경우의 수를 찾을 수 있도록 작성
- 이후 문제에서 특정한 조건을 만족하는 것만 탐색하고 나머지는 탐색하지 않도록 조건문을 작성
- 절대로 답이 될수 없는 것은 탐색을 종료

**실습 - 프로그래머스 연습문제 N-Queen**

**동적 계획법 (Dynamic Programming)**

- 해결한 작은 문제로 큰 문제를 해결하는 문제 풀이 방식
- 특정 알고리즘이 아닌 문제 해결 방식을 의미한다.
- 메모리를 많이 사용하는 대신 성능이 빠르다.
- 두가지 방법론이 있다.
    - `메모이제이션(Memoization)`
    - 타뷸레이션(Tabulation)

**메모이제이션**

- 하향식 접근법
- 동적 계획법에서 작은 문제들의 결과는 항상 같다.
- 이 결과들을 메모리에 저장해 필요할 때 꺼내 쓰는 것이 메모이제이션이다.

**타뷸레이션**

- 상향식 접근법
- 필요한 값들을 미리 계산해두는 것
- 메모이제이션은 필요할 때 계산한다면 타뷸레이션은 미리 계산하는것.

**DP 문제는 어떻게 접근해야 할까?**

- `가장 작은 문제를 정의할 수 있는지?`
- `작은 문제를 통해 큰 문제를 해결할 수 있는 규칙이 있는지?`

**실습 - 프로그래머스 연습문제 단어 퍼즐**

```js
function solution(strs, t) {
    const dp = new Array(t.length+1).fill(Infinity);
    dp[0] = 0;
    
    const strsSet = new Set(strs);

    for(let i = 1; i <= t.length; i++) {
        for(let j = 1; j < Math.min(i+1, 6); j++) {
            const start = i - j;
            const end = i;
            
            if(strsSet.has(t.slice(start, end))) {
                dp[i] = Math.min(dp[i], dp[i-j] + 1);
            }
        }
    }
    return dp[dp.length - 1] === Infinity ? -1: dp[dp.length-1];
}
```