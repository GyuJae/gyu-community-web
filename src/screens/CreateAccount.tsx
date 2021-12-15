import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  createUserMutation,
  createUserMutationVariables,
} from "../__generated__/createUserMutation";

const CREATE_USER_MUTATION = gql`
  mutation createUserMutation($input: createUserInput!) {
    createUser(input: $input) {
      ok
      error
    }
  }
`;

const Container = styled.main`
  max-width: ${(props) => props.theme.width.centerMaxWidth};
  margin: 0px auto;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input.attrs({ autoComplete: "off" })`
  width: 350px;
  padding: 10px 5px;
  margin-top: 5px;
`;

const SubmitInput = styled(Input)`
  background-color: ${(props) => props.theme.color.accent};
  color: white;
  border: none;
  margin-top: 10px;
`;

const LoadingContainer = styled.div`
  width: 350px;
  padding: 10px 5px;
  background-color: ${(props) => props.theme.color.accent};
  color: white;
  border: none;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingIcon = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

type CreateAccountInputs = {
  name: string;
  password: string;
};

const CreateAccount = () => {
  const navigate = useNavigate();
  const onCompleted = ({ createUser: { ok, error } }: createUserMutation) => {
    if (ok) {
      navigate("/auth");
    } else {
      alert(error);
    }
  };
  const [createUserFun, { loading }] = useMutation<
    createUserMutation,
    createUserMutationVariables
  >(CREATE_USER_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit } = useForm<CreateAccountInputs>();

  const onSubmit: SubmitHandler<CreateAccountInputs> = ({ name, password }) => {
    try {
      if (!loading) {
        createUserFun({
          variables: {
            input: {
              name,
              password,
            },
          },
        });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Container>
      <Title>회원 가입</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("name")} placeholder="이름" />
        <Input
          {...register("password")}
          placeholder="패스워드"
          type="password"
        />
        {loading ? (
          <LoadingContainer>
            <LoadingIcon
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                ease: "easeInOut",
                repeat: Infinity,
                duration: 0.5,
              }}
            >
              <AiOutlineLoading3Quarters />
            </LoadingIcon>
          </LoadingContainer>
        ) : (
          <SubmitInput type="submit" value="회원가입" />
        )}
      </Form>
    </Container>
  );
};

export default CreateAccount;
