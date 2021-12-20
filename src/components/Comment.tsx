import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authStateAtom } from "../atoms/auth.atom";
import { FIND_USER_BY_ID } from "../Query/findUser.query";
import {
  findUserByIdQuery,
  findUserByIdQueryVariables,
} from "../__generated__/findUserByIdQuery";
import {
  likeCommentToggle,
  likeCommentToggleVariables,
} from "../__generated__/likeCommentToggle";
import { readCommentsQuery_readComments_comments } from "../__generated__/readCommentsQuery";

interface IComment {
  comment: readCommentsQuery_readComments_comments;
}

const Container = styled.div`
  display: flex;
  padding: 8px 5px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.color.text};
  wrap: wrap;
`;

const ContentContainer = styled.div``;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Username = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-right: 5px;
`;

const CreatedAt = styled.div`
  font-size: 12px;
  color: #666666;
`;

const Payload = styled.div`
  font-size: 14px;
  margin-bottom: 6px;
`;

const LikeContainer = styled.div<{ meLike: boolean }>`
  margin-right: 5px;
  border: 2px solid
    ${(props) =>
      props.meLike ? props.theme.color.accent : props.theme.color.text};
  border-radius: 5px;
`;

const Like = styled.div`
  padding: 5px 7px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const COMMENT_LIKE_MUTATION = gql`
  mutation likeCommentToggle($input: LikeCommentToggleInput!) {
    likeCommentToggle(input: $input) {
      ok
      error
    }
  }
`;

const Comment: React.FC<IComment> = ({ comment }) => {
  const { data, loading, error } = useQuery<
    findUserByIdQuery,
    findUserByIdQueryVariables
  >(FIND_USER_BY_ID, {
    variables: {
      input: {
        id: comment.userId,
      },
    },
  });

  const client = useApolloClient();

  const currentUser = useRecoilValue(authStateAtom);

  const onCompleted = () => {
    client.writeFragment({
      id: `Comment:${comment.id}`,
      fragment: gql`
        fragment EditComment on Comment {
          commentLikeCount
          meLike
        }
      `,
      data: {
        commentLikeCount: comment.meLike
          ? comment.commentLikeCount - 1
          : comment.commentLikeCount + 1,
        meLike: !comment.meLike,
      },
    });
  };

  const [likeCommentLike, { loading: likeLoading, error: likeError }] =
    useMutation<likeCommentToggle, likeCommentToggleVariables>(
      COMMENT_LIKE_MUTATION,
      {
        onCompleted,
      }
    );

  if (likeError) {
    return <h1>{likeError}</h1>;
  }

  if (loading || likeLoading) {
    return <h1>loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  const onClickLike = async () => {
    try {
      if (!currentUser.status) {
        alert("로그인이 필요한 기능입니다.");
      }
      if (!likeLoading && currentUser.status) {
        likeCommentLike({
          variables: {
            input: {
              commentId: comment.id,
            },
          },
        });
      }
    } catch {
      alert(likeError);
    }
  };

  return (
    <Container>
      <ContentContainer>
        <TitleContainer>
          <Username>{data?.findUserById.user?.name}</Username>
        </TitleContainer>
        <Payload>{comment.payload}</Payload>
        <CreatedAt>
          {comment.createdAt.split("T")[0]}{" "}
          {comment.createdAt.split("T")[1].slice(0, 8)}
        </CreatedAt>
      </ContentContainer>
      <LikeContainer meLike={comment.meLike} onClick={onClickLike}>
        <Like>{comment.commentLikeCount}</Like>
      </LikeContainer>
    </Container>
  );
};

export default Comment;
