import React from "react";
import { gql, useMutation } from "@apollo/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { authStateAtom, X_JWT_TOKEN } from "../atoms/auth.atom";
import { useNavigate } from "react-router-dom";
import { WHOAMI_QUERY } from "../hooks/useMe";
import { client } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation loginMutation($input: loginInput!) {
    login(input: $input) {
      ok
      error
      token
    }
  }
`;

type LoginInputs = {
  name: string;
  password: string;
};

const Container = styled.main`
  max-width: ${(props) => props.theme.width.centerMaxWidth};
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

const Auth = () => {
  const [authState, setAuthState] = useRecoilState(authStateAtom);
  const navigate = useNavigate();
  if (authState.status) {
    navigate("/", { replace: true });
  }
  const onCompleted = async ({
    login: { ok, error, token },
  }: loginMutation) => {
    if (ok && token) {
      localStorage.setItem(X_JWT_TOKEN, token);
      setAuthState({ status: true, token });
      await client.refetchQueries({
        include: [WHOAMI_QUERY],
      });
      window.location.reload();
      navigate("/", { replace: true });
    } else {
      alert(error);
    }
  };
  const [loginMutation, { loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = ({ name, password }) => {
    try {
      if (!loading) {
        loginMutation({
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
      <Title>?????????</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("name")} placeholder="??????" />
        <Input
          {...register("password")}
          placeholder="????????????"
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
          <SubmitInput type="submit" value="?????????" />
        )}
      </Form>
    </Container>
  );
};

export default Auth;
