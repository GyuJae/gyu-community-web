import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import PostComments from "../components/PostComments";
import PostImages from "../components/PostImages";
import PostLikeCount from "../components/PostLikeCount";
import {
  readPostByIdQuery,
  readPostByIdQueryVariables,
  readPostByIdQuery_readPostById_post,
} from "../__generated__/readPostByIdQuery";

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

const Name = styled.div`
  margin-left: 10px;
  color: #999999;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  display: flex;
  padding: 20px 5px;
`;

/*
category: {__typename: 'Category', id: 1, name: '음악'}
categoryId: 1
commentCount: 11
content: "피쳐링 정익수 ㄷㄷ 프로듀서 정규재"
createdAt: "2021-12-23T08:38:17.326Z"
file: []
id: 8
isMine: false
likeCount: 0
title: "정규태 - 이진우 디스곡 발표"
updatedAt: "2021-12-23T08:38:17.329Z"
userId: 4
__typename: "Post"
*/

const READ_POST_BY_ID_QUERY = gql`
  query readPostByIdQuery($input: ReadPostByIdInput!) {
    readPostById(input: $input) {
      ok
      error
      post {
        id
        createdAt
        updatedAt
        title
        content
        file
        userId
        categoryId
        likeCount
        commentCount
        category {
          id
          name
        }
        isMine
        meLike
      }
    }
  }
`;

const PostDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const { state } = useLocation();
  const navigate = useNavigate();
  if (!postId) {
    navigate("/");
  }

  const { data, loading, error } = useQuery<
    readPostByIdQuery,
    readPostByIdQueryVariables
  >(READ_POST_BY_ID_QUERY, {
    variables: {
      input: {
        postId: parseInt(postId as string),
      },
    },
  });

  if (loading || !state.post) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error || !state.post) {
    return <h1>{error}</h1>;
  }

  return (
    <Container>
      <TitleContainer>
        <Title>
          {" "}
          {state.post.title ? state.post.title : data?.readPostById.post?.title}
        </Title>
        <Name onClick={() => navigate(`/user/${state.post.userId}`)}>
          {state.postUsername}
        </Name>
      </TitleContainer>
      {state.post.file.length !== 0 && (
        <PostImages
          file={
            state.post.file
              ? (state.post.file as string[])
              : (data?.readPostById.post?.file as string[])
          }
        />
      )}
      <ContentContainer>{state.post.content}</ContentContainer>
      <PostLikeCount
        postId={parseInt(postId as string)}
        post={data?.readPostById.post as readPostByIdQuery_readPostById_post}
      />

      <PostComments postId={postId as string} />
    </Container>
  );
};

export default PostDetail;
