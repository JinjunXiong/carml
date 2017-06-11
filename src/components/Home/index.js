import React from "react";
import { connect } from "cerebral/react";
import { state, signal } from "cerebral/tags";
import { Container, Grid, Divider, Label, Input } from "semantic-ui-react";

import UploadArea from "../UploadArea";
import ModelSelector from "../ModelSelector";
const fontFamily = '"Raleway", "Helvetica Neue", Helvetica, Arial, sans-serif';

export default connect(
  {
    inferenceUrl: state`app.inferenceUrl`,
    model: state`models.currentModel`,
    inferenceUrlChanged: signal`app.inferenceUrlChanged`,
    infrenceButtonClicked: signal`app.infrenceButtonClicked`
  },
  function Home({
    model,
    inferenceUrl,
    inferenceUrlChanged,
    infrenceButtonClicked
  }) {
    if (!inferenceUrl) {
      inferenceUrl =
        "https://www.timaru.govt.nz/__data/assets/image/0006/17889/dog.jpg";
    }
    return (
      <div>
        <Container
          text
          style={{
            fontFamily
          }}
        >
          <Grid.Row centered columns={1}>
            <UploadArea />
          </Grid.Row>
          <Divider horizontal />
          <Grid.Row centered columns={1}>
            <ModelSelector />
          </Grid.Row>
          <Divider horizontal />
          <Grid.Row centered columns={1}>
            <Input
              fluid
              placeholder="Image URL"
              value={inferenceUrl}
              onChange={e => inferenceUrlChanged({ url: e.target.value })}
            />
          </Grid.Row>
          <Grid.Row centered columns={1} style={{ paddingTop: "2em" }}>
            <Container textAlign="center">
              <Label
                as="a"
                size="massive"
                style={{
                  color: "white",
                  backgroundColor: "#0DB7C4",
                  borderColor: "#0DB7C4"
                }}
                onClick={e => {
                  infrenceButtonClicked({ model: model, url: inferenceUrl });
                }}
              >
                Infer
              </Label>
            </Container>
          </Grid.Row>

        </Container>
      </div>
    );
  }
);
