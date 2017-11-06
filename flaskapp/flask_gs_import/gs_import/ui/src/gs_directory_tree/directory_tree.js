import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Icon, Form, Segment, Button} from 'semantic-ui-react'
import {Treebeard, decorators} from 'react-treebeard';
import {get_dir_tree, set_filter_text} from "../store/actions/dir_tree_actions";
import * as filters from './tree_filters';

const treeStyle = {
    tree: {
        base: {
            listStyle: 'none',
            backgroundColor: 'inherit',
            margin: 0,
            padding: 0,
            color: '#4b4b4b',
            fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
            fontSize: '14px'
        },
        node: {
            base: {
                position: 'relative'
            },
            link: {
                cursor: 'pointer',
                position: 'relative',
                padding: '0px 5px',
                display: 'block'
            },
            activeLink: {
                color: '#000'
            },
            toggle: {
                base: {
                    position: 'relative',
                    display: 'inline-block',
                    verticalAlign: 'top',
                    marginLeft: '-5px',
                    height: '24px',
                    width: '24px'
                },
                wrapper: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    margin: '-7px 0 0 -7px',
                    height: '14px'
                },
                height: 14,
                width: 14,
                arrow: {
                    fill: '#9DA5AB',
                    strokeWidth: 0
                }
            },
            header: {
                base: {
                    display: 'inline-block',
                    verticalAlign: 'top',
                    color: '#9DA5AB'
                },
                connector: {
                    width: '2px',
                    height: '12px',
                    borderLeft: 'solid 2px black',
                    borderBottom: 'solid 2px black',
                    position: 'absolute',
                    top: '0px',
                    left: '-21px'
                },
                title: {
                    lineHeight: '24px',
                    verticalAlign: 'middle'
                }
            },
            subtree: {
                listStyle: 'none',
                paddingLeft: '19px'
            },
            loading: {
                color: '#E2C089'
            }
        }
    }
};

decorators.Header = ({style, node}) => {
    const iconType = node.children ? 'folder' : 'file image outline';
    const iconStyle = {marginRight: '5px'};

    return (
        <div style={style.base}>
            <div style={style.title}>
                <Icon name={iconType} style={iconStyle}/>

                {node.name}
            </div>
        </div>
    );
};

class DirectoryTree extends React.Component {

    state = {
        data: {}
    };

    componentDidMount = () => {
        this.props.dispatch(get_dir_tree())
            .then(success => {
                this.initData(this.props.dir_tree.dir_tree)
            })
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.dir_tree.dir_tree) {
            this.initData(nextProps.dir_tree.dir_tree);
        }
            this.handleFilter(nextProps.dir_tree.filterText, nextProps.dir_tree.dir_tree)

    };

    onToggle = (node, toggled) => {
        if (this.state.cursor) {
            this.state.cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        this.setState({cursor: node});
    };

    initData = (data) => {
        this.setState({data: data})
    };

    handleChange = (e, {name, value}) => {
        this.props.dispatch(set_filter_text(value));
    };

    handleFilter = (value, data) => {
        if (value === '' && data) {
            return this.setState({data: data});
        }else if(value === '' && data === undefined){
            return this.setState({data:this.props.dir_tree.dir_tree})
        }
        let filtered = filters.filterTree(this.props.dir_tree.dir_tree, value);
        filtered = filters.expandFilteredNodes(filtered, value);
        this.setState({data: filtered});

    };

    render() {
        return (
            <div>
                <Form>
                    <Form.Group inline>
                    <Form.Input
                        name='searchField'
                        value={this.props.dir_tree.filterText}
                        onChange={this.handleChange}
                        fluid
                        icon='search'
                        placeholder='Search file...'
                        width={13}
                    />
                        <Form.Button
                            loading={this.props.dir_tree.processing_get}
                            icon='refresh'
                            onClick={()=>{this.props.dispatch(get_dir_tree())}}
                            width={3}
                        />
                    </Form.Group>
                </Form>
                <Segment basic>
                <Treebeard
                    data={this.state.data}
                    onToggle={this.onToggle}
                    style={treeStyle}
                />
                </Segment>
            </div>
        )
    }
}

DirectoryTree.propTypes = {
    dir_tree: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        dir_tree: state.dir_tree
    }
};

export default connect(mapStateToProps)(DirectoryTree);