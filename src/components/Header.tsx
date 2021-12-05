import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { darkModeState } from "../atoms/darkMode.atom";
import { motion } from "framer-motion";

const Container = styled.header`
  display: flex;
  max-width: ${(props) => props.theme.width.centerMaxWidth};
  height: 70px;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
  padding: 0px 10px;
  border-bottom: 3px solid ${(props) => props.theme.color.text};
`;

const LogoCotainer = styled.div`
  font-size: 30px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.div`
  font-weight: 700;
  &:not(:last-child) {
    margin-right: 15px;
  }
`;

const SLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.text};
`;

const Switch = styled.div<{ isOn: boolean }>`
  width: 50px;
  height: 30px;
  background-color: ${(props) =>
    props.isOn ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.6)"};
  display: flex;
  justify-content: ${(props) => (props.isOn ? "flex-start" : "flex-end")};
  align-items: center;
  border-radius: 50px;
  padding: 5px 3px;
  cursor: pointer;
`;

const Handle = styled(motion.div)`
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 40px;
`;

const Header = () => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  return (
    <Container>
      <LogoCotainer>
        <SLink to="/">Logo</SLink>
      </LogoCotainer>
      <MenuContainer>
        <MenuItem>
          <SLink to="auth">로그인</SLink>
        </MenuItem>
        <Switch onClick={toggleDarkMode} isOn={darkMode}>
          <Handle
            layout
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 30,
            }}
          />
        </Switch>
      </MenuContainer>
    </Container>
  );
};

export default Header;
