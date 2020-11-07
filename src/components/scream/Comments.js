import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// MUI stuff
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

// React requires
const Link = require("react-router-dom").Link;
const dayjs = require('dayjs');

const styles = {
    avatar: {
        width: '100px',
        height: '100px',
    },
    divider: {
        margin: '20px 0',
    }
}

export class Comments extends Component {
    render() {
        const {
            classes
        } = this.props;

        const commentsMarkup = this.props.comments.map((comment, key) => 
            <div key={key}>
                <Grid container spacing={2} >
                    <Divider className={classes.divider}/>
                    <Grid item>
                        <Avatar 
                        className={classes.avatar}
                        alt={comment.userHandle}
                        src={comment.userImage}/>
                    </Grid>
                    <Grid item>
                        <Typography 
                        variant="h5" 
                        component={Link} 
                        to={`/users/${comment.userHandle}`}
                        color="primary"
                        >
                            {comment.userHandle}
                        </Typography>

                        <Typography variant="body2" color="textSecondary">
                            {dayjs(comment.createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>

                        <Typography variant="body1">{comment.body}</Typography>
                    </Grid>
                </Grid>
            </div>
        );

        return (
            <div>
                {commentsMarkup}
            </div>
        )
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default (withStyles(styles)(Comments));