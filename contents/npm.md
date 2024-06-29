---
date: '2024-01-22'
title: 'npm에 react 컴포넌트 배포하기'
categories: ['JS', 'React']
summary: 'react로 만든 자식같은 컴포넌트를 이제는 사회로 내보내자'
thumbnail: './til.jpg'
---
최근 오픈소스에 관심을 가지면서, 오픈소스는 어떻게 만들어져 있는지에 대한 궁금증이 생겨서 직접 배포해보려고 한다.

CRA로 기본적인 프로젝트 설정을 해준다.
`$ npx create-react-app my-App`

필요한 의존성을 설치해준다. 기본적으로 react jsx 트랜스파일은 필요하다.  
`$ npm i -D @babel/cli @babel/preset-react`

이제 리액트 컴포넌트를 가져오자.
src/lib 경로에 폴더를 만들어서 넣어준다.

```shell
src/lib/Component
├── Component.hook.js
├── Component.jsx
├── Component.styles.css
└── index.js
```

Component.jsx같은 jsx 파일은 React.createElement로 엘리먼트를 생성하기 때문에 React가 필요하다.  
`import React from "react"` 로 react를 import 해주어야 한다. 

다음으로는 진입할 파일을 만들어준다.
```js
// src/index.js 
import React from "react";
import ReactDOM from "react-dom";

import { Component } from "./lib/Component";

ReactDOM.render(<Component />, document.getElementById("root"));
```

이제 배포를 위한 package.json을 다음을 참고해서 작성해준다.
```json
// package.json
{
	"name": "프로젝트 이름",
	"version": "0.1.0",
	"description": "프로젝트 설명",
	"repository": "깃 허브 저장소",
	"keywords": [
		"연관 검색어 단어"
	],
	"author": {
		"name": "name",
		"email": "email@email.com",
		"url": "깃 허브 프로필 주소",
	},
	"license": "MIT",
	"main": "dist/index.js",
	"module": "dist/index.js",
	"scripts": {
		"start": "react-scripts start",
		"build": "react-scripts build",
		"test": "react-scripts test",
		"eject": "react-scripts eject",
		"publish:npm": "rm -rf dist && mkdir dist && babel src/lib -d dist --copy-files"

	},
	"babel": {
		"presets": [
			"@babel/preset-react"
		]
	},
}
```

특별한점은 scripts안에 publish:npm이라는 명령어다. 이 명령어를 사용하게 되면 기존에 있던 dist폴더를 삭제후 다시 만들고 src/lib내부의 파일을 트랜스파일후 dist에 복사해준다.

root에 gitignore파일을 만들어 저장소에 올리지 않을 폴더나 파일을 지정해준다.

```shell
// .gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build
/public
/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

npm도 마찬가지로 npmignore파일을 만들어 npm에 올리지 않을 폴더나 파일을 지정해줄 수 있다.

```shell
// .npmignore
/node_modules
/build
/public
/test
```

다음으로는 다른 개발자들이 오픈소스에 기여할 수 있게 License를 파일을 만들어준다. MIT License를 사용한다면 root에 LICENSE 파일을 만들고 다음과 같이 작성할 수 있다.

```shell
// LICENSE

MIT License
Copyright (c) 2024 Geurim <kimminje7810@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

다음으로는 프로젝트의 README 파일을 작성한다.
프로젝트의 이름, 설명, 설치 방법, 예제, 라이센스, 컨튜리뷰팅 등을 적어준다.  
원한다면 license나 version, download수 를 뱃지로 달아줄 수도있다.
꺽쇠 '<>' 안의 내용을 내 프로젝트에 맞게 넣어주자.

```md
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/<username>/<projectname>/blob/main/LICENSE) 
[![npm version](https://img.shields.io/npm/v/<projectname>.svg?style=flat)](https://www.npmjs.com/package/<projectname>) 
![npm downloads](https://img.shields.io/npm/dt/<projectname>)
```

이제 npm에 배포하기 위해 회원가입 혹은 로그인을 해야한다.
터미널에서 `$ npm login` 을 사용하면 바로 로그인할 수 있고
`$ npm whoami` 를 사용하면 로그인 되어있는 계정을 볼 수 있다.

이제 배포를 하기 위해 `$ npm publish:npm` 명령어를 사용하고 `$ npm publish` 로 npm에 배포해주면 배포가 완료된다.

깃허브 저장소에서도 마찬가지로 프로젝트를 올려주고, 현재 프로젝트의 버전을 git tag로 현재 릴리즈된 버전을 명시해 줄 수 있다.

버전같은 경우는 보통 다음과 같은 Semantic Versioning 규칙을 따를 수 있다.

**version: "major.minor.patch"**  
major: 기존 버전과 호환되지 않는 버전  
minor: 기존 버전과 호환되는 새로운 기능을 추가한 버전  
patch: 기존 버전과 호환되는 버그를 수정한 버전

앞으로 프로젝트를 업데이트 해 나가면서 재배포를 할 경우에는 version을 1씩 올려주어야 배포가 성공적으로 된다.