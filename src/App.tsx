import { ThemeProvider, createGlobalStyle } from "styled-components";
import { theme } from "./theme";
import { Reset } from "styled-reset";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

*{
  box-sizing: border-box;
}

body{
  font-family: 'Source Sans Pro', sans-serif;
  color: white;
  background-color: rgba(20, 20, 20);

}

a{
  text-decoration: none;
  color: inherit;
}

li{
  list-style: none;
}

`;

const client = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Reset />
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
