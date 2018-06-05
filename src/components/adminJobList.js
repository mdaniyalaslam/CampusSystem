import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import CircularProgress from 'material-ui/CircularProgress';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {allJobsFetchFirebaseAction, signoutAction } from '../store/action/action';
import history from '../History';





const styles = {
    studentsPaper: {
        // height: 120,
        // width: 120,
        margin: 20,
        // textAlign: 'center',
        // display: 'inline-block',
        padding:10

    },
    paper: {
        height: 120,
        width: 120,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        // padding:10

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

class AdminJobList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            openForm: false,
            open: false,
            // companyName: '',

        };    
        this.props.allFetchFirebase()
          
       
        this._signout = this._signout.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }
   
    handleToggle = () => { console.log('doneee'); this.setState({ open: !this.state.open }) };
    // handleCloseForm = () => {
    //     this.setState({ openForm: false });
    // };
    handleToggle = () => this.setState({ open: true});
    // handleOpen = () => {
    //     console.log('open')
    //     this.setState({ openForm: true });
    // };

    handleClose = () => {
        this.setState({ open: false });
    };


    _signout(){
        history.push('/')
    }

    componentWillMount() {
        this.props.allFetchFirebase()
        // console.log('props',this.props.allStudents)
    }
    componentDidMount(){
        this.props.allFetchFirebase()

    }

    render() {

       
        return (
            <div className=''>
            
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
                        <Tab style={{ backgroundColor: "white", color: 'black' }} label="All Jobs" value={0} />
                    </Tabs>

                    <br />
                    <br />
                    {console.log('props', this.props.allCompanyJobs.length)}

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

                </div>
            </div>
        )


    }
}

function mapStateToProp(state) {
    return ({
        allCompanyJobs: state.root.allCompanyJobs
    })
}
function mapDispatchToProp(dispatch) {
    return ({

        allFetchFirebase: () => { dispatch(allJobsFetchFirebaseAction()) },

        signout: (key) => { dispatch(signoutAction(key)) }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(AdminJobList);
