//구성옵션지정
//node.js 환경

//import
const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

//export
module.exports = {
  //파일을 읽어들이기 시작하는 진입점설정
  entry: './js/main.js',
  
  //결과물(번들)을 반환하는 설정
  output: {
    // path: path.resolve(__dirname,'dist'), //절대경로 명시해야함
    // filename: 'main.js',
    clean: true //기존에 남아있는 파일은 제거 하고 다시 결과물을 만든다.
  },

  module:{ //규칙명시
    rules: [
      {
        test: /\.s?css$/, //.css 로 끈나는것을 찾는 정규표현식 ?= s가 있을수도 있고 없을수도 있고 정규표현식 css, scss 매칭
        use: [
          'style-loader', //4 순서로 해석됨 해석된 내용을 html style 부분에 삽입
          'css-loader', //3 자바스크립트에서 css 파일을 해석하는 용도 
          'postcss-loader',//2
          'sass-loader'//1
        ]
      },
      {
        test:/\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'static'}
      ]
    })
  ],
  devServer: {
    host:'localhost'
  }
}
