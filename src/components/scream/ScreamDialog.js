import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';


import CustomButton from '../CustomButton';

// MUI Form
import Grid from '@material-ui/core/Grid';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { Typography } from '@material-ui/core';

import CommentIcon from '@material-ui/icons/Comment';
import CloseIcon from '@material-ui/icons/Close';

import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { getScream } from '../../redux/actions/dataActions';

// Custom
import LikeButton from './LikeButton';
import CommentForm from './CommentForm';
import Comments from './Comments';

const dayjs = require('dayjs');

// React requires
const Link = require("react-router-dom").Link;
 
const styles = {
    image: {
        width: '100%',
    },
    content:{
        paddingLeft: 25,
    },
    inline:{
        display:'inline',
    },
    closeButton:{
        position: 'absolute',
        top: 10,
        right: 10
    }
}
class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    }

    componentDidMount = () => {
        if(this.props.openDialog){
            // this.setState({
            //     open: true
            // })

            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;

        const newPath = `/users/${this.props.userHandle}/scream/${this.props.screamId}`;
        window.history.pushState(null, null, newPath);

        this.setState({
            open: true,
            oldPath,
            newPath
        });

        // console.log(this.props.screamId);

        this.props.getScream(this.props.screamId);
    };

    handleClose = () => {
        this.setState({open: false});
        window.history.pushState(null, null, this.state.oldPath);
    };

    isScreamLikedByUser = () => {
        return (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId))
    }

    render(){
        const {
            classes,
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
                comments
            },
            UI: {
                loading 
            },
        } = this.props;

        const dialogMarkup = loading ? (
            <CircularProgress size={150} thickness={2}/>
        ) : (
            <Fragment>
                <Grid container spacing={16}>
                    <Grid item xs={4}>
                        <img src={userImage} alt="Profile" className={classes.image}/>
                    </Grid>
                    <Grid item xs={8} className={classes.content}>
                        <CustomButton onClick={this.handleClose} btnClassName={classes.closeButton}>
                            <CloseIcon/>
                        </CustomButton>

                        <Typography 
                        variant="h5" 
                        component={Link} 
                        to={`/users/${userHandle}`}
                        color="primary"
                        >
                            {userHandle}
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>

                        <Typography variant="body1">{body}</Typography>

                        <LikeButton screamId={screamId}/>

                        <Typography className={classes.inline}>{likeCount} likes</Typography>

                        <CustomButton tip="Comments">
                            <CommentIcon />
                        </CustomButton>
                        
                        <Typography className={classes.inline}>{commentCount} comments</Typography>
                    </Grid>
                </Grid>

                <CommentForm screamId={screamId}/>

                {(comments) && (<Comments comments={comments} />)}
            </Fragment>
        );
 
        return (
            <Fragment>
                <CustomButton 
                tip="Expand" 
                onClick={this.handleOpen}
                btnClassName={classes.expandButton}>
                    <ArrowDownwardIcon color="primary"/>
                </CustomButton>

                <Dialog
                open={this.state.open} 
                onClose={this.handleClose}>
                    <DialogContent>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

ScreamDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    getScream: PropTypes.func.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapActionsToProps = {
    getScream,
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI,
    user: state.user
});

export default connect(
    mapStateToProps,
    mapActionsToProps,
)(withStyles(styles)(ScreamDialog));