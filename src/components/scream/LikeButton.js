import React, { Component } from 'react';

// MUI
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

// Redux
import { connect } from 'react-redux';
import { 
    likeScream,
    unlikeScream
} from '../../redux/actions/dataActions';

import PropTypes from 'prop-types';

// Custom
import CustomButton from '../CustomButton';

// React requires
const Link = require("react-router-dom").Link;

export class LikeButton extends Component {
    isScreamLikedByUser = () => {
        return (this.props.user.likes 
            && this.props.user.likes.find(like => like.screamId === this.props.screamId))
    }

    handleLikeScream = (event) => {
        event.stopPropagation();

        this.props.likeScream(this.props.screamId);
    }

    handleUnlikeScream = (event) => {
        event.stopPropagation();

        this.props.unlikeScream(this.props.screamId);
    }

    render() {
        const {
            user: {
                authenticated
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
                <CustomButton 
                tip="Unlike" onClick={this.handleUnlikeScream}>
                    <FavoriteIcon color="primary" />
                </CustomButton>
            ) : (
                <CustomButton tip="Like" onClick={this.handleLikeScream}>
                    <FavoriteBorderIcon  color="primary" />
                </CustomButton>
            )
        )
        
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream,
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);