/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReadPostsByUserIdInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: readPostsByUserId
// ====================================================

export interface readPostsByUserId_readPostsByUserId_posts_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface readPostsByUserId_readPostsByUserId_posts {
  __typename: "Post";
  id: number;
  title: string;
  content: string;
  createdAt: any;
  updatedAt: any;
  userId: number;
  categoryId: number;
  likeCount: number;
  commentCount: number;
  isMine: boolean;
  file: string[] | null;
  category: readPostsByUserId_readPostsByUserId_posts_category;
}

export interface readPostsByUserId_readPostsByUserId {
  __typename: "ReadPostsByUserIdOutput";
  ok: boolean;
  error: string | null;
  posts: readPostsByUserId_readPostsByUserId_posts[] | null;
  totalPages: number | null;
}

export interface readPostsByUserId {
  readPostsByUserId: readPostsByUserId_readPostsByUserId;
}

export interface readPostsByUserIdVariables {
  input: ReadPostsByUserIdInput;
}
