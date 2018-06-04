import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import {changeUserName} from '../store/action/action';
// SWIPABLE
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
// import SwipeableViews from 'react-swipeable-views';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import {fetchAllStudentsAction, signoutAction } from '../store/action/action';
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
// import { Link } from 'react-router-dom';




const styles = {
    paper: {
        height: 120,
        width: 120,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',

    },
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
    addBtn: {
        float: "right",
        marginTop: -20
    },


};

class AllStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            openForm: false,
            open: false,
            companyName: '',

        };      
       
        this._signout = this._signout.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
   
    handleToggle = () => { console.log('doneee'); this.setState({ open: !this.state.open }) };
    handleCloseForm = () => {
        this.setState({ openForm: false });
    };
    // handleToggle = () => this.setState({ open: true});
    handleOpen = () => {
        console.log('open')
        this.setState({ openForm: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    _signout(){
        this.props.signout()
    }

    componentWillMount() {
        this.props.fetchAllStudents()
    }

    render() {

        if (this.props.allStudents.length === 0) {
            return <div>
                <AppBar
                    title="Campus Recruitment System"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <MenuItem>   <Paper style={styles.paper} zDepth={2} circle={true} /> </MenuItem>
                    <MenuItem onClick={this._signout}>SignOut</MenuItem>
                    {/* <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem> */}
                </Drawer>

                <div className="container">

                    <Tabs
                        onChange={this.handleChange}
                        value={this.state.slideIndex}
                    >
                        <Tab style={{ backgroundColor: "white", color: 'black' }} label="All Job Posts" value={0} />
                    </Tabs>
                    <br />
                    <br />
                    <div className='row container'>
                        <div className='col-sm'></div>
                        <div className='col-sm-1'>
                            <CircularProgress size={100} thickness={5} />
                        </div>
                        <div className='col-sm'></div>
                    </div>
                </div>
            </div>

        }
        else return (
            <div className=''>
            
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open })}
                >
                    <MenuItem>   <Paper style={styles.paper} zDepth={3} circle={true} /> </MenuItem>
                    <MenuItem onClick={this.handleClose}>Our Profile</MenuItem>
                    <MenuItem onClick={this.handleClose}>Goto Main</MenuItem>
                    <MenuItem onClick={this._signout}>SignOut</MenuItem>
                </Drawer>
                <AppBar
                    title="Campus Recruitment System"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={() => this.handleToggle()}

                />
                <div className='container'>
                    <Tabs
                        onChange={this.handleChange}
                        value={this.state.slideIndex}
                    >
                        <Tab style={{ backgroundColor: "white", color: 'black' }} label="All Job Posts" value={0} />
                    </Tabs>

                    <br />
                    <br />

                    {
                        this.props.allStudents .map((value, ind) => {
                            // console.log('map', value)
                            return <Card key={ind}>
                                <CardHeader
                                    title={'Company Name: '  + value.companyName}
                                    subtitle={'Designation: '  + value.jobDesig}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                />
                                <CardActions>
                                    <FlatButton label="Delete Job" secondary={true} onClick={this._deleteJob.bind(this, value.key)} />
                                    <FlatButton label="Show Applied" />
                                </CardActions>
                                <CardText expandable={true}>{'Job Desctiption: ' + value.jobDesc}</CardText>
                            </Card>

                        })
                    }

                </div>
            </div>
        )


    }
}

function mapStateToProp(state) {
    return ({
        allStudents: state.root.allStudents
    })
}
function mapDispatchToProp(dispatch) {
    return ({

        fetchAllStudents: () => { dispatch(fetchAllStudentsAction()) },

        signout: (key) => { dispatch(signoutAction(key)) }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(AllStudents);
