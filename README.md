[webpack](https://webpack.js.org/configuration/output/#outputpath)

# 프로젝트 생성
Start the project
webpack-bundler에 대해 잘 학습할 수 있도록 하기 위해 실제로 프로젝트를 생성해줍니다.

## 1.1 패키지 설치
npm을 통해 package.json 파일을 생성하고 webpack 패키지 3가지를 설치해줍니다.

```bash
$ npm init -y

$ npm i -D webpack webpack-cli webpack-dev-server@next
```

### webpack

bundler가 동작하기 위한 핵심적인 패키지

### webpack-cli
CLI, 커맨드 라인 인터페이스를 제공하는 패키지

### webpack-dev-server
dev 명령을 통해 개발 서버를 오픈할 때 개발에 특화되어 패키지를 새로고침해줄 수 있는 구조로 만들기 위한 패키지

## 1.2 package-json 파일
package-json 파일을 오픈하여 script 내에 아래와 같이 webpack을 이용하여 개발을 할 수 있도록 합니다.

```json
"scripts": {
    "dev": "webpack-dev-server --mode development",
    "build": "webpack --mode production"
  },
```

## 1.3 index.html
index.html 파일과 main.scss, main.js 파일을 연결시켜줍니다. 그리고 CSS를 초기화시켜주기 위해 reset css mdn으로 구글 검색하여 나온 아래 링크를 SCSS 링크 태그 위에 코딩해줍니다.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css">

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hello Webpack!</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css">
  <link rel="stylesheet" href="./scss/main.scss">
  <script defer src="./js/main.js"></script>
</head>
<body>
  <h1>Hello Webpack!!</h1>
</body>
</html>
```

## 1.4 webpack.config.js 파일 생성
webpack을 통해 개발 서버를 오픈하기 위해 구성 파일을 생성해야 하며, 루트 경로에 webpack.config.js 파일을 생성해주시면 됩니다. webpack은 구성 옵션을 직접 작성해야 하며, 이러한 상세한 구성 옵션을 통해 훨씬 더 프로젝트를 세세하게 다룰 수 있습니다.

# webpack.config.js
webpack.config.js 파일에서 기본적인 구성 옵션을 추가할 수 있습니다. 브라우저에서는 import, export와 같이 데이터 가져오기와 내보내기가 사용됩니다.

그러나 webpack.config.js 파일은 브라우저가 아닌 node.js 환경에서 동작하므로 다른 명령어가 사용되며 이와 함께 사용되는 중요한 개념인 entry, output의 개념에 대해서도 알아보도록 합시다.

## 1. entry

```script
// export
module.exports = {
  // 파일을 읽어들이기 시작하는 진입점 설정
  entry: './js/main.js',
  output: ''
}
```

구성 옵션 중 하나인 entry는 webpack 번들러가 동작할 때 어디에서부터 어디에서부터 읽어들이기 시작하면 되는지에 대한 파일을 지정하는 키워드입니다. entry는 하나의 진입점이 아닌 여러 진입점을 설정해줄 수도 있습니다.

![image](https://user-images.githubusercontent.com/114347341/197591675-f5322dcf-41bc-4488-8c7c-c54ad23e62c1.png)

## 2. output

```script
// export
module.exports = {
  entry: './js/main.js',
  
  // 결과물(번들)을 반환하는 설정
  output: {
    path: 'dist',
    filename: 'app.js'
  }
}
```

output 옵션에는 entry를 통해 읽어들인 파일에 기본적인 연결 관계를 webpack이 분석하여 결과를 내어주는 기본적인 구성을 작성할 수 있습니다.

그리고 이 옵션에는 객체 데이터를 통해 대표적인 옵션인 path와 filename을 추가할 수 있습니다. path는 webpack을 동작시킬 때 어떠한 경로에 결과물을 만들어서 내어줄건지 명시할 수 있고, filename은 entry에서 읽어들인 파일명과 동일하게 지정해줄 수 있습니다.

한 가지 주의해야할 점은 path 옵션은 node.js에서 필요로 하는 절대 경로를 명시해줘야 합니다.

### 2.1 path 모듈 가져오기

```script
// import
const path = require('path')

// export
module.exports = {
  entry: './js/main.js',
  output: {
    path: 'dist',
    filename: 'app.js'
  }
}
```

위에 언급한 것처럼 path 옵션은 node.js에서 필요로 하는 절대 경로를 명시해줘야 하는데 이를 쉽게 하기 위해 node.js에서 제공하는 전역 모듈인 path를 가져오도록 합니다.

### 2.2 path 옵션 명시하기

```script
const path = require('path')

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  }
}
```

path라는 전역 모듈을 가져오고 이에 resolve()라는 메소드를 실행합니다. 해당 메소드는 첫 번째와 두 번째 인수의 경로를 합쳐주는 역할을 수행합니다.

__dirname은 node.js의 전역 변수로 현재 파일이 있는 그 경로를 지칭합니다. 
그리고 두 번째 인수인 dist라는 파일의 경로를 합쳐서 절대 경로를 output의 path 옵션에 제공할 수 있는 것입니다.

## 3. build

```bash
$ npm run build
```

build라는 제품 모드인 터미널 명령을 통해 프로젝트 폴더에 dist 폴더가 생겼으며, 그 안에 app.js 파일이 생성되었음을 확인할 수 있습니다.

### 3.1 clean 옵션 true

```script
const path = require('path')

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
    clean: true
  }
}
```

해당 경로에 파일명이 다른 main.js를 설치하게 되면 기존에 있던 app.js는 그대로 있고 추가적으로 main.js가 설치되게 됩니다. 
이를 해결하기 위해서는 clean이라는 옵션에 true 값을 주어 전에 설치한 파일을 제거하는 것이 가능합니다.

## 4. path 옵션 생략

```script
const path = require('path')

module.exports = {
  entry: './js/main.js',
  output: {
    clean: true
  }
}
```

위와 같이 output의 path, filename을 삭제하고 $npm run build를 진행해도 실제로는 dist 폴더와 그 안에 main.js과 함께 생성됩니다.
이는 webpack 번들러는 기본값으로 결과물을 dist 폴더에 entry에 입력한 동일한 파일명으로 만들어주기 때문입니다. 
그러나 구성이 복잡해지면 위에서 배운 path와 filename이 필요한 경우가 생길 수 있습니다.

# plugins
webpack 번들러를 통해 개발 서버 오픈을 하기 위해 필요한 플러그인을 설치하는 시간을 가져봅시다.

## 1. 플러그인 설치

```bash
$ npm i -D html-webpack-plugin
```

터미널 명령어를 통해 플러그인을 설치해줍니다.

## 2. 플러그인 가져오기

```script
const HtmlPlugin = require('html-webpack-plugin')
```

webpack.config.js 파일로 이동하여 설치한 플러그인을 가져오도록 합니다.

## 3. 플러그인 실행할 곳 명시하기

```script
const HtmlPlugin = require('html-webpack-plugin')

// 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
plugins: [
  new HtmlPlugin({
    template: '.index.html'
    })
]
```

plugins라는 구성 옵션에 배열 데이터를 하나 만들어줍니다. 이 안에 생성자 함수를 통해 변수로 지정했던 HtmlPlugin을 코딩하고 template으로 index.html 파일을 명시해주시면 됩니다.

이를 통해, webpack이 entry에 있는 js 파일을 읽어들이고 output 옵션을 통해 만들어진 결과물이 그 과정에서 plugins에 있는 플러그인들을 활용하게 됩니다.

![image](https://user-images.githubusercontent.com/114347341/197592459-becf1c10-37ad-42cd-bac9-65853e48e9df.png)

## 4. 개발 서버 오픈

```bash
$ npm run dev
```

터미널 명렁어를 통해 개발 서버를 오픈해줍니다.

## 5. devServer

정상적으로 개발 서버가 작동하는 경우도 있으나, 위와 같이 localhost에 들어갈 장소가 ::라고 표시되는 오류가 발생할 수 있습니다.
이를 해결하기 위해서는 webpack.config.js 파일에서 아래와 같이 개발 서버의 호스트를 코딩해주시면 됩니다.

```script
devServer: {
    host: 'localhost'
  }
```

# 정적 파일 연결
본인이 프로젝트에 연결되었으면 하는 파일을 개발 서버를 열거나 제품화 시킬 때, 직접 웹페이지에 연결되는 dist 폴더로 자동으로 넣어줄 수 있는 패키지에 대해 배워봅시다.

이를 정적 파일 연결이라하며, 새로운 개념이므로 아래 내용으로 살펴보도록 합시다.

## 1. favicon.ico
프로젝트 내에 favicon.ico 파일을 준비해줍니다. 어떤 파일이건 상관없으며, 저는 flaticon 홈페이지의 아래 파일을 이용하여 진행하도록 하겠습니다.

![image](https://user-images.githubusercontent.com/114347341/197592872-2bf44fc5-a194-42fc-aa31-7735cf29b532.png)

## 2. static 폴더 생성

프로젝트 내에 static 폴더를 생성해줍니다. 해당 폴더에 파비콘 파일을 넣어줍니다.

![image](https://user-images.githubusercontent.com/114347341/197593009-66b820b3-9544-45bb-8d9a-3ca8ded97537.png)

### 2.1 images 폴더 생성
static 폴더 내에 images 폴더를 생성해주고 프로젝트에 필요한 이미지 파일을 넣어줍니다. 저는 파비콘 파일의 원본 이미지인 logo.png 파일을 넣어주도록 하겠습니다.

![image](https://user-images.githubusercontent.com/114347341/197593070-be5528ec-29bf-489f-8fcf-b01b701d84b2.png)

### 2.2 logo.png 연결

```html
<body>
  <h1>Hello Webpack!!</h1>
  <img src="./images/logo.png" alt="OROSY">
</body>
```

images 폴더에 넣어준 파일이 제대로 동작하는 것을 확인하기 위해 index.html에 해당 내용을 코딩해줍니다.

## 3. 정적 파일 연결
실제로 정적 파일 연결을 위한 터미널 명령어와 설정 방법에 대해 알아봅시다.

### 3.1 패키지 설치
정적 파일 연결 패키지를 개발용으로 설치해줍니다.

```bash
npm install -D copy-webpack-plugin
```

### 3.2 webpack.config.js
webpack 구성 옵션 파일에 아래와 같이 코딩을 진행해줍니다.

```script
const CopyPlugin = require('copy-webpack-plugin')

plugins: [
  new CopyPlugin({
    patterns: [
      { from: 'static' }
    ]
  })
]
```
이는 프로젝트 내에 만들었던 static 폴더 안에 있는 내용을 새로 설치한 CopyPlugin 패키지를 통해 복사가 되어 dist 폴더에 들어갈 수 있도록 해줍니다.

![image](https://user-images.githubusercontent.com/114347341/197593217-c4fc61cd-7de2-4eb7-a2a1-33f484478096.png)

### 3.3 개발 서버 오픈
npm run dev로 개발 서버를 열고 확인하면, 이미지와 파비콘 파일이 잘 실행됨을 확인할 수 있습니다.

# module
이번에는 프로젝트에 css 파일을 통해 스타일을 적용해보도록 하겠습니다. webpack은 두 가지 방법을 제시하고 있으므로 각각 알아봅시다.

## 1. static 폴더
첫 번째는 static 폴더 내부에 css 폴더를 생성하여 연결하는 방법입니다.

### 1.1 index.html

```html
<link rel="stylesheet" href="./css/main.css">
```

link 태그를 이용하여 연결해줍니다.

### 1.2 main.css 파일 생성
static 폴더 내에 css 폴더를 만들고 그 안에 main.css 파일을 생성해줍니다.

### 1.3 npm run dev
개발 서버를 오픈시켜 잘 연결되었는지 확인합니다.

## 2. 루트 경로
두 번째 방법은 루트 경로에 css 폴더로 연결합니다.

### 2.1 main.css 파일 생성
루트 경로에 css 폴더를 만들고 그 안에 main.css 파일을 생성해줍니다.

### 2.2 main.js import

```script
import '../css/main.css'
```

main.js에 import 키워드를 통해 css 파일을 가져옵니다. 
이는 webpack.config.js에 entry: './js/main.js'를 명시한 것처럼 webpack은 시행되면서 main.js 파일을 먼저 읽어나갑니다. 
그렇기 때문에 import 키워드로 가져온 main.css 파일이 읽힐 수 있는 구조가 되는 것입니다.

![image](https://user-images.githubusercontent.com/114347341/197593579-c9925384-bd75-4b0e-956d-f86f6add93a7.png)

### 2.3 외부 패키지 설치
그러나 webpack은 css 파일을 읽을 수 없으므로 문제가 발생하게 됩니다. 이를 해결하기 위해서 외부의 패키지를 설치해야 합니다.

```bash
$ npm i -D css-loader style-loader
```

### 2.4 module 옵션 추가

```script
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    }
  ]
}
```

webpack.config.js 파일에 module 옵션을 추가해서 위 내용을 코딩해줍니다.

use에는 설치한 패키지 이름을 명시해줍니다. 그리고 test에는 정규표현식을 사용합니다. /\.css$/는 .css 확장자로 끝나는 모든 파일을 찾는다는 의미의 정규표현식입니다. 이를 통해, .css로 끝나는 모든 파일들은 test라는 속성으로 매칭하여 설치했던 패키지를 사용(use)하는 것입니다.

use 옵션에 명시한 style-loader, css-loader는 해당 순서대로 반드시 작성해야합니다. css-loader가 먼저 실행되고 이는 main.js 파일에서 css 파일을 해석할 수 있도록 해주는 패키지입니다. 이렇게 해석된 내용을 style-loader가 index.html의 style 태그에 해석된 내용을 삽입해줍니다.

![image](https://user-images.githubusercontent.com/114347341/197593751-3ee903ac-2b19-4ea1-9e1c-8158fe11d695.png)

### 2.5 개발 서버 오픈
npm run dev로 개발 서버를 열고 확인하면, 프로젝트에 스타일이 잘 적용된 것을 볼 수 있습니다.

# SCSS
이번에는 프로젝트에 SCSS 파일을 연결해보는 방법에 대해 살펴봅시다. 참고로 이전 글에서 css 파일을 적용하는 법과 연장선 상에 있는 내용이므로 module 글을 참고하는 것을 추천드립니다.

## 1. 루트 경로
루트 경로에 SCSS 폴더를 생성합니다.

### 1.1 main.scss 파일 생성
루트 경로에 SCSS 폴더를 만들고 그 안에 main.scss 파일을 생성해줍니다.

### 1.2 main.js import
import '../scss/main.scss'
main.js에 import 키워드를 통해 SCSS 파일을 가져옵니다.

### 1.3 외부 패키지 설치
그러나 webpack은 SCSS 파일을 읽을 수 없으므로 문제가 발생하게 됩니다. 이를 해결하기 위해서 외부의 패키지를 설치해야 합니다.

```bash
$ npm i -D css-loader style-loader // css 파일 관련 패키지
$ npm i -D sass-loader sass // scss 파일 관련 패키지
```

### 1.4 module 옵션 추가

```script
module: {
  rules: [
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }
  ]
}
```

이전 글에서와 마찬가지로 webpack.config.js 파일에 module 옵션을 추가해서 위 내용을 코딩해줍니다.

다만, test에 사용한 정규표현식인 /\.css$/는 css 파일을 읽기 때문에 그 앞에 s?를 붙여 s로 시작하거나 그렇지 않아도 된다는 의미를 부여하여 /\.s?css$/를 입력해줍니다. 정규표현식에 대한 간단한 내용은 여기에서 참고해주시면 됩니다.

그리고 use 태그에는 이전 포스트에서 다룬 css 파일을 가져오는 패키지인 style-loader, css-loader에 추가적으로 설치한 패키지인 sass-loader를 입력해주시면 됩니다.

![image](https://user-images.githubusercontent.com/114347341/197593751-3ee903ac-2b19-4ea1-9e1c-8158fe11d695.png)

### 1.5 개발 서버 오픈
npm run dev로 개발 서버를 열고 확인하면, 프로젝트에 SCSS 파일에 입력한 스타일이 잘 적용된 것을 볼 수 있습니다.

# autoprefixer
공급업체 접두사를 자동으로 진행해주는 패키지 autoprefixer를 webpack을 통해 설치하는 방법에 대해 알아봅니다. 
autoprefixer에 대한 개념에 더 알고싶은 분은 여기를 참고해주시면 됩니다.

## autoprefixer 설치 및 설정
### 1.1 패키지 설치

```bash
$ npm i -D postcss autoprefixer postcss-loader
```

postcss, autoprefixer 그리고 postcss-loader 총 3가지 패키지를 개발용으로 설치해줍니다.
postcss는 스타일의 후처리를 도와주는 패키지로 그 안에서 autoprefixer라는 공급 업체 접두사를 자동으로 붙여주도록 설치합니다. 
그리고 마지막으로 이 두 패키지가 webpack에서 동작할 수 있도록 postcss-loader를 설치해줍니다.

### 1.2 webpack.config.js
```script
module: {
  rules: [
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'sass-loader'
      ]
    }
  ]
},
```

webpack.config.js 파일에 module 옵션을 코딩해줍니다. 반드시 순서를 위와 같이 코딩해주셔야 합니다.

sass-loader로 SCSS 파일을 읽어온 후, post-loader로 공급 업체 접두사를 적용하고 혹은 post-css의 플러그인들을 사용할 수 있는 것입니다. 
그리고 이를 css-loader로 읽어들여 마지막으로 style.loader로 index.html에 style 태그로 삽입할 수 있도록 하는 것입니다.

### 1.3 package.json
package.json 파일에 browerslist 옵션을 코딩해줍니다. browerslist 옵션은 현재 NPM 프로젝트에서 지원할 브라우저의 범위를 명시하는 용도입니다.

```json
"browserslist": [
  "> 1%",
  "last 2 versions"
]
```

이것은 현재 프로젝트에서 전 세계의 점유율이 1% 이상인 모든 브라우저의 마지막 2개 버전까지 모두 지원을 하겠다는 의미입니다.

### 1.4 .postcssrc.js 파일 생성
.postcssrc.js 마침표로 시작하는 rc(runtime configuration) 파일, 즉 구성 파일을 만들어줍니다. 마침표로 시작하는 것은 구성 옵션이나 숨김 파일을 의미합니다.

### 1.5 import & export
.postcssrc.js 파일 내에 아래 내용을 코딩해줍니다.

module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
주로 사용하는 import, export 키워드는 node.js 환경에서 사용이 불가하여 CommonJS 방식인require(), module exports 키워드를 이용하여 JavaScript 파일을 가져오고 내보냅니다.

![image](https://user-images.githubusercontent.com/114347341/197594401-d191481d-152b-4a90-ae73-7c7a425b657c.png)

### 1.6 autoprefixer 버전 다운그레이드
PostCSS plugin autoprefixer requires PostCSS 8.
위의 모든 단계를 완료하고 개발 서버를 오픈하려하면 위와 같이 에러 메시지가 발생하게 됩니다. 이는 autoprefixer와 PostCSS의 버전이 충돌하고 있기 때문입니다.

이러한 이유로 10버전인 autoprefixer의 9버전으로 다운그레이드 해줍니다. 문제가 발생하지 않는다면 이 부분은 무시하셔도 됩니다.

```bash
npm i -D autoprefixer@9
```

### 1.7 개발 서버 오픈
개발 서버를 열어서 패키지가 잘 설치되었는지 확인해줍니다.

![image](https://user-images.githubusercontent.com/114347341/197594548-725559d8-74e2-4f52-ad98-1f172965f762.png)

# Babel
ES5 버전으로 변환시켜주는 컴파일러, Babel을 설치해보도록 합시다. 관련하여 Babel에 대해 더욱 자세히 알고 싶으시다면 이 글을 참고 부탁드립니다.

## Babel 설치 및 설정
### 1.1 패키지 설치 (1)
babel/core를 포함한 3가지 패키지를 개발 의존성 모듈로 설치해줍니다.

```bash
$ npm i -D @babel/core @babel/preset-env @babel/plugin-transform-runtime
```

### 1.2 .babelrc.js 파일 생성
.babelrc.js 마침표로 시작하는 rc(runtime configuration) 파일, 즉 구성 파일을 만들어줍니다. 마침표로 시작하는 것은 구성 옵션이나 숨김 파일을 의미합니다.

### 1.3 export
.babelrc.js 파일 내에 아래 내용을 코딩해줍니다.

```script
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    ['@babel/plugin-transform-runtime']
  ]
}
```

위 작업으로 프로젝트에서 작성하는 모든 JavaScript는 Babel을 통해 ES5 버전으로 변환되어 브라우저에서 동작하게 됩니다.

![image](https://user-images.githubusercontent.com/114347341/197594777-e06b708d-802e-4c1d-b3fc-724a9b7032a3.png)

### 1.4 webpack.config.js (1)
package.json 파일에 browerslist 옵션을 코딩해줍니다. browerslist 옵션은 현재 NPM 프로젝트에서 지원할 브라우저의 범위를 명시하는 용도입니다.

```script
"browserslist": [
    "> 1%",
    "last 2 versions"
  ]
```

이것은 현재 프로젝트에서 전 세계의 점유율이 1% 이상인 모든 브라우저의 마지막 2개 버전까지 모두 지원을 하겠다는 의미입니다.

### 1.5 webpack.config.js (2)

```script
module: {
  rules: [
    {
      test: /\.js$/,
      user: [
        'babel-loader'
      ]
    }
  ]
},
```

또한, 위 내용을 코딩하여 main.js와 같이 .js 확장자로 끝나는 JavaScript 파일들을 webpack에서 babel-loader로 읽어들여 Babel이 적용될 수 있도록 명시해주도록 합니다.

![image](https://user-images.githubusercontent.com/114347341/197594986-f195f2f1-7f78-4735-8663-d298c68d4318.png)

### 1.6 패키지 설치 (2)

```bash
$ npm i -D babel-loader
```

위에서 언급한 babel-loader 패키지를 추가적으로 설치해주면 준비과정은 끝이 납니다.

### 1.7 개발 서버 오픈
개발 서버를 열어서 패키지가 잘 설치되었는지 확인해줍니다. 확인을 위한 간단한 방법으로 main.js 파일에 아래와 같이 비동기 함수를 작성합니다.

```script
async function test() {
  const promise = Promise.reseolve(123)
  console.log(await promise)
}
test()
```

Babel이 정상적으로 작동했다면, 아래 그림과 같이 콘솔창에 123이 출력된 것을 볼 수 있습니다.

![image](https://user-images.githubusercontent.com/114347341/197595112-22acd132-c85f-4c20-8104-bad43f78dc24.png)

# Netlify 배포
현재까지 Webpack을 통해 만든 프로젝트를 GitHub에 올려 Netlify 배포까지 완성해보도록 하겠습니다. 간단하게 과정만 기록하는 글이므로 관련하여 Netlify 배포 과정에 대해 더욱 자세히 알고 싶으시다면 여기을 참고 부탁드립니다.

## 1. GitHub 업로드
### 1.1 .gitignore 파일 생성
.cache
.DS_Store // macOS
node_modules
dist
.gitignore 파일에 제외할 폴더를 명시하고 버전 관리를 시작합니다.

### 1.2 버전 관리

```bash
$ git init
$ git status
$ git add .
$ git commit -m 'Create project'
$ git log
$ git remote add origin https://github.com/orosy/webpack-template-basic.git
$ git push origin master
```

## 2. Netlify 배포
Netlify를 통해 원격저장소에 업로드한 프로젝트를 배포하는 과정에 대해 살펴봅시다.

### 2.1 New site from Git
로그인하여 New site from Git 버튼을 클릭해줍니다.

### 2.2 Continuous Deployment
GitHub 저장소를 클릭하여 지속적인 배포를 진행해줍니다.

### 2.3 webpack-template-basic
업로드한 저장소의 이름, webpack-template-basic을 검색하고 선택해줍니다.

### 2.4 Basic build settings

![image](https://user-images.githubusercontent.com/114347341/197595499-4d1bb233-b90d-406a-9d95-b9a9213e443b.png)

해당 부분을 보면, Netlify에게 저장소에 있는 프로젝트를 제품화시키는 명령어인 Build command와 이를 통해 제품화된 결과가 Publish directory라는 옵션에 지정하는 폴더에 있음을 알려주는 것입니다.
다른 이름의 폴더에 프로젝트가 들어있다면, 폴더명을 변경해주셔야합니다.


### 2.5 Netlify 배포
시간이 지나면, Netlify가 입력한 명령어 npm run dev를 통해 제품화를 시키고 배포를 완성합니다. 
오타 등의 오류가 발생하게 되면 배포가 진행되지 않으니 한 번에 되면 좋겠죠?

# NPX, Degit
parcel, webpack bundler를 통해 만든 템플릿을 터미널을 통해 손쉽게 다운로드하는 방법에 대해 살펴봅시다.

## 1. VS code
VS code를 실행하고 빈 터미널에 명령어를 입력합니다.

### 1.1 설치할 경로 설정하기
$ ls // macOS
$ dir // window
위 명렁어로 현재 경로 주변에 어떤 폴더와 파일이 있는지를 알려주는 명령어입니다.

$ cd Desktop/
chage directory의 줄임말인 cd를 입력하고 Desktop 바탕화면으로 이동합니다.

### 1.2 npx degit
$ npx degit orosy/webpack-template-basic webpack-template-test
degit 명령어를 통해 GitHub에 있는 특정한 저장소를 현재 경로로 다운로드 받을 수 있습니다. 이 명령어를 동작시키기 위해서는 degit 을 실제로 설치해야하지만, 설치하지 않고도 동작시킬 수 있게 npx를 앞에 입력해줍니다. npx는 node.js 환경에서 사용할 수 있습니다.

그 뒤에는 orosy/webpack-template-basic로 다운받을 저장소를 명시해줍니다. 그리고 다음으로 해당 저장소를 넣을 폴더명을 입력해줍니다.

### 1.3 설치 완료
npx: 1개의 패키지를 5.032초만에 설치했습니다.
> cloned orosy/webpack-template-basic#HEAD to webpack-template-test

위와 같이 설치가 완료되었다는 메시지를 확인할 수 있습니다.

### 1.4 VS code로 열기
$ cd webpack-template-test // 설치한 폴더로 이동하기

$ code . -r // VS code창에 현재 경로에 해당하는 프로젝트를 열기
이를 통해, 쉽게 프로젝트를 새로운 버전으로 시작할 수 있을 수 있습니다. 잘 기억해두면 매우 유용하게 사용할 수 있습니다 :D



























