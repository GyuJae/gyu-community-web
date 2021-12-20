/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReadCommentsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: readCommentsQuery
// ====================================================

export interface readCommentsQuery_readComments_comments {
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

export interface readCommentsQuery_readComments {
  __typename: "ReadCommentsOutput";
  ok: boolean;
  error: string | null;
  totalPage: number | null;
  comments: readCommentsQuery_readComments_comments[] | null;
}

export interface readCommentsQuery {
  readComments: readCommentsQuery_readComments;
}

export interface readCommentsQueryVariables {
  input: ReadCommentsInput;
}
