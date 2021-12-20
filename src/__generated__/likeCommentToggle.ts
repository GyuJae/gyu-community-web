/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LikeCommentToggleInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: likeCommentToggle
// ====================================================

export interface likeCommentToggle_likeCommentToggle {
  __typename: "LikeCommentToggleOutput";
  ok: boolean;
  error: string | null;
}

export interface likeCommentToggle {
  likeCommentToggle: likeCommentToggle_likeCommentToggle;
}

export interface likeCommentToggleVariables {
  input: LikeCommentToggleInput;
}
