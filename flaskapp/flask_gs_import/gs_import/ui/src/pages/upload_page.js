import React from 'react'
import {connect} from 'react-redux'
import {Message, Form, Input, Header, Grid, Segment, Button, Icon} from 'semantic-ui-react'
import {post_file} from "../store/actions/import_actions";
import {get_dir_tree} from "../store/actions/dir_tree_actions";
import DirectoryTree from '../gs_directory_tree/directory_tree'
import {Link} from 'react-router-dom'
import {set_filter_text} from "../store/actions/dir_tree_actions";

class UploadPage extends React.Component {


    state = {
        loading: false,
        err: null,
        success: null
    };

    handleSubmit = () => {
        const allowedExtensions = ['zip', 'tif'];
        this.setState({err: null, success: null});
        let file = this.fileInput.inputRef.files[0];
        if (file) {
            let fileExtension = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
            if (allowedExtensions.indexOf(fileExtension) === -1) {
                this.setState({err: "Only 'zip' and 'tif' file extensions are allowed"})
            } else {
                this.setState({loading: true});
                let data = new FormData();
                data.append('file', file);
                this.props.dispatch(post_file(data))
                    .then(success => {
                        if (success) {
                            this.props.dispatch(get_dir_tree());
                            this.setState({success: this.props.upload.last_posted, loading: false})
                        } else {
                            this.setState({err: this.props.upload.error_post, loading: false})
                        }
                    });
            }
        }

    };

    getMessage = () => {
        let {err, success} = this.state;
        if (err) {
            return (
                <Message size='small' negative>
                    <Icon size='large' name='exclamation circle'/>
                    {err}
                </Message>
            )
        } else if (success) {
            let link = <a href='#' onClick={()=>{this.props.dispatch(set_filter_text(success))}}>{success}</a>;
            return (
                <Message size='small' positive>
                    <Icon size='large' name='check'/>
                    {<p>Your data was uploaded to folder {link}</p>}
                </Message>
            )
        }
    };


    render() {

        return (
            <div>
                <Message
                    negative
                    hidden={!this.props.user_message.open}
                    icon='exclamation'
                    header='Logged out'
                    content={<p>You were logged out, please <Link to='/login'>log in</Link> again to upload</p>}
                />
                <Grid stackable columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment color='teal' style={{minHeight: 450}}>
                                <Header as='h3'>
                                    Upload form
                                    <Header.Subheader>
                                        Supported formats are '.zip' for shapefiles and '.tif' for GeoTIFF files
                                    </Header.Subheader>
                                </Header>

                                <Form>
                                    <Form.Field>
                                        <label>Choose file</label>
                                        <Input type='file'
                                               ref={(input) => {
                                                   this.fileInput = input;
                                               }}/>
                                    </Form.Field>
                                    <Button content='Submit' loading={this.state.loading} onClick={this.handleSubmit}/>
                                    {this.getMessage()}
                                </Form>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment color='teal' style={{minHeight: 450}}>
                                <Header as='h3'>
                                    Uploaded files
                                    <Header.Subheader>
                                        Browse the GeoServer data directory
                                    </Header.Subheader>
                                </Header>
                                    <DirectoryTree/>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        upload: state.upload,
        user_message: state.user_message
    }
};

export default connect(mapStateToProps)(UploadPage);