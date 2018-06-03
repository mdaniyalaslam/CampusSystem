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
import { submitAction, fetchFirebaseAction, deleteJobAction, signoutAction } from '../store/action/action';
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';



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

class CompanyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            openForm: false,
            open: false,
            companyName: '',
            jobDesig: '',
            jobDesc: '',
            dataArr: []

        };
        // this.add = this.add.bind(this)
        this._onChangeCompanyName = this._onChangeCompanyName.bind(this)
        this._onChangeJobDesig = this._onChangeJobDesig.bind(this)
        this._onChangeJobDesc = this._onChangeJobDesc.bind(this)
        this._submit = this._submit.bind(this)
        this._signout = this._signout.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
    _onChangeCompanyName(event) {
        this.setState({ companyName: event.target.value })
    }
    _onChangeJobDesig(event) {
        this.setState({ jobDesig: event.target.value })
    }
    _onChangeJobDesc(event) {
        this.setState({ jobDesc: event.target.value })
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

    _submit() {
        let jobDetails = {
            companyName: this.state.companyName,
            jobDesig: this.state.jobDesig,
            jobDesc: this.state.jobDesc
        }
        // console.log(companyDetails)
        this.props.submitDetails(jobDetails)
        this.handleCloseForm()
        // this.props.fetchFirebase()
        // this.componentWillMount()

    }
    _deleteJob(key) {
        // console.log('delete', key)
        this.props.deleteJob(key)
        this.props.fetchFirebase()
    }
    _signout(){
        this.props.signout()
    }

    componentWillMount() {
        this.props.fetchFirebase()
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

        if (this.props.currentCompanyJobs.length === 0) {
            return <div>
                <AppBar
                    title="Title"
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
                 <Dialog
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
                    </Dialog>
                <div className="container">

                    <Tabs
                        onChange={this.handleChange}
                        value={this.state.slideIndex}
                    >
                        <Tab style={{ backgroundColor: "white", color: 'black' }} label="All Job Posts" value={0} />
                    </Tabs>
                    <FloatingActionButton style={styles.addBtn}>
                        <ContentAdd
                            onClick={this.handleOpen}
                        />
                    </FloatingActionButton>
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
                    <MenuItem onClick={this._signout}>SignOut</MenuItem>
                    {/* <MenuItem onClick={this.handleClose}>Menu Item 2</MenuItem> */}
                </Drawer>
                <AppBar
                    title="Title"
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
                    <FloatingActionButton style={styles.addBtn}>
                        <ContentAdd
                            onClick={this.handleOpen}
                        />
                    </FloatingActionButton>
                    <br />
                    <br />



                    {
                        this.props.currentCompanyJobs.map((value, ind) => {
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
                    <Dialog
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
                    </Dialog>
                </div>
            </div>
        )


    }
}



function mapStateToProp(state) {
    return ({
        currentCompanyJobs: state.root.currentCompanyJobs
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        submitDetails: (jobDetails) => { dispatch(submitAction(jobDetails)) },
        fetchFirebase: (jobDetails) => { dispatch(fetchFirebaseAction(jobDetails)) },
        deleteJob: (key) => { dispatch(deleteJobAction(key)) },
        signout: (key) => { dispatch(signoutAction(key)) }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(CompanyPage);
