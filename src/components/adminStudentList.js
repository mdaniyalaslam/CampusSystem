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
import {fetchAllStudentsAction, signoutAction } from '../store/action/action';
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

class AdminStudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            openForm: false,
            open: false,
            // companyName: '',

        };    
        this.props.fetchAllStudents()
          
       
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
        this.props.fetchAllStudents()
        // console.log('props',this.props.allStudents)
    }
    componentDidMount(){
        this.props.fetchAllStudents()

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

                    {
                        // console.log('allpage', this.props.allStudents)
                        this.props.allStudents .map((value, ind) => {
                            console.log('map', value)
                            return <Paper style={styles.studentsPaper}>
                                <h3>Student's Name: {value.fullName}</h3>
                                <h3>Qualification: {value.qualification}</h3>
                                <h3>CGPA: {value.cgpa}</h3>
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
    })
}
function mapDispatchToProp(dispatch) {
    return ({

        fetchAllStudents: () => { dispatch(fetchAllStudentsAction()) },

        signout: (key) => { dispatch(signoutAction(key)) }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(AdminStudentList);
