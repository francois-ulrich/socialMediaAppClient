// React
import React, { Component } from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';

// Components
import Scream from '../components/scream/Scream'
import Profile from '../components/profile/Profile'

// Redux
import { connect } from 'react-redux';
import { loadScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

// Custom
import PostScream from "../components/scream/PostScream";
import ScreamSkeleton from '../util/ScreamSkeleton';

class Home extends Component {

    componentDidMount() {
        this.props.loadScreams();
    }

    render() {
        const {
            data: {
                loading,
                screams,
            }
        } = this.props;

        console.log("screams:");
        console.log(screams);

        const screamsLoadedMarkup = screams.map((scream) => <Scream scream={scream} key={scream.screamId} />);

        const screamsLoadingMarkup = (
            <ScreamSkeleton />
        );

        const screamsMarkup = loading ? screamsLoadingMarkup : screamsLoadedMarkup;

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    <PostScream />

                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

Home.propTypes = {
    data: PropTypes.object.isRequired,
    loadScreams: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapActionsToProps = {
    loadScreams
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Home);
