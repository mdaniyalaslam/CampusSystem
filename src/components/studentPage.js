import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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
    submitStudentDetailsAction, 
    fetchStudentDetailsAction, 
    applyJobAction,
    deleteAppliedJobAction, 
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


class StudentPage extends Component {

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
        this.props.fetchStudentDetails()
        // this.props.fetchAppliedJob()
        

        // this.add = this.add.bind(this)
        this._onChangeFullName = this._onChangeFullName.bind(this)
        this._onChangequalification = this._onChangequalification.bind(this)
        this._onChangecgpa = this._onChangecgpa.bind(this)
        this._submit = this._submit.bind(this)
        this._signout = this._signout.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this._addProfile = this._addProfile.bind(this)
    }
    _onChangeFullName(event) {
        this.setState({ fullName: event.target.value })
    }
    _onChangequalification(event) {
        this.setState({ qualification: event.target.value })
    }
    _onChangecgpa(event) {
        this.setState({ cgpa: event.target.value })
    }
    handleToggle = () => { this.setState({ open: !this.state.open }) };
    handleCloseForm = () => {
        this.setState({ openForm: false, openStudentDetails: false, open: false, openAppliedJobs:false });
    };
    // handleToggle = () => this.setState({ open: true});
    handleOpen = () => {
        this.setState({ openForm: true });
    };
    handleOpenStudentDetails = () => {
        if(this.props.currentStudent === null){
            alert('No Profile Exist!')
        }
        else this.setState({ openStudentDetails: true, currentStudent: this.props.currentStudent});
    };
    handleOpenAppliedJobs = () => {
        if(this.props.appliedJobs === null){
            alert('No Applied Jobs!')
        }
        else this.setState({ openAppliedJobs: true, appliedJobs: this.props.appliedJobs});
    };
    _addProfile() {
        if (this.props.currentStudent === null) {
            this.handleOpen()
        }
        else { alert('Profile already Exist!') }

    }

    handleClose = () => {
        this.setState({ open: false });
    };

    _submit() {
        let studentDetails = {
            fullName: this.state.fullName,
            qualification: this.state.qualification,
            cgpa: this.state.cgpa
        }
        // console.log(companyDetails)
        this.props.submitStudentDetails(studentDetails)
        this.handleCloseForm()
        // this.props.fetchFirebase()
        // this.componentWillMount()

    }
    _deleteJob(key) {
        // console.log('delete', key)
        this.props.deleteJob(key)
        this.props.fetchFirebase()
    }
    _deleteAppliedJob(key) {
        // console.log('delete', key)
        this.props.deleteAppliedJob(key)
        this.props.fetchAppliedJob()
    }
    _applyJob(key, uid){
        var appliedJobsComing = this.props.appliedJobs
        var appliedKeys =[]
        for (var i in appliedJobsComing ){
            appliedKeys.push(appliedJobsComing[i].key)
        }
        for (var i=0 ; i<=appliedKeys.length; i++){
            if(key === appliedKeys[i]){
                alert('Already Applied!')
            }
        else this.props.applyJob(key, uid)
        }
    }
    
    _signout() {
        this.props.signout()
    }

    componentWillMount() {
        this.props.allFetchFirebase()
        this.props.fetchAppliedJob()


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
                    <MenuItem>   <Paper style={styles.paper} zDepth={2} circle={true} /> </MenuItem>
                    <MenuItem onClick={this.handleOpen}>My Profile</MenuItem>
                    <MenuItem >Applied Jobs</MenuItem>
                    <MenuItem onClick={this._signout}>SignOut</MenuItem>
                    {/* <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem> */}
                </Drawer>
                {/* <Dialog
                        // style={styles.dilog}
                        title="Add Details!"
                        actions={actions}
                        modal={false}
                        open={this.state.openForm}
                        onRequestClose={this.handleCloseForm}
                        autoScrollBodyContent={true}
                    >
                        <TextField floatingLabelText="Company Name"
                            hintText="Enter Company Name Here"
                            name="companyName"
                            fullWidth={true}
                            value={this.state.companyName}
                            onChange={this._onChangeCompanyName}
                        />
                        <TextField floatingLabelText="Job Designation"
                            hintText="Enter Job Designation Here"
                            name="jobDesig"
                            fullWidth={true}
                            value={this.state.jobDesig}
                            onChange={this._onChangeJobDesig}
                        />
                        <TextField floatingLabelText="Job Description"
                            hintText="Enter Job Desctiption Here"
                            name="jobDesc"
                            fullWidth={true}
                            multiLine={true}
                            rows={2}
                            value={this.state.jobDesc}
                            onChange={this._onChangeJobDesc}
                        />
                    </Dialog> */}
                <div className="container">

                    <Tabs
                        onChange={this.handleChange}
                        value={this.state.slideIndex}
                    >
                        <Tab style={{ backgroundColor: "white", color: 'black' }} label="Available Jobs" value={0} />
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

                    <MenuItem onClick={this._addProfile}>Add Profile</MenuItem>
                    <MenuItem onClick={this.handleOpenStudentDetails}>View Profile</MenuItem>
                    <MenuItem onClick={this.handleOpenAppliedJobs} >Applied Jobs</MenuItem>
                    <MenuItem onClick={this._signout}>SignOut</MenuItem>
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
                        <Tab style={{ backgroundColor: "white", color: 'black' }} label="Available Jobs" value={0} />
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
                                    <FlatButton label="Apply" onClick={this._applyJob.bind(this, value.key, value.uid)}  />
                                </CardActions>
                                <CardText expandable={true}>{'Job Desctiption: ' + value.jobDesc}</CardText>
                            </Card>

                        })
                        
                    }
                        {/* {this.props.allCompanyJobs.map((value, ind) => {console.log('2ndMap', value)})} */}

                    <Dialog
                        // style={styles.dilog}
                        title="Add Profile!"
                        actions={actions}
                        modal={false}
                        open={this.state.openForm}
                        onRequestClose={this.handleCloseForm}
                        autoScrollBodyContent={true}
                    >
                        <TextField floatingLabelText="Full Name"
                            hintText="Your Full Name Here"
                            name="companyName"
                            fullWidth={true}
                            value={this.state.fullName}
                            onChange={this._onChangeFullName}
                        />
                        <TextField floatingLabelText="Qualification With Major Subject"
                            hintText="Enter Qualification"
                            name="qualification"
                            fullWidth={true}
                            value={this.state.qualification}
                            onChange={this._onChangequalification}
                        />
                        <TextField floatingLabelText="Last Exam CGPA"
                            hintText="Enter CGPA"
                            name="cgpa"
                            fullWidth={true}
                            value={this.state.cgpa}
                            onChange={this._onChangecgpa}
                        />
                    </Dialog>

                    <Dialog
                        // style={styles.dilog}
                        title="My Profile!"
                        actions={newActions}
                        modal={false}
                        open={this.state.openStudentDetails}
                        onRequestClose={this.handleCloseForm}
                        autoScrollBodyContent={true}
                    >
                            <List>
                                <ListItem primaryText={'Full Name: '+ this.state.currentStudent.fullName}  />
                                <ListItem primaryText={'Qualification: '+ this.state.currentStudent.qualification}  />
                                <ListItem primaryText={'Last Exam CGPA: '+ this.state.currentStudent.cgpa}  />
             
             
                            </List>
                    </Dialog>

                    <Dialog
                        // style={styles.dilog}
                        title="Applied Jobs!"
                        actions={appliedJobActions}
                        modal={false}
                        open={this.state.openAppliedJobs}
                        onRequestClose={this.handleCloseForm}
                        autoScrollBodyContent={true}
                    >

                     {                         
                      
                        this.state.appliedJobs.map((value, ind) => {
                            return <Card key={ind}>
                                <CardHeader
                                    title={'Company Name: ' + value.companyName}
                                    subtitle={'Designation: ' + value.jobDesig}
                                    actAsExpander={true}
                                    showExpandableButton={true}
                                />
                                <CardActions>
                                    <FlatButton label="Delete"
                                     onClick={this._deleteAppliedJob.bind(this, value.key)}  
                                     />
                                </CardActions>
                                <CardText expandable={true}>{'Job Desctiption: ' + value.jobDesc}</CardText>
                            </Card>

                        })
                        
                    }

                    </Dialog>
                </div>
            </div>
        )


    }
}

function mapStateToProp(state) {
    return ({
        allCompanyJobs: state.root.allCompanyJobs,
        currentStudent: state.root.currentStudent,
        appliedJobs: state.root.appliedJobs,
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        submitStudentDetails: (studentDetails) => { dispatch(submitStudentDetailsAction(studentDetails)) },
        allFetchFirebase: () => { dispatch(allJobsFetchFirebaseAction()) },
        fetchStudentDetails: () => { dispatch(fetchStudentDetailsAction()) },
        signout: (key) => { dispatch(signoutAction(key)) },
        applyJob: (key, uid) => { dispatch(applyJobAction(key, uid)) },
        fetchAppliedJob: () => { dispatch(fetchAppliedJobAction()) },
        deleteAppliedJob: (key) => { dispatch(deleteAppliedJobAction(key)) }


    })
}

export default connect(mapStateToProp, mapDispatchToProp)(StudentPage);

