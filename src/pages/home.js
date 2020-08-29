// React
import React, { Component } from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';

// Components
import Scream from '../components/Scream'
import Profile from '../components/Profile'

// Axios
import axios from 'axios';

export class home extends Component {
    state = {
        screams : null,
    }

    componentDidMount(){
        axios.get('/screams')
        .then(res => {
            this.setState({
                screams: res.data
            })
        })
        .catch(err => console.log(err));
    }

    render() {
        let recentScreamsMarkup = this.state.screams ? (
            this.state.screams.map( (scream, index) => <Scream data={scream} key={index}/>)
        ) : <p>Loading...</p>;


        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentScreamsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

export default home
