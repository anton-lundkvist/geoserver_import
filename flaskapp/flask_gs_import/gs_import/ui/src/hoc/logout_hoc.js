import React from 'react'
import store from '../store/store'
import {logout} from "../store/actions/auth_actions";


export default function LogoutHOC(WrappedComponent) {

    return class extends React.Component {

        state = {};

        componentWillMount() {
            store.dispatch(logout())
        }

        render() {
            return (<WrappedComponent {...this.props} />)
        }
    }
}