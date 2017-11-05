import {combineReducers} from "redux";
import auth from './reducer/auth_reducer';
import upload from './reducer/import_reducer';
import user_message from './reducer/user_message_reducer'
import dir_tree from './reducer/dir_tree_reducer'

export default combineReducers({
    auth,
    upload,
    user_message,
    dir_tree
});