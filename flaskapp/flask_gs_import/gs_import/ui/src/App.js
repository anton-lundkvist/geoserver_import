import React, {Component} from 'react';
import {Container, Segment, Header, Icon} from 'semantic-ui-react'
import UploadPage from './pages/upload_page'
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import LoginPage from "./pages/login_page";
import AuthHOC from './hoc/auth_hoc'
import LogoutHOC from './hoc/logout_hoc'


class App extends Component {


    render() {

        return (
            <Router>
                <Container>
                    <Segment clearing basic secondary textAlign='center'>
                        <Header as='h1' content='GeoServer upload'/>

                        <Link to='/login' style={{float: 'right'}}>
                            <Icon name='sign out'/>Sign out
                        </Link>
                    </Segment>
                    <Route exact path="/" component={AuthHOC(UploadPage)}/>
                    <Route exact path="/login" component={LogoutHOC(LoginPage)}/>
                </Container>
            </Router>
        );
    }
}

export default App;
