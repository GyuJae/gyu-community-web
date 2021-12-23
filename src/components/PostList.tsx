import React, { useState } from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { ReadPosts, ReadPostsVariables } from "../__generated__/ReadPosts";
import PostListItem from "./PostListItem";
import CategoryTitle from "./CategoryTitle";
import Pagination from "./Pagination";
import Loading from "./Loading";

export const READ_POSTS_QUERY = gql`
  query ReadPosts($input: ReadPostsInput!) {
    readPosts(input: $input) {
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

const PostList = () => {
  const [page, setPage] = useState<number>(0);
  const { loading, data, error } = useQuery<ReadPosts, ReadPostsVariables>(
    READ_POSTS_QUERY,
    {
      variables: {
        input: {
          skip: page * 10,
          take: 10,
        },
      },
    }
  );
  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }
  if (error) {
    return <h1 style={{ color: "red" }}>{`${error}`}</h1>;
  }

  return (
    <Container>
      <CategoryTitle title={"전체글"} />
      {data?.readPosts.ok ? (
        <ul>
          {data.readPosts.posts &&
            data.readPosts.posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
        </ul>
      ) : (
        <h1>{data?.readPosts.error}</h1>
      )}
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.readPosts.totalPages}
      />
    </Container>
  );
};

export default PostList;
