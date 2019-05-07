import * as React from "react";

import styled from "styled-components";
import { useOvermind } from "../overmind";

export const NavDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  border-bottom: 2px solid black;
  background-color: #e6fbff;
  padding-left: 1rem;
`;

interface TabProps {
  readonly isActive: boolean;
}

export const Tab = styled.button<TabProps>`
  background: ${(props: TabProps) => (props.isActive ? "black" : "white")};
  color: ${(props: TabProps) => (props.isActive ? "white" : "black")};
  font-size: 1rem;
  padding: 0.25rem 1rem;
  margin-right: 2px;
  border-top: 2px solid black;
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-bottom: none;
`;

export const Nav: React.FunctionComponent = () => {
  const { state, actions } = useOvermind();

  return (
    <NavDiv>
      {state.files.map((file, index) => (
        <Tab
          isActive={index === state.activeTab}
          onClick={() => actions.setActiveTab(index)}
          key={index}
        >
          {state.files[index].filename}
        </Tab>
      ))}
    </NavDiv>
  );
};
