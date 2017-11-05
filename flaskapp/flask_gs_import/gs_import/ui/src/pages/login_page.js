import React from 'react'
import {connect} from 'react-redux'
import {Form, Grid, Message, Header} from 'semantic-ui-react'
import {authenticate_user} from "../store/actions/auth_actions";

class LoginPage extends React.Component {

    state = {
        username: '',
        password: '',
        err: null
    };

    handleChange = (e, {name, value}) => {
        this.setState({[name]: value})
    };

    handleSubmit = () => {
        const {username, password} = this.state;
        this.props.dispatch(authenticate_user(username, password))
            .then(success => {
                if (success) {
                    this.props.history.push('/')
                }else{
                    this.setState({username:'',password:''})
                }
            })
    };

    render() {
        let {username, password} = this.state;
        let err = this.props.auth.error_post;
        let showErr = err !== null;
        return (
            <Grid columns={3} stackable>
                <Grid.Row style={{height: 100}}></Grid.Row>
                <Grid.Row>
                    <Grid.Column></Grid.Column>
                    <Grid.Column>
                        <Header as='h3' content='Login'/>
                        <Form onSubmit={this.handleSubmit} error={showErr}>
                            <Form.Input type='text' placeholder='Username' name='username' value={username}
                                        onChange={this.handleChange}/>
                            <Form.Input type='password' placeholder='Password' name='password' value={password}
                                        onChange={this.handleChange}/>
                            <Form.Button content='Submit'/>
                            <Message size='tiny' error icon='exclamation circle' content={err}/>
                        </Form>

                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps)(LoginPage);