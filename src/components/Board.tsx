import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Droppable } from 'react-beautiful-dnd';

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

function Board({ id, name, lists, editBoard }: IBoard & { editBoard: (board: IBoard) => void }) {
  const [currLists, setCurrLists] = useState(lists);

  useEffect(() => {
    setCurrLists(lists);
  }, [id]);

  useEffect(() => {
    if (lists !== currLists) {
      editBoard({ id: id, name: name, lists: currLists });
    }
  }, [currLists]);

  const addList = (name: string) => {
    setCurrLists(v => [...v, { id: v.length, name: name, cards: [] }]);
  };

  const editList = (list: IList) => {
    setCurrLists(v => v.map(w => w.id === list.id ? list : w));
  };

  const deleteList = (id: number) => {
    setCurrLists(v => [...v.slice(0, id), ...v.slice(id + 1).map(w => ({ id: w.id - 1, name: w.name, cards: w.cards }))]);
  };

  return (
    <Droppable
      droppableId="board"
      type="list"
      direction="horizontal"
    >
      {(provided, snapshot) => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
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
          {provided.placeholder}
          <AddList addList={addList} />
        </Wrapper>
      )}
    </Droppable>
  );
}

export default React.memo(Board);
