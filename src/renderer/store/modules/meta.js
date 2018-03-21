import { remote } from "electron";

const state = {
  version: remote.app.getVersion()
};

export default {
  state
};
