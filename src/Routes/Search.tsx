import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { IGetSearchResult, searchMovies, searchTv } from "../SearchApi";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { makeImagePath } from "../utils";
import Series from "./Series";
import { getMovie } from "../MovieApi";
import { getTvShowDetails } from "../SeriesApi";

const Wrapper = styled.div`
  padding-top: 50px;
  height: 100vh;
  background-color: rgba(20, 20, 20);
`;

const Result = styled.div`
  position: relative;
  top: 150px;
  padding: 0px 50px;
  width: 100%;
`;

const ResultTitle = styled.h2`
  padding-left: 5px;
  padding-bottom: 10px;
`;

const ResultBox = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 250px;
  grid-auto-rows: 250px;
  width: 100%;
  gap: 10px;
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

function Search() {
  const location = useLocation();
  const history = useHistory();
  const { scrollY } = useScroll();
  const bigBoxMatch = useRouteMatch<{ clickId: string }>("/search/:clickId");
  const { data: movieData, isLoading: movieIsLoading } = useQuery({
    queryKey: ["movie", bigBoxMatch?.params.clickId],
    queryFn: () => {
      const result = getMovie(Number(bigBoxMatch?.params.clickId));
      return result;
    },
    enabled: typeof bigBoxMatch?.params.clickId === "string",
  });

  const { data: seriesData, isLoading: seriesIsLoading } = useQuery({
    queryKey: ["tvShow", bigBoxMatch?.params.clickId],
    queryFn: () => {
      const result = getTvShowDetails(Number(bigBoxMatch?.params.clickId));
      return result;
    },
    enabled: typeof bigBoxMatch?.params.clickId === "string",
  });

  const keyword = new URLSearchParams(location.search).get("keyword");
  const { data: searchMovieData, isLoading } = useQuery<IGetSearchResult>(
    ["searchMovie", keyword],
    () => searchMovies(keyword)
  );
  const { data: searchTvData } = useQuery<IGetSearchResult>(
    ["searchTv", keyword],
    () => searchTv(keyword)
  );

  const BigOverrayClicked = () => {
    history.push(`/search?keyword=${keyword}`);
  };
  const [isplat, setIsplat] = useState(false);
  const onMovieBoxClicked = (movieId: number) => {
    history.push(`/search/${movieId}?keyword=${keyword}`);
    setIsplat(true);
  };
  const onTvBoxClicked = (movieId: number) => {
    history.push(`/search/${movieId}?keyword=${keyword}`);
    setIsplat(false);
  };
  const clickedMovieOrTv =
    bigBoxMatch?.params.clickId &&
    (isplat
      ? searchMovieData?.results?.find(
          (movie) => movie.id + "" === bigBoxMatch.params.clickId + ""
        )
      : searchTvData?.results?.find(
          (series) => series.id + "" === bigBoxMatch.params.clickId + ""
        ));
  const [movieSummary, setMovieSummary] = useState("");
  const [seriesSummary, setSeriesSummary] = useState("");

  useEffect(() => {
    if (movieData) {
      setMovieSummary(movieData?.overview);
    }
    if (seriesData) {
      setSeriesSummary(seriesData.overview);
    }
  }, [onMovieBoxClicked, onTvBoxClicked]);
  console.log(scrollY.get());
  return (
    <>
      <Wrapper>
        <div>
          <Result>
            <ResultTitle>영화에 대한 검색 결과</ResultTitle>
            <AnimatePresence>
              <ResultBox>
                {searchMovieData?.results.map((movie) => (
                  <Box
                    variants={boxVar}
                    transition={{ type: "tween" }}
                    whileHover="hover"
                    initial="normal"
                    onClick={() => onMovieBoxClicked(movie.id)}
                  >
                    <BoxImg
                      src={makeImagePath(
                        movie.backdrop_path === null
                          ? "https://www.spectory.net/src/images/noImg.gif"
                          : movie.backdrop_path,
                        "w500"
                      )}
                    />
                    <Info variants={infoVariants}>
                      <h4>{movie.title}</h4>
                      <InfoMatchRating>
                        {movie.vote_average * 10}% 일치
                      </InfoMatchRating>
                    </Info>
                  </Box>
                ))}
              </ResultBox>
            </AnimatePresence>
          </Result>
        </div>
        <div>
          <Result>
            <ResultTitle>시리즈에 대한 검색 결과</ResultTitle>
            <AnimatePresence>
              <ResultBox>
                {searchTvData?.results.map((series) => (
                  <Box
                    variants={boxVar}
                    transition={{ type: "tween" }}
                    whileHover="hover"
                    initial="normal"
                    onClick={() => onTvBoxClicked(series.id)}
                  >
                    <BoxImg
                      src={
                        series.backdrop_path === null
                          ? "https://www.spectory.net/src/images/noImg.gif"
                          : makeImagePath(series.backdrop_path, "w500")
                      }
                    />
                    <Info variants={infoVariants}>
                      <h4>{series.name}</h4>
                      <InfoMatchRating>
                        {series.vote_average * 10}% 일치
                      </InfoMatchRating>
                    </Info>
                  </Box>
                ))}
              </ResultBox>
            </AnimatePresence>
          </Result>
        </div>
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
                layoutId={bigBoxMatch.params.clickId}
              >
                {clickedMovieOrTv && (
                  <>
                    {isplat === true ? (
                      <>
                        <BigImg
                          style={{
                            backgroundImage: `linear-gradient(to top, rgba(24,24,24,1), transparent, transparent) ,
                      url(${makeImagePath(clickedMovieOrTv.backdrop_path)})`,
                          }}
                        ></BigImg>

                        <BigTitle>
                          <span>{clickedMovieOrTv.title}</span>
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
                            {movieData?.genres
                              .map((genre) => genre.name)
                              .join(" · ")}
                          </BigGenre>
                          <BigOverView>
                            {movieSummary?.length > 200
                              ? `${movieSummary.slice(0, 200)}...`
                              : movieSummary}
                          </BigOverView>
                        </BigTextWrapper>
                      </>
                    ) : (
                      <>
                        <BigImg
                          style={{
                            backgroundImage: `linear-gradient(to top, rgba(24,24,24,1), transparent, transparent) ,
                      url(${makeImagePath(clickedMovieOrTv.backdrop_path)})`,
                          }}
                        ></BigImg>

                        <BigTitle>
                          <span>{clickedMovieOrTv.name}</span>
                          <p>시즌 {seriesData?.number_of_seasons}</p>
                        </BigTitle>
                        <BigTextWrapper>
                          <BigRunningTime>
                            {seriesData && seriesData.first_air_date}
                          </BigRunningTime>
                          <BigGenre>
                            <span>장르: </span>
                            {seriesData?.genres
                              .map((genre) => genre.name)
                              .join(" · ")}
                          </BigGenre>
                          <BigOverView>
                            {seriesSummary?.length > 200
                              ? `${seriesSummary.slice(0, 200)}...`
                              : seriesSummary}
                          </BigOverView>
                        </BigTextWrapper>
                      </>
                    )}
                  </>
                )}
              </BigBox>
            </>
          ) : null}
        </AnimatePresence>
      </Wrapper>
    </>
  );
}

export default Search;
