import { Link } from "react-router-dom";
import styled from "styled-components";

const SLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.color.text};
`;

export default SLink;
