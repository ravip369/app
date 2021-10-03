import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Grid, Segment, Image } from 'semantic-ui-react';
import { authenticationService } from '../_services';
import img1 from './Capture.PNG';
// import './loginPage.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

// const element = <FontAwesomeIcon icon={faUserCircle} />
class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div style={{backgroundColor:'#252E35',}}>
                <div style={{backgroundColor: '#1C2127',borderRadius:'0px', height:'60px'}}> 
                  <h1 style={{color:'white',textAlign:'center', margin:'auto'}}>Login</h1>
                  
                </div>
                
                    <div style={{backgroundColor:'#252E35',height:'100%'}} >
                        <Formik className="password"
                            initialValues={{
                                username: '',
                                password: ''
                            }}
                            validationSchema={Yup.object().shape({
                                username: Yup.string().required('Username is required'),
                                password: Yup.string().required('Password is required')
                            })}
                            onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                                setStatus();
                                authenticationService.login(username, password)
                                    .then(
                                        user => {
                                            const { from } = this.props.location.state || { from: { pathname: "/" } };
                                            this.props.history.push(from);
                                        },
                                        error => {
                                            setSubmitting(false);
                                            setStatus(error);
                                        }
                                    );
                            }}
                            render={({ errors, status, touched, isSubmitting }) => (
                                <Form style={{margin: '180px auto',backgroundColor:'#1C2127',borderRadius:'10px',height:'350px',width:'600px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',}}>
                                    <div className="form-group">
                                        <img  src={img1}  style={{height:'90px', width:'90px', marginLeft:'145px'}}/><br></br>
                                        <label htmlFor="username" style={{color:'white'}}>Username</label>
                                        <Field style={{Color:'white',width: "400px",border:'2px solid #53BBD6',backgroundColor:'#252E35',borderRadius:'4px',backgroundColor:'transparent'}} name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password"style={{color:'white'}}>Password</label>
                                        <Field style={{ width: "400px",backgroundColor:'#252E35',border:'2px solid #53BBD6',borderRadius:'4px', backgroundColor:'transparent' }} name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                    <div className="form-group">
                                        <button style={{color:'#53BBD6',border:'2px solid #53BBD6',backgroundColor:'#252E35',borderRadius:'6px',padding:'4px 20px',marginTop:'25px',}} type="submit" className=" " disabled={isSubmitting}>Login</button>
                                        {isSubmitting &&// eslint-disable-next-line
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                    </div>
                                    {status &&
                                        <div className={'alert alert-primary'}>{status}</div>
                                    }
                                </Form>
                            )}
                        />
                    </div>
                    <div style={{height:'55px'}}></div>
                   
                
            </div>
        
        )
    }
}

export { LoginPage }; 