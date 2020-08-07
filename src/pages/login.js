import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';

import axios from 'axios';

// Material UI 
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';

const styles = (theme) => ({
    ...theme.spreadThis
});

export class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({
            loading: true
        });

        const userData = {
            email: this.state.email,
            password: this.state.password,
        }

        axios
        .post("/login", userData)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            this.setState({
                errors: err.response.data,
                loading: false
            })
        });

        /*
        console.log("this.state.errors");
        console.log(this.state.errors);
        */

        // // Redirection vers la home
        // this.props.history.push('/');

        // console.log("submit");
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

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
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login);