import { useQuery } from "@tanstack/react-query";
import { IgetMovies, getMovies } from "../Api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const PreBtn = styled.button`
  position: absolute;
  width: 100px;
  height: 8.5vw;
  background-color: rgba(20, 20, 20, 0.3);
  left: -110px;
  border: none;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  svg {
    width: 30px;
    height: 30px;
    margin: 5px;
  }
  &:hover {
    background-color: rgba(20, 20, 20, 0.6);
    svg {
      scale: 1.3;
      transition-duration: 0.3s;
    }
  }
`;

const NextBtn = styled.button`
  position: absolute;
  width: 100px;
  height: 8.5vw;
  background-color: rgba(20, 20, 20, 0.3);
  right: -110px;
  border: none;
  border-radius: 5px;
  color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    width: 30px;
    height: 30px;
    margin: 5px;
  }
  &:hover {
    background-color: rgba(20, 20, 20, 0.6);
    svg {
      scale: 1.3;
      transition-duration: 0.3s;
    }
  }
`;

const Wrapper = styled.div`
  height: 200vh;
  overflow-x: hidden;
  background-color: rgb(20, 20, 20);
`;

const Banner = styled.div<{ bgImage: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0),
      rgba(20, 20, 20, 1)
    ),
    url(${(props) => props.bgImage});
  background-size: cover;
`;

const Title = styled.h2`
  margin-top: 200px;
  font-size: 72px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const OverView = styled.p`
  font-size: 24px;
  width: 40vw;
  line-height: 28px;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
  margin: 0px 60px;
`;

const SliderBox = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  gap: 15px;
  position: absolute;
`;

const BoxImg = styled.img`
  width: 100%;
  height: 8.5vw;
  display: block; // to remove the white space under the image
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const Box = styled(motion.div)`
  overflow: hidden;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  &:first-child {
    div {
      transform-origin: center left;
    }
  }
  &:last-child {
    div {
      transform-origin: center right;
    }
    &:hover ${BoxImg} {
      transition-delay: 0.5s;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }
  }
`;

const InfoContainer = styled(motion.div)`
  border-radius: 5px;
  &:hover {
    position: relative;
  }
  &:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const Info = styled(motion.div)`
  padding: 15px 10px 10px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #181818;
  opacity: 0;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: left;
    font-size: 0.8vw;
    margin-bottom: 0.5vw;
  }
  h5 {
    margin-bottom: 0.5vw;
  }
`;

const InfoMatchRating = styled.h5`
  text-align: left;
  font-size: 0.6vw;
  font-weight: bold;
  color: #47d369;
`;

const InfoRunningTime = styled.h5`
  text-align: left;
  font-size: 0.6vw;
  font-weight: bold;
  color: white;
`;

const SliderTitle = styled.h2`
  color: white;
  margin-bottom: 15px;
  font-size: 24px;
`;

const sliderVar = {
  hidden: ({ isNext }: { isNext: boolean }) => {
    return {
      x: isNext ? window.outerWidth + 5 : -window.outerWidth - 5,
    };
  },
  visible: {
    x: 0,
  },
  exit: ({ isNext }: { isNext: boolean }) => {
    return {
      x: isNext ? -window.outerWidth - 5 : window.outerWidth + 5,
    };
  },
};

const boxVar = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    boxShadow: "0px 0px 15px 2px black",
    backgroundColor: "#181818",
    transition: {
      delay: 0.5,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.7,
      type: "tween",
    },
  },
};

const offset = 6;

function Home() {
  const { data, isLoading } = useQuery<IgetMovies>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderLeaving, setSliderLeaving] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [summary, setSummary] = useState("");
  const increaseSliderIndex = () => {
    if (data) {
      if (sliderLeaving) return;
      toggleLeaving();
      setIsNext(true);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setSliderIndex((pre) => (pre === maxIndex ? 0 : pre + 1));
    }
  };
  const decreaseSliderIndex = () => {
    if (data) {
      if (sliderLeaving) return;
      toggleLeaving();
      setIsNext(false);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setSliderIndex((pre) => (pre === 0 ? maxIndex : pre - 1));
    }
  };

  const changeIndex = (next: boolean) => {
    if (data) {
      if (sliderLeaving) return;
      setSliderLeaving(true);
      setIsNext(next);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      if (next) {
        setSliderIndex((prev) => {
          return prev === maxIndex ? 0 : prev + 1;
        });
      } else {
        setSliderIndex((prev) => {
          return prev === 0 ? maxIndex : prev - 1;
        });
      }
    }
  };
  const toggleLeaving = () => setSliderLeaving((pre) => !pre);

  useEffect(() => {
    if (data) {
      setSummary(data.results[0].overview);
    }
  }, []);

  return (
    <Wrapper>
      {isLoading ? (
        "is loading..."
      ) : (
        <>
          <Banner bgImage={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title> {data?.results[0].title} </Title>
            <OverView>
              {" "}
              {summary?.length > 200
                ? `${summary.slice(0, 200)}...`
                : summary}{" "}
            </OverView>
          </Banner>

          <Slider>
            <AnimatePresence
              onExitComplete={toggleLeaving}
              initial={false}
              custom={{ isNext }}
            >
              <SliderTitle>새로 올라온 영상</SliderTitle>
              <SliderBox
                variants={sliderVar}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={{ isNext }}
                transition={{ type: "tween", duration: 1 }}
                key={sliderIndex}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * sliderIndex, offset * sliderIndex + offset)
                  .map((movie) => (
                    <Box
                      key={movie.id}
                      variants={boxVar}
                      transition={{ type: "tween" }}
                      whileHover="hover"
                      initial="normal"
                    >
                      <BoxImg
                        src={makeImagePath(movie.backdrop_path, "w300")}
                      />
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                        <InfoMatchRating>
                          {movie.vote_average * 10}% Match
                        </InfoMatchRating>
                      </Info>
                    </Box>
                  ))}
              </SliderBox>
            </AnimatePresence>
            <PreBtn onClick={() => changeIndex(false)}>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeWidth="2" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </motion.svg>
            </PreBtn>
            <NextBtn onClick={() => changeIndex(true)}>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeWidth="2" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </motion.svg>
            </NextBtn>
          </Slider>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
