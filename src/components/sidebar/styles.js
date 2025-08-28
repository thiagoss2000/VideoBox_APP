import styled from "styled-components";

export const StyledSidebar = styled.nav`
  background-color: #282626;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: max-content;

  a {
    width: 200px;
    height: 40px;
    display: flex;
    align-items: center;
    color: #B4E0FF;
    font-size: 1rem;
    text-decoration: none;
    padding: 0 10px;
    margin-bottom: 4px;
    border-radius: 4px;
  }

  .side_icon {
    margin-inline: 10px;
  }

  .side_selected {
    background: linear-gradient(135deg, #282626, #8E8787);
    background-color: #72727283;
    cursor: default;
  }

  .side_collapsed {
    width: max-content;
  }
  .side_collapsed .label {
    display: none;
  }
`;