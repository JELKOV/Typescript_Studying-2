import express, { Request, Response, NextFunction } from "express"; // Express 서버 및 타입 관련 객체 임포트
import bodyParser from "body-parser"; // 요청 본문(JSON 등) 파싱을 위한 미들웨어
import todoRoutes from "./routes/todos"; // todo 관련 라우터 모듈

const app = express(); // Express 애플리케이션 인스턴스 생성

// 본문 파싱 미들웨어 등록
// 클라이언트가 보낸 JSON 데이터를 `req.body`로 사용할 수 있도록 함
app.use(bodyParser.json());

// Todo 라우터 등록
// "/todos"로 시작하는 모든 요청은 `todoRoutes`에서 처리
app.use("/todos", todoRoutes);

// 전역 오류 처리 미들웨어
// 라우터나 미들웨어에서 발생한 에러를 최종적으로 처리
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message }); // 에러 메시지를 JSON으로 응답
});

// 서버 실행
// 포트 3000번에서 서버 시작
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});