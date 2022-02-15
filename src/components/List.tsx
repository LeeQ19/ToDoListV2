import React from "react";
import styled from "styled-components";

import { IList } from "./interface";
import Card from "./Card";
import AddCard from "./AddCard";

const Wrapper = styled.div`
  width: 15vw;
  min-width: 250px;
  background-color: #fff4;
  box-shadow: 0 2px 3px #0002, 0 10px 20px #0001;
  display: flex;
  flex-direction: column;
  gap: 0.6vw;
  border-radius: 0.4vw;
  padding: 0.6vw;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
`;

function List({ id, name, cards }: IList) {
  return (
    <Wrapper>
      <Title>{name}</Title>
      {cards.map((v) => {
        return (
          <Card
            key={v.id}
            id={v.id}
            text={v.text}
          />
        );
      })}
      <AddCard />
    </Wrapper>
  );
}

export default List;
