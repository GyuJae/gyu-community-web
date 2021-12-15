import React from "react";
import styled from "styled-components";
import { ReadPosts_readPosts_posts } from "../__generated__/ReadPosts";
import { VscBook } from "react-icons/vsc";
import SLink from "./SLink";

interface IPostListItem {
  post: ReadPosts_readPosts_posts;
}

const Container = styled.ol`
  border-top: 1.5px solid ${(props) => props.theme.color.text};
  display: flex;
  padding: 5px 3px;
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

const PostListItem: React.FC<IPostListItem> = ({ post }) => {
  return (
    <SLink to={`post/${post.id}`}>
      <Container>
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
      </Container>
    </SLink>
  );
};

export default PostListItem;
