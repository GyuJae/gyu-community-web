import React from "react";
import styled from "styled-components";
import { gql, useApolloClient, useMutation } from "@apollo/client";

import {
  likeToggleMutation,
  likeToggleMutationVariables,
} from "../__generated__/likeToggleMutation";
import { readPostByIdQuery_readPostById_post } from "../__generated__/readPostByIdQuery";
import Loading from "./Loading";

interface IPostLikeCount {
  postId: number;
  post: readPostByIdQuery_readPostById_post;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
`;

const LikeCountContainer = styled.div<{ meLike: boolean }>`
  padding: 10px 15px;
  border: 2px solid
    ${(props) =>
      props.meLike ? props.theme.color.accent : props.theme.color.text};
  border-radius: 5px;
`;

const LIKE_TOGGLE_MUTATION = gql`
  mutation likeToggleMutation($input: LikeToggleInput!) {
    likeToggle(input: $input) {
      ok
      error
    }
  }
`;

const PostLikeCount: React.FC<IPostLikeCount> = ({ postId, post }) => {
  const client = useApolloClient();

  const [likeToggle, { loading: likeToggleLoading, error: likeToggleError }] =
    useMutation<likeToggleMutation, likeToggleMutationVariables>(
      LIKE_TOGGLE_MUTATION,
      {
        onCompleted: () => {
          client.writeFragment({
            id: `Post:${postId}`,
            fragment: gql`
              fragment EditPost on Post {
                likeCount
                meLike
              }
            `,
            data: {
              likeCount: post.meLike ? post.likeCount - 1 : post.likeCount + 1,
              meLike: !post.meLike,
            },
          });
        },
      }
    );

  const onClickLikeToggle = () => {
    try {
      if (!likeToggleLoading) {
        likeToggle({
          variables: {
            input: {
              postId,
            },
          },
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  if (likeToggleLoading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }
  if (likeToggleError) {
    return <h1>{likeToggleError}</h1>;
  }

  return (
    <Container>
      <LikeCountContainer meLike={post.meLike} onClick={onClickLikeToggle}>
        {post.likeCount}
      </LikeCountContainer>
    </Container>
  );
};

export default PostLikeCount;
