import React from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import PostComments from "../components/PostComments";
import PostImages from "../components/PostImages";

const Container = styled.main`
  display: flex;
  max-width: ${(props) => props.theme.width.centerMaxWidth};
  margin: 0px auto;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1.5px solid ${(props) => props.theme.color.hover};
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 20px 5px;
  border-bottom: 1.5px solid ${(props) => props.theme.color.hover};
`;

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const { state } = useLocation();
  console.log(state);
  return (
    <Container>
      <TitleContainer>
        <Title> {state.post.title}</Title>
      </TitleContainer>
      {state.post.file.length !== 0 && (
        <PostImages file={state.post.file as string[]} />
      )}
      <ContentContainer>{state.post.content}</ContentContainer>
      <PostComments postId={postId as string} />
    </Container>
  );
};

export default PostDetail;
