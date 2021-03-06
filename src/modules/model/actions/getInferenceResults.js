import { grpc } from "grpc-web-client";
import { take, sortBy, reverse } from "lodash";

import { MXNet } from "../../../proto/github.com/rai-project/dlframework/mxnet/mxnet_pb_service";
import { MXNetInferenceRequest } from "../../../proto/github.com/rai-project/dlframework/mxnet/mxnet_pb";

function getInferenceResults({ state, uuid, controller, props, path }) {
  const modelName = state.get("models.currentModel");
  const url = state.get("app.inferenceURL");
  var req = new MXNetInferenceRequest();
  req.setModelName(modelName);
  req.setUrl(url);
  return new Promise(resolve => {
    grpc.invoke(MXNet.InferURL, {
      request: req,
      host: "/api/mxnet",
      onMessage: message => {
        const allFeatures = message.getFeaturesList();
        const topFeatures = take(
          reverse(sortBy(allFeatures, f => f.getProbability())),
          10
        ).map(f => f.toObject());
        console.log({ features: topFeatures });
        return resolve(
          path.onMessage({
            features: topFeatures
          })
        );
      },
      onEnd: (code, message, trailers) => {
        // console.log({ code, message, trailers });
        return resolve(path.onEnd({ code, message }));
      }
    });
  });
}

export default getInferenceResults;
