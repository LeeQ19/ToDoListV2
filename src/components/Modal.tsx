import React from "react";
import styled from "styled-components";

import { IModal } from "./interface";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0008;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 20vmax;
  min-height: 10vmax;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vmax;
  background-color: #ddd;
  border-radius: 0.8vmax;
  box-shadow: 0 2px 3px #0002, 0 10px 20px #0001;
  padding: 1vmax 2vmax;
  z-index: 1;
`;

const IconWrapper = styled.div`
  width: max(4vmax, 80px);
  height: max(4vmax, 80px);
  border-radius: 50%;
  background-color: #bbb;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: max(3vmax, 60px);
    height: max(3vmax, 60px);
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5vmax;
`;

const Title = styled.h3`
  font-size: max(1.5vmax, 30px);
  font-weight: 600;
`;

const Message = styled.h4`
  font-size: max(1vmax, 20px);
  font-weight: 400;
  text-align: center;
  span {
    font-weight: 600;
  }
`;

const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: max(1vmax, 20px);
  font-weight: 400;
`;

const Btn = styled.button`
  box-shadow: 0 2px 3px #0002, 0 10px 20px #0001;
  border-radius: 0.2vmax;
  padding: 0.4vmax 0.8vmax;
  cursor: pointer;
`;

const ConfirmBtn = styled(Btn).attrs({
  autoFocus: true
})`
  background-color: #09e8;
  color: #fff;
  &:hover {
    background-color: #09e;
  }
`;

const CancelBtn = styled(Btn)`
  background-color: #fff8;
  color: #000;
  &:hover {
    background-color: #fff;
  }
`;

function Modal({ type, cat, name = "", action }: IModal) {
  return (
    <>
      <Overlay onClick={() => action(false)} />
      <Wrapper
        tabIndex={-1}
        onKeyDown={e => e.key === "Enter" ? action(true) : e.key === "Escape" && action(false)}
      >
        <IconWrapper>
          {type === "delete" ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 512">
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
                <path d="M1590 5100 c-233 -42 -400 -241 -400 -476 l0 -61 -37 -7 c-21 -3 -230 -6 -464 -6 -364 0 -432 -2 -473 -16 -67 -23 -147 -100 -180 -173 -26 -59 -26 -61 -24 -268 l3 -208 2132 -3 2133 -2 0 212 0 213 -29 60 c-34 73 -111 146 -178 169 -40 14 -108 16 -457 16 -226 0 -435 3 -463 6 l-53 7 0 61 c0 233 -173 439 -400 475 -76 13 -1041 13 -1110 1z m1094 -319 c67 -26 96 -76 96 -165 l0 -65 -637 2 -638 2 2 62 c3 88 36 141 103 166 26 10 1047 8 1074 -2z" />
                <path d="M194 3628 c3 -18 19 -134 36 -258 32 -234 89 -637 190 -1355 32 -231 84 -600 115 -820 31 -220 67 -476 80 -570 13 -93 36 -259 51 -368 24 -169 31 -202 51 -223 l22 -24 1395 0 c1016 0 1402 3 1420 11 13 7 29 23 35 38 6 14 29 156 51 316 22 160 47 335 55 390 8 55 31 217 51 360 19 143 69 494 109 780 70 496 116 822 171 1220 13 99 31 223 39 275 13 87 35 245 35 256 0 2 -880 4 -1955 4 l-1956 0 5 -32z m1019 -564 c92 -47 97 -63 122 -409 3 -33 7 -78 10 -100 5 -45 10 -100 25 -290 6 -71 13 -148 15 -170 7 -73 21 -232 50 -577 3 -35 10 -115 16 -178 5 -63 14 -164 20 -225 5 -60 12 -148 16 -195 15 -159 11 -221 -15 -258 -28 -39 -89 -72 -132 -72 -42 0 -104 33 -130 70 -22 31 -36 97 -44 215 -3 39 -10 124 -16 190 -6 66 -13 152 -16 190 -2 39 -7 80 -9 91 -3 12 -12 111 -20 220 -22 289 -24 310 -35 404 -5 47 -14 157 -20 245 -6 88 -15 196 -20 240 -5 44 -12 107 -14 140 -3 33 -10 120 -16 194 -6 74 -8 148 -4 165 10 47 43 86 88 107 51 23 88 24 129 3z m1030 -17 c71 -54 68 15 65 -1228 l-3 -1116 -27 -39 c-38 -55 -85 -78 -146 -72 -57 6 -104 35 -130 81 -16 30 -17 110 -20 1141 -1 724 1 1121 8 1146 22 80 82 123 167 117 37 -2 62 -11 86 -30z m963 14 c49 -22 81 -61 90 -108 4 -19 -1 -114 -10 -211 -10 -97 -24 -258 -31 -357 -16 -194 -20 -241 -35 -380 -5 -49 -14 -160 -21 -245 -6 -85 -12 -173 -14 -195 -3 -22 -7 -69 -10 -105 -4 -36 -8 -81 -10 -100 -4 -37 -22 -248 -30 -360 -2 -36 -7 -81 -10 -100 -2 -19 -7 -69 -10 -110 -4 -41 -14 -91 -23 -110 -18 -36 -68 -76 -109 -86 -61 -16 -143 26 -176 90 -20 38 -20 45 -8 191 6 83 14 167 16 186 2 19 9 97 15 174 6 77 15 183 20 235 15 153 19 197 30 339 15 192 18 229 25 291 9 89 21 233 40 475 3 33 7 78 10 100 3 22 7 67 10 100 16 214 26 240 100 282 48 27 87 29 141 4z" />
              </g>
            </svg>
          ) : type === "warning" ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
              <g transform="translate(128 128) scale(0.72 0.72)">
                <g transform="translate(-175.05 -175.05) scale(3.89 3.89)" >
                  <path d="M 45 66.364 L 45 66.364 c -2.979 0 -5.429 -2.345 -5.56 -5.321 l -5.132 -49.519 C 33.841 5.304 38.762 0 45 0 h 0 c 6.238 0 11.159 5.304 10.692 11.524 L 50.56 61.043 C 50.429 64.019 47.979 66.364 45 66.364 z" />
                  <circle cx="45" cy="81" r="9" />
                </g>
              </g>
            </svg>
          ) : null}
        </IconWrapper>
        {type === "delete" ? (
          <MessageWrapper>
            <Title>
              Are You Sure?
            </Title>
            <Message>
              Do you really want to delete {cat} <span>{name}</span>?
            </Message>
          </MessageWrapper>
        ) : type === "warning" ? (
          <MessageWrapper>
            <Title>
              Warning
            </Title>
            <Message>
                <span>{name}</span> cannot be deleted.
                <br/>
                At least one {cat} should exist.
            </Message>
          </MessageWrapper>
        ): null}
        {type === "delete" ? (
        <BtnWrapper>
          <ConfirmBtn onClick={() => action(true)}>
            Delete
          </ConfirmBtn>
          <CancelBtn onClick={() => action(false)}>
            Cancel
          </CancelBtn>
        </BtnWrapper>
        ) : type === "warning" ? (
        <BtnWrapper>
          <ConfirmBtn onClick={() => action(false)}>
            Close
          </ConfirmBtn>
        </BtnWrapper>
        ): null}
      </Wrapper>
    </>
  );
}

export default Modal;
