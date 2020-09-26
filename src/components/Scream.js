import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

// DayJS
// import dayjs from 'dayjs';
// import relativeTime from 'dayjs/plugin/relativeTime';

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';

// Redux
import { connect } from 'react-redux';
import { 
    likeScream,
    unlikeScream
} from '../redux/actions/dataActions';

import PropTypes from 'prop-types';

// Icones
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// Custom
import CustomButton from './CustomButton';
import DeleteScream from './DeleteScream';

const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

// React requires
const Link = require("react-router-dom").Link;

const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        minWidth: 200,
    },
    content:{
        padding: 25,
        objectFit: 'cover',
        position: 'relative'
    }
}

class Scream extends Component {
    isScreamLikedByUser = () => {
        return (this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.scream.screamId))
    }

    handleLikeScream = () => {
        this.props.likeScream(this.props.scream.screamId);
    }

    handleUnlikeScream = () => {
        this.props.unlikeScream(this.props.scream.screamId);
    }

    render() {
        dayjs.extend(relativeTime);

        // Destructuring, même chose que: 
        // const classes = this.props.classes;
        const { 
            classes,  
            scream : {
                body, 
                createdAt, 
                userImage, 
                userHandle,
                likeCount,
                commentCount
            },
            user: {
                authenticated,
                credentials: {
                    handle,
                }
            }
        } = this.props; 

        const likeButton = !authenticated ? (
            <CustomButton tip="Like">
                <Link to="/login">
                    <FavoriteBorderIcon  color="primary"/>
                </Link>
            </CustomButton>
        ) : (
            this.isScreamLikedByUser() ? (
                <CustomButton tip="Unlike" onClick={this.handleUnlikeScream}>
                    <FavoriteIcon color="primary" />
                </CustomButton>
            ) : (
                <CustomButton tip="Like" onClick={this.handleLikeScream}>
                    <FavoriteBorderIcon  color="primary" />
                </CustomButton>
            )
        )
        
        return (
            <Card className={classes.card}>
                <CardMedia
                image={userImage}
                title="Profile image"
                className={classes.image}/>

                <CardContent 
                className={classes.content}>
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

                    {likeButton}
                    <span>{likeCount} likes</span>

                    <CustomButton tip="Comments">
                        <CommentIcon />
                    </CustomButton>
                    <span>{commentCount} comments</span>

                    { (authenticated && (userHandle === handle)) && (
                        <DeleteScream screamId={this.props.scream.screamId}/>
                    )}
                    
                </CardContent>
            </Card>
        );
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
}

// on prend les reducers du state global dont on a besoin, ici user
const mapStateToProps = (state) => ({
    user: state.user
})

// Passer les userActions dont on a besoin en props. Ici, uploadImage()
const mapActionsToProps = {
    likeScream,
    unlikeScream,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));