//cribbed with modifications from https://github.com/fkling/astexplorer/blob/master/website/src/components/Editor.js

import CodeMirror from "codemirror";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/lib/codemirror";
import "codemirror/theme/material.css";
import "codemirror/addon/search/match-highlighter";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/selection/active-line";
import "codemirror/addon/selection/mark-selection";
import "codemirror/keymap/vim";

import "./CM.css";

import PropTypes from "prop-types";
import PubSub from "pubsub-js";
import React from "react";

// const defaultPrettierOptions = {
//   printWidth: 80,
//   tabWidth: 2,
//   singleQuote: false,
//   trailingComma: "none",
//   bracketSpacing: true,
//   jsxBracketSameLine: false,
//   parser: "babylon"
// };

export default class CM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value }, () =>
        this.codeMirror.setValue(nextProps.value)
      );
    }
    if (nextProps.mode !== this.props.mode) {
      this.codeMirror.setOption("mode", nextProps.mode);
    }

    if (nextProps.keyMap !== this.props.keyMap) {
      this.codeMirror.setOption("keyMap", nextProps.keyMap);
    }

    // if (nextProps.storedCursor !== this.props.storedCursor) {
    //   this.codeMirror.setCursor(this.props.storedCursor);
    // }

    this._setError(nextProps.error);
  }

  shouldComponentUpdate() {
    return false;
  }

  getValue() {
    return this.codeMirror && this.codeMirror.getValue();
  }

  _getErrorLine(error) {
    return error.loc ? error.loc.line : error.lineNumber || error.line;
  }

  _setError(error) {
    if (this.codeMirror) {
      let oldError = this.props.error;
      if (oldError) {
        let lineNumber = this._getErrorLine(oldError);
        if (lineNumber) {
          this.codeMirror.removeLineClass(
            lineNumber - 1,
            "text",
            "errorMarker"
          );
        }
      }

      if (error) {
        let lineNumber = this._getErrorLine(error);
        if (lineNumber) {
          this.codeMirror.addLineClass(lineNumber - 1, "text", "errorMarker");
        }
      }
    }
  }

  _posFromIndex(doc, index) {
    return (this.props.posFromIndex ? this.props : doc).posFromIndex(index);
  }

  componentDidMount() {
    this._CMHandlers = [];
    this._subscriptions = [];
    this.codeMirror = CodeMirror(this.container, {
      keyMap: this.props.keyMap,
      value: this.state.value,
      mode: this.props.mode,
      lineNumbers: this.props.lineNumbers,
      readOnly: this.props.readOnly,
      highlightSelectionMatches: this.props.highlightSelectionMatches,
      matchBrackets: this.props.matchBrackets,
      styleActiveLine: this.styleActiveLine,
      styleSelectedText: this.styleSelectedText
    });

    // this._bindCMHandler("blur", instance => {
    //   if (!this.props.enableFormatting) return;
    //   require(["prettier"], prettier => {
    //     const currValue = instance.doc.getValue();
    //     const options = Object.assign({}, defaultPrettierOptions, {
    //       printWidth: instance.display.maxLineLength
    //     });
    //     instance.doc.setValue(prettier.format(currValue, options));
    //   });
    // });

    // this._bindCMHandler("changes", () => {
    //   clearTimeout(this._updateTimer);
    //   this._updateTimer = setTimeout(this._onContentChange.bind(this), 200);
    // });
    this._bindCMHandler("cursorActivity", () => {
      clearTimeout(this._updateTimer);
      this._updateTimer = setTimeout(this._onActivity.bind(this, true), 100);
    });

    // this._subscriptions.push(
    //   PubSub.subscribe("PANEL_RESIZE", () => {
    //     if (this.codeMirror) {
    //       this.codeMirror.refresh();
    //     }
    //   })
    // );

    if (this.props.storedCursor) {
      this._subscriptions.push(
        PubSub.subscribe("MOVE_CURSOR", () => {
          console.log("Got the pubsub message");
          if (this.codeMirror) {
            this.codeMirror.setCursor(this.props.storedCursor);
            this.codeMirror.focus();
          }
        })
      );
    }

    // if (this.props.highlight) {
    //   this._markerRange = null;
    //   this._mark = null;
    //   this._subscriptions.push(
    //     PubSub.subscribe("HIGHLIGHT", (_, { range }) => {
    //       if (!range) {
    //         return;
    //       }
    //       let doc = this.codeMirror.getDoc();
    //       this._markerRange = range;
    //       // We only want one mark at a time.
    //       if (this._mark) {
    //         this._mark.clear();
    //       }
    //       let [start, end] = range.map(index => this._posFromIndex(doc, index));
    //       if (!start || !end) {
    //         this._markerRange = this._mark = null;
    //         return;
    //       }
    //       this._mark = this.codeMirror.markText(start, end, {
    //         className: "marked"
    //       });
    //     }),

    //     PubSub.subscribe("CLEAR_HIGHLIGHT", (_, { range } = {}) => {
    //       if (
    //         !range ||
    //         (this._markerRange &&
    //           range[0] === this._markerRange[0] &&
    //           range[1] === this._markerRange[1])
    //       ) {
    //         this._markerRange = null;
    //         if (this._mark) {
    //           this._mark.clear();
    //           this._mark = null;
    //         }
    //       }
    //     })
    //   );
    // }

    // if (this.props.error) {
    //   this._setError(this.props.error);
    // }
  }

  componentWillUnmount() {
    clearTimeout(this._updateTimer);
    this._unbindHandlers();
    this._markerRange = null;
    this._mark = null;
    let container = this.container;
    container.removeChild(container.children[0]);
    this.codeMirror = null;
  }

  _bindCMHandler(event, handler) {
    this._CMHandlers.push(event, handler);
    this.codeMirror.on(event, handler);
  }

  _unbindHandlers() {
    const cmHandlers = this._CMHandlers;
    for (let i = 0; i < cmHandlers.length; i += 2) {
      this.codeMirror.off(cmHandlers[i], cmHandlers[i + 1]);
    }
    this._subscriptions.forEach(PubSub.unsubscribe);
  }

  _onContentChange() {
    const doc = this.codeMirror.getDoc();
    const args = {
      value: doc.getValue(),
      cursor: doc.indexFromPos(doc.getCursor())
    };
    this.setState({ value: args.value }, () =>
      this.props.onContentChange(args)
    );
  }

  _onActivity() {
    const cursor = this.codeMirror.getCursor();
    this.props.onActivity({ line: cursor.line, ch: cursor.ch });
  }

  render() {
    return <div ref={c => (this.container = c)} />;
  }
}

CM.propTypes = {
  value: PropTypes.string,
  highlight: PropTypes.bool,
  lineNumbers: PropTypes.bool,
  readOnly: PropTypes.bool,
  onContentChange: PropTypes.func,
  onActivity: PropTypes.func,
  storedCursor: PropTypes.object,
  posFromIndex: PropTypes.func,
  error: PropTypes.object,
  mode: PropTypes.string,
  enableFormatting: PropTypes.bool,
  keyMap: PropTypes.string
};

CM.defaultProps = {
  value: "",
  highlight: true,
  lineNumbers: true,
  readOnly: false,
  mode: "javascript",
  keyMap: "default",
  onContentChange: () => {},
  onActivity: () => {},
  storedCursor: { line: 0, ch: 0 }
};
