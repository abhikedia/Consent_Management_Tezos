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
});

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

class Booking extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <React.Fragment >
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            SHAttEr Technologies
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
                                    <From />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <To />
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
                                    <div><strong>The transaction should be made with the traveller's account.</strong></div>
                                </Grid>
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