import * as action_types from '../action_types/import_action_types'
import {api} from '../../api/api'


export function post_file(formData) {

    /************ post file **************

     Description: Upload a file to GeoServer data dir
     return: string message
     entity: string message

     ********************************************/
    return function (dispatch) {
        dispatch({type: action_types.POST_FILE, meta: 'api_call'});
        return api.POST(`/import`, formData)
            .then((response) => {
                let payload = response.data.payload;
                dispatch({
                    type: action_types.POST_FILE_FULFILLED,
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
                dispatch({type: action_types.POST_FILE_REJECTED, payload: payload, meta: 'api_call'});
                return false
            })
    }
}


