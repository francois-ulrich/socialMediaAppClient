import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

// MUI stuff
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
    },
    container: {
        marginBottom: '20px',
    },
    form: {
        marginBottom: '20px',
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
            UI: {
                loading,
                errors
            }
        } = this.props;

        return (
            <div className={classes.container}>
                <Divider className={classes.divider}/>
                <form noValidate onSubmit={this.handleSubmit}>
                    <FormControl 
                    className={classes.form}
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
                <Divider className={classes.divider}/>
            </div>
        )
    }
}

CommentForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    submitComment,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm));