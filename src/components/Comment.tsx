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
import { BiTrash } from "react-icons/bi";
import { READ_COMMENTS_LIKE_QUERY, READ_COMMENTS_QUERY } from "./PostComments";
import {
  deleteComment,
  deleteCommentVariables,
} from "../__generated__/deleteComment";

interface IComment {
  comment: readCommentsQuery_readComments_comments;
}

const Container = styled.div`
  padding: 8px 5px;
  display: grid;
  grid-template-columns: 1fr 19fr;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  background-color: ${(props) => props.theme.color.backgroundHover};
  margin-bottom: 5px;
  border-radius: 5px;
`;

const ContentContainer = styled.div``;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
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
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
`;

const LikeContainer = styled.div<{ meLike: boolean }>`
  margin-right: 5px;
  border: 1.3px solid
    ${(props) =>
      props.meLike ? props.theme.color.accent : props.theme.color.text};
  border-radius: 5px;
`;

const Like = styled.div`
  padding: 5px 7px;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 500;
`;

const Delete = styled.div`
  font-size: 15px;
  margin-right: 5px;
  cursor: pointer;
`;

const TitleLeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const COMMENT_LIKE_MUTATION = gql`
  mutation likeCommentToggle($input: LikeCommentToggleInput!) {
    likeCommentToggle(input: $input) {
      ok
      error
    }
  }
`;

const COMMENT_DELETE_MUTATION = gql`
  mutation deleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
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

  const onCompletedLikeComment = () => {
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
        onCompleted: onCompletedLikeComment,
      }
    );

  const onCompletedDelete = () => {
    client.refetchQueries({
      include: [READ_COMMENTS_QUERY, READ_COMMENTS_LIKE_QUERY],
    });
  };

  const [
    deleteCommentMutation,
    { loading: deleteLoading, error: deleteError },
  ] = useMutation<deleteComment, deleteCommentVariables>(
    COMMENT_DELETE_MUTATION,
    {
      onCompleted: onCompletedDelete,
    }
  );

  if (loading || likeLoading || deleteLoading) {
    return <h1>loading...</h1>;
  }
  if (error || deleteError || likeError) {
    return (
      <h1>
        Error:{error} DeleteError:{deleteError} LikeError: {likeError}
      </h1>
    );
  }

  const onClickLike = () => {
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

  const onClickComment = () => {
    try {
      if (!currentUser.status) {
        alert("로그인이 필요한 기능입니다.");
      }
      if (!deleteLoading && currentUser.status) {
        deleteCommentMutation({
          variables: {
            input: {
              commentId: comment.id,
            },
          },
        });
      }
    } catch {
      alert(deleteError);
    }
  };

  return (
    <Container>
      <LeftContainer>
        <LikeContainer meLike={comment.meLike} onClick={onClickLike}>
          <Like>{comment.commentLikeCount}</Like>
        </LikeContainer>
      </LeftContainer>
      <ContentContainer>
        <TitleContainer>
          <TitleLeftContainer>
            <Username>{data?.findUserById.user?.name}</Username>
            <CreatedAt>
              {comment.createdAt.split("T")[0]}{" "}
              {comment.createdAt.split("T")[1].slice(0, 8)}
            </CreatedAt>
          </TitleLeftContainer>
          {comment.isMine && (
            <Delete onClick={onClickComment}>
              <BiTrash />
            </Delete>
          )}
        </TitleContainer>
        <Payload>{comment.payload}</Payload>
      </ContentContainer>
    </Container>
  );
};

export default Comment;
