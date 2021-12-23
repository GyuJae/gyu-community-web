/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPostsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPostsQuery
// ====================================================

export interface searchPostsQuery_searchPosts_posts_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface searchPostsQuery_searchPosts_posts {
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
  category: searchPostsQuery_searchPosts_posts_category;
}

export interface searchPostsQuery_searchPosts {
  __typename: "SearchPostsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  posts: searchPostsQuery_searchPosts_posts[] | null;
}

export interface searchPostsQuery {
  searchPosts: searchPostsQuery_searchPosts;
}

export interface searchPostsQueryVariables {
  input: SearchPostsInput;
}
