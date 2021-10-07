/* eslint-disable */
import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { history } from '../_helpers/history';
import { authenticationService } from '../_services/authentication.service';
import { PrivateRoute } from '../_components/PrivateRoute';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage/LoginPage';
import Battery from '../Status/Battery';
import Circuit from '../Status/Circuit';



class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login');
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark" style={{height:'30px'}}>
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/battery" component={Battery} />
                    <Route path="/circuit" component={Circuit} />
                </div>
            </Router>
        );
    }
}

export { App }; 