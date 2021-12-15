import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import { ReadPosts, ReadPostsVariables } from "../__generated__/ReadPosts";
import PostListItem from "./PostListItem";
import CategoryTitle from "./CategoryTitle";

export const READ_POSTS_QUERY = gql`
  query ReadPosts($input: ReadPostsInput!) {
    readPosts(input: $input) {
      ok
      error
      totalPages
      posts {
        id
        title
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
  const { loading, data, error } = useQuery<ReadPosts, ReadPostsVariables>(
    READ_POSTS_QUERY,
    {
      variables: {
        input: {
          skip: 0,
          take: 10,
        },
      },
    }
  );
  if (loading) {
    return <h1>loading...</h1>;
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
    </Container>
  );
};

export default PostList;