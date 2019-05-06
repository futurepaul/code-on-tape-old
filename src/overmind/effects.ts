import { myFakeJson } from "../api";
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
