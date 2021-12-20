/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FindUserByIdInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: findUserByIdQuery
// ====================================================

export interface findUserByIdQuery_findUserById_user {
  __typename: "User";
  id: number;
  name: string;
  createdAt: any;
}

export interface findUserByIdQuery_findUserById {
  __typename: "FindUserByIdOutput";
  ok: boolean;
  error: string | null;
  user: findUserByIdQuery_findUserById_user | null;
}

export interface findUserByIdQuery {
  findUserById: findUserByIdQuery_findUserById;
}

export interface findUserByIdQueryVariables {
  input: FindUserByIdInput;
}
