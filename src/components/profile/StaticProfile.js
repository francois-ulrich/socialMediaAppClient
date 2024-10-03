import React, { Component, Fragment } from 'react';

import dayjs from 'dayjs';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// Mui Icons
import LocationOntIcon from '@material-ui/icons/LocationOn';
import InsertLinktIcon from '@material-ui/icons/InsertLink';
import CalendarTodaytIcon from '@material-ui/icons/CalendarToday';

// Redux
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/userActions';
import PropTypes from 'prop-types';

// React requires
const Link = require("react-router-dom").Link;

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

class StaticProfile extends Component {
    render() {
        const { 
            classes,
            profile:{
                handle,
                createdAt,
                imageUrl,
                bio,
                website,
                location
            },
        } = this.props;

        return (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
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
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

StaticProfile.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
}

const mapActionsToProps = {
    uploadImage
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(StaticProfile));