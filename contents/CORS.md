---
date: '2024-04-01'
title: 'Next.js에서 CORS 대응하기'
categories: ['error', 'next']
summary: 'Next.js에서 CORS 대응하기'
thumbnail: './til.jpg'
---
![](../static/cors.webp)

Next.js를 사용해서 개인 프로젝트를 하면서 여러 open api를 사용하며 CORS 에러들을 만났고 해결했던 방법을 기록하려고 한다.

![](../static/cors.png)

먼저 SOP와 CORS에 대해 알아보자

### SOP
SOP(Same-Origin Policy)는 웹 페이지가 다른 origin(도메인, 프로토콜 또는 포트)에 있는 리소스에 요청하는 것을 방지하기 위해 웹 브라우저가 시행하는 기본적인 보안 조치이다. SOP에서 하나의 origin에서 제공되는 웹 페이지는 기본적으로 동일한 origin의 리소스(예: 데이터, 스크립트 및 쿠키)와 상호 작용하는 것만 허용된다. 이 제한은 악의적인 스크립트가 중요한 데이터에 액세스하거나 사용자를 대신하여 승인되지 않은 동작을 수행하는 것을 방지함으로써 XSS(Cross-Site Scripting) 및 CSRF(Cross-Site Request Fuaging)를 포함한 다양한 보안 취약성을 완화하는 데 도움이 된다.

### CORS
CORS(Cross-Origin Resource Sharing)는 브라우저에서 발생하는 크로스 도메인 이슈를 해결하기 위한 메커니즘이다. CORS는 브라우저에서 동작하며, 다른 출처(origin)의 리소스를 요청할 때, 서버에서 허용하지 않는 경우 브라우저가 해당 요청을 차단한다. 이를 해결하기 위해, 서버에서는 응답 헤더를 설정하여 허용하는 출처, 허용하는 HTTP 메서드 등을 지정하며 브라우저는 이를 확인하여 해당 리소스에 대한 접근을 허용하거나 차단한다.

CORS 에러는 출처를 구성하는 세 요소 프로토콜, 도메인(호스트 이름), 포트로 이 중 하나라도 다르면 발생하며 CORS를 설정한다는 건 ‘출처가 다른 서버 간의 리소스 공유’를 허용하는 것이다.

### CORS 대응
CORS에 대응하는 방법으로는 크게 두 가지가 있다.

1. 서버에서 Access-Control-Allow-Origin 응답을 설정한다.
```js
'Access-Control-Allow-Origin': URL
```

2. 프록시 서버 사용
Next.js 에서 제공하는 `rewrites` 를 사용하면  요청 경로를 다른 대상 경로에 매핑할 수 있다.
`rewrites`는 URL 프록시 역할을 하며 대상 경로를 마스킹하여 사용자가 사이트에서 자신의 위치를 변경하지 않은 것처럼 보이게 한다.

먼저 기존의 CORS에러가 발생했던 코드는 이렇다.

```js
// api 함수
const getData = async () => {
  const url = 'https://api.data.org/data';

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
```

위의 함수의 url을 변경하고 next.config 에서 rewrites()를 사용하여 설정해 주었다.

```js
// api 함수
const getData = async () => {
  const url = 'api/data';

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// next.config.js
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.data.org/:path*',
      },
    ]
  },
}
```