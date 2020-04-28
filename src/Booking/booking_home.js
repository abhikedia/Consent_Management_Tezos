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
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import img from '../assets/flight.jpg';
import history from '../history';
import { Tezos } from '@taquito/taquito';
import { TezBridgeSigner } from '@taquito/tezbridge-signer';

const contractAddress = "KT1X6q8unyUQ996t5VxcpJR4Ai9kopCQnXvB";

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    root: {
        maxWidth: 380,
    },
    media: {
        height: 140,
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

// function sleep(delay = 0) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, delay);
//     });
// }

class Booking extends React.Component {
    d = new Date();
    constructor(props) {
        super(props);
        this.state = {
            from: "",
            open: false,
            date: "",
            time: "",
            name: "",
            count: -1,
            to_: "",
            wallet: props.location.state.address,
            contract_instance: "",
            airline_add: "tz1R4p21KgEqHGcEvJcDe7hRZfjVZCX47EwJ"
        };
    }
    callbackfunction1 = async (childData) => {
        await this.setState({ from: childData.toString() })
        console.log(this.state.from)
    }
    callbackfunction2 = async (childData1) => {
        await this.setState({ to_: childData1.toString() })
        console.log(this.state.to_)
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    myChangeHandler1 = async (event) => {
        await this.setState({ date: event.target.value });
    }
    myChangeHandler2 = async (event) => {
        await this.setState({ time: event.target.value });
    }
    myChangeHandler3 = async (event) => {
        await this.setState({ name: event.target.value });
    }
    transact = async (event) => {
        var url = "http://localhost:4000/addBooking";

        const addr = this.state.date + this.state.time + this.state.airline_add;
        console.log(addr);
        const op = await this.state.contract_instance.methods.giveConsent(addr).send();
        if (op.status === "applied")
            console.log(op.hash);

        await fetch(url, {
            method: "POST", // or 'PUT'
            mode: "cors",
            body: JSON.stringify({
                id: this.state.count + 1,
                user_address: this.state.wallet,
                airline_address: this.state.airline_add,
                to_: this.state.to_,
                from_: this.state.from,
                time: this.state.time,
                date: this.state.date,
                name: this.state.name,
            }), // data can be `string` or {object}!    
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.body)
            .then(response => console.log("Success:", JSON.stringify(response)))
            .catch(error => console.error("Error:", error));

        history.push('/loggedin', { address: this.state.wallet });
        window.location.reload();
    }

    componentDidMount = async () => {
        Tezos.setProvider({
            rpc: "https://carthagenet.SmartPy.io",
            signer: new TezBridgeSigner()
        });

        const contract = await Tezos.contract.at(contractAddress);
        await this.setState({
            contract_instance: contract
        })


        var url = "http://localhost:4000/getCount";
        await fetch(url)
            .then(response => response.json())
            .then(response => {
                if (response.data.length === 0)
                    this.setState({ count: 0 });
                else
                    this.setState({ count: response.data[0].id });
            })
            .catch(err => console.log(err));
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
                                    <To to={this.callbackfunction2} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        required
                                        label="Select Date"
                                        fullWidth
                                        type="date"
                                        onChange={this.myChangeHandler1}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        label="Select Time"
                                        fullWidth
                                        type="time"
                                        onChange={this.myChangeHandler2}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        label="Passenger's Name"
                                        fullWidth
                                        onChange={this.myChangeHandler3}
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
                                                    <h2 id="transition-modal-title">Verify Booking</h2>
                                                    <p id="transition-modal-description"><strong>Note:</strong>The data shown here is only for demo purpose.</p>
                                                    <Card className={classes.root}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                                className={classes.media}
                                                                image={img}
                                                                title="itinerary"
                                                            />
                                                            <CardContent>
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    Your itinerary
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    <strong>Airline:</strong> ABC &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <strong>Aircraft:</strong> Airbus A320<br />
                                                                    <strong>Departure Date: </strong> {this.state.date} <br />
                                                                    <strong>Departure Time: </strong> {this.state.time} <br />
                                                                    <strong>From:</strong> {this.state.from} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <strong>To:</strong> {this.state.to_} <br />
                                                                    <strong>Passenger's Name:</strong> {this.state.name} <br />
                                                                    <strong>Airline's Address:</strong> {this.state.airline_add} (for demo)
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                    </Card>
                                                </div>
                                            </Fade>
                                        </Modal>
                                    </div>
                                </Grid>
                                <div><strong>The transaction should be made with the traveller's account.</strong></div>
                                <Button variant="contained" color="secondary" fullWidth onClick={this.transact}>
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