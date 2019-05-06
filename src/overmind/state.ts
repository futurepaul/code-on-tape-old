type File = {
  filename: string;
  content: string;
};
export type State = {
  gistId: string;
  code: Array<File>;
};

export const state: State = {
  gistId: "",
  code: [
    { filename: "Hello", content: "//Put in a gist ID to get some files!" }
  ]
};
