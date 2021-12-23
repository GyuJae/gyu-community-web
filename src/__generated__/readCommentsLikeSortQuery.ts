/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReadCommentsLikeSortInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: readCommentsLikeSortQuery
// ====================================================

export interface readCommentsLikeSortQuery_readCommentsLikeSort_comments {
  __typename: "Comment";
  id: number;
  createdAt: any;
  updatedAt: any;
  payload: string;
  userId: number;
  postId: number;
  commentLikeCount: number;
  meLike: boolean;
  isMine: boolean;
}

export interface readCommentsLikeSortQuery_readCommentsLikeSort {
  __typename: "ReadCommentsLikeSortOutput";
  ok: boolean;
  error: string | null;
  totalPage: number | null;
  comments: readCommentsLikeSortQuery_readCommentsLikeSort_comments[] | null;
}

export interface readCommentsLikeSortQuery {
  readCommentsLikeSort: readCommentsLikeSortQuery_readCommentsLikeSort;
}

export interface readCommentsLikeSortQueryVariables {
  input: ReadCommentsLikeSortInput;
}
