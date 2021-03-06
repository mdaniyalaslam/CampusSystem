import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import {changeUserName} from '../store/action/action';
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
import { allJobsFetchFirebaseAction, 
    signoutAction, 
    // submitStudentDetailsAction, 
    // fetchStudentDetailsAction, 
    deleteJobFromAdminAction,
    fetchAppliedJobAction 
} from '../store/action/action';
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
// import MobileTearSheet from '../../../MobileTearSheet';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import history from '../History';


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
    radioButton: {
        marginTop: 16,
    },
    dilog: {
        width: "60%",
        // marginLeft: 
    }
};


class AdminJobList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            openForm: false,
            open: false,
            fullName: '',
            qualification: '',
            cgpa: '',
            dataArr: [],
            isEdit: '',
            openStudentDetails: false,
            openAppliedJobs: false,
            currentStudent:{},
            appliedJobs:[]

        };
        this.props.allFetchFirebase()
        

       
       
        this._signout = this._signout.bind(this)
        this.handleClose = this.handleClose.bind(this)
       
    }
   
    handleToggle = () => { this.setState({ open: !this.state.open }) };
   
    handleOpen = () => {
        this.setState({ openForm: true });
    };
    handleOpenStudentDetails = () => {
        if(this.props.currentStudent === null){
            alert('No Profile Exist!')
        }
        else this.setState({ openStudentDetails: true, currentStudent: this.props.currentStudent});
    };
   

    handleClose = () => {
        this.setState({ open: false });
    };

  
    _deleteJobFromAdmin(key, uid) {
        // console.log('delete', key)
        this.props.deleteJobFromAdmin(key, uid)
        this.props.allFetchFirebase()
    }
    // _deleteAppliedJob(key) {
    //     // console.log('delete', key)
    //     this.props.deleteAppliedJob(key)
    //     this.props.fetchAppliedJob()
    // }
   
    
    _signout() {
        history.push('/')
    }

    componentWillMount() {
        this.props.allFetchFirebase()
        // this.props.fetchAppliedJob()


    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCloseForm}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this._submit}
            />,
        ];
        const newActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleCloseForm}
            />,
            <FlatButton
                label="Update"
                primary={true}
                keyboardFocused={true}
                onClick={this._submit}
            />,
        ];
        const appliedJobActions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleCloseForm}
            />,
        ];

        if (this.props.allCompanyJobs.length === 0) {
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
                    <MenuItem>   <Paper style={styles.paper} zDepth={3} circle={true} /> </MenuItem>
                     <Link to="/adminStudentList">  <MenuItem >List All Students</MenuItem> </Link>
                     <Link to="/adminJobList">  <MenuItem >List All Jobs</MenuItem> </Link>
                   <Link to="/">  <MenuItem >Sign Out</MenuItem> </Link>
                    {/* <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem> */}
                </Drawer>
  
                <div className="container">

                    <Tabs
                        onChange={this.handleChange}
                        value={this.state.slideIndex}
                    >
                        <Tab style={{ backgroundColor: "white", color: 'black' }} label="All Available Jobs" value={0} />
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
                    <MenuItem>   <Paper style={styles.paper} zDepth={2} circle={true} /> </MenuItem>

                    <Link to="/adminStudentList">  <MenuItem >List All Students</MenuItem> </Link>
                     <Link to="/adminJobList">  <MenuItem >List All Jobs</MenuItem> </Link>
                    <Link to="/">  <MenuItem >Sign Out</MenuItem> </Link>
                    {/* <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem> */}
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
                        <Tab style={{ backgroundColor: "white", color: 'black' }} label="All Available Jobs" value={0} />
                    </Tabs>
                    <br />
                    <br />

                    {/* {console.log('props', this.props.allCompanyJobs.length)} */}

                    {
                        this.props.allCompanyJobs.map((value, ind) => {
                            return <Card key={ind}>
                                <CardHeader
                                    title={'Company Name: ' + value.companyName}
                                    subtitle={'Designation: ' + value.jobDesig}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                />
                                <CardActions>
                                    {/* <FlatButton label="Delete Job" secondary={true} onClick={this._deleteJob.bind(this, value.key)} /> */}
                                    <RaisedButton label="Delete" 
                                    secondary={true}
                                    onClick={this._deleteJobFromAdmin.bind(this, value.key, value.uid)}  
                                    />
                                </CardActions>
                                <CardText expandable={true}>{'Job Desctiption: ' + value.jobDesc}</CardText>
                            </Card>

                        })
                        
                    }
                        {/* {this.props.allCompanyJobs.map((value, ind) => {console.log('2ndMap', value)})} */}

                    
                </div>
            </div>
        )


    }
}

function mapStateToProp(state) {
    return ({
        allCompanyJobs: state.root.allCompanyJobs,
        // currentStudent: state.root.currentStudent,
        // appliedJobs: state.root.appliedJobs,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // submitStudentDetails: (studentDetails) => { dispatch(submitStudentDetailsAction(studentDetails)) },
        allFetchFirebase: () => { dispatch(allJobsFetchFirebaseAction()) },
        // fetchStudentDetails: () => { dispatch(fetchStudentDetailsAction()) },
        // signout: (key) => { dispatch(signoutAction(key)) },
        // applyJob: (key, uid) => { dispatch(applyJobAction(key, uid)) },
        // fetchAppliedJob: () => { dispatch(fetchAppliedJobAction()) },
        deleteJobFromAdmin: (key, uid) => { dispatch(deleteJobFromAdminAction(key, uid)) }


    })
}

export default connect(mapStateToProp, mapDispatchToProp)(AdminJobList);

