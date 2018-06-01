import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import {changeUserName} from '../store/action/action';
// SWIPABLE
import { Tabs, Tab } from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import { submitAction } from '../store/action/action';



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
            companyName:'',
            jobDesig:'',
            jobDesc:''
        };
        // this.add = this.add.bind(this)
        this._onChangeCompanyName = this._onChangeCompanyName.bind(this)
        this._onChangeJobDesig = this._onChangeJobDesig.bind(this)
        this._onChangeJobDesc = this._onChangeJobDesc.bind(this)
        this._submit = this._submit.bind(this)
        this.handleClose = this.handleClose.bind(this)

    }
    _onChangeCompanyName(event){
        this.setState({companyName:event.target.value})
    }
    _onChangeJobDesig(event){
        this.setState({jobDesig:event.target.value})
    }
    _onChangeJobDesc(event){
        this.setState({jobDesc:event.target.value})
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () =>{
        this.setState({ open: false });
    };

    _submit(){


        // alert('subnit')
        this.handleClose()
    }






    // _changeData(){
    //     console.log('event called');
    //     this.props.changeUserName();
    // }

    render() {
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
        return (

            <div className='container'>
                {/* TAB */}
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    
                    <Tab style={{backgroundColor:"white", color:'black'}} label="All Job Posts" value={0} />
                </Tabs>
                <FloatingActionButton style={styles.addBtn}>
                    <ContentAdd
                        onClick={this.handleOpen}
                    />
                </FloatingActionButton>
                <br />
                <br />

                {/* LISt */}
                <Card>
                    <CardHeader
                        title="Without Avatar"
                        subtitle="Subtitle"
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardActions>
                        <FlatButton label="Delete Job" secondary={true} />
                        {/* <FlatButton label="Action2" /> */}
                    </CardActions>
                    <CardText expandable={true}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                </Card>

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
                    // value={this.state.email} onChange={this._onChangeEmail}
                    />
                    <TextField floatingLabelText="Job Designation"
                        hintText="Enter Job Designation Here"
                        name="jobDesig"
                        fullWidth={true}
                    // value={this.state.email} onChange={this._onChangeEmail}
                    />
                    <TextField floatingLabelText="Job Description"
                        hintText="Enter Job Desctiption Here"
                        name="jobDesc"
                        fullWidth={true}
                        multiLine={true}
                        rows={2}
                    // value={this.state.email} onChange={this._onChangeEmail}
                    />
                </Dialog>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        // userName: state.root.userName
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        // changeUserName: ()=>{dispatch(changeUserName())}
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(CompanyPage);
