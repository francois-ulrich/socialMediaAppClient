import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

// Redux
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

// Icones
import CommentIcon from '@material-ui/icons/Comment';

// Custom
import CustomButton from '../CustomButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

// React requires
const Link = require("react-router-dom").Link;

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image: {
        minWidth: 200,
    },
    content:{
        padding: 25,
        flexGrow: 1
    },
    inline: {
        display: 'inline'
    }
}

class Scream extends Component {

    render() {
        dayjs.extend(relativeTime);

        // Destructuring, même chose que: 
        const { 
            classes,  
            scream : {
                body, 
                createdAt, 
                userImage, 
                userHandle,
                likeCount,
                commentCount,
                screamId
            },
            user: {
                authenticated,
                credentials: {
                    handle,
                }
            }
        } = this.props; 

        return (
            <Card className={classes.card}>

                <CardMedia
                image={userImage}
                title="Profile image"
                className={classes.image}/>

                <CardContent className={classes.content}>
                    <Typography 
                    variant="h5" 
                    component={Link} 
                    to={`/users/${userHandle}`}
                    color="primary"
                    >
                        {userHandle}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>

                    <LikeButton screamId={screamId}/>

                    <Typography className={classes.inline}>{likeCount} likes</Typography>

                    <CustomButton tip="Comments">
                        <CommentIcon />
                    </CustomButton>
                    <Typography className={classes.inline}>{commentCount} comments</Typography>

                    { (authenticated && (userHandle === handle)) && (
                        <DeleteScream screamId={this.props.scream.screamId}/>
                    )}

                    <ScreamDialog screamId={this.props.scream.screamId}/>
                    
                </CardContent>
            </Card>
        );
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

// on prend les reducers du state global dont on a besoin, ici user
const mapStateToProps = (state) => ({
    user: state.user
})

// Passer les userActions dont on a besoin en props. Ici, uploadImage()
const mapActionsToProps = {}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));