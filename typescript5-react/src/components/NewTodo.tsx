import React, { useRef } from "react";
import "./NewTodo.css";

type NewTodoprops = {
  onAddTodo: (todoText: string) => void;
};

function NewTodo(props: NewTodoprops) {
  //useRef 도 제네릭 함수 타입지정
  const textInputRef = useRef<HTMLInputElement>(null);

  function todoSubmithandler(event: React.FormEvent) {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText);
  }
  return (
    <form onSubmit={todoSubmithandler}>
      <div className="form-comtrol">
        <label htmlFor="todo-text">Todo Text</label>
        <input type="text" id="todo-text" ref={textInputRef} />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default NewTodo;
