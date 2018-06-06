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
    deleteStudentFromAdminAction,
    fetchAppliedJobAction ,
    fetchAllStudentsAction
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
    studentsPaper:{
        padding:10,
        marginTop:5
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


class AdminStudentList extends Component {

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

  
    _deleteStudentFromAdmin(key) {
        // console.log('delete', key)
        this.props.deleteStudentFromAdmin(key)
        this.props.fetchAllStudents()
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
        this.props.fetchAllStudents()
        // this.props.fetchAppliedJob()
    }
    componentDidMount(){
        this.props.fetchAllStudents()

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
                        <Tab style={{ backgroundColor: "white", color: 'black' }} label="All Available Students" value={0} />
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
                        <Tab style={{ backgroundColor: "white", color: 'black' }} label="All Available Students" value={0} />
                    </Tabs>
                    <br />
                    <br />


                        { console.log('allpage', this.props.allStudents)}
                   {
                        this.props.allStudents .map((value, ind) => {
                            console.log('map', value)
                            return <Paper style={styles.studentsPaper}>
                                <h3>Student's Name: {value.fullName}</h3>
                                <h3>Qualification: {value.qualification}</h3>
                                <h3>CGPA: {value.cgpa}</h3>
                                <RaisedButton label="Delete" 
                                    secondary={true}
                                    onClick={this._deleteStudentFromAdmin.bind(this, value.key)}  
                                    />
                            </Paper>

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
        deleteStudentFromAdmin: (key) => { dispatch(deleteStudentFromAdminAction(key)) },
        fetchAllStudents: () => { dispatch(fetchAllStudentsAction()) },
        


    })
}

export default connect(mapStateToProp, mapDispatchToProp)(AdminStudentList);

