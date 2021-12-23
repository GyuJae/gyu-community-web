import { gql, useQuery } from "@apollo/client";
import { motion, AnimateSharedLayout } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { readCommentsLikeSortQuery } from "../__generated__/readCommentsLikeSortQuery";
import {
  readCommentsQuery,
  readCommentsQueryVariables,
} from "../__generated__/readCommentsQuery";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Loading from "./Loading";
import Pagination from "./Pagination";

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
export const READ_COMMENTS_LIKE_QUERY = gql`
  query readCommentsLikeSortQuery($input: ReadCommentsLikeSortInput!) {
    readCommentsLikeSort(input: $input) {
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

const LikeSortContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const Sort = styled.div`
  cursor: pointer;
  position: relative;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const Outline = styled(motion.div)`
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -10px;
  border-bottom: 5px solid ${(props) => props.theme.color.accent};
`;

const PostComments: React.FC<{ postId: string }> = ({ postId }) => {
  const [likeSort, setLikeSort] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const { data, loading, error } = useQuery<
    readCommentsQuery,
    readCommentsQueryVariables
  >(READ_COMMENTS_QUERY, {
    variables: {
      input: {
        take: 10,
        skip: page * 10,
        postId: parseInt(postId),
      },
    },
  });

  const {
    data: sortData,
    loading: sortLoaidng,
    error: sortError,
  } = useQuery<readCommentsLikeSortQuery, readCommentsQueryVariables>(
    READ_COMMENTS_LIKE_QUERY,
    {
      variables: {
        input: {
          take: 10,
          skip: page * 10,
          postId: parseInt(postId),
        },
      },
    }
  );
  if (loading || sortLoaidng) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }
  if (error || sortError) {
    return (
      <h1>
        error:{error} sortError: {sortError}
      </h1>
    );
  }
  return (
    <Container>
      <CommentTitle> 댓글: {data?.readComments.comments?.length}</CommentTitle>
      <CommentForm postId={postId} />
      <AnimateSharedLayout>
        <LikeSortContainer>
          <Sort onClick={() => setLikeSort(false)}>
            최신순
            {!likeSort && (
              <Outline
                layoutId="outline"
                className="outline"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </Sort>
          <Sort onClick={() => setLikeSort(true)}>
            인기순
            {likeSort && (
              <Outline
                layoutId="outline"
                className="outline"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
          </Sort>
        </LikeSortContainer>
      </AnimateSharedLayout>
      <ContentContainer>
        {likeSort
          ? sortData?.readCommentsLikeSort.comments?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          : data?.readComments.comments?.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
      </ContentContainer>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.readComments.totalPage}
      />
    </Container>
  );
};

export default PostComments;
