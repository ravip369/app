import React, { Component } from 'react';
import { Grid, Image, Label, Button, Container, Segment, Icon, Radio } from 'semantic-ui-react';
import ROSLIB from 'roslib';
import NAV2D from './vendor/nav2d.js'
import ROS2D from './vendor/ros2d.js'
import PropTypes from 'prop-types';
import { MapInteractionCSS } from 'react-map-interaction';
import { history } from '../_helpers/history';

import modeSelection from './Components/modeSelection.js';
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
					<Segment style={{background:'#252E35', marginLeft:'230px', width:'65%',height:'385px', color:'white'}}>
									<MapInteractionCSS
										scale={scale}
										translation={translation}
										onChange={({ scale, translation }) => this.setState({ scale, translation })}>
										<div id={this.props.id} 
										/>
									</MapInteractionCSS>
								</Segment>
					{/* issue: the black screen is not occupying full space and not right......... there is a thing named react map interaction which will help */}




					<Grid columns={3} divided stackable style={{transform:'translate(0,-0px)'}}>
						<Grid.Column width={6}>
							{/* <Grid.Row> */}


								<Segment style={{backgroundColor:'#1C2127',marginLeft:'80px', border:'#53BBD6 2px solid', width:'85%', textAlign:'center'}}>
									
											<h2 style={{color:'white', textAlign:'center', marginTop:'10px'}} >
												MODE
												SELECTION
									</h2>
											<br />
											
											<label style={{background:'noBackgound', color:'#53BBD6', fontSize:'25px',yAxis:'5px', transform:'translate(-20px,-8px', border:'#53BBD6 2px solid',paddingLeft:'10px',paddingRight:'10px'}}>
												Manual
									</label>
											<Radio style={{fontSize:"25px",border:'#53BBD6 2px solid',borderRadius:'30px',height:'25px',width:'55px' }}
												size="massive" basic
												toggle
												checked={this.state.installationMode}
												onChange={() => this.toggleInstallationMode()}
											></Radio>
											<label style={{background:'noBackgound', color:'#53BBD6', fontSize:'25px',yAxis:'5px', transform:'translate(15px,-10px', border:'#53BBD6 2px solid',paddingLeft:'10px',paddingRight:'10px'}} >
												Automatic
									</label>
										
											
										
								</Segment>
								
								{/* <Container textAlign="center">
									<Label color="blue" size="massive" pointing="below" basic >
										Battery Data
								</Label>
								</Container> */}
								<Container textAlign='center'>
									<Label size='big' basic style={{backgroundColor:'#252E35',marginLeft:'80px', border:'#53BBD6 2px solid',  textAlign:'center', color:'#53BBD6', fontSize:'1.7rem', width:'260px', height:'50px' }}>
										Battery Status: {this.state.SOC} %
								</Label>
								{/* <br/> */}
									{/* <br />
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
								</Label> */}
									<Button style={{backgroundColor:'#252E35',marginLeft:'235px', border:'#53BBD6 2px solid',  textAlign:'center', color:'#53BBD6', width:'20%',padding:'0', height:'30px', marginTop:'15px' }}
									
									onClick={() => {
										
										history.push('/battery'); console.log("Checking Battery");
									}}>
										More Info
								</Button>
								</Container>
							
								
								
							{/* </Grid.Row> */}
						</Grid.Column>
						
						
						<Grid.Column width={4}>
							
									<Button
										inverted color="red"
										toggle
										size="big"
										style={{marginLeft:'0%', marginTop:'15%'}}
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
									>Emergency Stop
								</Button>
								
							
								
								<Container textAlign='center'>
									<Label size='large' basic style={{backgroundColor:'#252E35',marginTop:'50px', border:'#53BBD6 2px solid',  textAlign:'center', color:'#53BBD6', fontSize:'1.7rem', width:'45%', height:'45px',padding:'10px' }}>
										Speed: {this.state.TDT}
								</Label>
									<br />
									<br />
									<Label size='big' basic style={{backgroundColor:'#252E35',marginTop:'5px', border:'#53BBD6 2px solid',  textAlign:'center', color:'#53BBD6', fontSize:'1.7rem', width:'85%', height:'45px',padding:'10px' }}>
										Distance Travelled: {this.state.SOC2}
								</Label>

								</Container>
						
							
							
						</Grid.Column>
						<Grid.Column width={6}>
						<Segment style={{backgroundColor:'#1C2127',marginRight:'80px', border:'#53BBD6 2px solid', width:'85%', textAlign:'center',floated:'right', height:'150px'}} >
								<Container>
												<h2 style={{color:'white', textAlign:'center'}}>
													MANUAL OPERATION
										</h2>
											</Container>
											<br />
											<Container>
												<text>
													
												</text>
												<Button
													color='green'
													// style={{width:'40px'}}
													size='small'
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
														size="large"
													></Icon>
												</Button>	<text>
													
												</text>
												
												<Button
													color='green'
													size='small'
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
														size="large"

													></Icon>
												</Button>
												<Button
													color='red'
													size='small'
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



														size='large'></Icon>
												</Button>

												<Button
													color='green'
													size='small'
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
														size="large"


													></Icon>
												</Button>
												
												<text>
													
												</text>
												<Button
													color='green'
													size='small'
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
														size="large"
													></Icon>
												</Button>
												<text>
													
												</text>
												<br />
											</Container>
							</Segment>
							
								{/* <Container textAlign="center"> */}
									<Label size='big' basic style={{backgroundColor:'#252E35',marginLeft:'10px', border:'#53BBD6 2px solid',  textAlign:'center', color:'#53BBD6', fontSize:'1.7rem', width:'250px', height:'50px' }} >
										Circuit Faults : Nill
									</Label>
									<br/>
								{/* </Container>
								<Container textAlign='center'>
									<Label size='big' basic>
										Overcurrent Fault(s): {this.state.overcurrentFault}
								</Label>
									<br />
									<br />
									<Label size='big' basic>
										Connection Status:
								</Label> */}
									<Button style={{backgroundColor:'#252E35',marginLeft:'150px', border:'#53BBD6 2px solid',  textAlign:'center', color:'#53BBD6', width:'20%',padding:'0', height:'30px', marginTop:'15px' }}
									onClick={() => {
										history.push('/circuit'); console.log("Checking Circuit");
									}}>
										More Info
								</Button>
								{/* </Container> */}
						

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
