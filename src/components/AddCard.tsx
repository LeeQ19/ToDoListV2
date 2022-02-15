import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border-radius: 0.2vw;
  font-size: 1.2rem;
  font-weight: 600;
`;

const Deactivated = styled.div`
  color: #333;
  border-radius: 0.2vw;
  padding: 0.4vw 0.8vw;
  cursor: pointer;
  &:hover {
    background-color: #fff4;
  }
`;

const Activated = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.4vw;
`;

const AInput = styled.input.attrs({
  type: "text",
  name: "text",
  placeholder: "Enter text for card...",
  autoComplete: "off",
})`
  background-color: #fffb;
  border-radius: 0.2vw;
  font-size: 1.2rem;
  font-weight: 400;
  padding: 0.4vw 0.8vw;
  padding-bottom: 2vw;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 0.4vw;
`;

const ABtn = styled.button.attrs({ type: "submit" })`
  background-color: #fffb;
  padding: 0.4vw 0.8vw;
  border-radius: 0.2vw;
`;

function AddCard() {
  const [isActivate, setIsActivate] = useState(false);
  const [form, setForm] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setForm("");
    setIsActivate(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(e.target.value);
  };

  return (
    <Wrapper>
      {isActivate ? (
        <Activated onSubmit={handleSubmit}>
          <AInput onChange={handleChange} />
          <BtnWrapper>
            <ABtn>Add card</ABtn>
          </BtnWrapper>
        </Activated>
      ) : (
        <Deactivated onClick={() => setIsActivate(true)}>
          + Add a card
        </Deactivated>
      )}
    </Wrapper>
  );
}

export default AddCard;
