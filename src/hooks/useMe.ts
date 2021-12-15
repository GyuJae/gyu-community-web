import { gql, useQuery } from "@apollo/client";
import { useRecoilValue } from "recoil";
import { authTokenVar } from "../apollo";
import { authStateAtom } from "../atoms/auth.atom";
import { whoAmIQuery } from "../__generated__/whoAmIQuery";

export const WHOAMI_QUERY = gql`
  query whoAmIQuery {
    whoAmI {
      id
      role
      name
      createdAt
    }
  }
`;

export const useMe = () => {
  const authState = useRecoilValue(authStateAtom);
  authTokenVar(authState.token);
  return useQuery<whoAmIQuery>(WHOAMI_QUERY, {
    skip: !authState.status,
  });
};
