import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { boardId, boardsState } from "./atoms";
import { IBoard } from "./interface";
import Board from "./Board";
import Modal from "./Modal";

const Wrapper = styled.div`
  width: min-content;
  min-width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #b92b27, #1565c0);
  display: flex;
  flex-direction: column;
  gap: 1vmax;
  padding: 4vh 2vw;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1vmax;
  font-size: 1.2vmax;
  font-weight: 600;
`;

const SelectBox = styled.select`
  max-width: 50vw;
  border-radius: 0.2vmax;
  box-shadow: 0 2px 3px #0002, 0 10px 20px #0001;
  padding: 0.4vmax 1.6vmax 0.4vmax 0.8vmax;
  cursor: pointer;
  &:hover {
    background-color: #fffb;
  }
  -webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
  background: #fff4 url('data:image/svg+xml;utf8,<svg viewBox="0 0 1280 640" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M10 6392 c0 -4 1438 -1445 3195 -3202 l3195 -3194 3195 3194 c1757 1757 3195 3198 3195 3202 0 5 -2875 8 -6390 8 -3515 0 -6390 -3 -6390 -8z" transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" /></svg>') no-repeat;
  background-position: right 0.6vw center;
  option {
    max-width: 50vw;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1vmax;
`;

const TitleBox = styled.div`
  max-width: 40vw;
  max-height: 3vw;
  background-color: #fff4;
  box-shadow: 0 2px 3px #0002, 0 10px 20px #0001;
  border-radius: 0.2vmax;
  padding: 0.4vmax 0.8vmax;
  word-wrap: break-word;
  overflow: hidden;
  cursor: pointer;
  &:hover {
    background-color: #fffb;
  }
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  padding: 0.4vmax 0;
  cursor: pointer;
  svg {
    height: 1.2vmax;
    fill: #333;
  }
  svg:hover {
    fill: #000;
  }
`;

const TitleForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.6vmax;
`;

const Input = styled.input.attrs({
  type: "text",
  name: "board",
  placeholder: "Board name",
  autoComplete: "off",
  autoFocus: true,
})`
  max-width: 40vw;
  background-color: #fffb;
  box-shadow: 0 2px 3px #0002, 0 10px 20px #0001;
  border-radius: 0.2vmax;
  padding: calc(0.4vmax - 4px) 0.8vmax;
`;

const BtnWrapper = styled.div`
  display: flex;
  gap: 0.6vmax;
`;

const EditBtn = styled.button.attrs({ type: "submit" })`
  background-color: #fffb;
  box-shadow: 0 2px 3px #0002, 0 10px 20px #0001;
  border-radius: 0.2vmax;
  padding: 0.4vmax 0.8vmax;
  cursor: pointer;
  &:hover {
    background-color: #fff8;
  }
`;

const CloseBtn = styled.button.attrs({ type: "reset" })`
  background-color: transparent;
  cursor: pointer;
  svg {
    height: 1.2vmax;
    fill: #333;
  }
  svg:hover {
    fill: #000;
  }
`;

function Main() {
  const [boards, setBoards] = useRecoilState(boardsState);
  const [id, setId] = useRecoilState(boardId);
  const [form, setForm] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const editBoard = (board: IBoard) => {
    setBoards(v => v.map(w => w.id === id ? board : w));
  };

  const clickAdd = () => {
    setForm("");
    setIsAdd(true);
  };

  const clickTitle = () => {
    setForm(boards[id].name);
    setIsEdit(true);
  };

  const clickDelete = () => {
    if (boards.length === 1) return;
    setOpenModal(true);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "-1") {
      clickAdd();
    } else {
      setId(parseInt(e.target.value));
    }
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAdd(false);
    if (form === "") return;
    const prevLength = boards.length;
    setBoards(v => [...v, { id: v.length, name: form, lists: [] }]);
    setId(prevLength);
  };

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEdit(false);
    if (form === "") return;
    setBoards(v => v.map(w => w.id === id ? { id: w.id, name: form, lists: w.lists } : w));
  };

  const handleDelete = (confirm: boolean) => {
    setOpenModal(false);
    if (!confirm) return;
    const prevId = id;
    setId(v => v < boards.length - 1 ? v : v - 1);
    setBoards(v => v.filter(w => w.id !== prevId));
  };

  return (
    <Wrapper>
      <Header>
        <SelectBox onChange={handleSelect} value="">
          <option value="" disabled hidden>
            Board
          </option>
          <option value="-1">
            + New
          </option>
          {boards.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </SelectBox>
        {isAdd ? (
          <TitleForm onSubmit={handleAdd}>
            <Input
              value={form}
              size={form.length + 1}
              onChange={e => setForm(e.target.value)}
              onBlur={() => setIsAdd(false)}
            />
            <BtnWrapper>
              <EditBtn
                onMouseDown={e => e.preventDefault()}
              >
                Add
              </EditBtn>
              <CloseBtn onClick={() => setIsAdd(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                  <path d="M638.6,500l322.7-322.7c38.3-38.3,38.3-100.3,0-138.6C923,0.4,861,0.4,822.7,38.7L500,361.4L177.3,38.7C139,0.4,77,0.4,38.7,38.7C0.4,77,0.4,139,38.7,177.3L361.4,500L38.7,822.7C0.4,861,0.4,923,38.7,961.3C57.9,980.4,82.9,990,108,990s50.1-9.6,69.3-28.7L500,638.6l322.7,322.7c19.1,19.1,44.2,28.7,69.3,28.7c25.1,0,50.1-9.6,69.3-28.7c38.3-38.3,38.3-100.3,0-138.6L638.6,500z" />
                </svg>
              </CloseBtn>
            </BtnWrapper>
          </TitleForm>
        ) : (isEdit ? (
          <TitleForm onSubmit={handleEdit}>
            <Input
              value={form}
              size={form.length + 1}
              onChange={e => setForm(e.target.value)}
              onFocus={e => e.currentTarget.select()}
              onBlur={() => setIsEdit(false)}
            />
            <BtnWrapper>
              <EditBtn
                onMouseDown={e => e.preventDefault()}
              >
                Edit
              </EditBtn>
              <CloseBtn onClick={() => setIsEdit(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                  <path d="M638.6,500l322.7-322.7c38.3-38.3,38.3-100.3,0-138.6C923,0.4,861,0.4,822.7,38.7L500,361.4L177.3,38.7C139,0.4,77,0.4,38.7,38.7C0.4,77,0.4,139,38.7,177.3L361.4,500L38.7,822.7C0.4,861,0.4,923,38.7,961.3C57.9,980.4,82.9,990,108,990s50.1-9.6,69.3-28.7L500,638.6l322.7,322.7c19.1,19.1,44.2,28.7,69.3,28.7c25.1,0,50.1-9.6,69.3-28.7c38.3-38.3,38.3-100.3,0-138.6L638.6,500z" />
                </svg>
              </CloseBtn>
            </BtnWrapper>
          </TitleForm>
        ) : (
          <TitleWrapper>
            <TitleBox onClick={clickTitle}>
              {boards[id].name}
            </TitleBox>
            <DeleteBtn onClick={clickDelete}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 512">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                  <path d="M1590 5100 c-233 -42 -400 -241 -400 -476 l0 -61 -37 -7 c-21 -3 -230 -6 -464 -6 -364 0 -432 -2 -473 -16 -67 -23 -147 -100 -180 -173 -26 -59 -26 -61 -24 -268 l3 -208 2132 -3 2133 -2 0 212 0 213 -29 60 c-34 73 -111 146 -178 169 -40 14 -108 16 -457 16 -226 0 -435 3 -463 6 l-53 7 0 61 c0 233 -173 439 -400 475 -76 13 -1041 13 -1110 1z m1094 -319 c67 -26 96 -76 96 -165 l0 -65 -637 2 -638 2 2 62 c3 88 36 141 103 166 26 10 1047 8 1074 -2z" />
                  <path d="M194 3628 c3 -18 19 -134 36 -258 32 -234 89 -637 190 -1355 32 -231 84 -600 115 -820 31 -220 67 -476 80 -570 13 -93 36 -259 51 -368 24 -169 31 -202 51 -223 l22 -24 1395 0 c1016 0 1402 3 1420 11 13 7 29 23 35 38 6 14 29 156 51 316 22 160 47 335 55 390 8 55 31 217 51 360 19 143 69 494 109 780 70 496 116 822 171 1220 13 99 31 223 39 275 13 87 35 245 35 256 0 2 -880 4 -1955 4 l-1956 0 5 -32z m1019 -564 c92 -47 97 -63 122 -409 3 -33 7 -78 10 -100 5 -45 10 -100 25 -290 6 -71 13 -148 15 -170 7 -73 21 -232 50 -577 3 -35 10 -115 16 -178 5 -63 14 -164 20 -225 5 -60 12 -148 16 -195 15 -159 11 -221 -15 -258 -28 -39 -89 -72 -132 -72 -42 0 -104 33 -130 70 -22 31 -36 97 -44 215 -3 39 -10 124 -16 190 -6 66 -13 152 -16 190 -2 39 -7 80 -9 91 -3 12 -12 111 -20 220 -22 289 -24 310 -35 404 -5 47 -14 157 -20 245 -6 88 -15 196 -20 240 -5 44 -12 107 -14 140 -3 33 -10 120 -16 194 -6 74 -8 148 -4 165 10 47 43 86 88 107 51 23 88 24 129 3z m1030 -17 c71 -54 68 15 65 -1228 l-3 -1116 -27 -39 c-38 -55 -85 -78 -146 -72 -57 6 -104 35 -130 81 -16 30 -17 110 -20 1141 -1 724 1 1121 8 1146 22 80 82 123 167 117 37 -2 62 -11 86 -30z m963 14 c49 -22 81 -61 90 -108 4 -19 -1 -114 -10 -211 -10 -97 -24 -258 -31 -357 -16 -194 -20 -241 -35 -380 -5 -49 -14 -160 -21 -245 -6 -85 -12 -173 -14 -195 -3 -22 -7 -69 -10 -105 -4 -36 -8 -81 -10 -100 -4 -37 -22 -248 -30 -360 -2 -36 -7 -81 -10 -100 -2 -19 -7 -69 -10 -110 -4 -41 -14 -91 -23 -110 -18 -36 -68 -76 -109 -86 -61 -16 -143 26 -176 90 -20 38 -20 45 -8 191 6 83 14 167 16 186 2 19 9 97 15 174 6 77 15 183 20 235 15 153 19 197 30 339 15 192 18 229 25 291 9 89 21 233 40 475 3 33 7 78 10 100 3 22 7 67 10 100 16 214 26 240 100 282 48 27 87 29 141 4z" />
                </g>
              </svg>
            </DeleteBtn>
          </TitleWrapper>
        ))}
      </Header>
      {!isAdd &&
        <Board
          id={id}
          name={boards[id].name}
          lists={boards[id].lists}
          editBoard={editBoard}
        />
      }
      {openModal && (
        <Modal
          type="delete"
          cat="Board"
          name={boards[id].name}
          action={handleDelete}
        />
      )}
    </Wrapper>
  );
}

export default Main;
