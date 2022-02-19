import React, { useState } from "react";
import styled from "styled-components";

import { ICard } from "./interface";
import Modal from "./Modal";

const Wrapper = styled.div`
  font-size: max(0.8vmax, 16px);
  font-weight: 600;
`;

const TextWrapper = styled.div`
  background-color: #fffb;
  box-shadow: 0 1px 1.5px #0002, 0 5px 10px #0001;
  border-radius: 0.2vmax;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.4vmax 0.8vmax;
`;

const Text = styled.h4`
  white-space: pre-wrap;
  cursor: pointer;
`;

const DeleteBtn = styled.button`
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

const TextForm = styled.form`
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

const EditBtn = styled.button.attrs({ type: "submit" })`
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

function Card({id, text, editCard, deleteCard}: ICard & { editCard: (card: ICard) => void, deleteCard: (id: number) => void }) {
  const [form, setForm] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const clickText = () => {
    setForm(text);
    setIsEdit(true);
  };

  const clickDelete = () => {
    setOpenModal(true);
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEdit(false);
    if (form === "") return;
    editCard({ id: id, text: form });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      setIsEdit(false);
      if (form === "") return;
      editCard({ id: id, text: form });
    } else if (e.key === "Escape") {
      setIsEdit(false)
    }
  };

  const handleDelete = (confirm: boolean) => {
    setOpenModal(false);
    if (!confirm) return;
    deleteCard(id);
  };
  
  return (
    <Wrapper>
      {isEdit ? (
        <TextForm onSubmit={handleEdit}>
          <Input
            value={form}
            onChange={e => setForm(e.currentTarget.value)}
            onFocus={e => e.currentTarget.select()}
            onBlur={() => setIsEdit(false)}
            onKeyDown={handleKeyDown}
          />
          <BtnWrapper>
            <EditBtn onMouseDown={e => e.preventDefault()}>
              Edit
            </EditBtn>
            <CloseBtn onClick={() => setIsEdit(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                <path d="M638.6,500l322.7-322.7c38.3-38.3,38.3-100.3,0-138.6C923,0.4,861,0.4,822.7,38.7L500,361.4L177.3,38.7C139,0.4,77,0.4,38.7,38.7C0.4,77,0.4,139,38.7,177.3L361.4,500L38.7,822.7C0.4,861,0.4,923,38.7,961.3C57.9,980.4,82.9,990,108,990s50.1-9.6,69.3-28.7L500,638.6l322.7,322.7c19.1,19.1,44.2,28.7,69.3,28.7c25.1,0,50.1-9.6,69.3-28.7c38.3-38.3,38.3-100.3,0-138.6L638.6,500z" />
              </svg>
            </CloseBtn>
          </BtnWrapper>
        </TextForm>
      ) : (
        <TextWrapper>
          <Text onClick={clickText}>
            {text}
          </Text>
          <DeleteBtn onClick={clickDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 512">
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                <path d="M1590 5100 c-233 -42 -400 -241 -400 -476 l0 -61 -37 -7 c-21 -3 -230 -6 -464 -6 -364 0 -432 -2 -473 -16 -67 -23 -147 -100 -180 -173 -26 -59 -26 -61 -24 -268 l3 -208 2132 -3 2133 -2 0 212 0 213 -29 60 c-34 73 -111 146 -178 169 -40 14 -108 16 -457 16 -226 0 -435 3 -463 6 l-53 7 0 61 c0 233 -173 439 -400 475 -76 13 -1041 13 -1110 1z m1094 -319 c67 -26 96 -76 96 -165 l0 -65 -637 2 -638 2 2 62 c3 88 36 141 103 166 26 10 1047 8 1074 -2z" />
                <path d="M194 3628 c3 -18 19 -134 36 -258 32 -234 89 -637 190 -1355 32 -231 84 -600 115 -820 31 -220 67 -476 80 -570 13 -93 36 -259 51 -368 24 -169 31 -202 51 -223 l22 -24 1395 0 c1016 0 1402 3 1420 11 13 7 29 23 35 38 6 14 29 156 51 316 22 160 47 335 55 390 8 55 31 217 51 360 19 143 69 494 109 780 70 496 116 822 171 1220 13 99 31 223 39 275 13 87 35 245 35 256 0 2 -880 4 -1955 4 l-1956 0 5 -32z m1019 -564 c92 -47 97 -63 122 -409 3 -33 7 -78 10 -100 5 -45 10 -100 25 -290 6 -71 13 -148 15 -170 7 -73 21 -232 50 -577 3 -35 10 -115 16 -178 5 -63 14 -164 20 -225 5 -60 12 -148 16 -195 15 -159 11 -221 -15 -258 -28 -39 -89 -72 -132 -72 -42 0 -104 33 -130 70 -22 31 -36 97 -44 215 -3 39 -10 124 -16 190 -6 66 -13 152 -16 190 -2 39 -7 80 -9 91 -3 12 -12 111 -20 220 -22 289 -24 310 -35 404 -5 47 -14 157 -20 245 -6 88 -15 196 -20 240 -5 44 -12 107 -14 140 -3 33 -10 120 -16 194 -6 74 -8 148 -4 165 10 47 43 86 88 107 51 23 88 24 129 3z m1030 -17 c71 -54 68 15 65 -1228 l-3 -1116 -27 -39 c-38 -55 -85 -78 -146 -72 -57 6 -104 35 -130 81 -16 30 -17 110 -20 1141 -1 724 1 1121 8 1146 22 80 82 123 167 117 37 -2 62 -11 86 -30z m963 14 c49 -22 81 -61 90 -108 4 -19 -1 -114 -10 -211 -10 -97 -24 -258 -31 -357 -16 -194 -20 -241 -35 -380 -5 -49 -14 -160 -21 -245 -6 -85 -12 -173 -14 -195 -3 -22 -7 -69 -10 -105 -4 -36 -8 -81 -10 -100 -4 -37 -22 -248 -30 -360 -2 -36 -7 -81 -10 -100 -2 -19 -7 -69 -10 -110 -4 -41 -14 -91 -23 -110 -18 -36 -68 -76 -109 -86 -61 -16 -143 26 -176 90 -20 38 -20 45 -8 191 6 83 14 167 16 186 2 19 9 97 15 174 6 77 15 183 20 235 15 153 19 197 30 339 15 192 18 229 25 291 9 89 21 233 40 475 3 33 7 78 10 100 3 22 7 67 10 100 16 214 26 240 100 282 48 27 87 29 141 4z" />
              </g>
            </svg>
          </DeleteBtn>
        </TextWrapper>
      )}
      {openModal && (
        <Modal
          type="delete"
          cat="Card"
          action={handleDelete}
        />
      )}
    </Wrapper>
  );
}

export default React.memo(Card);
