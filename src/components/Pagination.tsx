import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Prev = styled.div`
  cursor: pointer;
`;

const Next = styled(Prev)``;

interface IPagination {
  page: number;
  setPage: Function;
  totalPages: number | null | undefined;
}

const Pagination: React.FC<IPagination> = ({ page, setPage, totalPages }) => {
  return (
    <Container>
      {page !== 0 && (
        <Prev onClick={() => setPage((prev: number) => prev - 1)}>⬅️</Prev>
      )}
      {page}
      {totalPages && page < totalPages - 1 && (
        <Next onClick={() => setPage((prev: number) => prev + 1)}>➡️</Next>
      )}
    </Container>
  );
};

export default Pagination;
