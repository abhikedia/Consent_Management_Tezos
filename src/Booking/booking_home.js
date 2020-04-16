import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import From from './from';
import To from './to';
import history from '../history';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { Router, Route } from 'react-router-dom';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: '100%',
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    paper1: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
});

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

class Booking extends React.Component {
    state = {
        from: "",
        to: "",
        open: false,
    }
    callbackfunction1 = async (childData) => {
        await this.setState({ from: childData.toString() })
        console.log(this.state.from)
    }
    callbackfunction2 = async (childData) => {
        await this.setState({ to: childData.toString() })
        console.log(this.state.to)
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            <strong>SHAttEr Technologies</strong>
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Make Your Booking
                            </Typography>
                        <React.Fragment>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12}>
                                    <From from={this.callbackfunction1} />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <To to={this.callbackfunction1} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        label="Select Date"
                                        fullWidth
                                        type="date"
                                        defaultValue="2017-05-24"
                                        onChange={this.myChangeHandler3}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Select Time"
                                        fullWidth
                                        type="time"
                                        defaultValue="10:30"
                                        onChange={this.myChangeHandler5}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        label="Passenger's Name"
                                        fullWidth
                                        onChange={this.myChangeHandler4}
                                        autoComplete="billing address-level2"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div>
                                        <Button variant="contained" color="secondary" onClick={this.handleOpen}>
                                            See Flights
                                            </Button>
                                        <Modal
                                            aria-labelledby="transition-modal-title"
                                            aria-describedby="transition-modal-description"
                                            className={classes.modal}
                                            open={this.state.open}
                                            onClose={this.handleClose}
                                            closeAfterTransition
                                            BackdropComponent={Backdrop}
                                            BackdropProps={{
                                                timeout: 500,
                                            }}
                                        >
                                            <Fade in={this.state.open}>
                                                <div className={classes.paper1}>
                                                    <h2 id="transition-modal-title">Transition modal</h2>
                                                    <p id="transition-modal-description">react-transition-group animates me.</p>
                                                </div>
                                            </Fade>
                                        </Modal>
                                    </div>
                                </Grid>
                                <div><strong>The transaction should be made with the traveller's account.</strong></div>
                                <Button variant="contained" color="secondary" fullWidth >
                                    Transact
                                </Button>
                            </Grid>
                        </React.Fragment>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Booking);