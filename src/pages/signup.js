import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';

// Material UI 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';

// Redux stuff
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadThis
});

export class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            handle: '',
            password: '',
            confirmPassword: '',
            loading: false,
            errors: {}
        }
    }

    // Gestion des changements d'erreur
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.UI.errors && nextProps.UI.errors !== prevState.errors){
            return {
                errors: nextProps.UI.errors
            }
        }

        return null;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            loading: true
        });

        const newUserData = {
            email: this.state.email,
            handle: this.state.handle,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        }

        // Action d'inscription
        this.props.signupUser(newUserData, this.props.history)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { classes, UI: {loading} } = this.props;
        const { errors } = this.state;

        return (
            <Grid container>
                <Grid item sm/>
                <Grid item sm>
                    <form noValidate onSubmit={this.handleSubmit}  className={classes.form}>
                        <TextField 
                        id="email" 
                        name="email" 
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={this.state.email} onChange={this.handleChange} fullWidth/>

                        <TextField 
                        id="password" 
                        name="password" 
                        type="password" 
                        label="Password" 
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={this.state.password} 
                        onChange={this.handleChange} 
                        fullWidth/>


                        <TextField 
                        id="confirmPassword" 
                        name="confirmPassword" 
                        type="password" 
                        label="Confirm password" 
                        className={classes.textField}
                        helperText={errors.confirmPassword}
                        error={errors.confirmPassword ? true : false}
                        value={this.state.confirmPassword} 
                        onChange={this.handleChange} 
                        fullWidth/>

                        <TextField 
                        id="handle" 
                        name="handle" 
                        type="text" 
                        label="User handle" 
                        className={classes.textField}
                        helperText={errors.handle}
                        error={errors.handle ? true : false}
                        value={this.state.handle} onChange={this.handleChange} fullWidth/>

                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}

                        <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        className={classes.button} 
                        onSubmit={this.handleSubmit}
                        disabled={ loading }>
                            Signup
                        </Button>
                        
                        { loading && <CircularProgress size={30} className={classes.progress}/>}
                    </form>

                    <br />

                    <small>Already have an account? Log in <Link to="/login">here</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>


        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    signupUser
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(signup));