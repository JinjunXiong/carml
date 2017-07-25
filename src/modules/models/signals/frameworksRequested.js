import { set } from "cerebral/operators";
import { state } from "cerebral/tags";

import getFrameworkManifests from "../actions/getFrameworkManifests";

export default [
  set(state`app.currentPage`, "getFrameworkManifests"),
  set(state`app.name`, "CarML getFrameworkManifests"),
  getFrameworkManifests
];
