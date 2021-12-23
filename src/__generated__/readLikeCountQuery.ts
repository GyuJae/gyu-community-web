/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReadLikeCountInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: readLikeCountQuery
// ====================================================

export interface readLikeCountQuery_readLikeCount {
  __typename: "ReadLikeCountOutput";
  ok: boolean;
  error: string | null;
  likeCount: number | null;
  meLike: boolean;
}

export interface readLikeCountQuery {
  readLikeCount: readLikeCountQuery_readLikeCount;
}

export interface readLikeCountQueryVariables {
  input: ReadLikeCountInput;
}
