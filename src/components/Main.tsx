import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { boardId, boardsState } from "./atoms";
import Board from "./Board";

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #b92b27, #1565c0);
  padding: 4vh 2vw;
`;

function Main() {
  const [boards, setBoards] = useRecoilState(boardsState);
  const [id, setId] = useRecoilState(boardId);

  return (
    <Wrapper>
      <Board
        id={id}
        name={boards[id].name}
        lists={boards[id].lists}
      />
    </Wrapper>
  );
}

export default Main;
