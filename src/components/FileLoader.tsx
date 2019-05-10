import * as React from "react";
import { useRef } from "react";
import styled from "styled-components";

const Uploader = styled.input`
  font-size: 1rem;
  padding: 5px;
  margin-right: 2px;
  border: 1px solid red;
  background-color: white;
`;

interface Props {
  importFile(props: any): void;
}

export const FileLoader: React.FunctionComponent<Props> = props => {
  const onInputFile = (e: any) => {
    props.importFile(e.target.files[0]);
  };

  return <Uploader type="file" id="file" accept=".zip" onInput={onInputFile} />;
};
