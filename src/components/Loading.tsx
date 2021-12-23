import React from "react";
import styled from "styled-components";
import { RiLoaderLine } from "react-icons/ri";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => {
  return (
    <Container
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        repeat: Infinity,
        duration: 2,
        repeatDelay: 0.1,
      }}
    >
      <RiLoaderLine />
    </Container>
  );
};

export default Loading;
