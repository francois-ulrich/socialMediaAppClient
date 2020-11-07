import React, { Fragment } from 'react';

// MUI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

// Images
import ImgUserNoImg from '../images/usericon-no-img.png';

// Redux
import PropTypes from 'prop-types';

const styles = (theme) => ({
    ...theme.spreadThis,
    handle: {
        width: 60,
        height: 24,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 7
    },
    date: {
        height: 23,
        width: 100,
        backgroundColor: '#b3b3b3',
        marginBottom: 10
    },
    fullLine: {
        height: 23,
        width: '90%',
        backgroundColor: '#999999',
        marginBottom: 10
    },
    halfLine: {
        height: 23,
        width: '50%',
        backgroundColor: '#999999',
        marginBottom: 10
    },
    profile:{
        ...theme.spreadThis.profile,

        '& > .profile-details > div':{
            display: 'inline-block',
        }
    }
});

const ProfileSkeleton = (props) => {
    const { 
        classes 
    } = props;

    return (
        <Paper className={classes.paper}>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={ImgUserNoImg} alt="profile" className="profile-image"/>
                </div>

                <hr/>

                <div className="profile-details">
                    <div className={classes.handle}/>

                    <div className={classes.fullLine}/>
                    <div className={classes.fullLine}/>

                    <div className={classes.halfLine}/>

                    <div className={classes.halfLine}/>

                    <div className={classes.halfLine}/>
                </div>
            </div>
        </Paper>
    );
}

ProfileSkeleton.propTypes = {
    props: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);