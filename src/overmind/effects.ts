import * as JSZip from "jszip";
import { saveAs } from "file-saver";
import { myFakeJson } from "../api";
import { onClickImportZip } from "./actions";
export const api = {
  async fetchGist(id: string) {
    // const url = `https://api.github.com/gists/${gistId}`;
    // const response = await fetch(url);
    // const responseBody = await response.json();
    // let gistFiles = responseBody.files;
    // let gists = Object.keys(gistFiles).map(key => gistFiles[key]);
    // console.log(gists);
    // dispatch(addGists(gists));
    const response = myFakeJson;

    console.log(id);

    console.log(response);

    return response;
  }
};

export const fileTools = {
  async saveAsZip(recordingJson: string, recordingAudio: any) {
    let zip = new JSZip();
    zip.file("recording.json", recordingJson);
    zip.file("audio.ogg", recordingAudio);

    zip.generateAsync({ type: "blob" }).then(function(content) {
      saveAs(content, "recording.zip");
    });
  },
  async loadFile(inputFile: any): Promise<any> {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsArrayBuffer(inputFile);
    });
  },
  async loadAndUnzipFile(inputFile: any): Promise<any> {
    try {
      const fileContents = await this.loadFile(inputFile);
      const zip = await JSZip.loadAsync(fileContents);
      const cursorRecording = await zip.files["recording.json"].async("text");
      const audioRecording = await zip.files["audio.ogg"].async("blob");
      const audioURL = URL.createObjectURL(audioRecording);
      return { cursorRecording, audioRecording, audioURL };
    } catch (e) {
      console.warn(e.message);
    }
  }
};

// // // const async function
// // async function unzipFile(e: any, reader: any) {
// //   data = e.target.result;
// const unzipped = await JSZip.loadAsync(data);
// return unzipped;
// // }
