import React from "react";
import styled from "styled-components";

import { IBoard } from "./interface";
import List from "./List";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1vw;
`;

function Board({ id, name, lists }: IBoard) {
  return (
    <Wrapper>
      {lists.map((v) => {
        return (
          <List
            key={v.id}
            id={v.id}
            name={v.name}
            cards={v.cards}
          />
        );
      })}
    </Wrapper>
  );
}

export default Board;
