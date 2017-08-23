import { compute } from "cerebral";
import { set, when } from "cerebral/operators";
import { state } from "cerebral/tags";
import { join, map } from "lodash";

import modelPredictChain from "../../common/chains/modelPredictChain";
import resetError from "../../common/chains/resetError";

export default [
  ...resetError,
  ...modelPredictChain,
  when(state`app.error`),
  {
    false: [
      set(state`app.currentPage`, "PredictionResults"),
      set(
        state`app.name`,
        compute(
          state`models.selectedModels`,
          models => join(map(models, "name"), ", ") + " Model Inference"
        )
      )
    ],
    true: [] // nothing
  }
];
