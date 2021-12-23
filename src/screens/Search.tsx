import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import CategoryTitle from "../components/CategoryTitle";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import PostListItem from "../components/PostListItem";
import {
  searchPostsQuery,
  searchPostsQueryVariables,
} from "../__generated__/searchPostsQuery";

const SEARCH_POSTS_QUERY = gql`
  query searchPostsQuery($input: SearchPostsInput!) {
    searchPosts(input: $input) {
      ok
      error
      totalPages
      posts {
        id
        title
        content
        createdAt
        updatedAt
        userId
        categoryId
        likeCount
        commentCount
        isMine
        file
        category {
          id
          name
        }
      }
    }
  }
`;

const Container = styled(motion.main)`
  max-width: ${(props) => props.theme.width.centerMaxWidth};
  margin: 10px auto;
`;

const Search = () => {
  const { state: payload } = useLocation();
  const [page, setPage] = useState<number>(0);
  const { data, loading, error } = useQuery<
    searchPostsQuery,
    searchPostsQueryVariables
  >(SEARCH_POSTS_QUERY, {
    variables: {
      input: {
        payload,
        skip: page * 10,
        take: 10,
      },
    },
  });
  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <Container>
      <CategoryTitle title={`${payload} 검색 결과`} />
      {data?.searchPosts.ok &&
        data.searchPosts.posts?.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      {data?.searchPosts.ok && data.searchPosts.posts?.length === 0 && (
        <h1>No Result</h1>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.searchPosts.totalPages}
      />
    </Container>
  );
};

export default Search;
