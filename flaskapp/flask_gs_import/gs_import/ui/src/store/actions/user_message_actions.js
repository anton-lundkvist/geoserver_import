import * as action_types from '../action_types/user_message_action_types'

export function toggle_message_panel(open) {
    return function (dispatch) {
        dispatch({type: action_types.TOGGLE_MESSAGE_PANEL, payload: open});
    }
}