import styled, { createGlobalStyle } from "styled-components";
import { useRef } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { hover } from "@testing-library/user-event/dist/hover";
import { type } from "os";

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

const Btn = styled(motion.button)<{ isOn: boolean }>`
  border: none;
  position: absolute;
  bottom: 200px;
  border-radius: 15px;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.6);
  width: 70px;
  display: flex;
  justify-content: flex-start;
  justify-content: ${(props) => (props.isOn ? "flex-end" : "flex-start")};
`;

const BtnHandle = styled(motion.div)`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 10px;
`;

const boxVar = {
  hover: (custom: string) => ({
    scale: 1.2,
    x:
      custom === "box1"
        ? -30
        : custom === "box2"
        ? 30
        : custom === "box3"
        ? -30
        : 30,
    y:
      custom === "box1"
        ? -20
        : custom === "box2"
        ? -20
        : custom === "box3"
        ? 20
        : 20,
  }),
};

const OverlayVar = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const switchVar = {
  start: {},
  end: {},
  exit: {},
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [switchBtn, setSwithBtn] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const btnClick = () => {
    setSwithBtn((pre) => !pre);
    setIsOn((pre) => !pre);
  };
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />

        {/* Reset은 reactReset npm을 사용해서 기본적인 css를 초기화시켜준다 */}
        <Wrapper>
          <GridWrapper>
            <Grid>
              <AnimatePresence>
                <Box
                  onClick={() => setId("box1")}
                  layoutId="box1"
                  custom={"box1"}
                  variants={boxVar}
                  whileHover="hover"
                  transition={{ duration: 0.3, type: "tween" }}
                />
                <Box
                  onClick={() => setId("box2")}
                  layoutId="box2"
                  custom={"box2"}
                  variants={boxVar}
                  whileHover="hover"
                  transition={{ type: "tween", duration: 0.3 }}
                >
                  {switchBtn ? (
                    <Circle
                      drag
                      dragSnapToOrigin
                      dragElastic={0.8}
                      layoutId="circle"
                      transition={{ duration: 0.5 }}
                      variants={switchVar}
                      initial="start"
                      animate="end"
                      exit="exit"
                    />
                  ) : null}
                </Box>
                <Box
                  onClick={() => setId("box3")}
                  layoutId="box3"
                  custom={"box3"}
                  variants={boxVar}
                  whileHover="hover"
                  transition={{ type: "tween", duration: 0.3 }}
                >
                  {switchBtn ? null : (
                    <Circle
                      drag
                      dragSnapToOrigin
                      dragElastic={0.8}
                      layoutId="circle"
                      transition={{ duration: 0.5 }}
                      variants={switchVar}
                      initial="start"
                      animate="end"
                      exit="exit"
                    />
                  )}
                </Box>
                <Box
                  custom={"box4"}
                  onClick={() => setId("box4")}
                  layoutId="box4"
                  variants={boxVar}
                  whileHover="hover"
                  transition={{ type: "tween", duration: 0.3 }}
                />
              </AnimatePresence>
            </Grid>
            <AnimatePresence>
              {id ? (
                <Overlay
                  variants={OverlayVar}
                  onClick={() => setId(null)}
                  transition={{ duration: 0.3 }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Box
                    layoutId={id}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      delay: 0.1,
                    }}
                    initial={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                    animate={{ backgroundColor: "rgba(255,255,255,1)" }}
                    exit={{ scale: 0 }}
                  ></Box>
                </Overlay>
              ) : null}
            </AnimatePresence>
          </GridWrapper>
          <Btn onClick={btnClick} isOn={isOn}>
            <BtnHandle layoutId="btnHandle" />
          </Btn>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
