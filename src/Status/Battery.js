import React, { Component } from 'react';
import { Image, Label, Button, Container, Segment, Grid } from 'semantic-ui-react';
import { history } from '../_helpers/history';

class Battery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
            installationMode: false,
            scale: 100,
            translation: { x: -500, y: -500 },
            homepage: true
        };
    }
    componentDidMount() {

    }
    checkOverrideColor(x) {
        if (x === true) return 'green';
        else return 'green';
    };
    toggleInstallationMode() { this.setState(prevState => ({ installationMode: !prevState.installationMode })); }

    render() {
        return (
            <div>
                <div>
                    <Segment raised>
                        <Grid columns={2} divided stackable>
                            <Grid.Column>
                                <Container>
                                    <Label color="blue" size="massive" pointing="below" basic >
                                        Battery Data
								</Label>
                                </Container>
                                <Container>
                                    <Label size='big' basic>
                                        State Of Charge:
								</Label>
                                    <br />
                                    <br />
                                    <Label size='big' basic>
                                        OverVoltage Fault:
								</Label>
                                    <Label size='big' basic>
                                        UnderVoltage Fault:
								</Label>
                                    <br />
                                    <br />
                                    <Label size='big' basic>
                                        Battery Balancing:
								</Label>
                                    <Button onClick={() => {
                                        history.push('/battery'); console.log("Checking Battery");
                                    }}>
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
                                    <Label size='big' basic>
                                        Overcurrent Fault(s):
								</Label>
                                    <br />
                                    <br />
                                    <Label size='big' basic>
                                        Connection Status:
								</Label>
                                    <Button onClick={() => {
                                        history.push('/circuit'); console.log("Checking Circuit");
                                    }}>
                                        More Info
								</Button>
                                </Container>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                    <div>
                        <Segment raised>
                            <Image.Group size='small'>
                                <Grid columns={2} divided stackable>
                                    <Grid.Column>
                                        <Container textAlign='center'>
                                            <Image src={process.env.PUBLIC_URL + 'index.png'} />;
                                        <Label>
                                                Voltage
						                </Label>

                                        </Container>
                                        <Container textAlign='center'>
                                            <Image src={process.env.PUBLIC_URL + 'index.png'} />;
                                       <Label>
                                                Voltage
					                   </Label>

                                        </Container>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Container textAlign='center'>
                                            <Image src={process.env.PUBLIC_URL + 'index.png'} />;
                                        <Label>
                                                Voltage
					                	</Label>

                                        </Container>

                                        <Container textAlign='center'>
                                            <Image src={process.env.PUBLIC_URL + 'index.png'} />;
                                        <Label>
                                                Voltage
					            	    </Label>

                                        </Container>
\                                </Grid.Column>
                                </Grid>
                            </Image.Group>
                        </Segment>
                    </div>
                </div>
            </div>
        );
    }
}

export default Battery;
