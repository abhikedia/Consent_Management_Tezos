import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import ContactDetails from './ContactDetails';
import Submit from './submit';
import history from '../history';
import { Tezos } from '@taquito/taquito';
import { TezBridgeSigner } from '@taquito/tezbridge-signer';

const contractAddress = "KT1X6q8unyUQ996t5VxcpJR4Ai9kopCQnXvB";
const swarm = require("swarm-js").at("http://swarm-gateways.net");
const CryptoJS = require('crypto-js');
const tezbridge = window.tezbridge;


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
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
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});


class Register extends React.Component {
  state = {
    activeStep: 0,
    steps: ['Personal Details', 'Contact Details', 'Submit'],
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    aadhar: "",
    email: "",
    wallet: "",
    hash: "",
    contract_instance: ""
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm parentCallback1={this.callbackFunction1}
          parentCallback2={this.callbackFunction2}
          parentCallback3={this.callbackFunction3}
          parentCallback4={this.callbackFunction4}
          parentCallback5={this.callbackFunction5}
          parentCallback6={this.callbackFunction6}
          parentCallback7={this.callbackFunction7}
        />;
      case 1:
        return <ContactDetails
          parentCallback8={this.callbackFunction8}
          parentCallback9={this.callbackFunction9}
          parentCallback10={this.callbackFunction10}
        />;
      case 2:
        return <Submit parentCallback11={this.callbackFunction11} />;
      default:
        throw new Error('Unknown step');
    }
  }
  callbackFunction1 = (childData) => {
    this.setState({ firstname: childData })
  }
  callbackFunction2 = (childData) => {
    this.setState({ lastname: childData })
  }
  callbackFunction3 = (childData) => {
    this.setState({ address: childData })
  }
  callbackFunction4 = (childData) => {
    this.setState({ city: childData })
  }
  callbackFunction5 = (childData) => {
    this.setState({ state: childData })
  }
  callbackFunction6 = (childData) => {
    this.setState({ zip: childData })
  }
  callbackFunction7 = (childData) => {
    this.setState({ country: childData })
  }
  callbackFunction8 = (childData) => {
    this.setState({ phone: childData })
  }
  callbackFunction9 = (childData) => {
    this.setState({ aadhar: childData })
  }
  callbackFunction10 = (childData) => {
    this.setState({ email: childData })
  }
  callbackFunction11 = (childData) => {
    this.setState({ wallet: childData })
  }

  handleNext = async () => {
    if (this.state.activeStep === 1) {
      const body = JSON.stringify({
        "firstname": this.state.firstname,
        "lastname": this.state.lastname,
        "address": this.state.state,
        "city": this.state.city,
        "state": this.state.state,
        "zip": this.state.zip,
        "country": this.state.country,
        "phone": this.state.phone,
        "aadhar": this.state.aadhar,
        "email": this.state.email
      });

      await swarm.upload(CryptoJS.AES.encrypt(body, 'SHAttErTechnologies').toString()).then(hash1 => {
        this.setState({
          hash: hash1
        });
      })
      console.log("Swarm id:", this.state.hash);
      console.log(this.state.contract_instance.methods);
    }
    if (this.state.activeStep === 2) {
      tezbridge.request({
        method:'set_host',
        host:'https://carthagenet.SmartPy.io'
      })
      console.log(this.state.wallet);
      const op = await this.state.contract_instance.methods.addQid(this.state.hash).send();
      if (op.status === "applied") {
        console.log(op.hash);

        history.push('/login', { address: this.state.wallet });
        window.location.reload();

      }
    }
    this.setState({
      activeStep: this.state.activeStep + 1
    })

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

  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
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
              Registration Form
          </Typography>
            <Stepper activeStep={this.state.activeStep} className={classes.stepper}>
              {this.state.steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {this.state.activeStep === this.state.steps.length ? (
                <React.Fragment>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {this.getStepContent(this.state.activeStep)}
                    <div className={classes.buttons}>
                      {this.state.activeStep !== 0 && (
                        <Button onClick={this.handleBack} className={classes.button}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {this.state.activeStep === this.state.steps.length - 1 ? 'Register' : 'Next'}
                      </Button>
                    </div>
                  </React.Fragment>
                )}
            </React.Fragment>
          </Paper>

        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Register);