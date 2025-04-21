const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  // 프로덕션 모드 (최적화, 압축 활성화)
  mode: "production",

  // 앱 진입점
  entry: "./src/app.ts",

  // 번들 출력 설정
  output: {
    filename: "bundle.js", // 번들 파일명
    path: path.resolve(__dirname, "dist"), // dist 폴더에 저장 (절대 경로)
  },

  // 소스맵 생략 (배포 시 보안 및 용량 최적화)
  // devtool: "none", → 생략해도 자동 최적화됨

  // TypeScript 파일 처리 설정
  module: {
    rules: [
      {
        test: /\.tsx?$/, // .ts 또는 .tsx 파일에 대해
        use: "ts-loader", // ts-loader 사용
        exclude: /node_modules/, // node_modules 제외
      },
    ],
  },

  // 모듈 해석 확장자 설정
  resolve: {
    extensions: [".ts", ".js"],
  },

  // 플러그인 설정 - 배포 전 dist 폴더 초기화
  plugins: [
    new CleanPlugin.CleanWebpackPlugin(), // 매 빌드 시 dist 폴더 비움
  ],
};
