import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 3rem 3rem 1fr 3rem;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 1.5rem;
`;

export const GistGetter = styled.div``;

export const GistInput = styled.input`
  font-size: 1rem;
  border: 1px solid black;
  margin-right: 2px;
  padding: 5px;
`;

export const GistButton = styled.button`
  font-size: 1rem;
  border: 1px solid red;
  padding: 5px;
`;

export const Header = styled.header`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e6fbff;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  border-bottom: 2px solid black;
  background-color: #e6fbff;
  padding-left: 1rem;
`;

export const Tab = styled.button`
  background: ${props => (props.active ? "black" : "white")};
  color: ${props => (props.active ? "white" : "black")};

  font-size: 1rem;
  padding: 0.25rem 1rem;
  margin-right: 2px;
  border-top: 2px solid black;
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-bottom: none;
`;
