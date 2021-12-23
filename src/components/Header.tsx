import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { darkModeState, DARKMODE_STATE } from "../atoms/darkMode.atom";
import { authStateAtom, X_JWT_TOKEN } from "../atoms/auth.atom";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { categoryStateAtom } from "../atoms/category.atom";
import { useMe } from "../hooks/useMe";
import SLink from "./SLink";
import CategoryList from "./CategoryList";
import { MenuToggle } from "./MenuToggle";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

const Container = styled.header`
  display: flex;
  max-width: ${(props) => props.theme.width.centerMaxWidth};
  height: 70px;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
  padding: 0px 10px;
  border-bottom: 3px solid ${(props) => props.theme.color.accent};
`;

const LeftContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoCotainer = styled.div`
  font-size: 30px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.accent};
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

const CategoryContainer = styled(motion.div)``;

interface ISearchForm {
  payload: string;
}

const FormCotainer = styled.div``;

const SearchForm = styled.form``;

const SearchInput = styled.input`
  border: none;
  padding: 5px 10px;
  width: 400px;
  border-radius: 2px;
  &:focus {
    border: 2px solid ${(props) => props.theme.color.accent};
    outline: none;
  }
`;

const Header = () => {
  const [darkMode, setDarkMode] = useRecoilState(darkModeState);
  const [authState, setAuthState] = useRecoilState(authStateAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCategorySeleted] = useRecoilState(categoryStateAtom);
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { data: meData } = useMe();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const toggleDarkMode = () => {
    if (darkMode) {
      localStorage.removeItem(DARKMODE_STATE);
      setDarkMode(false);
    } else {
      localStorage.setItem(DARKMODE_STATE, "darkmode");
      setDarkMode(true);
    }
  };
  const logOut = () => {
    localStorage.removeItem(X_JWT_TOKEN);
    setAuthState({
      status: false,
      token: null,
    });
    window.location.reload();
  };

  const { register, handleSubmit } = useForm<ISearchForm>();

  const onSubmit: SubmitHandler<ISearchForm> = ({ payload }) => {
    navigate("/search", { state: payload });
  };

  return (
    <>
      <Container>
        <LeftContainer initial={false} animate={isOpen ? "open" : "closed"}>
          {pathname === "/" && <MenuToggle toggle={() => toggleOpen()} />}
          <SLink to="/" onClick={() => setCategorySeleted(null)}>
            <LogoCotainer>Logo</LogoCotainer>
          </SLink>
        </LeftContainer>
        <FormCotainer>
          <SearchForm onSubmit={handleSubmit(onSubmit)}>
            <SearchInput {...register("payload")} autoComplete="off" />
          </SearchForm>
        </FormCotainer>
        <MenuContainer>
          {authState.status ? (
            <>
              <MenuItem onClick={logOut}>
                <SLink to="/">로그아웃</SLink>
              </MenuItem>
              <MenuItem onClick={() => setCategorySeleted(null)}>
                <SLink to={`/user/${meData?.whoAmI.id}`}>프로필</SLink>
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={() => setCategorySeleted(null)}>
                <SLink to="auth">로그인</SLink>
              </MenuItem>
              <MenuItem onClick={() => setCategorySeleted(null)}>
                <SLink to="create-account">회원가입</SLink>
              </MenuItem>
            </>
          )}
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
      <AnimatePresence>
        {isOpen && (
          <CategoryContainer
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CategoryList />
          </CategoryContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
