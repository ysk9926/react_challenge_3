import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

const Header = styled(motion.div)`
  width: 100vw;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  padding: 20px 60px;
  color: white;
  font-size: 14px;
  z-index: 99;
`;

const Back = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  width: 100%;
  height: 60px;
  position: fixed;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.svg`
  fill: ${(props) => props.theme.red};
  height: 30px;
  width: 90px;
  margin-right: 60px;
`;

const Items = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.li`
  min-width: 30px;
  margin-right: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  span:hover {
    opacity: 0.8;
  }
`;

const Search = styled.form`
  display: flex;
  align-items: center;
`;

const Icon = styled(motion.svg)`
  width: 25px;
  height: 23px;
  margin-left: 30px;
  position: relative;
  z-index: 1;
`;

const Input = styled(motion.input)`
  border: 1px solid white;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.8);
  height: 30px;
  width: 230px;
  padding-left: 40px;
  transform-origin: right center;
  color: white;
  z-index: 0;
  &:focus {
    outline: none;
  }
`;

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

interface IForm {
  keyword: string;
}

function Nav() {
  const navAnimation = useAnimation();
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (pre) => {
    if (pre < 80) navAnimation.start("top");
    else navAnimation.start("scroll");
  });
  const searchClick = () => {
    setSearchOpen((pre) => !pre);
  };
  const history = useHistory();
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = (data: IForm) => {
    history.push(`/search?keyword=${data.keyword}`);
    setValue("keyword", "");
  };
  return (
    <>
      <Back></Back>
      <Header
        variants={navVariants}
        animate={navAnimation}
        initial={"top"}
        transition={{ duration: 1 }}
      >
        <Col>
          <Link to="/">
            <Logo
              xmlns="http://www.w3.org/2000/svg"
              width="1024"
              height="276.742"
              viewBox="0 0 1024 276.742"
            >
              <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
            </Logo>
          </Link>
          <Items>
            <Item>
              <Link to="/">
                <span>홈</span>
              </Link>
            </Item>
            <Item>
              <Link to="/Series">
                <span>시리즈</span>
              </Link>
            </Item>
          </Items>
        </Col>
        <Col>
          <Search onSubmit={handleSubmit(onValid)}>
            <Icon
              onClick={searchClick}
              animate={{ x: searchOpen ? 32 : 220 }}
              transition={{ type: "linear" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </Icon>
            {/* <Input
              {...register("keyword", { required: true })}
              placeholder="제목, 사람, 장르"
              animate={{ scaleX: searchOpen ? 1 : 0 }}
              transition={{ type: "linear" }}
              ref={inputRef}
              onBlur={() => {
                setSearchOpen(false);
              }}
            /> */}
            <Input
              {...register("keyword", { required: true })}
              placeholder="제목, 사람, 장르"
              animate={{ scaleX: searchOpen ? 1 : 0 }}
              transition={{ type: "linear" }}
              //ref={inputRef}
              //onBlur={() => {
              //setSearchOpen(false);
              //}}
            />
          </Search>
          <Icon
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeWidth="2"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </Icon>
        </Col>
      </Header>
    </>
  );
}
export default Nav;
