import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border-radius: 0.2vmax;
  font-size: max(0.8vmax, 16px);
  font-weight: 600;
`;

const Deactivated = styled.div`
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.4vmax;
  border-radius: 0.2vmax;
  padding: 0.4vmax 0.8vmax;
  cursor: pointer;
  svg {
    height: max(0.6vmax, 12px);
    fill: #333;
  }
  &:hover {
    background-color: #fff4;
    color: #000;
    svg {
      fill: #000;
    }
  }
`;

const Activated = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.6vmax;
`;

const Input = styled.textarea.attrs({
  name: "card",
  placeholder: "Text for card",
  autoFocus: true,
})`
  background-color: #fffb;
  border-radius: 0.2vmax;
  padding: 0.4vmax 0.8vmax;
  resize: vertical;
  cursor: auto;
`;

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1vmax;
`;

const AddBtn = styled.button.attrs({ type: "submit" })`
  background-color: #fffb;
  padding: 0.4vmax 0.8vmax;
  border-radius: 0.2vmax;
  cursor: pointer;
  &:hover {
    background-color: #fff8;
  }
`;

const CloseBtn = styled.button.attrs({ type: "reset" })`
  background-color: transparent;
  cursor: pointer;
  svg {
    height: max(0.8vmax, 16px);
    fill: #333;
  }
  svg:hover {
    fill: #000;
  }
`;

function AddCard({ addCard }: { addCard: (text: string) => void }) {
  const [isActivate, setIsActivate] = useState(false);
  const [form, setForm] = useState("");

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsActivate(false);
    if (form === "") return;
    addCard(form);
    setForm("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit();
    } else if (e.key === "Escape") {
      setIsActivate(false)
      setForm("");
    }
  };

  return (
    <Wrapper>
      {isActivate ? (
        <Activated onSubmit={handleSubmit}>
          <Input
            onChange={e => setForm(e.currentTarget.value)}
            onBlur={() => setIsActivate(false)}
            onKeyDown={handleKeyDown}
          />
          <BtnWrapper>
            <AddBtn onMouseDown={e => e.preventDefault()}>
              Add
            </AddBtn>
            <CloseBtn onClick={() => setIsActivate(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                <path d="M638.6,500l322.7-322.7c38.3-38.3,38.3-100.3,0-138.6C923,0.4,861,0.4,822.7,38.7L500,361.4L177.3,38.7C139,0.4,77,0.4,38.7,38.7C0.4,77,0.4,139,38.7,177.3L361.4,500L38.7,822.7C0.4,861,0.4,923,38.7,961.3C57.9,980.4,82.9,990,108,990s50.1-9.6,69.3-28.7L500,638.6l322.7,322.7c19.1,19.1,44.2,28.7,69.3,28.7c25.1,0,50.1-9.6,69.3-28.7c38.3-38.3,38.3-100.3,0-138.6L638.6,500z" />
              </svg>
            </CloseBtn>
          </BtnWrapper>
        </Activated>
      ) : (
        <Deactivated onClick={() => setIsActivate(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
          </svg>
          Add a card
        </Deactivated>
      )}
    </Wrapper>
  );
}

export default React.memo(AddCard);
