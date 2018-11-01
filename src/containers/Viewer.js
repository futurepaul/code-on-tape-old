import React, { Component } from "react";
import CM from "../components/CM";

import styled from "styled-components";

// display: ${props => (props.active ? "block" : "none")};
const Code = styled.div``;

export class Viewer extends Component {
  render() {
    return (
      <Code active={this.props.active}>
        <CM
          value={this.props.value}
          mode={"javascript"}
          lineNumbers
          readOnly
          highlightSelectionMatches={{ showToken: true }}
          matchBrackets
          styleActiveLine
          styleSelectedText
          keyMap={"vim"}
          onActivity={this.props.readCursorPos}
          storedCursor={this.props.cursor}
        />
      </Code>
    );
  }
}

export default Viewer;
