import * as action_types from '../action_types/dir_tree_action_types'
import {api} from '../../api/api'

export function set_filter_text(filterText) {
    return function (dispatch) {
        dispatch({type: action_types.SET_FILTER_TEXT, payload: filterText});
    }
}

export function get_dir_tree() {

    /************ get dir tree **************

     Description: Get the directory tree from GeoServer data dir
     return: string message
     entity: string message

     ********************************************/
    return function (dispatch) {
        dispatch({type: action_types.GET_DIR_TREE, meta: 'api_call'});
        return api.GET(`/import`)
            .then((response) => {
                let payload = response.data.payload;
                dispatch({
                    type: action_types.GET_DIR_TREE_FULFILLED,
                    payload: payload,
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
                dispatch({type: action_types.GET_DIR_TREE_REJECTED, payload: payload, meta: 'api_call'});
                return false
            })
    }
}