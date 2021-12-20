import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import {
  readCommentsQuery,
  readCommentsQueryVariables,
} from "../__generated__/readCommentsQuery";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

export const READ_COMMENTS_QUERY = gql`
  query readCommentsQuery($input: ReadCommentsInput!) {
    readComments(input: $input) {
      ok
      error
      totalPage
      comments {
        id
        createdAt
        updatedAt
        payload
        userId
        postId
        commentLikeCount
        meLike
        isMine
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
`;

const CommentTitle = styled.div`
  width: 100%;
  padding: 10px 5px;
  border-bottom: 1px solid ${(props) => props.theme.color.hover};
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  wrap: wrap;
`;

const PostComments: React.FC<{ postId: string }> = ({ postId }) => {
  const { data, loading, error } = useQuery<
    readCommentsQuery,
    readCommentsQueryVariables
  >(READ_COMMENTS_QUERY, {
    variables: {
      input: {
        take: 10,
        skip: 0,
        postId: parseInt(postId),
      },
    },
  });
  if (loading) {
    return <h1>loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <Container>
      <CommentTitle> 댓글: {data?.readComments.comments?.length}</CommentTitle>
      <CommentForm postId={postId} />
      <ContentContainer>
        {data?.readComments.comments?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ContentContainer>
    </Container>
  );
};

export default PostComments;
