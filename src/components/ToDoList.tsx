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
      const newToDo = { text, id, category: +name };
      return ([...toDos.slice(0, i), newToDo, ...toDos.slice(i + 1)]);
    });
  };
  
  return (
    <li
      key={id.toString()}
      style={{
        fontSize: "1.5rem",
        display: "grid",
        gridTemplateColumns: "repeat(2, auto)",
        gap: "20px",
      }}
    >
      <span>{text}</span>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, auto)",
          gridAutoColumns: "auto",
          gap: "5px",
        }}
      >
        {categories.map((c, i) => {
          return (i !== category ?
            <button
              key={c}
              name={i.toString()}
              onClick={onClick}
              style={{ fontSize: "1.2rem", }}
            >{c}</button>
            :
            null
          );
        }
        )}
      </div>
    </li>
  );
}

export default ToDoList;