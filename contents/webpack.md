---
date: '2024-01-20'
title: 'webpack 알아보기'
categories: ['webpack']
summary: 'webpack의 기본정리'
thumbnail: './til.jpg'
---

웹팩은 Javascript `모듈 번들러`다. 모듈 번들러는 웹 애플리케이션을 구성하는 자원 (HTML, CSS, Javascript, Images 등)을 모두 각각의 `모듈`로 보고 이를 `조합`해서 병합된 하나의 결과물을 만드는 도구를 의미한다.  
웹팩을 설치해서 직접 사용해보자.

webpack 설치, cli에서 웹팩을 사용할 수 있게 해준다.  
`npm i webpack webpack-cli --save-dev`  


루트에 webpack.config.js 파일을 생성해서 설정해보자.

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

entry: 진입할 파일.  
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
`npm run build`  

빌드시 dist 폴더에 main.js 파일이 생성된다. 하지만 dist 폴더를 배포하기 위해선 html파일도 필요하다.  
이를 위한 플러그인을 설치한다.  
`npm i html-webpack-plugin`

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

그런데 지금은 매번 빌드하면서 확인해 줘야한다.

웹팩을 통해 개발 서버를 오픈한다. 코드를 수정해도 개발 서버에 바로 반영된다.  
`npm i -D webpack-dev-server`  

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

이번에는 css를 적용해보자.

`npm i -D style-loader css-loader`

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

 test: 확장자를 찾는다.  
 use: 확장자를 해석한다. 여러개일 경우 배열로 사용하고 뒤에서 부터 실행이된다.

style-loader는 style태그를 만들어서 head에 넣어준다.
이를 하나의 css 파일로 만들어보자.  
`npm i -D mini-css-extract-plugin`  

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

다음으로는 이미지 파일을 불러와보자.
이미지 파일을 불러오기 위해서 file-loader를 설치할 수 있다.  
`npm i -D file-loader`

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
`npm i -D clean-webpack-plugin`

```js
// webpack.config.js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

plugins: [
	new CleanWebpackPlugin(),
],
```