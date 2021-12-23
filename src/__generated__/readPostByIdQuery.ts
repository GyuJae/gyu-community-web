/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReadPostByIdInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: readPostByIdQuery
// ====================================================

export interface readPostByIdQuery_readPostById_post_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface readPostByIdQuery_readPostById_post {
  __typename: "Post";
  id: number;
  createdAt: any;
  updatedAt: any;
  title: string;
  content: string;
  file: string[] | null;
  userId: number;
  categoryId: number;
  likeCount: number;
  commentCount: number;
  category: readPostByIdQuery_readPostById_post_category;
  isMine: boolean;
  meLike: boolean;
}

export interface readPostByIdQuery_readPostById {
  __typename: "ReadPostByIdOutput";
  ok: boolean;
  error: string | null;
  post: readPostByIdQuery_readPostById_post | null;
}

export interface readPostByIdQuery {
  readPostById: readPostByIdQuery_readPostById;
}

export interface readPostByIdQueryVariables {
  input: ReadPostByIdInput;
}
