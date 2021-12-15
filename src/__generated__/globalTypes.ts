/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreatePostInput {
  title: string;
  content: string;
  file?: string[] | null;
  categoryId: number;
}

export interface ReadPostsByCategoryInput {
  skip: number;
  take: number;
  categoryId: number;
}

export interface ReadPostsInput {
  skip: number;
  take: number;
}

export interface createUserInput {
  name: string;
  password: string;
}

export interface loginInput {
  name: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
