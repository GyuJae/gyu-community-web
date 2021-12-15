import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { X_JWT_TOKEN } from "./atoms/auth.atom";

//yarn install --ignore-engines

const token = localStorage.getItem(X_JWT_TOKEN);

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

export const authTokenVar = makeVar(token);

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || null,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
