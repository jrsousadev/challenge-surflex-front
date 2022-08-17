import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
  }

  html {
    scroll-behavior: smooth;
  }

  @media (max-width: 1080px){
    html{
      font-size: 93.75%;
    }
  }

  @media (max-width: 720px){
    html{
      font-size: 87.5%;
    }
  }

  button, a{
    cursor: pointer;
  }
  a{
    text-decoration: none;
    color: inherit;
  }
`;

export { GlobalStyle };
