import axios from 'axios'
import store from '../store/store'
import {toggle_message_panel} from "../store/actions/user_message_actions";

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if(error.response && error.response.status === 401){
        store.dispatch(toggle_message_panel(true))
    }
    return Promise.reject(error);
});

export const api = {
    SET_AUTH_TOKEN: (token) => {
        axios.defaults.headers['x-auth-token'] = token;
    },

    GET: (url) => {
        return axios({
            method: 'get',
            url: url
        });
    },

    PUT: (url, data) => {
        return axios({
            method: 'put',
            url: url,
            data: data
        });
    },

    POST: (url, data) => {
        return axios({
            method: 'post',
            url: url,
            data: data
        })
    },

    DELETE: (url, data) => {
        return axios({
            method: 'delete',
            url: url,
            data: data
        });
    },
};