import React from "react";
import styled from "styled-components";

import { IBoard } from "./interface";
import List from "./List";
import AddList from "./AddList";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1vw;
`;

function Board({ id, name, lists }: IBoard) {
  return (
    <Wrapper>
      {lists.map((v) => (
        <List
          key={v.id}
          id={v.id}
          name={v.name}
          cards={v.cards}
        />
      ))}
      <AddList />
    </Wrapper>
  );
}

export default Board;
