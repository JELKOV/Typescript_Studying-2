// Express에서 제공하는 타입 중 하나인 RequestHandler를 임포트
import { RequestHandler } from "express";

// Todo 모델 클래스 임포트 (id와 text 속성을 가진 클래스)
import { Todo } from "../models/todo";

// 메모리에 임시 저장될 Todo 목록 배열 (DB 대신 사용)
const TODOS: Todo[] = [];

// 새 Todo를 생성하는 컨트롤러 함수 (Express 미들웨어 함수 형식)
export const createTodo: RequestHandler = (req, res, next) => {
  // 요청 본문(req.body)에서 text 프로퍼티만 추출
  // 타입스크립트가 req.body의 구조를 모르기 때문에 형변환(as)을 사용
  const text = (req.body as { text: string }).text;

  // 고유 ID를 위한 난수 문자열과 입력된 텍스트를 이용해 새로운 Todo 인스턴스를 생성
  const newTodo = new Todo(Math.random().toString(), text);

  // 메모리 배열에 새 Todo 추가
  TODOS.push(newTodo);

  // 클라이언트에게 JSON 형태로 응답 반환 (상태 코드 201: Created)
  res.status(201).json({
    messages: "Created the todo.",
    createdTodo: newTodo, // 방금 추가된 todo 객체를 함께 반환
  });
};

// 현재 저장된 모든 Todo 항목을 클라이언트에 반환하는 함수
export const getTodos: RequestHandler = (req, res, next) => {
  res.json({
    todos: TODOS, // 배열 그대로 JSON 형태로 반환
  });
};

// 특정 ID를 가진 Todo 항목을 업데이트하는 함수수
export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id; // URL의 동적 세그먼트에서 ID 추출
  const updatedText = (req.body as { text: string }).text;
  // 해당 ID를 가진 Todo 항목의 인덱스를 배열에서 찾음
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);
  if (todoIndex < 0) throw new Error("Todo not found"); // 못 찾으면 에러

  // 기존 ID를 유지하고 텍스트만 변경하여 새로운 Todo 객체로 교체
  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText);

  // 클라이언트에 성공 메시지 및 업데이트된 항목 반환
  res.json({ message: "Updated", updateTodo: TODOS[todoIndex] });
};

// 특정 ID를 가진 Todo 항목을 삭제하는 함수
export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  // 배열에서 해당 항목 제거
  TODOS.splice(todoIndex, 1);

  res.json({ message: "Todo deleted!" });
};
