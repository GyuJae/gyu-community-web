import { gql, useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { authStateAtom } from "../atoms/auth.atom";
import {
  createComment,
  createCommentVariables,
} from "../__generated__/createComment";
import { READ_COMMENTS_LIKE_QUERY, READ_COMMENTS_QUERY } from "./PostComments";

interface IForm {
  payload: string;
}

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      ok
      error
    }
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  wrap: wrap;
`;

const Input = styled.textarea`
  width: ${(props) => props.theme.width.centerMaxWidth};
  resize: none;
  font-weight: 600;
  height: 50px;
  border: none;
  font-size: 16px;
  &:focus {
    outline: 2px solid ${(props) => props.theme.color.accent};
  }
`;

const SubmitInput = styled.input`
  width: 70px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.disabled ? props.theme.color.accentHover : props.theme.color.accent};
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: 600;
  margin-top: 10px;
  margin-right: 10px;
  cursor: ${(props) => (props.disabled ? null : "pointer")};
`;

interface ICommentForm {
  postId: string;
}

const CommentForm: React.FC<ICommentForm> = ({ postId }) => {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const client = useApolloClient();
  const currentState = useRecoilValue(authStateAtom);
  const onCompleted = async ({
    createComment: { ok, error },
  }: createComment) => {
    if (ok && !error) {
      reset();
      await client.refetchQueries({
        include: [READ_COMMENTS_QUERY, READ_COMMENTS_LIKE_QUERY],
      });
    }
  };
  const [createCommentMutation, { loading, error }] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT_MUTATION, {
    onCompleted,
  });
  const onSubmit: SubmitHandler<IForm> = ({ payload }) => {
    try {
      if (!loading) {
        const resizePayload = payload.trim().replace(/(\r\n|\n|\r)/gm, "");
        createCommentMutation({
          variables: {
            input: {
              payload: resizePayload,
              postId: parseInt(postId),
            },
          },
        });
      }
    } catch (error) {}
  };
  if (error) {
    alert(error);
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder={
            currentState.status
              ? "댓글을 작성하시오."
              : "로그인이 필요한 서비스입니다."
          }
          {...register("payload", { required: true, maxLength: 255 })}
          maxLength={255}
          disabled={currentState.status ? false : true}
        />
        <SubmitInput
          type="submit"
          value={loading ? "loading..." : "작성하기"}
          disabled={!currentState.status}
        />
      </Form>
    </Container>
  );
};

export default CommentForm;
