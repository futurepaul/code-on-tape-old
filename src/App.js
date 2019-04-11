import React, { Component } from "react";

import { connect } from "react-redux";

import {
  pubMoveCursorPos,
  getGists,
  setActive,
  readCursorPos,
  startRecording
} from "./redux";

import {
  Title,
  GistGetter,
  GistButton,
  GistInput,
  Header,
  Wrapper,
  Nav,
  Tab
} from "./components/basics";

import Viewer from "./containers/Viewer";
import Controls from "./containers/Controls";

// App.js
export class App extends Component {
  state = {
    gistId: "2a623ad1f35f28191e91fab2875a1063"
  };

  updateGistList = gistId => this.props.getGists(gistId);
  setActive = index => this.props.setActive(index);
  readCursorPos = pos => this.props.readCursorPos(pos);

  render() {
    return (
      <Wrapper>
        <Header>
          <Title>Code on tape</Title>

          <GistGetter>
            <GistInput
              type="text"
              value={this.state.gistId}
              onChange={ev => this.setState({ gist: ev.target.value })}
              placehold="A gist..."
            />
            <GistButton onClick={() => this.updateGistList(this.state.gistId)}>
              Get Gist
            </GistButton>
          </GistGetter>
        </Header>

        <Nav>
          {this.props.gists.length > 0 &&
            this.props.gists.map((gist, index) => (
              <Tab
                onClick={() => this.setActive(index)}
                active={index === this.props.active}
                key={index}
              >
                {gist.filename}
              </Tab>
            ))}
          <Tab
            onClick={() => this.props.pubMoveCursorPos({ line: 2, ch: 2 })}
          />
        </Nav>

        <div>
          <ul>
            {
              <Viewer
                cursor={this.props.cursorPos}
                readCursorPos={this.readCursorPos}
                value={
                  this.props.gists.length > 0
                    ? this.props.gists[this.props.active].content
                    : "Import a gist to get started..."
                }
              />
            }
          </ul>
        </div>
        <Controls onClickRecord={() => this.props.startRecording()} />
      </Wrapper>
    );
  }
}

// AppContainer.js
const mapStateToProps = (state, ownProps) => ({
  cursorPos: state.cursor,
  active: state.active,
  gists: state.gists
});
const mapDispatchToProps = {
  pubMoveCursorPos,
  getGists,
  setActive,
  readCursorPos,
  startRecording
};
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
