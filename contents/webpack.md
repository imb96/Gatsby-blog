---
date: '2024-01-20'
title: 'webpack 알아보기'
categories: ['webpack', 'js']
summary: 'webpack, code splitting, tree-shaking'
thumbnail: './til.jpg'
---

웹팩은 Javascript 모듈 번들러다. 모듈 번들러는 웹 애플리케이션을 구성하는 자원 (HTML, CSS, Javascript, Images 등)을 모두 각각의 모듈로 보고 이를 조합해서 병합된 하나의 결과물을 만드는 도구를 의미한다. 번들러를 사용하면 모듈 지원이 불가한 브라우저에서의 의존성 관리 문제를 해결할 수 있다.  
최근 사용되는 번들러들은 단순히 의존성 패키지들의 코드를 하나로 묶어 주는 것을 넘어 개발 생산성 자체에도 도움을 주고있다.

### webpack 설치

npm에서 webpack과 cli에서 웹팩을 사용할 수 있게 해줄 수 있게 설치한다.  
`$ npm i webpack webpack-cli --save-dev` 

다음과 같이 webpack 명령어로 번들링을 실행할 수 있다.  
`$ webpack`

webpack 설정을 위해 webpack.config.js 파일을 만든다.

```js
// webpack.config.js
const path = require("path");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
		// 현재 경로 하위의 dist 폴더
		clean: true
	},
};
```

entry: 진입할 파일, 이 파일을 기점으로 여러 모듈을 분석하여 의존성 그래프를 만들고 번들링한다.  
output: 만들어지는 최종 파일, 여러 옵션을 지정해 줄 수 있다.
- filename: 만들어지는 파일의 이름.
- path: 만들어지는 파일을 둘 경로.
- clean: build 시, dist 폴더를 지울지 여부.

build를 위해 package.json의 build 명령어로 "webpack"을 넣어준다.

```json
// package.json
"scripts": {
	"build": "webpack",
},
```

build 실행  
`$ npm run build`

빌드시 dist에 main.js 파일이 생성된다. 하지만 dist 폴더를 배포하기 위해선 html파일도 필요하다.  
`$ npm i html-webpack-plugin`  
번들 파일을 포함하는 HTML 파일을 자동으로 만들어준다.

```js
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
	],
};
```

template: 지정한, 기존에 만들어둔 파일을 이용해서 html을 생성해준다.

그런데 지금은 매번 빌드를 해줘야한다.  
`$ npm i -D webpack-dev-server`  
웹팩을 통해 개발 서버를 오픈한다. 코드를 수정해도 개발 서버에 바로 반영된다.

```js
// webpack.config.js
devServer: {
	static: {
		directory: path.resolve(__dirname, "dist"),
	},
	port: 8080,
},
```

```json
// package.json
"scripts": {
	"start": "webpack serve --open --mode=development",
	"build": "webpack --mode=production",
}
```

### Loader, Plugin

webpack은 기본적으로 자바스크립트 파일과 JSON파일만 이해한다. CSS나 이미지를 모듈 형태로 가져오려면 webpack의 loader 옵션을 사용하면 번들링 과정에서 loader가 이러한 자원들을 자바스크립트로 변환해준다.

`$ npm i -D style-loader css-loader`  
css loader: css를 읽어준다.  
style-loader: css를 style태그로 만들어서 head에 넣어준다.  
html webpack plugin은 plugin이고 css는 module로 작성해야 한다. 

```js
// webpack.config.js
module: {
	rules: [
		{
			test: /\.css$/,
			use: ["style-loader", "css-loader"],
		},
	],
},
```

 test: 확장자를 찾는다. 정규식 형태로 작성한다.  
 use: 확장자를 해석한다. 여러개일 경우 배열로 사용하고 뒤에서 부터 실행이된다.

style-loader는 style태그를 만들어서 head에 넣어준다. 

`$ npm i -D mini-css-extract-plugin`  
css를 하나의 파일로 만들어준다.

```js
// webpack.config.js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module: {
	rules: [
		{
			test: /\.css$/,
			// use: ["style-loader", "css-loader"],
			use: [MiniCssExtractPlugin.loader, "css-loader"],
		},
	],
},
plugins: [
	new MiniCssExtractPlugin({
		filename: "common.css",
	}),
],
```

이렇게 빌드하게 되면 dist 폴더에 common.css 파일이 생기고, index.html에 링크 태그로 common.css가 생긴다.

이미지 파일 불러오기  
`$ npm i -D file-loader`

```js
// webpack.config.js
module: {
	rules: [
		{
			test: /\.jpeg$/,
			use: ["file-loader"],
		},
	],
},
```

이전의 빌드파일이 깔끔하게 지워지지 않는 경우가 있다. 이 경우에는 사용하지 않는 파일 지우는 plugin을 사용할 수 있다.

`$ npm i -D clean-webpack-plugin`

```js
// webpack.config.js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

plugins: [
	new CleanWebpackPlugin(),
],
```

이외에도 다양한 plugin들이 있다. 그 중 몇가지는 추가 설치 없이 사용할 수 있으며 대표적으로 Terser Plugin이 있다. terser라는 자바스크립트 파서이자 압축 도구를 이용해 자바스크립트 코드를 경량화 해주는 Plugin이다.

```js
// webpack.config.js
const TerserPlugin = require('terser-webpack-plugin')

optimization: {
	minimize: true,
	minimizer: [
		new TerserPlugin({
			extractComments: false,
		}),
	],
},
```

### code splitting
페이지마다 필요한 코드만 로딩하도록 코드를 잘게 나누는 방법. 코드 스플리팅을 통해 쪼개진 번들 파일들은 필요할 때만 로딩할 수 있으며, 이 과정을 병렬로 진행할 수도 있다.

webpack에서 제공하는 대표적인 코드 스플리팅 방법은 세 가지가 있다.
1. entry 설정을 이용하는 방법
2. 기존 entry나 새로운 청크의 공통 의존성을 SplitChunksPlugin을 통해 제거하고 분할하는 방법
3. Dynamic Import를 이용해 모듈에서 코드를 나누는 방법

![](../static/webpack1.png)
bundle.js는 a.js와 b.js 그리고 a.js, b.js에서 의존하고 있는 공통모듈인 c.js가 번들링된 파일이다. a.js와 b.js는 각각 다른 페이지에서 사용되며 동시에 다운로드할 필요가 없다고 가정해보자.

이런경우 첫 번째 방법인 webpack의 entry 옵션을 나누어 번들링을 실행하면 두 파일을 분리하여 번들파일을 생성할 수 있다.

![](../static/webpack2.png)

하지만 이렇게 생성된 두 번들 파일은 공통으로 c.js가 사용되고 있어서 번들 파일의 크기가 더 증가한다. 이러한 중복 코드는 두 번째 방법인 SplitChunkPlugin을 사용하여 공통으로 분리할 수 있다.

![](../static/webpack3.png)
세번째 방법인 Dynamic import는 필요할 때 동적으로 원하는 모듈 파일을 가져올 수도 있다.

### tree-shaking
단어 그대로 나무를 흔들어 죽은 낙엽이나 가지를 떨어트리는 작업을 의미한다. 코드에서는 죽은 코드 제거, 즉 사용하지 않는 코드를 빌드 과정에서 제거하는 것을 의미한다.

대부분의 프로젝트에서 여러 외부 모듈이나 패키지를 사용하는데, 보통 이런 외부 패키지의 모든 기능을 사용하지는 않는다. 이런 모든 모듈들이 번들 파일에 포함되면 불필요한 모듈까지 번들 파일에 포함되어 용량이 증가할 것이다. tree-shaking은 이런 문제를 해결해 줄 수 있는 방법이다.

webpack5 이전까지는 tree-shaking을 적용하기 위해 ES2015의 import, export 했지만 webpack5부터는 완벽하진 않지만 CommonJS 모듈의 경우도 tree-shaking 가능하다.

지금까지 알아본것 처럼 webpack은 단순한 번들러 역할을 넘어 code splitting, tree-shaking 등 최적화를 위한 다양한 기능을 제공한다. webpack 외에도 Parcel이나 Rollup 번들러도 많이 사용되고 있으며 esbuild 같은 모던 번들러도 주목 받고있다.

> 참고  
> https://www.youtube.com/watch?v=zal9HVgrMaQ  
> 기초부터 완성까지, 프런트엔드