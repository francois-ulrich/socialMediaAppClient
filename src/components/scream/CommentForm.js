import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';

// Redux
import { connect } from 'react-redux';
import { 
    submitComment
} from '../../redux/actions/dataActions';

import PropTypes from 'prop-types';

const styles = {
    divider: {
        margin: '20px 0',
    }
}

export class CommentForm extends Component {
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

        this.props.submitComment(this.props.screamId, postData);
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
            <Fragment>
                <Divider className={classes.divider}/>
                <form noValidate onSubmit={this.handleSubmit}>
                    <FormControl 
                    fullWidth>
                        <TextField
                        id="body"
                        name="body"
                        onChange={this.handleChange}
                        multiline
                        rows={4}
                        placeholder="Post your response"
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
            </Fragment>
        )
    }
}

CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

// on prend les reducers du state global dont on a besoin, ici user
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

// Passer les userActions dont on a besoin en props. Ici, uploadImage()
const mapActionsToProps = {
    submitComment,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));