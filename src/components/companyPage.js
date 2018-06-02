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
// import RaisedButton from 'material-ui/RaisedButton';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import { submitAction, fetchFirebaseAction, deleteJobAction } from '../store/action/action';
import CircularProgress from 'material-ui/CircularProgress';



const styles = {
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
        // this._deleteJob = this._deleteJob.bind(this)
        this.handleClose = this.handleClose.bind(this)

        console.log('cons', this.props.currentCompanyJobs)


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

    handleOpen = () => {
        this.setState({ open: true });
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

        this.handleClose()
    }
    _deleteJob(key){
        // console.log('delete', key)
        this.props.deleteJob(key)
    }

    componentWillMount() {
        this.props.fetchFirebase()
        // var comingItems = this.props.currentCompanyJobs
        // var thatArr = this.state.dataArr



        // this.setState({arr:this.props.currentCompanyJobs})
    }
    render() {
        console.log('will',this.props.currentCompanyJobs)
        
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this._submit}
            />,
        ];

        // if (this.props.currentCompanyJobs === '') {
        if (this.props.currentCompanyJobs.length === 0) {
            return <div className='row container'>
            <div className='col-sm'></div>
            <div className='col-sm-1'>
            <CircularProgress size={100} thickness={5} />
            </div>
            <div className='col-sm'></div>
          </div>
     
        }
        else return (
            <div className='container'>

                {/* TAB */}
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
                        console.log('map', value)
                        return <Card key={ind}>
                            <CardHeader
                                title={value.companyName}
                                subtitle={value.jobDesig}
                                actAsExpander={true}
                                showExpandableButton={true}
                            />
                            <CardActions>
                                <FlatButton label="Delete Job" secondary={true} onClick={this._deleteJob.bind(this, value.key)} />
                                {/* <FlatButton label="Action2" /> */}
                            </CardActions>
                            <CardText expandable={true}>{value.jobDesc}</CardText>
                        </Card>
                    })
                }
                <Dialog
                    // style={styles.dilog}
                    title="Add Details!"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
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
        deleteJob: (key) => { dispatch(deleteJobAction(key)) }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(CompanyPage);
