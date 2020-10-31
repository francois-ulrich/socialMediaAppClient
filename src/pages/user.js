// React
import React, { Component } from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';

// Components
import Scream from '../components/scream/Scream'
import StaticProfile from '../components/profile/StaticProfile'

// Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

import axios from 'axios';

// // Custom
// import PostScream from "../components/scream/PostScream";

class user extends Component {
    state = {
        profile: null,
        screamIdParam: null,
    }

    componentDidMount(){
        // Get handle
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if(screamId){
            this.setState({ screamIdParam: screamId })
        }

        this.props.getUserData(handle);

        // Set user data in state
        axios.get(`/user/${handle}`)
        .then( res => {
            console.log(res);

            this.setState({
                profile: res.data.credentials
            })
        })
        .catch(err => console.log(err));
    }

    render() {
        const  {screams, loading } = this.props.data;
        const { screamIdParam } = this.state;

        console.log("screamIdParam");
        console.log(screamIdParam);

        const screamsLoadedMarkup = 
        screams === null ? 
        <p>This user hasn't posted anything... yet!</p> 
        :
        (
            !screamIdParam ?
            screams.map( scream => <Scream scream={scream} key={scream.screamId} />)
            :
            screams.map( (scream) => {
                if(scream.screamId !== screamIdParam){
                    return <Scream scream={scream} key={scream.screamId}/>;
                }else{
                    return <Scream scream={scream} key={scream.screamId} openDialog />;
                }
                
            })
        );

        const screamsLoadingMarkup = (
            <p>Loading...</p>
        );

        const screamsMarkup = loading ? screamsLoadingMarkup : screamsLoadedMarkup;

        // Profile markup
        const profileMarkup = this.state.profile === null ? (
            <p>Loading profile...</p>
        ) : (
            <StaticProfile profile={this.state.profile}/>
        );

        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {screamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {profileMarkup}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    data: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired,
}

// on prend les reducers du state global dont on a besoin, ici user
const mapStateToProps = (state) => ({
    data: state.data
})

// Passer les userActions dont on a besoin en props. Ici, uploadImage()
const mapActionsToProps = {
    getUserData
}

export default connect(
    mapStateToProps,
    mapActionsToProps
)(user);