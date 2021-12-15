/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { createUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createUserMutation
// ====================================================

export interface createUserMutation_createUser {
  __typename: "CreateUserOutput";
  ok: boolean;
  error: string | null;
}

export interface createUserMutation {
  createUser: createUserMutation_createUser;
}

export interface createUserMutationVariables {
  input: createUserInput;
}
