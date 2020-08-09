// React
import React, { Component } from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';

// Components
import Scream from '../components/Scream'

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
                    <p>Profile</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
