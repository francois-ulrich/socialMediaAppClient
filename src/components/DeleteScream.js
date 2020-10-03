import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';

import CustomButton from './CustomButton';

// MUI Form
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

// Redux
import { connect } from 'react-redux';
import { deleteScream } from '../redux/actions/dataActions';

const styles = {
    deleteButton:{
        position: 'absolute',
        top: 10,
        right: 10
    }
}
class DeleteScream extends Component {
    constructor(){
        super();
        
        this.state = {
            open: false,
        }
    }

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleDeleteScream = () => {
        this.props.deleteScream(this.props.screamId);
    }
    
    render(){
        const { classes } = this.props;

        return (
            <Fragment>
                <CustomButton 
                tip="Delete post" 
                onClick={this.handleClickOpen}
                btnClassName={classes.deleteButton}>
                    <DeleteIcon color="secondary"/>
                </CustomButton>

                <Dialog className={classes.editProfileDialog}
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Delete post</DialogTitle>

                    <DialogContent>
                        <DialogContentText>
                            Do you really want to delete your post? This action is irreversible.
                        </DialogContentText>
                    </DialogContent>
                    
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDeleteScream} color="secondary">
                            Delete away!
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

DeleteScream.propTypes = {
    classes: PropTypes.object.isRequired,
    deleteScream: PropTypes.func.isRequired,
}

// Passer les userActions dont on a besoin en props. Ici, uploadImage()
const mapActionsToProps = {
    deleteScream,
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
});

export default connect(
    mapStateToProps,
    mapActionsToProps,
)(withStyles(styles)(DeleteScream));