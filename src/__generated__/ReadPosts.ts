/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReadPostsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ReadPosts
// ====================================================

export interface ReadPosts_readPosts_posts_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface ReadPosts_readPosts_posts {
  __typename: "Post";
  id: number;
  title: string;
  createdAt: any;
  updatedAt: any;
  userId: number;
  categoryId: number;
  likeCount: number;
  commentCount: number;
  isMine: boolean;
  file: string[] | null;
  category: ReadPosts_readPosts_posts_category;
}

export interface ReadPosts_readPosts {
  __typename: "ReadPostsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  posts: ReadPosts_readPosts_posts[] | null;
}

export interface ReadPosts {
  readPosts: ReadPosts_readPosts;
}

export interface ReadPostsVariables {
  input: ReadPostsInput;
}
