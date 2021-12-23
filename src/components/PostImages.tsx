import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import styled from "styled-components";

interface IPostImages {
  file: string[];
}

const Contaienr = styled.div`
  max-width: ${(props) => props.theme.width.centerMaxWidth};
  height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0px;
`;

const Next = styled(motion.div)`
  top: calc(50% - 20px);
  position: absolute;
  background: ${(props) => props.theme.color.text};
  border-radius: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  color: ${(props) => props.theme.color.background};
  z-index: 2;
  right: 10px;
`;

const Prev = styled(Next)`
  right: 0px;
  left: 10px;
  transform: scale(-1);
`;

const Img = styled(motion.img)`
  position: absolute;
  max-width: ${(props) => props.theme.width.centerMaxWidth};
  max-height: 500px;
`;

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const PostImages: React.FC<IPostImages> = ({ file }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, file.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };
  return (
    <Contaienr>
      <AnimatePresence initial={false} custom={direction}>
        <Img
          key={page}
          src={file[imageIndex]}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      <Next onClick={() => paginate(1)}>{"‣"}</Next>
      <Prev onClick={() => paginate(-1)}>{"‣"}</Prev>
    </Contaienr>
  );
};

export default PostImages;
