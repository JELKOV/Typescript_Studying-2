# 📘 TypeScript 활용편 - 2탄: 모듈 시스템부터 실전 API까지

TypeScript의 실전 프로젝트 응용 능력을 기르기 위한 고급 학습 저장소입니다. 
모듈 시스템, Webpack, 외부 라이브러리 활용법, Google Maps 연동, 그리고 Node.js 기반 API 서버까지 다룹니다.

---

## 📁 폴더 구성

| 폴더명                           | 내용 요약                                                                 |
|--------------------------------|--------------------------------------------------------------------------|
| typeScript1-modules           | **모듈과 네임스페이스**<br/>ES6 모듈 vs namespace, import/export 전략, 실행 패턴 이해 |
| typeScript2-webpack           | **Webpack + TypeScript 연동**<br/>모던 개발환경 구성과 설정 파일(tsconfig/webpack.config) 다루기 |
| typeScript3-library           | **타사 라이브러리 사용법**<br/>Lodash, class-validator, class-transformer 등 타입 지원 없는 라이브러리와 통합하는 법 |
| typeScript4-apipractice-googlemap | **Google Maps API 실습**<br/>주소 -> 좌표 변환, 지도 렌더링, 마커 출력 실습 및 타입 문제 해결법 |
| typeScript5-react             | **React + TypeScript 통합 실습**<br/>Todo List 구현부터 상태 전달, 삭제 기능까지 전체 흐름 정리 |
| typeScript6-nodejs-express    | **Express + TypeScript 백엔드 실습**<br/>REST API 구성, Controller/Route 분리, CRUD 구현 등 실전 서버 구축 |

---

## 🧠 이 저장소의 목표

- 실무에 필요한 **타입스크립트 활용 능력** 강화
- Webpack 및 API 연동 등 **현대적인 개발 도구와의 통합법** 습득
- 타입 안정성을 해치지 않으면서 외부 JS 라이브러리 활용법 익히기
- Express 기반 백엔드 서버에 **타입 안전한 CRUD API** 구현 경험 쌓기
- 프론트-백엔드 연동을 위해 Google Maps와 React 연동도 실습

---

## 🛠 학습 내용 요약

1. **Modules & Namespace**
   - `outFile` + `amd` 설정 문제 해결, ES6 import/export vs namespace 비교, 런타임 오류 원인 탐색

2. **Webpack + TypeScript**
   - tsconfig/webpack.config 설정으로 개발 & 프로덕션 빌드 환경 구성

3. **외부 JS 라이브러리 통합**
   - 타입 정의가 없는 라이브러리 사용법, @types가 없는 경우 declare var 대안 전략
   - class-transformer, class-validator 실전 적용

4. **Google Maps API 실습**
   - 주소 입력 → 좌표 변환 → 지도 렌더링까지 흐름 구축
   - env 파일로 API 키 보안 적용, axios + Geocoding API 연동

5. **React + TypeScript**
   - Todo List 상태 관리, 전달, 삭제 기능 구현 + 타입 관리
   - FC 없이 직접 타입 정의하는 방식도 병행 실습

6. **Node.js + Express + TypeScript**
   - 백엔드 시작 → API CRUD 구현까지
   - 컨트롤러, 라우터, 모델 구조 분리 실습
   - body-parser, error 미들웨어, 타입 안정성 유지하는 방법 학습

---

## 🚀 기대 효과

- 실무에 가까운 프로젝트 구조 설계 경험
- 프론트엔드 + 백엔드 양쪽 모두에서 TypeScript 활용법 학습
- Webpack 설정, API 연동, 서버 미들웨어까지 전반적인 **타입 안전한 애플리케이션 개발 역량 향상**

---

📌 *이 저장소는 TypeScript에 대한 이론과 실습을 균형 있게 배울 수 있는 구조로 설계되었습니다.*

🎯 **1탄에서 배운 문법 + 2탄의 실전 흐름**을 결합해 실무에서도 자신 있게 활용할 수 있는 능력을 목표로 합니다.