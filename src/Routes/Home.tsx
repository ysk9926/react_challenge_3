import { useQuery } from "@tanstack/react-query";
import { IgetMovies, getMovie, getMovies } from "../MovieApi";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import MovieSlider from "../components/MovieSlider";

import { useRouteMatch } from "react-router-dom";
import TopMovieSlider from "../components/TopMovieSlider";
import UpComingMovieSlider from "../components/UpcomingMovieSlider";

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

function Home() {
  const { data, isLoading } = useQuery<IgetMovies>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [summary, setSummary] = useState("");

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
              {summary?.length > 200 ? `${summary.slice(0, 200)}...` : summary}
            </OverView>
          </Banner>
          <MovieSlider />
          <TopMovieSlider />
          <UpComingMovieSlider />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
