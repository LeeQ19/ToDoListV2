import React from "react";
import styled from "styled-components";

import { ICard } from "./interface";

const Wrapper = styled.div`
  background-color: #fffb;
  box-shadow: 0 1px 1.5px #0002, 0 5px 10px #0001;
  border-radius: 0.2vw;
  padding: 0.4vw 0.8vw;
`;

const Text = styled.h4`
  font-size: 1.2rem;
  font-weight: 400;
`;

function Card({id, text}: ICard) {
  return (
    <Wrapper>
      <Text>{text}</Text>
    </Wrapper>
  );
}

export default Card;
