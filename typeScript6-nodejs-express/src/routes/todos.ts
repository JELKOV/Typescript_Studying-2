import { Router } from "express";
// const express = require('express');
// const Router = express.Router

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todos";

// 미들웨어 등록
const router = Router();

// POST /todos → 새 Todo 생성
router.post("/", createTodo);

// GET /todos → 전체 Todo 목록 조회
router.get("/", getTodos);

// PATCH /todos/:id → 특정 Todo 업데이트
router.patch("/:id", updateTodo);

// DELETE /todos/:id → 특정 Todo 삭제
router.delete("/:id", deleteTodo);

export default router;
