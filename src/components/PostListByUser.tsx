import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import {
  readPostsByUserId,
  readPostsByUserIdVariables,
} from "../__generated__/readPostsByUserId";
import PostListItem from "./PostListItem";
import Pagination from "./Pagination";
import Loading from "./Loading";

const READ_POST_BY_USER_ID = gql`
  query readPostsByUserId($input: ReadPostsByUserIdInput!) {
    readPostsByUserId(input: $input) {
      ok
      error
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
      totalPages
    }
  }
`;

const Container = styled.div`
  min-width: ${(props) => props.theme.width.centerMaxWidth};
`;

const PostListByUser: React.FC<{ userId: string }> = ({ userId }) => {
  const [page, setPage] = useState<number>(0);
  const { data, error, loading } = useQuery<
    readPostsByUserId,
    readPostsByUserIdVariables
  >(READ_POST_BY_USER_ID, {
    variables: {
      input: {
        userId: parseInt(userId),
        take: 10,
        skip: page * 10,
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
    return <h1 style={{ color: "red" }}>{`${error}`}</h1>;
  }

  return (
    <Container>
      <ul>
        {data?.readPostsByUserId.posts?.map((post) => (
          <PostListItem post={post} />
        ))}
      </ul>
      <Pagination
        page={page}
        setPage={setPage}
        totalPages={data?.readPostsByUserId.totalPages}
      />
    </Container>
  );
};

export default PostListByUser;
