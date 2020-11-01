import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';


// MUI
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge';

// MUI Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions'

// React requires
const Link = require("react-router-dom").Link;

// DayJS
const dayjs = require('dayjs');
const relativeTime = require('dayjs/plugin/relativeTime');

export class Notifications extends Component {
    state = {
        anchorEl: null
    }

    handleOpen = (event) => {
        this.setState({
            anchorEl: event.target
        })
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    onMenuOpened = () => {
        let unreadNotifications = this.props.notifications.filter(not => not.read).map(not => not.notificationId);

        this.props.markNotificationsRead(unreadNotifications);
    }

    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        let notificationsIcon;

        if(notifications && notifications.length>0){
            var notificationsUnread = notifications.filter(not => not.read === false);

            notificationsUnread > 0
            ? (notificationsIcon = (
                <Badge badgeContent={notificationsUnread.length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            ))
            : (notificationsIcon = (
                <Badge badgeContent={notificationsUnread.length} color="secondary">
                    <NotificationsIcon />
                </Badge>
            ));
        } else {
            notificationsIcon = <NotificationsIcon />
        }

        let notificationsMarkup = 
            notifications && notifications.length > 0 ? (
                notifications.map(not => {
                    const verb = not.type === 'like' ? 'liked' : 'commented on';
                    const time = dayjs(not.createdAt).fromNow();

                    const iconColor = not.read ? 'primary' : 'secondary';

                    const icon = not.type === 'like' ? (
                        <FavoriteIcon color={iconColor} style={{ marginRight: 10 }}/>
                    ) : (
                        <ChatIcon color={iconColor} style={{ marginRight: 10 }}/>
                    );

                    return (
                        <MenuItem onClick={this.handleClose} key={not.notificationId}>
                            {icon}
                            <Typography
                            component={Link}
                            color="default"
                            variant="body1"
                            to={`/users/${not.recipient}/scream/${not.screamId}`}>
                                {not.sender} {verb} your post {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications yet!
                </MenuItem>
            );

        return (
            <Fragment>
                <Tooltip placement="top" title="Notifications">
                    <IconButton 
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleOpen}>
                        {notificationsIcon}
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClick={this.handleClose}
                    onEntered={this.onMenuOpened}>
                        {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.func.isRequired,
};

// on prend les reducers du state global dont on a besoin, ici user
const mapStateToProps = state => ({
    notifications: state.user.notifications
})

// Passer les userActions dont on a besoin en props. Ici, uploadImage()
const mapActionsToProps = {
    markNotificationsRead
}

export default connect(mapStateToProps, mapActionsToProps)(Notifications);