/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReadPostsByCategoryInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ReadPostsByCategory
// ====================================================

export interface ReadPostsByCategory_readPostsByCategory_posts_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface ReadPostsByCategory_readPostsByCategory_posts {
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
  category: ReadPostsByCategory_readPostsByCategory_posts_category;
}

export interface ReadPostsByCategory_readPostsByCategory {
  __typename: "ReadPostsByCategoryOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  posts: ReadPostsByCategory_readPostsByCategory_posts[] | null;
}

export interface ReadPostsByCategory {
  readPostsByCategory: ReadPostsByCategory_readPostsByCategory;
}

export interface ReadPostsByCategoryVariables {
  input: ReadPostsByCategoryInput;
}
