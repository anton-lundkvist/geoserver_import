import React from 'react'
import store from '../store/store'
import {validate_token} from "../store/actions/auth_actions";
import {Segment, Dimmer, Loader} from 'semantic-ui-react'
import {toggle_message_panel} from "../store/actions/user_message_actions";

export default function AuthHOC(WrappedComponent) {

    return class extends React.Component {

        state = {
            showLoader: true
        };

        componentWillMount() {

            const token = localStorage.getItem('auth_token');
            this.setState({showLoader: true});
            if (token) {
                store.dispatch(validate_token(token))
                    .then(success => {
                        setTimeout(() => {
                            this.setState({showLoader: false});
                            if (!success) {
                                this.props.history.push('/login')
                            }else{
                                store.dispatch(toggle_message_panel(false))
                            }
                        }, 1000);
                    })

            } else {
                this.setState({showLoader: false});
                this.props.history.push('/login')
            }


        }

        render() {
            return <Segment basic>
                <Dimmer active={this.state.showLoader} inverted>
                    <Loader inverted size='big'>Checking credentials...</Loader>
                </Dimmer>

                <WrappedComponent {...this.props} />
            </Segment>

        }

    }
}