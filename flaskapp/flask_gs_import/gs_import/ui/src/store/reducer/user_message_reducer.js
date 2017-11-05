import * as action_types from '../action_types/user_message_action_types'

export default (state = {
    open: false

}, action) => {

    switch (action.type) {

        case action_types.TOGGLE_MESSAGE_PANEL:
            return Object.assign({}, state, {open: action.payload});

        default:
            return state
    }

}