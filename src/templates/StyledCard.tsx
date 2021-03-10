import styled from "styled-components";
import Card from "../components/Card";
import { rgba } from "polished";

export const StyledCard = styled(Card)`
  display: flex;
  align-items: baseline;

  h1 {
    font-size: 1.25rem;
    color: ${({ theme }) => rgba(theme.text, 0.9)};
    margin: 0 0.5rem 0 0;
  }

  span {
    color: ${({ theme }) => rgba(theme.text, 0.9)};
  }
`;
