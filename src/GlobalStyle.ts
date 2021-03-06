import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center, button, input, select, option,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend, textarea,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  *::-webkit-scrollbar {
    width: 16px;
    background-color: #111;
  }
  *::-webkit-scrollbar-corner {
    background-color: #111;
  }
  *::-webkit-scrollbar-track {
    border-radius: 8px;
  }
  *::-webkit-scrollbar-thumb {
    height: 56px;
    border-radius: 8px;
    border: 4px solid transparent;
    background-clip: content-box;
    background-color: #333;
  }
  *::-webkit-scrollbar-thumb:hover {
    background-color: #888;
  }
  body {
    font-family: 'Source Sans Pro', sans-serif;
    color: black;
    user-select: none;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  svg {
    display: block;
  }
  *:focus {
    outline: none;
  }
`;
