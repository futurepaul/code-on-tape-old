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
  async loadFromZip(file: any) {
    let reader = new FileReader();

    let data;

    const f = (e: any) => {
      data = e.target.result;

      reader.removeEventListener("load", f);

      return JSZip.loadAsync(data);
    };

    reader.addEventListener("load", f);
    reader.readAsArrayBuffer(file);
  }
};
