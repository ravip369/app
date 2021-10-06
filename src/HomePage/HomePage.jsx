import React from 'react';
import Main from "./main";
import { userService, authenticationService } from '../_services';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { currentUser } = this.state;
        return (
            <div>
                <h1 style={{backgroundColor:'#252E35', color: 'white', textAlign : 'center'}}>Hi {currentUser.firstName}!</h1>
                <Main />
            </div>
        );
    }
}

export { HomePage };