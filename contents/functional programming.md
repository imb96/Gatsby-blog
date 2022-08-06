---
date: '2022-08-04'
title: 'Functional Programming'
categories: ['Programming']
summary: '자바스크립트에서 사용할 수 있는 함수형 프로그래밍 기법에 대해'
thumbnail: './js1.png'
---
> 자바스크립트 완벽 가이드를 읽고 정리한 글입니다.

# 함수형 프로그래밍
자바스크립트는 함수형 프로그래밍 언어는 아니지만, 함수를 객체처럼 조작할 수 있으므로 함수형 프로그래밍 기법을 사용할 수 있다.
map()과 reduce()와 같은 배열 메서드는 특히 함수형 프로그래밍 스타일에 알맞다.

아래의 예제들은 자바스크립트에 사용할 수 있는 함수형 프로그래밍 기법에 대해 설명한다.
이들은 자바스크립트 함수의 강력함을 실감할 수 있게 만들어 졌을 뿐 좋은 프로그래밍 스타일 예제는 아니다.

### 함수로 배열 처리
숫자로 이루어진 배열이 있고 이 값들의 평균과 표준 편차를 구하려고 할 때,
함수형 프로그래밍 스타일을 사용하지 않는다면 다음과 같이 할 수 있다.
```js
let data = [1,1,3,5,5];
// 평균 계산
let total = 0;
for(let i = 0; i < data.length; i++) {
  total += data[i];
  let mean = total / data.length; // mean == 3;
}
// 표준편차 계산
total = 0;
for(let i = 0; i < data.length; i++) {
  let deviation = data[i] - mean;
  total += deviation * deviation;
}
let stddev = Math.sqrt(total/(data.length-1)); // stddev == 2;
```

같은 계산을 배열 메서드 map()과 reduce()를 사용해 함수형 스타일로 바꿀 수 있다.
```js
// 먼저 단순한 함수 두 개를 정의
const sum = (x, y) => x + y;
const square = x => x * x;
// 두 함수와 배열 메서드를 사용해 평균과 표준 편차 계산
let data = [1,1,3,5,5];
let mean = data.reduce(sum)/data.length; // mean == 3
let deviations = data.map(x => x-mean);
let stddev = Math.sqrt(deviations.map(square).reduce(sum)/(data.length-1));
stddev // 2
```
새로 만든 코드는 여전히 객체 메서드를 호출하므로 객체 지향 스타일이 남아있다.
map()과 reduce()메서드의 함수형 버전을 만들어보자.
```js
const sum = (x, y) => x + y;
const square = x => x * x;

let data = [1,1,3,5,5];
let mean = reduce(data, sum) / data.length;
let deviations = map(data, x => x-mean);
let stddev = Math.sqrt(reduce(map(deviations, square), sum) / (data.length-1));
stddev // 2
```