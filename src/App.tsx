import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import { Reset } from "styled-reset";
import Router from "./Router";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

*{
  box-sizing: border-box;
}

body{
  font-family: 'Source Sans Pro', sans-serif;
  margin: 0;
  padding: 0;

}

a{
  text-decoration: none;
  color: inherit;
}

li{
  list-style: none;
}

`;

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Reset />
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
