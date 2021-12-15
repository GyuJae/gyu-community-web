/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ReadCategories
// ====================================================

export interface ReadCategories_readCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface ReadCategories_readCategories {
  __typename: "ReadCategoriesOutput";
  ok: boolean;
  error: string | null;
  categories: ReadCategories_readCategories_categories[] | null;
}

export interface ReadCategories {
  readCategories: ReadCategories_readCategories;
}
