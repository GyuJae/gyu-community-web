import { motion } from "framer-motion";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ImCancelCircle } from "react-icons/im";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ReadCategories } from "../__generated__/ReadCategories";
import { READ_CATEGORIES_QUERY } from "./CategoryList";
import { useRecoilValue } from "recoil";
import { categoryStateAtom } from "../atoms/category.atom";
import {
  createPostMutation,
  createPostMutationVariables,
} from "../__generated__/createPostMutation";
import { READ_POSTS_QUERY } from "./PostList";
import { client } from "../apollo";

type IForm = {
  title: string;
  content: string;
  categoryId: string;
};

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 10%;
`;

const Overlay = styled(motion.div)`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const FormContainer = styled.div`
  width: 1000px;
  min-width: 700px;
  height: 500px;
  background-color: ${(props) => props.theme.color.background};
  z-index: 1;
  border-radius: 8px;
`;

const TitleContainer = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
  border-bottom: 1.5px solid ${(props) => props.theme.color.text};
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const Cancel = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: ${(props) => props.theme.color.hover};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  padding: 10px;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-right: 40px;
`;

const SubmitInput = styled(motion.input)`
  background-color: ${(props) => props.theme.color.accent};
  padding: 10px 5px;
  border-radius: 5px;
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 600;
  width: 90px;
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const Label = styled.label<{ currentLabel: boolean }>`
  margin-right: 5px;
  color: ${(props) =>
    props.currentLabel ? props.theme.color.accent : props.theme.color.text};
`;

const Select = styled.select`
  width: 80px;
  padding: 3px;
  border-radius: 3px;
  &:focus {
    outline: 2px solid ${(props) => props.theme.color.accent};
  }
`;

const TitleInput = styled.input`
  border: none;
  color: ${(props) => props.theme.color.background};
  background-color: ${(props) => props.theme.color.text};
  border-radius: 3px;
  width: 900px;
  padding: 10px 5px;
  &:focus {
    outline: 2px solid ${(props) => props.theme.color.accent};
  }
`;

const ContentTextarea = styled.textarea`
  width: 900px;
  height: 250px;
  resize: none;
  border-radius: 3px;
  &:focus {
    outline: 2px solid ${(props) => props.theme.color.accent};
  }
`;

const CREATE_POST_MUTATION = gql`
  mutation createPostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      ok
      error
    }
  }
`;

const CreatePostForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();
  const [currentFocus, setCurrentFocus] = useState<string | null>(null);
  const categoryState = useRecoilValue(categoryStateAtom);
  const onCompleted = async ({
    createPost: { ok, error },
  }: createPostMutation) => {
    if (ok) {
      navigate("/");
      await client.refetchQueries({
        include: [READ_POSTS_QUERY],
      });
    } else {
      alert(error);
    }
  };
  const [createPostMutation, { loading: createPostLoading }] = useMutation<
    createPostMutation,
    createPostMutationVariables
  >(CREATE_POST_MUTATION, {
    onCompleted,
  });
  const onSubmit: SubmitHandler<IForm> = ({ title, content, categoryId }) => {
    try {
      if (!createPostLoading) {
        createPostMutation({
          variables: {
            input: {
              title,
              content,
              categoryId: parseInt(categoryId),
            },
          },
        });
      }
    } catch (error) {
      alert(error);
    }
  };
  const { data, error, loading } = useQuery<ReadCategories>(
    READ_CATEGORIES_QUERY
  );
  if (loading) {
    return <h1>loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <Container layoutId="create-post-form">
      <FormContainer>
        <TitleContainer>
          <Title>글 작성하기</Title>
          <Cancel
            onClick={() => navigate("/")}
            whileHover={{
              scale: 1.1,
            }}
          >
            <ImCancelCircle />
          </Cancel>
        </TitleContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <Label currentLabel={currentFocus === "category"} id="category">
              카테고리
            </Label>
            <Select
              {...register("categoryId", { required: true })}
              defaultValue={categoryState?.id ? categoryState.id : 1}
              id="category"
              onFocus={() => {
                setCurrentFocus("category");
              }}
              onBlur={() => {
                setCurrentFocus(null);
              }}
            >
              {data?.readCategories.categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </InputContainer>
          <InputContainer>
            <Label currentLabel={currentFocus === "title"} id="title">
              제목
            </Label>
            <TitleInput
              {...register("title", { maxLength: 255, required: true })}
              onFocus={() => {
                setCurrentFocus("title");
              }}
              onBlur={() => {
                setCurrentFocus(null);
              }}
              autoComplete="off"
            />
          </InputContainer>
          <InputContainer>
            <Label currentLabel={currentFocus === "content"} id="content">
              내용
            </Label>
            <ContentTextarea
              {...register("content", { required: true })}
              onFocus={() => {
                setCurrentFocus("content");
              }}
              onBlur={() => {
                setCurrentFocus(null);
              }}
            />
          </InputContainer>
          <SubmitContainer>
            <SubmitInput
              type="submit"
              value={createPostLoading ? "Loading..." : "작성하기"}
              whileHover={{
                scale: 1.1,
              }}
            />
          </SubmitContainer>
        </Form>
      </FormContainer>
      <Link to="/">
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: "auto" }}
        ></Overlay>
      </Link>
    </Container>
  );
};

export default CreatePostForm;
