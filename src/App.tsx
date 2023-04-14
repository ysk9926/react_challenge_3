import styled, { createGlobalStyle } from "styled-components";
import { Reset } from "styled-reset";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { hover } from "@testing-library/user-event/dist/hover";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');



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

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// GlobalStyle을 사용해서 App안에있는 모든 컴포넌트에 요소들에게 일괄 적용
const GridWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
`;

const Box = styled(motion.div)`
  width: 300px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: white;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100vh;

  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 400px;
    height: 300px;
    background-color: rgba(255, 255, 255, 1);
  }
`;

const Btn = styled.button`
  position: absolute;
  bottom: 50px;
`;

const boxVar = {
  hover: (custom: number) => ({
    scale: 1.2,
    x: custom === 1 ? -30 : custom === 2 ? 30 : custom === 3 ? -30 : 30,
    y: custom === 1 ? -20 : custom === 2 ? -20 : custom === 3 ? 20 : 20,
  }),
};

const OverlayVar = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

function App() {
  const [id, setId] = useState<null | Number>(null);
  const [switchBtn, setSwithBtn] = useState(false);

  const btnClick = () => setSwithBtn((pre) => !pre);
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />

        {/* Reset은 reactReset npm을 사용해서 기본적인 css를 초기화시켜준다 */}
        <Wrapper>
          <GridWrapper>
            <Grid>
              <Box
                onClick={() => setId(1)}
                custom={1}
                variants={boxVar}
                whileHover={{ dura }}
              />
              <Box
                onClick={() => setId(2)}
                custom={2}
                variants={boxVar}
                whileHover="hover"
              >
                {switchBtn ? <Circle layoutId="circle" /> : null}
              </Box>
              <Box
                onClick={() => setId(3)}
                custom={3}
                variants={boxVar}
                whileHover="hover"
              >
                {switchBtn ? null : <Circle layoutId="circle" />}
              </Box>
              <Box
                custom={4}
                onClick={() => setId(4)}
                variants={boxVar}
                whileHover="hover"
              />
            </Grid>
            <AnimatePresence>
              {id ? (
                <Overlay
                  variants={OverlayVar}
                  onClick={() => setId(null)}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Box></Box>
                </Overlay>
              ) : null}
            </AnimatePresence>
          </GridWrapper>
          <Btn onClick={btnClick}>whitch</Btn>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
