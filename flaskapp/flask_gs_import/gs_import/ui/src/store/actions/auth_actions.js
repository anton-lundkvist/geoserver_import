import {api} from '../../api/api'
import * as action_types from '../action_types/auth_action_types'

export function authenticate_user(username, password) {

    /************ auth **************

     Description: Authenticate a user
     return: string message
     entity: string message

     ********************************************/
    return function (dispatch) {
        dispatch({type: action_types.AUTH, meta: 'api_call'});
        return api.POST(`/auth`, {username, password})
            .then((response) => {
                let token = response.data.payload;
                api.SET_AUTH_TOKEN(token);
                localStorage.setItem('auth_token', token);
                dispatch({
                    type: action_types.AUTH_FULFILLED,
                    payload: token,
                    meta: 'api_call'
                });
                return true
            })
            .catch((error) => {
                let payload = '';
                if (error.response) {
                    payload = error.response.data.payload;
                } else if (error.request) {
                    payload = 'Something went wrong, please contact the administrator'
                } else {
                    // Something happened in setting up the request that triggered an Error
                    payload = 'Something went wrong, please contact the administrator'
                }
                dispatch({type: action_types.AUTH_REJECTED, payload: payload, meta: 'api_call'});
                return false
            })
    }
}

export function validate_token(token) {
    return function (dispatch) {
        dispatch({type: action_types.AUTH});
        return api.POST('/auth/validate', {token})
            .then((response) => {
                let token = response.data.payload;
                api.SET_AUTH_TOKEN(token);
                localStorage.setItem('auth_token', token);
                dispatch({type: action_types.AUTH_FULFILLED, payload: token});
                return true
            })
            .catch((error) => {
                localStorage.removeItem('auth_token');
                if (error.response) {
                    dispatch({type: action_types.AUTH_REJECTED, payload: error.response.data.payload});
                } else if (error.request) {
                    dispatch({
                        type: action_types.AUTH_REJECTED,
                        payload: 'No response from server, please contact the administrator'
                    });
                } else {
                    // Something happened in setting up the request that triggered an Error
                    dispatch({
                        type: action_types.AUTH_REJECTED,
                        payload: 'Internal error, please contact the administrator'
                    });
                }

                return false
            })
    }
}

export function logout() {
    return function (dispatch) {
        localStorage.removeItem('auth_token');
        dispatch({
            type:action_types.LOG_OUT
        })
    }
}