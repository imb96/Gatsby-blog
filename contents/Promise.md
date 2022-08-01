---
date: '2022-08-01'
title: 'Promise'
categories: ['JS']
summary: 'Promise에 대해'
thumbnail: './DeepDive.png'
---
> JavaScrpitDeepDive를 읽고 정리한 글입니다.

# Promise

자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용한다. 하지만 콜백 패턴은 콜백 헬로 인해 가독성이 나쁘고 비동기 처리 중 발생한 에러의 처리가 곤란하며 여러 개의 비동기 처리를 한 번에 처리하는 데도 한계가 있다.

ES6에서 비동기 처리를 위한 또 다른 패턴으로 Promise를 도입했다. 프로미스는 전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현할 수 있다는 장점이 있다.

Promise 생성자 함수를 new 연산자와 함꼐 호출하면 프로미스(Promise 객체)를 생성한다. ES6에서 도입된 Promise는 호스트 객체가 아닌 ECMAScript 사양에 정의된 표준 빌트인 객체다.
Promise 생성자 함수는 비동기 처리를 수행할 콜백 함수를 인수로 전달받는데 이 콜백 함수는 resolve와 reject 함수를 인수로 받는다.

```
// 프로미스 생성
const promise = new Promise((resolve, reject) => {
  // Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
  if (/* 비동기 처리 성공 */) {
    resolve('result');
  }else { /* 비동기 처리 실패 */
    reject('failure reason');
  }
});
```

Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 비동기 처리를 수행한다. 이때 비동기 처리가 성공하면 콜백 함수의 인수로 전달받은 resolve 함수를 호출하고, 비동기 처리가 실패하면 reject 함수를 호출한다.

```
// GET 요청을 위한 비동기 함수
const promiseGet = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
      if(xhr.status === 200) {
        // 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
        resolve(JSON.parse(xhr.response));
      }else {
        // 에러 처리를 위해 reject 함수를 호출한다.
        reject(new Error(xhr.status));
      }
    };
  });
};

// promiseGet 함수는 프로미스를 반환한다.
promiseGet('http://jsonplaceholder.typicode.com/posts/1');
```

비동기 함수인 promiseGet은 함수 내부에서 프로미스를 생성하고 반환한다. 비동기 처리는 Promise 생성자 함수가 인수로 전달받은 콜백 함수 내부에서 수행한다. 만약 비동기 처리가 성공하면 비동기 처리 결과를 resolve 함수에 인수로 전달하면서 호출하고, 비동기 처리가 실패하면 reject 함수에 인수로 전달하면서 호출한다.

프로미스는 다음과 같이 현재 비동기 처리가 어떻게 진행되고 있는지를 나타내는 상태(state)정보를 갖는다.

| 프로미스의 상태 정보  | 의미  | 상태 변경 조건  |
|:----------|:----------|:----------|
| pending    | 비동기 처리가 아직 수행되지 않은 상태    | 프로미스가 생성된 직후 기본상태    |
| fulfilled    | 비동기 처리가 수행된 상태(성공)    | resolve 함수 호출    |
| rejected    | 비동기 처리가 수행된 상태(실패)    | reject 함수 호출    |

생성된 직후의 프로미스는 기본적으로 pending 상태다. 이후 비동기 처리가 수행되면 비동기 처리 결과에 따라 다음과 같이 프로미스의 상태가 변경된다.
- 비동기 처리 성공: resolve 함수를 호출해 프로미스를 fulfilled 상태로 변경한다.
- 비동기 처리 실패: reject 함수를 호출해 프로미스를 rejected 상태로 변경한다.

이처럼 **프로미스 상태는 resolve 또는 reject 함수를 호출하는 것으로 결정된다.**

fulfilled 또는 rejected 상태를 settled 상태라고 한다. settled 상태는 fulfilled 또는 rejected 상태와 상관없이 pending이 아닌 상태로 비동기 처리가 수행된 상태를 말한다.

프로미스는 pending tkdxodptj settled 상태로 변화할 수 있지만 일단 settled 상태가 되면 더는 다른 상태로 변화할 수 없다.
프로미스는 비동기 처리 상태와 더불어 비동기 처리 결과도 상태로 갖는다.
즉, **프로미스는 비동기 처리 상태와 처리 결과를 관리하는 객체다.**

## 프로미스의 후속 처리 메서드
프로미스의 비동기 처리 상태가 변화하면 이에 따른 후속 처리를 해야 한다.
이를 위해 프로미스는 후속 메서드 then, catch, finally를 제공한다.
**프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백 함수가 선택적으로 호출된다** 이때 후속 처리 메서드의 콜백 함수에 프로미스의 처리 결과가 인수로 전달된다.
모든 후속 처리 메서드는 프로미스를 반환하며, 비동기로 동작한다.

### Promise.prototype.then
then 메서드는 두 개의 콜백 함수를 인수로 전달받는다.

- 첫 번째 콜백 함수는 프로미스가 fulfilled 상태가 되면 호출된다. 이때 콜백 함수는 프로미스의 비동기 처리 결과를 인수로 전달받는다.
- 두 번째 콜백 함수는 프로미스가 rejected 상태가 되면 호출된다. 이때 콜백 함수는 프로미스의 에러를 인수로 전달받는다.

즉, 첫 번째 콜백 함수는 비동기 처리가 성공했을 때 호출되는 성공 처리 콜백 함수이며, 두 번째 콜백 함수는 비동기 처리가 실패했을 때 호출되는 실패 처리 콜백 함수다.

```
// fulfilled
new Promise(resolve => resolve('fulfilled'))
	.then(v => console.log(v), e => console.error(e)); // fulfilled

// rejected
new Promise((_, reject) => reject(new Error('rejected')))
	.then(v => console.log(v), e => console.error(e)); // Error: rejected
```

then 메서드는 언제나 프로미스를 반환한다. 만약 then 메서드의 콜백 함수가 프로미스를 반환하면 그 프로미스를 그대로 반환하고, 콜백 함수가 프로미스가 아닌 값을 반환하면 그 값을 암묵적으로 resolve 또는 reject하여 프로미스를 생성해 반환한다.

### Promise.prototype.catch
catch 메서드는 한 개의 콜백 함수를 인수로 전달받는다. catch 메서드의 콜백 함수는 프로미스가 rejected 상태인 경우만 호출된다.

```
// rejected
new Promise((_, reject) => reject(new Error('rejected')))
	.catch(e => console.log(e)); // Error: rejected
```

catch 메서드는 then(undefined, onRejected)과 동일하게 동작한다. 따라서 then 메서드와 마찬가지로 언제나 프로미스를 반환한다.

### Promise.prototype.finally
finally 메서드는 한 개의 콜백 함수를 인수로 전달받는다. finally 메서드의 콜백 함수는 프로미스읭 성공 또는 실패와 상광벗이 무조건 한 번 호출된다. finally 메서드는 프로미스의 상태와 상관없이 공통적으로 수행해야 할 처리 내용이 있을 때 유용하다. finally도 언제나 프로미스를 반환한다.

```
new Promise(() => {})
	.finally(() => console.log('finally')); // finally
```

## 프로미스의 에러 처리
비동기 처리에서 발생한 에러는 then 메서드의 두 번째 콜백 함수로 처리하거나 프로미스의 후속 처리 메서드 catch를 사용해 처리할 수도 있다.
catch 메서드를 then 메서드를 호출한 이후에 호출하면 비동기 처리에서 발생한 에러뿐만 아니라 then 메서드 내부에서 발생한 에러까지 모두 캐치할 수 있다.

```
promiseGet('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => console.xxx(res))
  .catch(err => console.error(err)); // TypeError: console.xxx is not a function
```

또한 then 메서드에 두 번째 콜백 함수를 전달하는 것보다 catch 메서드를 사용하는 것이 가독성이 좋고 명확하다. 따라서 에러 처리는 then 메서드 보다 catch 메서드에서 하는 것을 권장한다.

## 프로미스 체이닝
then, catch, finally 후속 처리 메서드는 언제나 프로미스를 반환하므로 연속적으로 호출할 수 있다. 이를 프로미스 체이닝(promise chaining)이라 한다.
프로미스는 프로미스 체이닝을 통해 비동기 처리 결과를 전달받아 후속 처리를 하므로 비동기 처리를 위한 콜백 패턴에서 발생하던 콜백 헬이 발생하지 않는다. 다만 프로미스도 콜백 패턴을 사용하므로 콜백 함수를 사용하지 않는 것은 아니다.
콜백 패턴은 가독성이 좋지 않다. 이 문제는 ES8 에서 도입된 async/await를 통해 해결할 수 있다.

## 프로미스의 정적 메서드
Promise는 주로 생성자 함수로 사용되지만 함수도 객체이므로 메서드를 가질 수 있다. Promise는 5가지 정적 메서드를 제공한다.

Promise.resolve와 Promise.reject 메서드는 이미 존재하는 값을 래핑하여 프로미스를 생성하기 위해 사용한다.
Promise.resolve 메서드에 인수로 전달받은 값을 resolve하는 프로미스를 생성한다.
```
// 배열을 resolve하는 프로미스를 생성
const resolvedPromise = Promise.resolve([1,2,3]);
resolvedPromise.then(console.log); // [1,2,3]
```
위 예제는 다음 예제와 동일하게 동작한다

```
const resolvedPromise = new Promise(resolve => resolve([1,2,3]));
resolvedPromise.then(console.log); // [1,2,3]
```

Promise.reject 메서드는 인수로 전달받은 값을 reject하는 프로미스를 생성한다.

```
// 에러 객체를 reject하는 프로미스를 생성
const rejectedPromise = Promise.reject(new Error('Error!'));
rejectedPromise.catch(console.log); // Error: Error!
```

위 예제는 다음 예제와 동일하게 동작한다.

```
const rejectedPromise = new Promise((_, reject) => reject(new Error('Error!')));
rejectedPromise.catch(console.log); // Error: Error!

```
### Promise.all
Promise.all 메서드는 여러 개의 비동기 처리를 모두 병렬 처리할 때 사용한다.
다음 예제를 살펴보자

```
const rD1 = () => new Promise(resolve => setTimeout(() => resolve(1), 3000));
const rD2 = () => new Promise(resolve => setTimeout(() => resolve(2), 2000));
const rD3 = () => new Promise(resolve => setTimeout(() => resolve(3), 1000));

// 세 개의 비동기 처리를 순차적으로 처리
const res = [];
rD1()
  .then(data => {
    res.push(data);
    return rD2();
  })
  .then(data => {
    res.push(data);
    return rD3();
  })
  .then(data => {
    res.push(data);
    console.log(res); // [1,2,3] => 약 6초 소요
  })
  .catch(console.error);
```
위 예제는 세 개의 비동기 처리를 순차적으로 처리한다. 위 예제의 경우 앞선 비동기 처리 결과를 다음 비동기 처리가 사용하지 않는다. 따라서 위 예제의 경우 세 개의 비동기 처리를 순차적으로 처리할 필요가 없다.

Promise.all 메서드는 여러개의 비동기 처리를 모두 병렬 처리할 떄 사용된다. 메서드를 사용해 세 개의 비동기 처리를 병렬로 처리해보자.

```
const requestData1 = () =>
	new Promise(resolve => setTimeout(() => resolve(1), 3000));
const requestData2 = () =>
	new Promise(resolve => setTimeout(() => resolve(2), 2000));
const requestData3 = () =>
	new Promise(resolve => setTimeout(() => resolve(3), 1000));

// 세 개의 비동기 처리를 병렬로 처리
Promise.all([requestData1(), requestData2(), requestData3()])
	.then(console.log) // [1,2,3] => 약 3초 소요
	.catch(console.error);
```

Promise.all 메서드는 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받는다. 그리고 전달받은 모든 프로미스가 모두 fulfilled 상태가 되면 모든 처리 결과를 배열에 저장해 새로운 프로미스를 반환한다.

Promise.all 메서드는 인수로 전달받은 배열의 프로미스가 하나라도 rejected 상태가 되면 나머지 프로미스가 fulfilled 상태가 되는 것을 기다리지 않고 즉시 종료한다.

다음은 깃허브 아이디로 깃허브 사용자 이름을 취득하는 3개의 비동기 처리를 모두 병렬로 처리하는 예제다.

```
// GET 요청을 위한 비동기 함수
const promiseGet = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status === 200) {
        // 성공적으로 응답을 전달받으면 resolve 함수를 호출한다.
        resolve(JSON.parse(xhr.response));
      }else {
        // 에러 처리를 위해 reject 함수를 호출한다.
        reject(new Error(xhr.status));
      }
    };
  });
};

const githubIds = ['jeresig', 'ahejlsberg', 'imb96'];

Promise.all(githubIds.map(id => promiseGet(`https://api.github.com/users/${id}`)))
  .then(users => users.map(user => user.name))
  // [userInfo, userInfo, userInfo]
  // -> Promise ['John Resig', 'Anders Hejlsberg', 'Minjae Kim']
  .then(console.log)
  .catch(console.error);

```

위 예제의 Promise.all 메서드는 promiseGet 함수가 반환한 3개의 프로미스로 이루어진 배열을 인수로 전달 받고 이 프로미스들이 모두 fulfilled 상태가 되면 처리 결과를 배열에 저장해 새로운 프로미스를 반환한다. 이때 Promise.all 메서드가 반환한 프로미스는 세 개의 사용자 객체로 이루어진 배열로 담고 있다. 이 배열은 첫 번째 then 메서드에 인수로 전달된다.

### Promise.race
Promise.race 메서드는 Promise.all 메서드와 동일하게 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받는다. Promise.race는 가장 먼저 fulfilled 상태가 된 프로미스의 처리 결과를 resolve하는 새로운 프로미스를 반환한다.
Promise.race 메서드에 전달된 프로미스가 하나라도 rejected 상태가 되면 에러를 reject하는 프로미스를 즉시 반환한다.

### Promise.allSettled
Promise.allSettled 메서드는 프로미스를 요소로 갖는 배열 등의 이터러블을 인수로 전달받는다. 그리고 전달받은 프로미스가 모두 settled 상태 (비동기 처리가 수행된 상태, 즉 fulfilled or rejected 상태)가 되면 처리 결과를 배열로 반환한다.

## 마이크로태스크 큐
다음 예제를 살펴보고 어떤 순서로 로그가 출력될지 생각해보자.
```
setTimeout(() => console.log(1), 0);

Promise.resolve()
	.then(() => console.log(2))
	.then(() => console.log(3));
```

프로미스의 후속 처리 메서드도 비동기로 동작하므로 1 -> 2 -> 3의 순으로 출력될 것처럼 보이지만 2 -> 3 -> 1 순으로 출력된다. 그 이유는 프로미스의 후속 처리 메서드의 콜백함수는 태스크 큐가 아니라 마이크로태스크 큐에 저장되기 때문이다. 마이크로태스크 큐는 태스크 큐보다 우선순위가 높다.

## fetch
fetch 함수는 XMLHttpRequest 객체와 마찬가지로 HTTP 요청 전송 기능을 제공하는 클라이언트 사이드 Web API다. fetch 함수는 XMLHttpRequest 객체보다 사용법이 간단하고 프로미스를 지원하기 때문에 비동기 처리를 위한 콜백 패턴의 단점에서 자유롭다.

fetch 함수에는 HTTP 요청을 전송할 URL과 HTTP 요청 메서드, HTTP 요청 헤더, 페이로드 등을 설정한 객체를 전달한다.

`const promise = fetch(url [, options])`

**fetch 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 Promise 객체를 반환한다.**