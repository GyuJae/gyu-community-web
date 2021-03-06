import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryStateAtom } from "../atoms/category.atom";
import {
  ReadPostsByCategory,
  ReadPostsByCategoryVariables,
} from "../__generated__/ReadPostsByCategory";
import CategoryTitle from "./CategoryTitle";
import Loading from "./Loading";
import Pagination from "./Pagination";
import PostListItem from "./PostListItem";

const READ_POSTS_BY_CATEGORY_QUERY = gql`
  query ReadPostsByCategory($input: ReadPostsByCategoryInput!) {
    readPostsByCategory(input: $input) {
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

const Container = styled.main`
  min-width: ${(props) => props.theme.width.centerMaxWidth};
`;

const PostListCategory: React.FC<{ categoryId: number }> = ({ categoryId }) => {
  const categoryState = useRecoilValue(categoryStateAtom);
  const [page, setPage] = useState<number>(0);
  const { data, loading, error } = useQuery<
    ReadPostsByCategory,
    ReadPostsByCategoryVariables
  >(READ_POSTS_BY_CATEGORY_QUERY, {
    variables: {
      input: {
        skip: 0,
        take: 10,
        categoryId,
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
    return <h1 style={{ color: "red" }}>{error}</h1>;
  }
  return (
    <Container>
      <CategoryTitle
        title={categoryState?.name ? categoryState.name : "전체글"}
      />
      {data?.readPostsByCategory.ok ? (
        <ul>
          {data.readPostsByCategory.posts &&
            data.readPostsByCategory.posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
        </ul>
      ) : (
        <h1>{data?.readPostsByCategory.error}</h1>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.readPostsByCategory.totalPages}
      />
    </Container>
  );
};

export default PostListCategory;
