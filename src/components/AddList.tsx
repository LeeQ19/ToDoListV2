import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 15vw;
  min-width: 250px;
  flex-shrink: 0;
  background-color: #fff4;
  box-shadow: 0 2px 3px #0002, 0 10px 20px #0001;
  border-radius: 0.2vmax;
  font-size: 1vmax;
  font-weight: 600;
  padding: 0.6vmax;
`;

const Deactivated = styled.div`
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.4vmax;
  cursor: pointer;
  svg {
    height: 0.8vmax;
    fill: #333;
  }
  &:hover {
    color: #000;
    svg {
      fill: #000;
    }
  }
`;

const Activated = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.6vmax;
`;

const Input = styled.input.attrs({
  type: "text",
  name: "list",
  placeholder: "List name",
  autoComplete: "off",
  autoFocus: true,
})`
  width: 100%;
  background-color: #fffb;
  border-radius: 0.2vmax;
  padding: calc(0.4vmax - 4px) 0.8vmax;
`;

const BtnWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  gap: 0.5vmax;
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
    height: 1vmax;
    fill: #333;
  }
  svg:hover {
    fill: #000;
  }
`;

function AddList({ addList }: { addList: (name: string) => void }) {
  console.log(`AddList`);
  const [isActivate, setIsActivate] = useState(false);
  const [form, setForm] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsActivate(false);
    if (form === "") return;
    addList(form);
    setForm("");
  };

  return (
    <Wrapper>
      {isActivate ? (
        <Activated onSubmit={handleSubmit}>
          <Input
            onChange={e => setForm(e.target.value)}
            onBlur={() => setIsActivate(false)}
          />
          <BtnWrapper>
            <AddBtn onMouseDown={e => e.preventDefault()}>
              Add
            </AddBtn>
            <CloseBtn
              onClick={() => setIsActivate(false)}
            >
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
          Add a list
        </Deactivated>
      )}
    </Wrapper>
  );
}

export default AddList;
