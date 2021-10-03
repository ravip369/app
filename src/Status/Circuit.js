import React, { Component } from "react";
import {
  Image,
  Label,
  Button,
  Container,
  Segment,
  Grid,
} from "semantic-ui-react";
import { history } from "../_helpers/history";

class Circuit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
      installationMode: false,
      scale: 100,
      translation: { x: -500, y: -500 },
      homepage: true,
    };
  }
  componentDidMount() {}
  checkOverrideColor(x) {
    if (x === true) return "green";
    else return "green";
  }
  toggleInstallationMode() {
    this.setState((prevState) => ({
      installationMode: !prevState.installationMode,
    }));
  }

  render() {
    return (
      <div>
        <div>
          <Segment raised>
            <Grid columns={2} divided stackable>
              <Grid.Column>
                <Container>
                  <Label color="blue" size="massive" pointing="below" basic>
                    Battery Data
                  </Label>
                </Container>
                <Container>
                  <Label size="big" basic>
                    State Of Charge:
                  </Label>
                  <br />
                  <br />
                  <Label size="big" basic>
                    OverVoltage Fault:
                  </Label>
                  <Label size="big" basic>
                    UnderVoltage Fault:
                  </Label>
                  <br />
                  <br />
                  <Label size="big" basic>
                    Battery Balancing:
                  </Label>
                  <Button
                    onClick={() => {
                      history.push("/battery");
                      console.log("Checking Battery");
                    }}
                  >
                    More Info
                  </Button>
                </Container>
              </Grid.Column>
              <Grid.Column>
                <Container>
                  <Label color="blue" size="massive" pointing="below" basic>
                    Circuit Faults
                  </Label>
                </Container>
                <Container>
                  <Label size="big" basic>
                    Overcurrent Fault(s):
                  </Label>
                  <br />
                  <br />
                  <Label size="big" basic>
                    Connection Status:
                  </Label>
                  <Button
                    onClick={() => {
                      history.push("/circuit");
                      console.log("Checking Circuit");
                    }}
                  >
                    More Info
                  </Button>
                </Container>
              </Grid.Column>
            </Grid>
          </Segment>
          <Container textAlign="center">
            <Image
              size="massive"
              src={process.env.PUBLIC_URL + "circuit.jpeg"}
            />
            <Label color="blue" size="massive" pointing="above" basic>
              Circuit
            </Label>
            <Label color="blue" size="massive" pointing="below" basic>
              Elements
            </Label>
          </Container>
          <Image.Group size="medium">
            <Container textAlign="center">
              <Image src={process.env.PUBLIC_URL + "Low microcontroller.jpg"} />
              <Label color="blue" size="mini">
                Low microcontroller
              </Label>
              <Label>Status</Label>
              <Image
                src={
                  process.env.PUBLIC_URL +
                  "Camera relay and processor relay.jpg"
                }
              />
              <Label color="blue" size="mini">
                Camera relay and processor relay
              </Label>
              <Label>Status</Label>
              <Image src={process.env.PUBLIC_URL + "Camera.jpg"} />
              <Label color="blue" size="mini">
                Camera
              </Label>
              <Label>Status</Label>
              <Image src={process.env.PUBLIC_URL + "Current sensor.jpg"} />
              <Label color="blue" size="mini">
                Current Sensor
              </Label>
              <Label>Status</Label>
              <Image src={process.env.PUBLIC_URL + "Encoder.jpg"} />
              <Label color="blue" size="mini">
                Encoder
              </Label>
              <Label>Status</Label>
              <Image src={process.env.PUBLIC_URL + "Intel NUC processor.jpg"} />
              <Label color="blue" size="mini">
                Intel NUC processor
              </Label>
              <Label>Status</Label>
              <Image src={process.env.PUBLIC_URL + "Motor controller.jpg"} />
              <Label color="blue" size="mini">
                Motor controller
              </Label>
              <Label>Status</Label>
              <Image src={process.env.PUBLIC_URL + "Motor relay.jpg"} />
              <Label color="blue" size="mini">
                Motor relay
              </Label>
              <Label>Status</Label>
              <Image src={process.env.PUBLIC_URL + "Motor.jpg"} />
              <Label color="blue" size="mini">
                Motor
              </Label>
              <Label>Status</Label>
            </Container>
          </Image.Group>
        </div>
      </div>
    );
  }
}

export default Circuit;
