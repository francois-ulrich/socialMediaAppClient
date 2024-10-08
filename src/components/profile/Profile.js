import React, { Component, Fragment } from 'react';

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
import { uploadImage } from '../../redux/actions/userActions';
import PropTypes from 'prop-types';

// Custom
import CustomButton from '../CustomButton'
import EditDetails from './EditDetails'
import ProfileSkeleton from '../../util/ProfileSkeleton';
import theme from '../../util/theme';

// React requires
const Link = require("react-router-dom").Link;

const styles = (theme) => ({
    ...theme.spreadThis,
    button: {
        margin: '10px'
    },
})

class Profile extends Component {
    constructor() {
        super();

        this.inputFileRef = React.createRef();
    }

    handleImageEditIconClick = (e) => {
        e.preventDefault();

        this.inputFileRef.current.click();
    }

    handleImageFileChange = (e) => {
        const newImageFile = e.target.files[0];

        let formData = new FormData();
        formData.append('image', newImageFile, newImageFile.name);

        this.props.uploadImage(formData);
    }

    render() {
        const {
            classes,
            user: {
                credentials: {
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
                        <img src={imageUrl} alt="profile" className="profile-image" />

                        <input
                            ref={this.inputFileRef}
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={this.handleImageFileChange}
                        />

                        <CustomButton
                            tip="Edit profile picture"
                            onClick={this.handleImageEditIconClick}
                            btnClassName="button"
                        >
                            <EditIcon color="primary" />
                        </CustomButton>
                    </div>

                    <hr />

                    <div className="profile-details">

                        <MuiLink
                            component={Link}
                            to={`/users/${handle}`}
                            color="primary"
                            variant="h5">
                            @{handle}
                        </MuiLink>

                        <hr />

                        {bio && <Typography
                            variant="body2"
                        >{bio}</Typography>}

                        <hr />

                        {location && (
                            <Fragment>
                                <LocationOntIcon color="primary" />
                                {' '}
                                <span>{location}</span>
                            </Fragment>
                        )}

                        <hr />

                        {website && (
                            <Fragment>
                                <InsertLinktIcon color="primary" />
                                {' '}
                                <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>
                            </Fragment>
                        )}

                        <hr />

                        {createdAt && (
                            <Fragment>
                                <CalendarTodaytIcon color="primary" />
                                {' '}
                                <span>Joined {dayjs(createdAt).format("MM/YYYY")}</span>
                            </Fragment>
                        )}
                    </div>

                    <div>
                        <EditDetails />
                    </div>
                </div>
            </Paper>
        );

        return loading ? <ProfileSkeleton /> : (authenticated ? authenticatedContent : unauthenticatedContent);
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired,
}

const mapActionsToProps = {
    uploadImage
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Profile));