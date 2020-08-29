import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

// MUI stuff
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';

// Redux
import { connect } from 'react-redux';

// React requires
const Link = require("react-router-dom").Link;


// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import { Typography } from '@material-ui/core';

const styles = {
    card:{
        padding: '20px'
    },
    paragraph:{
        textAlign: 'center'
    },
    buttonsContainer:{
        textAlign: 'center'
    },
    button:{
        margin: '10px'
    },

    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
            verticalAlign: 'middle'
            },
            '& a': {
            color: '#00bcd4'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
            cursor: 'pointer'
            }
        }
    },
}

export class Profile extends Component {
    render() {
        const { 
            classes,
            user:{
                credentials:{
                    handle,
                    createdAt,
                    imageUrl,
                    bio,
                    website,
                    location
                },
                loading,
                authenticated,
            }
        } = this.props;

        const unauthenticatedContent = (
            <Card className={classes.card}>
                <p className={classes.paragraph}>No profile found, please sign up.</p>

                <div className={classes.buttonsContainer}>
                    <Button component={Link} to="/login" variant="contained" color="primary" className={classes.button}>Login</Button>
                    <Button component={Link} to="/signup" variant="contained" color="secondary" className={classes.button}>Signup</Button>
                </div>
            </Card>
        );

        const authenticatedContent = (
            <Paper className={classes.paper}>
                <p>Authenticated</p>
            </Paper>
        );

        return loading ? (<p>Loading</p>) : (authenticated ? authenticatedContent : unauthenticatedContent);
        ;
    }
}

// on prend les reducers du state global dont on a besoin, ici user
const mapStateToProps = (state) => ({
    user: state.user
})

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

export default connect(
    mapStateToProps,
)(withStyles(styles)(Profile));