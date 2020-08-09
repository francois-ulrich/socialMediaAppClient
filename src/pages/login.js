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
import {loginUser} from '../redux/actions/userActions';


const styles = (theme) => ({
    ...theme.spreadThis
});

export class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();


        const userData = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(userData, this.props.history)
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
                            Submit
                        </Button>
                        
                        { loading && <CircularProgress size={30} className={classes.progress}/>}
                    </form>

                    <br />

                    <small>Don't have an account yet? Sign up <Link to="/signup">here</Link></small>
                </Grid>
                <Grid item sm/>
            </Grid>


        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(login));