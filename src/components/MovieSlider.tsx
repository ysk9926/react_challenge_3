import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import styled from "styled-components";
import { IgetMovies, getMovie, getMovies } from "../MovieApi";
import { useEffect, useState } from "react";
import { makeImagePath } from "../utils";
import { useHistory, useRouteMatch } from "react-router-dom";

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

const Slider = styled.div`
  position: relative;
  height: 300px;
  top: -100px;
  margin: 0px 60px;
`;

const SliderBox = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  gap: 10px;
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
  cursor: pointer;
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

const BigBox = styled(motion.div)`
  width: 50vw;
  height: 75vh;
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
  background-color: rgb(24, 24, 24);
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(201, 201, 201, 0.1);
  z-index: 99;
`;

const BigOverray = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 98;
`;

const BigImg = styled.div`
  width: 100%;
  height: 500px;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h2`
  display: flex;
  flex-direction: column;
  margin-top: -60px;
  padding-left: 20px;
  margin-bottom: 40px;
  span {
    font-size: 46px;
    line-height: 30px;
  }
  p {
    margin-top: 20px;
    padding-left: 5px;
  }
`;

const BigTextWrapper = styled.div`
  padding: 0px 30px;
  position: relative;
`;

const BigGenre = styled.div`
  position: absolute;
  right: 30px;
  font-size: 14px;
  span {
    font-size: 14px;
    color: ${(props) => props.theme.black.text};
  }
`;

const BigRunningTime = styled.div``;

const BigOverView = styled.p`
  margin-top: 30px;
  width: 500px;
`;

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

function MovieSlider() {
  const history = useHistory();
  const bigBoxMatch = useRouteMatch<{ movieId: string }>("/movie/:movieId");
  const { data, isLoading } = useQuery<IgetMovies>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const { data: movieData, isLoading: movieIsLoading } = useQuery({
    queryKey: ["movie", bigBoxMatch?.params.movieId],
    queryFn: () => {
      const result = getMovie(Number(bigBoxMatch?.params.movieId));
      return result;
    },
    enabled: typeof bigBoxMatch?.params.movieId === "string",
  });

  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderLeaving, setSliderLeaving] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const onBoxClicked = (movieId: number) => {
    history.push(`/movie/${movieId}`);
  };
  const { scrollY } = useScroll();
  const BigOverrayClicked = () => {
    history.push("/");
  };
  const clickedMovie =
    bigBoxMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigBoxMatch.params.movieId);

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
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (movieData) {
      setSummary(movieData?.overview);
    }
  }, [onBoxClicked]);
  const toggleLeaving = () => setSliderLeaving((pre) => !pre);
  return (
    <>
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
                  layoutId={movie.id + ""}
                  key={movie.id}
                  variants={boxVar}
                  transition={{ type: "tween" }}
                  whileHover="hover"
                  initial="normal"
                  onClick={() => onBoxClicked(movie.id)}
                >
                  <BoxImg src={makeImagePath(movie.backdrop_path, "w300")} />
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
      <AnimatePresence>
        {bigBoxMatch ? (
          <>
            <BigOverray
              onClick={BigOverrayClicked}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            ></BigOverray>
            <BigBox
              style={{ top: scrollY.get() + 100 }}
              layoutId={bigBoxMatch.params.movieId}
            >
              {clickedMovie && (
                <>
                  <BigImg
                    style={{
                      backgroundImage: `linear-gradient(to top, rgba(24,24,24,1), transparent, transparent) ,
                      url(${makeImagePath(clickedMovie.backdrop_path)})`,
                    }}
                  ></BigImg>

                  <BigTitle>
                    <span>{clickedMovie.title}</span>
                    <p>{movieData?.tagline}</p>
                  </BigTitle>
                  <BigTextWrapper>
                    <BigRunningTime>
                      {movieData && movieData.runtime > 60
                        ? `${Math.floor(movieData.runtime / 60)}시간 ${
                            movieData.runtime -
                            Math.floor(movieData.runtime / 60) * 60
                          }분`
                        : `${movieData?.runtime}분`}
                    </BigRunningTime>
                    <BigGenre>
                      <span>장르: </span>
                      {movieData?.genres.map((genre) => genre.name).join(" · ")}
                    </BigGenre>
                    <BigOverView>
                      {summary?.length > 200
                        ? `${summary.slice(0, 200)}...`
                        : summary}
                    </BigOverView>
                  </BigTextWrapper>
                </>
              )}
            </BigBox>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default MovieSlider;
