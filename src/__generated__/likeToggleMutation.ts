/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LikeToggleInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: likeToggleMutation
// ====================================================

export interface likeToggleMutation_likeToggle {
  __typename: "LikeToggleOutput";
  ok: boolean;
  error: string | null;
}

export interface likeToggleMutation {
  likeToggle: likeToggleMutation_likeToggle;
}

export interface likeToggleMutationVariables {
  input: LikeToggleInput;
}
