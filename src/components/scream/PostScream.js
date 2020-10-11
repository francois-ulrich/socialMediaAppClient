import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { connect } from 'react-redux';
import { 
    postScream
} from '../../redux/actions/dataActions';

import PropTypes from 'prop-types';

// React requires

const styles = {
    card: {
        position: 'relative',
        marginBottom: 40,
        display:'flex',
    },
    image: {
        minWidth: 150,
        opacity: 0.5
    },
    content:{
        padding: '10px!important',
        flexGrow: 1
    },
    form:{
        width:'100%'
    },
    postTextInput:{
        marginBottom: 20
    }
}

class PostScream extends Component {
    constructor(){
        super()

        this.state = {
            body: "",
            errors: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.UI.errors !== prevState.errors){
            return {
                errors: nextProps.UI.errors
            }
        }else{
            if (prevState.errors !== nextProps.UI.errors && !nextProps.UI.loading) {
                return {
                    body:"",
                    errors: {}
                };
            }
        }

        return null;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const postData = {
            body: this.state.body,
        }

        this.props.postScream(postData);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { 
            classes,
            user: {
                credentials: {
                    imageUrl,
                }
            },
            UI: {
                loading,
                errors
            }
        } = this.props;

        return (
            <Card className={classes.card}>
                <CardMedia
                image={imageUrl}
                title="Profile image"
                className={classes.image}/>

                <CardContent 
                className={classes.content}>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <FormControl 
                        fullWidth>
                            <TextField
                            id="body"
                            name="body"
                            onChange={this.handleChange}
                            multiline
                            rows={4}
                            placeholder="What's on your mind?"
                            className={classes.postTextInput}
                            value={this.state.body}
                            error={(errors && errors.body) ? true : false}
                            helperText={errors && errors.body}
                            />
                        </FormControl>

                        {loading ? (
                            <CircularProgress></CircularProgress>
                        ) : (
                            <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            disabled={ loading }>
                                Submit
                            </Button>
                        )}
                    </form>
                </CardContent>
            </Card>
        );
    }
}

PostScream.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    postScream: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
}

// on prend les reducers du state global dont on a besoin, ici user
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

// Passer les userActions dont on a besoin en props. Ici, uploadImage()
const mapActionsToProps = {
    postScream,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostScream));