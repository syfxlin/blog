import styled from "styled-components";
import { rgba } from "polished";

const StyledHeader = styled.header<{ sticky: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  background-color: ${({ theme }) => rgba(theme.background, 0.85)};
  color: ${({ theme }) => theme.primary};
  display: flex;
  z-index: 999;
  box-shadow: 0 0 20px ${({ theme }) => theme.shadow};
  transform: translate3d(0, ${({ sticky }) => (sticky ? "-100%" : "0")}, 0);
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  align-items: center;
  // backdrop-filter: blur(5px);
`;

export default StyledHeader;
