import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { categoriesState, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDoList from "./ToDoList";

function Main() {
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoriesState);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(+event.currentTarget.value);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <h1 style={{ fontSize: "3rem", fontWeight: "700", }}>To Do List with React</h1>
      <hr style={{ width: "95vw", marginBottom: "10vh", }} />
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        gap: "20px",
        marginBottom: "5vh",
      }}>
        <select value={category} onInput={onInput} style={{ fontSize: "1.5rem", }}>
          {categories.map((v, i) => {
            return <option key={v} value={i}>{v}</option>
          })}
        </select>
        <CreateToDo />
      </div>
      <ul>
        {toDos?.map((toDo) => (
          <ToDoList key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
  );
}

export default Main;
