import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { darkModeState } from "../atoms/darkMode.atom";

const Path = (props: any) => {
  const darkmode = useRecoilValue(darkModeState);
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke={darkmode ? "hsl(0, 0%, 91.37254901960785%)" : "hsl(0, 0%, 18%)"}
      strokeLinecap="round"
      {...props}
    />
  );
};

const Button = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.text};
  margin-right: 5px;
  margin-top: 10px;
`;

const Svg = styled.svg``;

export const MenuToggle: React.FC<{ toggle: any }> = ({ toggle }) => (
  <Button onClick={toggle}>
    <Svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </Svg>
  </Button>
);
