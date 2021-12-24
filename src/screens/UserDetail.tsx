import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import PostListByUser from "../components/PostListByUser";
import { FIND_USER_BY_ID } from "../Query/findUser.query";
import {
  editUserMutation,
  editUserMutationVariables,
} from "../__generated__/editUserMutation";
import {
  findUserByIdQuery,
  findUserByIdQueryVariables,
} from "../__generated__/findUserByIdQuery";

const EDIT_USER_MUTATION = gql`
  mutation editUserMutation($input: editUserInput!) {
    editUser(input: $input) {
      ok
      error
    }
  }
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
`;

const UserInformationContainer = styled.div`
  min-width: ${(props) => props.theme.width.centerMaxWidth};
  margin-bottom: 20px;
  position: relative;
`;

const Name = styled.div`
  font-size: 25px;
  font-weight: 700;
`;

const CreatedAt = styled.div`
  font-size: 20px;
  margin-top: 8px;
`;

const EditButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.accent};
  color: white;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 15px;
  cursor: pointer;
  position: absolute;
  right: 0px;
  top: 0px;
`;

const Form = styled.form`
  position: absolute;
  right: 0px;
  top: 10px;
  display: flex;
`;

const Input = styled.input`
  margin-right: 5px;
  border: none;
  border-radius: 3px;
  outline: none;
  &:focus {
    border: 2px solid ${(props) => props.theme.color.accent};
  }
`;

const Submit = styled.input`
  all: unset;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.color.accent};
  color: white;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 15px;
  cursor: pointer;
`;

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();

  const [editStatus, setEditStatus] = useState<boolean>(false);

  const navigate = useNavigate();

  const client = useApolloClient();

  const [editUser, { loading: editUserLoading, error: editUserError }] =
    useMutation<editUserMutation, editUserMutationVariables>(
      EDIT_USER_MUTATION
    );

  if (editUserError) {
    alert(editUserError);
  }

  const { register, handleSubmit } = useForm<{ name: string }>();

  const onSubmit: SubmitHandler<{ name: string }> = ({ name }) => {
    try {
      if (!editUserLoading) {
        editUser({
          variables: {
            input: {
              name,
            },
          },
          onCompleted: () => {
            client.writeFragment({
              id: `User:${userId}`,
              fragment: gql`
                fragment EditUser on User {
                  name
                }
              `,
              data: {
                name,
              },
            });
          },
        });
      }
    } catch (error) {
      alert(error);
    } finally {
      setEditStatus(false);
    }
  };

  const { data, error, loading } = useQuery<
    findUserByIdQuery,
    findUserByIdQueryVariables
  >(FIND_USER_BY_ID, {
    variables: {
      input: {
        id: parseInt(userId as string),
      },
    },
  });

  if (!data?.findUserById.ok || !userId) {
    navigate("/");
  }

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
    <Container>
      <UserInformationContainer>
        <Name>{data?.findUserById.user?.name}</Name>
        {data?.findUserById.user?.isMe && editStatus ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("name", { required: true })}
              defaultValue={data?.findUserById.user?.name}
            />
            <Submit type="submit" />
          </Form>
        ) : (
          <EditButton onClick={() => setEditStatus(true)}>Edit Name</EditButton>
        )}
        <CreatedAt>
          가입 날짜: {data?.findUserById.user?.createdAt.slice(0, 10)}
        </CreatedAt>
      </UserInformationContainer>
      <PostListByUser userId={userId as string} />
    </Container>
  );
};

export default UserDetail;
