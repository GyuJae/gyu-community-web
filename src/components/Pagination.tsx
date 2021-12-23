import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Prev = styled(motion.div)`
  cursor: pointer;
  margin-right: 20px;
`;

const Next = styled(Prev)`
  margin-right: 0px;
  margin-left: 20px;
`;

interface IPagination {
  page: number;
  setPage: Function;
  totalPages: number | null | undefined;
}

const Pagination: React.FC<IPagination> = ({ page, setPage, totalPages }) => {
  return (
    <Container>
      {page !== 0 && (
        <Prev
          whileHover={{
            scale: 1.2,
          }}
          onClick={() => setPage((prev: number) => prev - 1)}
        >
          ◀
        </Prev>
      )}
      {page}
      {totalPages && page < totalPages - 1 && (
        <Next
          whileHover={{
            scale: 1.2,
          }}
          onClick={() => setPage((prev: number) => prev + 1)}
        >
          ▶
        </Next>
      )}
    </Container>
  );
};

export default Pagination;
