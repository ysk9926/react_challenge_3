import styled, { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { motion } from "framer-motion";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');

*{
  box-sizing: border-box;
}

body{
  font-family: 'Source Sans Pro', sans-serif;
  color: ${(props) => props.theme.textColor};
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  color:black;
  line-height: 1.2;
  background:linear-gradient(135deg,#e09,#d0e);
}

a{
  text-decoration: none;
  color: inherit;
}

`;
// GlobalStyle을 사용해서 App안에있는 모든 컴포넌트에 요소들에게 일괄 적용
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Reset />
        {/* Reset은 reactReset npm을 사용해서 기본적인 css를 초기화시켜준다 */}
        <Wrapper>
          <Box
            initial={{ scale: 0 }}
            transition={{ delay: 1, duration: 1, bounce: 0.5, type: "spring" }}
            animate={{ rotateZ: 360, scale: 1 }}
          />
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
