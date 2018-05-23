import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupAction } from '../store/action/action';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

const styles = {
    paper: {
        height: 400,
        width: 350,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
        padding: 10,
    },
    btn: {
        margin: 12,
    },
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 20,
    },

};

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            userName: '',
            password: ''
        }


        this.signup = this.signup.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangeUserName = this._onChangeUserName.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);

    }


    signup() {
        let user = {
            email: this.state.email,
            username: this.state.userName,
            password: this.state.password
        }
        this.setState({
            email: '',
            userName: '',
            password: ''
        })
        this.props.signupwithEmailPassword(user);
    }
    _onChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }
    _onChangeUserName(event) {
        this.setState({
            userName: event.target.value
        })
    }
    _onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col"></div>
                <div className="col-sm-4">
                    <Paper style={styles.paper} zDepth={2} >
                    <h1>Signup</h1>
                        <TextField floatingLabelText="Email"
                            hintText="Enter Email Here"
                            name="email"
                            value={this.state.email} onChange={this._onChangeEmail}
                        />
                        <TextField floatingLabelText="User Name"
                            hintText="Enter Name Here"
                            name="username"
                            value={this.state.userName} onChange={this._onChangeUserName}
                        />
                        <TextField floatingLabelText="Password"
                            hintText="Enter Password Here"
                            name="password"
                            value={this.state.password} onChange={this._onChangePassword}
                        />

                        <RadioButtonGroup style={{ display: "flex" }} name="shipSpeed" defaultSelected="not_light">
                            <RadioButton
                                value="light"
                                label="Student"
                                style={styles.radioButton}
                            />
                            <RadioButton
                                value="not_light"
                                label="Teacher"
                                style={styles.radioButton}
                            />
                        </RadioButtonGroup>
                        <RaisedButton label="Signup"
                            style={styles.btn}
                            primary={true}
                            onClick={this.signup}
                        />
                    </Paper>
                </div>
                <div className="col"></div>
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
        signupwithEmailPassword: (userDetails) => {
            dispatch(signupAction(userDetails));
        }
    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signup);

