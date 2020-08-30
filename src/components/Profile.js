import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// Mui Icons
import LocationOntIcon from '@material-ui/icons/LocationOn';
import InsertLinktIcon from '@material-ui/icons/InsertLink';
import CalendarTodaytIcon from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';

// Redux
import { connect } from 'react-redux';

import CustomButton from './CustomButton'

// React requires
const Link = require("react-router-dom").Link;



// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import { Typography } from '@material-ui/core';

const styles = {
    button:{
        margin: '10px'
    },

    profile: {
        padding: '20px',
        textAlign: 'center',

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
    handleEditPicture = (e) => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(userData, this.props.history)
    }

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
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <Typography variant="body2" >No profile found, please sign up.</Typography>

                    <div className={classes.buttonsContainer}>
                        <Button component={Link} to="/login" variant="contained" color="primary" className={classes.button}>Login</Button>
                        <Button component={Link} to="/signup" variant="contained" color="secondary" className={classes.button}>Signup</Button>
                    </div>
                </div>
            </Paper>
        );

        const authenticatedContent = (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>

                        <input
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={this.handleImageChange}
                        />

                        <CustomButton
                            tip="Edit profile picture"
                            onClick={this.handleEditPicture}
                            btnClassName="button"
                        >
                            <EditIcon color="primary" />
                        </CustomButton>
                    </div>

                    <hr/>

                    <div className="profile-details">
                        
                        <MuiLink 
                        component={Link}
                        to={`/users/${handle}`}
                        color="primary"
                        variant="h5">
                            @{handle}
                        </MuiLink>

                        <hr/>

                        {bio && <Typography
                            variant="body2"
                        >{bio}</Typography>}

                        <hr/>

                        {location && (
                            <Fragment>
                                <LocationOntIcon color="primary"/>
                                {' '}
                                <span>{location}</span>
                            </Fragment>
                        )}

                        <hr/>

                        {website && (
                            <Fragment>
                                <InsertLinktIcon color="primary"/>
                                {' '}
                                <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                            </Fragment>
                        )}

                        <hr/>

                        {createdAt && (
                            <Fragment>
                                <CalendarTodaytIcon color="primary"/>
                                {' '}
                                <span>Joined { dayjs(createdAt).format("MM/YYYY") }</span>
                            </Fragment>
                        )}
                    </div>
                </div>
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