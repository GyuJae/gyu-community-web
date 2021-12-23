import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import PostListByUser from "../components/PostListByUser";
import { FIND_USER_BY_ID } from "../Query/findUser.query";
import {
  findUserByIdQuery,
  findUserByIdQueryVariables,
} from "../__generated__/findUserByIdQuery";

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
`;

const Name = styled.div`
  font-size: 25px;
  font-weight: 700;
`;

const CreatedAt = styled.div`
  font-size: 20px;
  margin-top: 8px;
`;

const UserDetail = () => {
  const { userId } = useParams<{ userId: string }>();

  const navigate = useNavigate();

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
        <CreatedAt>
          가입 날짜: {data?.findUserById.user?.createdAt.slice(0, 10)}
        </CreatedAt>
      </UserInformationContainer>
      <PostListByUser userId={userId as string} />
    </Container>
  );
};

export default UserDetail;
