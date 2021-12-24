import React from "react";
import styled from "styled-components";
import { ReadPosts_readPosts_posts } from "../__generated__/ReadPosts";
import { VscBook } from "react-icons/vsc";
import { useQuery } from "@apollo/client";
import { FIND_USER_BY_ID } from "../Query/findUser.query";
import {
  findUserByIdQuery,
  findUserByIdQueryVariables,
} from "../__generated__/findUserByIdQuery";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

interface IPostListItem {
  post: ReadPosts_readPosts_posts;
}

const Container = styled.li`
  border-top: 1.5px solid ${(props) => props.theme.color.text};
  display: flex;
  padding: 5px 3px;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.color.hover};
  }
`;

const ContainerItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  &:first-child {
    margin-right: 10px;
  }
`;

const PostTitle = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const Category = styled.div`
  font-size: 15px;
  opacity: 0.7;
  margin-top: 7px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 2px;
`;

const LeftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  margin-right: 20px;
  z-index: 100;
`;

const PostListItem: React.FC<IPostListItem> = ({ post }) => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery<
    findUserByIdQuery,
    findUserByIdQueryVariables
  >(FIND_USER_BY_ID, {
    variables: {
      input: {
        id: post.userId,
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
    <Container
      onClick={() =>
        navigate(`/post/${post.id}`, {
          state: { post, postUsername: data?.findUserById.user?.name },
        })
      }
    >
      <LeftBox>
        <ContainerItem>
          {post.file?.length !== 0 && post.file ? (
            <Image src={post.file[0]} />
          ) : (
            <VscBook style={{ fontSize: 30, width: 50, height: 50 }} />
          )}
        </ContainerItem>
        <ContainerItem>
          <PostTitle>
            {post.title} [{post.commentCount}]
          </PostTitle>

          <Category>{post.category.name}</Category>
        </ContainerItem>
      </LeftBox>
      <RightBox
        whileHover={{
          scale: 1.05,
        }}
        onClick={() => navigate(`/user/${post.userId}`)}
      >
        {data?.findUserById.user?.name}
      </RightBox>
    </Container>
  );
};

export default PostListItem;
