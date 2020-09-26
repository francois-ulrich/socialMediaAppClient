import React, { Component, Fragment } from 'react';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../redux/actions/userActions';

// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Custom components
import CustomButton from './CustomButton'

// MUI Icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';



// React requires
const Link = require("react-router-dom").Link;

class Navbar extends Component {

    handleLogout = (e) => {
        this.props.logoutUser();
    }

    render() {
        const { authenticated } = this.props;

        const authenticatedButtons = (
            <Fragment>
                <CustomButton tip="Post a Scream!">
                    <PostAddIcon/>
                </CustomButton>

                <CustomButton tip="Home">
                    <HomeIcon />
                </CustomButton>

                <CustomButton tip="Notifications">
                    <NotificationsIcon/>
                </CustomButton>

                <CustomButton
                    tip="Logout"
                    onClick={this.handleLogout}
                    btnClassName="button"
                >
                    <ExitToAppIcon/>
                </CustomButton>
            </Fragment>
        );

        const unAuthenticatedButtons = (
            <Fragment>
                <CustomButton color="inherit" component={Link} to="/login" tip="Login">
                    <AccountCircleIcon/>
                </CustomButton>

                <CustomButton color="inherit" component={Link} to="/signup" tip="Signup">
                    <PersonAddIcon/>
                </CustomButton>
            </Fragment>
        );

        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/">
                        <Typography variant="h6" noWrap>
                            The Social Francis
                        </Typography>
                    </Button>
                    { authenticated ? authenticatedButtons : unAuthenticatedButtons }
                </Toolbar>
            </AppBar>
        );
    }
}


Navbar.propTypes = {
    authenticated : PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
});

const mapActionsToProps = {
    logoutUser
}

export default connect(
    mapStateToProps,
    mapActionsToProps,
)(Navbar);
