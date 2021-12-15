/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: whoAmIQuery
// ====================================================

export interface whoAmIQuery_whoAmI {
  __typename: "User";
  id: number;
  role: string;
  name: string;
  createdAt: any;
}

export interface whoAmIQuery {
  whoAmI: whoAmIQuery_whoAmI;
}
