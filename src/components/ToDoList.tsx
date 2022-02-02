import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, IToDo, toDosState } from "../atoms";

function ToDoList({ text, category, id }: IToDo) {
  const categories = useRecoilValue(categoriesState);
  const setToDos = useSetRecoilState(toDosState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name } } = event;

    setToDos((toDos) => {
      const i = toDos.findIndex((toDo) => toDo.id === id);
      if (name === "-1") {
        return ([...toDos.slice(0, i), ...toDos.slice(i + 1)]);
      }
      const newToDo = { text, id, category: +name };
      return ([...toDos.slice(0, i), newToDo, ...toDos.slice(i + 1)]);
    });
  };
  
  return (
    <li
      key={id.toString()}
      style={{
        fontSize: "1.5rem",
        display: "flex",
        gap: "20px",
      }}
    >
      <span>{text}</span>
      <div style={{ display: "flex", gap: "5px", }}>
        {categories.map((c, i) => {
          return (i !== category && (
            <button
              key={c}
              name={i.toString()}
              onClick={onClick}
              style={{ fontSize: "1.2rem", }}
            >
              {c}
            </button>
          ));
        })}
        <button name={"-1"} onClick={onClick} style={{ fontSize: "1.2rem" }}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default ToDoList;