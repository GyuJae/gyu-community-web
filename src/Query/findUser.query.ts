import { gql } from "@apollo/client";

export const FIND_USER_BY_ID = gql`
  query findUserByIdQuery($input: FindUserByIdInput!) {
    findUserById(input: $input) {
      ok
      error
      user {
        id
        name
        createdAt
      }
    }
  }
`;
