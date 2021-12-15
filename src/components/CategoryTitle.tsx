import { motion } from "framer-motion";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authStateAtom } from "../atoms/auth.atom";
import SLink from "./SLink";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const CreateBtn = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;
  border: 1px solid ${(props) => props.theme.color.text};
  padding: 5px 3px;
  border-radius: 3px;
`;

const CategoryTitle: React.FC<{ title: string }> = ({ title }) => {
  const authState = useRecoilValue(authStateAtom);
  return (
    <Container>
      <Title>{title}</Title>
      {authState.status && (
        <SLink to={"create-post"}>
          <CreateBtn layoutId="create-post-form">글쓰기</CreateBtn>
        </SLink>
      )}
    </Container>
  );
};

export default CategoryTitle;
