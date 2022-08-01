---
date: '2022-07-29'
title: 'npm, npx'
categories: ['NPM']
summary: 'npm과 npx에 대해'
thumbnail: './js1.png'
---

# npm & npx

NPM(Node Package Manager): Node.js의 기본 패키지 매니저. node.js의 모든 패키지와 모듈을 관리하며 node.js를 설치하면 같이 설치된다. 

NPX(Node Package Execute): 5.2.0 이상 버전의 npm설치시 자동으로 설치된다. 패키지를 설치하지 않고 npm 레지스트리에서 원하는 패키지를 실행할 수 있는 npm 패키지 러너이다.

# npm, npx의 차이점

| npm  | npx  |
|:----------|:----------|
| npm을 통해 패키지를 실행하려면 package.json에 해당 패키지를 지정하고 로컬에 설치해야 한다.    | 패키지를 설치하지 않고 실행할 수 있다.   |
| 패키지를 설치하는 도구   | 패키지를 실행하는 도구    |
| npm 패키지는 전역으로 설치됨    | npx 패키지는 전역으로 설치되지 않음   |
| npm에서 create-react-app을 사용하려면 npm install create-react-app 다음 create-react-app myApp 명령을 사용하여 설치를 애햐한다.  | 패키지를 설치하지 않고 npx create-react-app 명령어로 앱을 만들수 있다.     |
