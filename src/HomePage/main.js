import React, { Component } from 'react';
import { Grid, Image, Label, Button, Container, Segment, Icon, Radio } from 'semantic-ui-react';
import ROSLIB from 'roslib';
import NAV2D from './vendor/nav2d.js'
import ROS2D from './vendor/ros2d.js'
import PropTypes from 'prop-types';
import { MapInteractionCSS } from 'react-map-interaction';
import { history } from '../_helpers/history';
const fetch = require('node-fetch');

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			active: true,
			installationMode: false,
			scale: 100,
			translation: { x: -500, y: -500 },
			homepage: true,
			SOC: '0',
			SOC2: '1',
			TDT: '0',
			undervoltageFault : '0',
			overvoltageFault : '0',
			overcurrentFault : '0',
			batteryBalancing : '0'
		};
	}
	componentDidMount() {
		const ros = this.props.ros;
		const viewer = new ROS2D.Viewer({
			divID: this.props.id,
			width: this.props.width,
			height: this.props.height
		});
		NAV2D.OccupancyGridClientNav({
			ros: ros,
			rootObject: viewer.scene,
			viewer: viewer,
			serverName: this.props.serverName,
			continuous : true
		});
		this.loadData();
		this.interval = setInterval(() => {
			this.loadData();
		}, 1000);
	}

 async loadData() { console.log("Trying")
	
			try {
			const res = await fetch('http://localhost:8081');
			const blocks = await res.json();
			const SOC = blocks.SOC;
			const SOC2 = blocks.currentDistance;
			const TDT = blocks.speed;
			const overvoltageFault = blocks.overvoltageFault;
			const undervoltageFault = blocks.undervoltageFault;
			const overcurrentFault= blocks.overcurrentFault;
			console.log("BLOCKS:",blocks);

			this.setState({
				SOC: SOC,
				SOC2: SOC2,
				TDT: TDT,
				overvoltageFault : overvoltageFault,
				undervoltageFault : undervoltageFault,
				overcurrentFault: overcurrentFault
			});
		} catch (e) {
			console.log(e);
		}
		
	}

	checkOverrideColor(x) {
		if (x === true) return 'green';
		else return 'green';
	};
	toggleInstallationMode() { this.setState(prevState => ({ installationMode: !prevState.installationMode })); }

	render() {
		var ros = new ROSLIB.Ros({
			url: 'ws://localhost:9090'
		});
		const { scale, translation } = this.state;
		if (this.state.homepage)
			return (
				<div style={{backgroundColor:'#252E35',}}>
					{/* segment is to define map and its style outside the grid */}
					<Segment style={{background:'#252E35', marginLeft:'50px', width:'95%', color:'white'}}>
									<MapInteractionCSS
										scale={scale}
										translation={translation}
										onChange={({ scale, translation }) => this.setState({ scale, translation })}>
										<div id={this.props.id} 
										/>
									</MapInteractionCSS>
								</Segment>
					{/* issue: the black screen is not occupying full space and not right......... there is a thing named react map interaction which will help */}




					<Grid columns={2} divided stackable>
						<Grid.Column>
							<Grid.Row>

								
								<Segment >
									<Grid columns={1} divided>
										<Grid.Column>
											<Label size="massive" basic>
												MODE
												SELECTION
									</Label>
											<br />
											<br />
											<br />
											<br />
											<Label size="massive" basic>
												Manual
									</Label>
											<Radio
												size="massive" basic
												toggle
												checked={this.state.installationMode}
												onChange={() => this.toggleInstallationMode()}
											></Radio>
											<Label size="massive" basic>
												Automatic
									</Label>
										</Grid.Column>
										<Grid.Column>
											<Container>
												<Label size="medium" basic>
													MANUAL OPERATION
										</Label>
											</Container>
											<br />
											<Container>
												<text>
													
												</text>
												<Button
													color='green'
													disabled={!this.state.active || this.state.installationMode}
													onClick={function () {
														// Publishing a Topic
														// ------------------
														console.log("Forward");
														var cmdVel = new ROSLIB.Topic({
															ros: ros,
															name: 'cmd_vel_mux/input/teleop',
															messageType: 'geometry_msgs/Twist'
														});

														var twist = new ROSLIB.Message({
															linear: {
																x: 0.3,
																y: 0,
																z: 0
															},
															angular: {
																x: 0,
																y: 0,
																z: 0
															}
														});
														cmdVel.publish(twist);



													}}

												>
													<Icon
														name="arrow up"
														size="big"
													></Icon>
												</Button>	<text>
													
												</text>
												
												<Button
													color='green'
													disabled={!this.state.active || this.state.installationMode}
													onClick={function () {
														// Publishing a Topic
														// ------------------

														var cmdVel = new ROSLIB.Topic({
															ros: ros,
															name: 'cmd_vel_mux/input/teleop',
															messageType: 'geometry_msgs/Twist'
														});

														var twist = new ROSLIB.Message({
															linear: {
																x: 0,
																y: 0,
																z: 0
															},
															angular: {
																x: 0,
																y: 0,
																z: 0.2
															}
														});
														cmdVel.publish(twist);
													}}
												>
													<Icon
														name="undo"
														size="big"

													></Icon>
												</Button>
												<Button
													color='red'
													disabled={!this.state.active || this.state.installationMode}
													onClick={function () {
														// Publishing a Topic
														// ------------------

														var cmdVel = new ROSLIB.Topic({
															ros: ros,
															name: 'cmd_vel_mux/input/teleop',
															messageType: 'geometry_msgs/Twist'
														});

														var twist = new ROSLIB.Message({
															linear: {
																x: 0,
																y: 0,
																z: 0
															},
															angular: {
																x: 0,
																y: 0,
																z: 0
															}
														});
														cmdVel.publish(twist);


													}}
												>
													<Icon name="stop"



														size='big'></Icon>
												</Button>

												<Button
													color='green'
													disabled={!this.state.active || this.state.installationMode}
													onClick={function () {
														// Publishing a Topic
														// ------------------

														var cmdVel = new ROSLIB.Topic({
															ros: ros,
															name: '/cmd_vel_mux/input/teleop',
															messageType: 'geometry_msgs/Twist'
														});

														var twist = new ROSLIB.Message({
															linear: {
																x: 0,
																y: 0,
																z: 0
															},
															angular: {
																x: 0,
																y: 0,
																z: -0.2
															}
														});
														cmdVel.publish(twist);



													}}

												>
													<Icon
														name="redo"
														size="big"


													></Icon>
												</Button>
												
												<text>
													
												</text>
												<Button
													color='green'
													disabled={!this.state.active || this.state.installationMode}
													onClick={function () {
														// Publishing a Topic
														// ------------------

														var cmdVel = new ROSLIB.Topic({
															ros: ros,
															name: 'cmd_vel_mux/input/teleop',
															messageType: 'geometry_msgs/Twist'
														});

														var twist = new ROSLIB.Message({
															linear: {
																x: -0.3,
																y: 0,
																z: 0
															},
															angular: {
																x: 0,
																y: 0,
																z: 0
															}
														});
														cmdVel.publish(twist);



													}}
												>
													<Icon
														name="arrow down"
														size="big"
													></Icon>
												</Button>
												<text>
													
												</text>
												<br />
											</Container>
										</Grid.Column>
									</Grid>
								</Segment>
							</Grid.Row>
						</Grid.Column>
						<Grid.Column>
							<Segment raised>
								<Container textAlign="center">
									<Label color="red" size='massive' pointing="below" basic>
										EMERGENCY BUTTON
								</Label>
									<br />
									<Button
										color="red"
										toggle
										size="big"
										onClick={function () {
											// Publishing a Topic
											// ------------------

											var cmdVel = new ROSLIB.Topic({
												ros: ros,
												name: 'cmd_vel_mux',
												messageType: 'geometry_msgs/Twist'
											});

											var cmdVel1 = new ROSLIB.Topic({
												ros: ros,
												name: 'cmd_vel_mux/input/teleop',
												messageType: 'geometry_msgs/Twist'
											});

											var twist = new ROSLIB.Message({
												linear: {
													x: 0,
													y: 0,
													z: 0
												},
												angular: {
													x: 0,
													y: 0,
													z: 0
												}
											});
											cmdVel.publish(twist);
											cmdVel1.publish(twist);

										}}
									>STOP
								</Button>
								</Container>
							</Segment>
							<Segment raised>
								<Container textAlign="center">
									<Label color="blue" size="massive" pointing="below" basic>
										AGV DATA
								</Label>
								</Container>
								<Container textAlign='center'>
									<Label size='big' basic>
										Speed: {this.state.TDT}
								</Label>
									<br />
									<br />
									<Label size='big' basic>
										Distance Travelled: {this.state.SOC2}
								</Label>

								</Container>
							</Segment>
							<Segment raised>
								<Container textAlign="center">
									<Label color="blue" size="massive" pointing="below" basic >
										Battery Data
								</Label>
								</Container>
								<Container textAlign='center'>
									<Label size='big' basic>
										State Of Charge: {this.state.SOC}
								</Label>
									<br />
									<br />
									<Label size='big' basic>
										OverVoltage Fault: {this.state.overvoltageFault}
								</Label>
									<Label size='big' basic>
										UnderVoltage Fault: {this.state.undervoltageFault}
								</Label>
									<br />
									<br />
									<Label size='big' basic>
										Battery Balancing: {this.state.batteryBalancing}
								</Label>
									<Button onClick={() => {
										history.push('/battery'); console.log("Checking Battery");
									}}>
										More Info
								</Button>
								</Container>
							</Segment>
							<Segment raised>
								<Container textAlign="center">
									<Label color="blue" size="massive" pointing="below" basic>
										Circuit Faults
								</Label>
								</Container>
								<Container textAlign='center'>
									<Label size='big' basic>
										Overcurrent Fault(s): {this.state.overcurrentFault}
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
							</Segment>
						</Grid.Column>
					</Grid>
				</div>
			);
	}
}
Main.defaultProps = {
	ros: new ROSLIB.Ros({
		url: 'ws://localhost:9090'
	}),
	id: 'nav2d',
	width: 500,
	height: 500,
	serverName: '/move_base'
};

Main.propTypes = {
	ros: PropTypes.object,
	id: PropTypes.string,
	width: PropTypes.number,
	height: PropTypes.number,
	serverName: PropTypes.string
}
export default Main;
