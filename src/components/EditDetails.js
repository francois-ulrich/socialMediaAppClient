import React, { Component } from 'react';
import PropTypes from 'prop-types';

// MUI stuff
import { withStyles } from '@material-ui/core/styles';

import CustomButton from './CustomButton';
import EditIcon from '@material-ui/icons/Edit';

// MUI Form
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// Redux
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';

const styles = {
    editProfileDialog: { 
        width: "100%"
    }
};

export class EditDetails extends Component {
    constructor(){
        super();

        this.state = {
            open: false,
            bio : '',
            website : '',
            location : '',
        }
    }

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        });
    };

    handleClickOpen = () => {
        this.setState({open: true});
        this.mapUserDetailsToState(this.props.credentials);
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSave = () => {
        this.props.editUserDetails({
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        });

        this.handleClose();
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render(){
        const { classes } = this.props;

        return (
            <div>
                <CustomButton
                    tip="Edit profile details"
                    onClick={this.handleClickOpen}
                    btnClassName="button"
                >
                    <EditIcon color="primary" />
                </CustomButton>

                <Dialog className={classes.editProfileDialog}
                    open={this.state.open} 
                    onClose={this.handleClose} 
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit your details</DialogTitle>

                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="editBio"
                            label="Bio"
                            type="text"
                            fullWidth
                            multiline
                            row={4}
                            value={this.state.bio}
                            name="bio"
                            onChange={this.handleChange}
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="editWebsite"
                            name="website"
                            label="Website"
                            type="text"
                            fullWidth
                            value={this.state.website}
                            onChange={this.handleChange}
                        />
                    </DialogContent>

                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="editLocation"
                            name="location"
                            label="Location"
                            type="text"
                            fullWidth
                            value={this.state.location}
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Save edits
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
});

export default connect(
    mapStateToProps,
    {editUserDetails}
)(withStyles(styles)(EditDetails));