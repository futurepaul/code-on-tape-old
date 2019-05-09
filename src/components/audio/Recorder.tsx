import * as React from "react";
import { useRef } from "react";

export const AudioRecorder: React.FunctionComponent = props => {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

  let audioPlayerEl = useRef<HTMLMediaElement>(null);

  const onPlayButtonClick = () => {
    audioPlayerEl.current.play();
  };

  return <audio ref={audioPlayerEl} src={audioURL} />;
};
