import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { IBoard, IList } from "./interface";
import List from "./List";
import AddList from "./AddList";

const Wrapper = styled.div`
  width: min-content;
  min-width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 1vmax;
`;

function Board({ id, name, lists, editBoard }: IBoard & { editBoard: (board: IBoard)=> void }) {
  console.log(`Board, ${id}, ${name}, ${lists.length}`);
  const [currLists, setCurrLists] = useState(lists);

  useEffect(() => {
    if (lists !== currLists) {
      editBoard({ id: id, name: name, lists: currLists });
    }
  }, [currLists]);

  const editList = (list: IList) => {
    setCurrLists(v => v.map(w => w.id === list.id ? list : w));
  };

  const addList = (name: string) => {
    setCurrLists(v => [...v, { id: v.length, name: name, cards: [] }]);
  };

  const deleteList = (id: number) => {
    setCurrLists(v => v.filter(w => w.id !== id));
  };

  return (
    <Wrapper>
      {lists.map(v => (
        <List
          key={v.id}
          id={v.id}
          name={v.name}
          cards={v.cards}
          editList={editList}
          deleteList={deleteList}
        />
      ))}
      <AddList addList={addList} />
    </Wrapper>
  );
}

export default Board;
