import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinAction } from '../store/action/action';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { FlatButton } from 'material-ui';
import Dialog from 'material-ui/Dialog';
import history from '../History';


const styles = {
    paper: {
        height: 440,
        width: 350,
        margin: 40,
        textAlign: 'center',
        display: 'inline-block',
        padding: 10,
        borderRadius: 15,
        open: false,

    },
    btn: {
        margin: 12,
        marginTop: 20,
        width: 300

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

class Signin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            userName: '',
            password: '',
            check: '',
            error: '',
            code:''
        }


        this.signin = this.signin.bind(this);
        this._adminPannelSubmit = this._adminPannelSubmit.bind(this);
        this._onChangeEmail = this._onChangeEmail.bind(this);
        this._onChangePassword = this._onChangePassword.bind(this);
        this._onChangeCode = this._onChangeCode.bind(this);
        this.checker = this.checker.bind(this)

    }


    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    signin() {
        let check = this.state.check
        let studentInfo = {
            email: this.state.email,
            password: this.state.password,
            user: check
        }
        let companyInfo = {
            email: this.state.email,
            password: this.state.password,
            user: check
        }

        if (check === 'student') {
            this.props.signinwithEmailPassword(studentInfo)
        }
        else (
            this.props.signinwithEmailPassword(companyInfo)
        )


        this.setState({
            email: '',
            userName: '',
            password: '',
            error: this.props.error
        })
    }
    _onChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    _onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }
    _onChangeCode(event) {
        this.setState({
            code: event.target.value
        })
    }

    checker(e) {
        let checked = this.state.check
        console.log(checked, "radio btn vlue")
        // bharwy koi garbar nhi hai phele set kar raha hai baad me print

        this.setState({ check: e.target.value })
        // this.setState({
        //     check : e.target.value,
        // })

    }
    _adminPannelSubmit() {
        let code = this.state.code
        console.log(code)
        // this.props.adminPannelSubmit()
        if(code === 'QW4HD'){
            history.push('/adminPannel')
        }
        else alert('Wrong Code!')
        this.handleClose()

    }


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
                onClick={this._adminPannelSubmit}
            />,
        ];
        return (

            <div className="row">
                <Dialog
                    title="Admin Pannel Access"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                  <TextField floatingLabelText="Organization Code"
                            hintText="Enter code Here"
                            name="companyName"
                            fullWidth={true}
                            value={this.state.code}
                            onChange={this._onChangeCode}
                        />

                </Dialog>
                <div className="col"></div>
                <div className="col-sm-4">

                    <Paper style={styles.paper} zDepth={5} >
                        <h1>Signin</h1>
                        <TextField floatingLabelText="Email"
                            hintText="Enter Email Here"
                            name="email"
                            // errorText={this.state.error}
                            value={this.state.email} onChange={this._onChangeEmail}
                        />

                        <TextField floatingLabelText="Password"
                            hintText="Enter Password Here"
                            name="password"
                            value={this.state.password} onChange={this._onChangePassword}
                        />

                        <RadioButtonGroup style={{ display: "flex" }} name="shipSpeed">
                            <RadioButton
                                value="student"
                                label="Student"
                                style={styles.radioButton}
                                onClick={this.checker}
                            />
                            <RadioButton
                                value="company"
                                label="Company"
                                style={styles.radioButton}
                                onClick={this.checker}
                            />
                        </RadioButtonGroup>

                        <RaisedButton label="Signin"
                            style={styles.btn}
                            primary={true}
                            onClick={this.signin}
                        />
                        <br />
                        <p>Don't Have an account? <Link to="signup">Signup</Link> here!</p>

                        {/* Handling errors */}
                        <span style={{ color: 'red' }}>{this.props.error}</span>
                        <span style={{ color: 'red' }}>{this.props.radioError}</span>

                    </Paper>

                </div>
                <div className="col">
                    <FlatButton label="Admin Pannel"
                        style={styles.btn}
                        primary={true}
                        onClick={this.handleOpen}
                    /></div>
            </div>
        )
    }
}

function mapStateToProp(state) {
    return ({
        error: state.root.error,
        radioError: state.root.radioError
    })
}
function mapDispatchToProp(dispatch) {
    return ({
        signinwithEmailPassword: (info) => { dispatch(signinAction(info)); },
        // adminPannelSubmit: (info) => { dispatch(adminPannelAction(info)); }

    })
}

export default connect(mapStateToProp, mapDispatchToProp)(Signin);

