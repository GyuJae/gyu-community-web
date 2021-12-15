import { AnimatePresence } from "framer-motion";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import CategoryList from "../components/CategoryList";
import CreatePostForm from "../components/CreatePostForm";
import PostList from "../components/PostList";
import PostListCategory from "../components/PostListCategory";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
`;

const Home = () => {
  const { search, pathname } = useLocation();
  const categoryId = search ? search.split("=")[1] : null;
  const writePostMatch = pathname === "/create-post";
  return (
    <Container>
      <CategoryList />
      {categoryId ? (
        <PostListCategory categoryId={parseInt(categoryId)} />
      ) : (
        <>
          <PostList />
          <AnimatePresence>
            {writePostMatch && <CreatePostForm />}
          </AnimatePresence>
        </>
      )}
      <Outlet />
    </Container>
  );
};

export default Home;
