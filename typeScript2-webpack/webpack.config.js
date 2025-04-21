const path = require("path");

module.exports = {
  // 앱의 시작점 (엔트리 파일)
  entry: "./src/app.ts",

  // 출력 설정
  output: {
    filename: "bundle.js", // 최종 번들 파일명
    path: path.resolve(__dirname, "dist"), // 절대 경로로 dist 폴더에 저장
    publicPath: "/dist/", // 브라우저가 번들 파일을 찾는 경로
  },

  // 개발 모드 (최적화 X, 디버깅에 유리)
  mode: "development",

  // 소스맵 생성 (브라우저에서 TypeScript 코드 그대로 디버깅 가능)
  devtool: "source-map",

  // 개발 서버 설정 (webpack-dev-server 사용)
  devServer: {
    static: {
      directory: path.join(__dirname), // index.html 위치 (기본 경로)
    },
    compress: true, // gzip 압축 사용
    port: 3000, // 로컬 서버 포트 번호
  },

  // 모듈 처리 규칙
  module: {
    rules: [
      {
        test: /\.ts$/, // .ts 확장자 파일을
        use: "ts-loader", // ts-loader로 처리하여
        exclude: /node_modules/, // node_modules는 제외
      },
    ],
  },

  // 모듈 해석 시 확장자 생략 가능하게 설정
  resolve: {
    extensions: [".ts", ".js"], // .ts, .js 순으로 모듈을 탐색
  },
};
