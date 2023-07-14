---
date: '2023-07-14'
title: 'JAM Stack 간단히 알아보기'
categories: ['STUDY']
summary: '미니프로젝트 스터디 발표 내용'
thumbnail: './codingcat2.png'
---
> 데브코스 안에서 진행중인 미니프로젝트 스터디 에서 발표한 내용입니다.
>
> 진행중인 프로젝트의 변경사항이나 공부한내용을 공유하고 발표하는 스터디입니다.
제 블로그는 `Gatsby` 로 만들었습니다. 
Gatsby는 정적사이트 생성기 및 웹 개발 프레임워크입니다.
Gatsby는 `React`, `GraphQL`를 사용하는 `JAM Stack` 기반 프레임워크입니다.

## JAM Stack
JAM Stack은 웹 개발 아키텍처 중 하나로 "Javascript" "Apis" "Markup" 의 약자입니다.

이로 알수 있듯이 JavaScript와 API 그리고 Markup(HTML) 만으로 이루어진 웹의 아키텍처를 의미합니다.

JAM Stack은 React(CSR)와 Next.js(SSR) 같은 특정 기술로 구성된 형태를 이야기 하는 것이 아닌 이들을 이용해서 `웹 사이트`를 어떻게 `구성` 할 것인지의 `관점`이라고 할 수 있습니다.

이 아키텍처는 동적 서버 사이드 렌더링 방식이 아니라 정적인 컨텐츠 제공을 기반으로 합니다.

Gatsby와 같은 정적 사이트 생성기, Netlify와 같은 호스팅 서비스가 JAM Stack 개발을 지원하고 있습니다.


## JAM Stack의 주요 구성 요소

JavaScript: Client의 모든 처리는 Javascript에게 맡깁니다.
- 클라이언트 측에서 실행되는 JavaScript를 통해 웹 사이트의 동적 기능과 상호작용을 구현합니다. 이를 통해 사용자 경험을 향상시킬 수 있습니다.
APIs: 모든 기능 및 비즈니스 로직은 재사용 가능한 API로 추상화합니다.
- 백엔드 서비스 또는 서브파티 서비스의 API를 사용하여 데이터를 가져오거나 기능을 확장합니다. 이를 통해 외부 서비스와의 통합이 용이해집니다.
Markup: 정적 생성기나 Webpack등을 이용하여 Markup을 미리 생성합니다.
- 정적인 HTML, CSS, Markdown 등의 마크업 언어를 사용하여 컨텐츠를 구조화하고 표현합니다. 이 마크업은 사전에 빌드되어 정적 파일로 제공됩니다.


## JAM Stack의 장점

- 속도: JAM Stack 사이트는 배포 시간 동안 HTML이 이미 생성되고 정적 파일로 빌드되기 때문에 백엔드 지연 없이 CDN을 통해 제공되기 때문에 웹 사이트의 로딩 속도가 빨라집니다.
- 호스팅 유연성: 정적 파일이기 때문에 JamStack 사이트는 어디에서나 호스팅할 수 있습니다.
- 개발자 경험: 프런트엔드 개발자가 서버측 언어를 몰라도 사이트를 구축할 수 있습니다.
- 쉬운 스케일링: JAMStack 사이트는 어디에서나 제공될 수 있는 최소 크기의 파일 몇 개만 포함되어 있고 서버 사이드의 의존성 없이 확장이 용이합니다.
- 개발 생산성 향상: Gatsby, Next.js 등의 정적 사이트 생성기와 Netlify, Vercel 등의 호스팅 및 배포 서비스의 지원을 받고 있습니다.
- 보안: 모든 것이 API를 통해 작동하므로 데이터베이스 또는 보안 위반이 없습니다.
	- 데이터베이스와 소프트웨어 게층이 없기 때문에 SQL 삽입이나 서버 측 코드 삽입 공격에 취약하지 않고 CDN에서 사이트를 호스팅하면 서비스 거부 공격(Dos)으로부터 보호할 수 있습니다.


## JAM Stack 모범 사례
- 서버가 아닌 CDN을 사용하여 파일 배포
- npm 및 Git과 같은 도구를 사용하여 표준 및 빠른 설정을 보장한다.
- 빌드 도구를 사용하고 프로젝트가 모든 브라우저와 호환되도록 한다.
- 프로젝트가 웹 표준에 부합하고 접근성이 높은지 확인한다.
- 빌드 프로세스를 자동화한다.
- Netflify 같은 플랫폼을 사용하여 배포 프로세스를 자동으로 만든다.


## 내 생각
JavaScript, API 및 마크업과 같은 구성 요소를 준수하고 HTML이 정적으로 제공된다.

라고 한다면 JAM Stack 이다! 라고 말할 수 있을것 같다.

### 참고자료
[JAMstack 소개: 현대 웹의 아키텍처](https://medium.com/free-code-camp/an-introduction-to-the-jamstack-the-architecture-of-the-modern-web-c4a0d128d9ca)

[What is the JAMstack and how do I get started?](https://www.freecodecamp.org/news/what-is-the-jamstack-and-how-do-i-host-my-website-on-it/)

[netilfy/jamstack](https://www.netlify.com/jamstack/)

[gatsby/jamstack](https://www.gatsbyjs.com/docs/glossary/jamstack/)