import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import history from '../history';
import { Tezos } from '@taquito/taquito';
import { TezBridgeSigner } from '@taquito/tezbridge-signer';

const contractAddress = "KT1XnADPsMgAvRCjJPW396hcYPNZWMDqFgR4";

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: theme.spacing(42)
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends React.Component {
    componentDidMount = async () => {
        Tezos.setProvider({
            rpc: "https://carthagenet.SmartPy.io",
            signer: new TezBridgeSigner()
        });

        const contract = await Tezos.contract.at(contractAddress);
        await this.setState({
            contract_instance: contract
        })
        alert("Your account has been registered.");
    }
    constructor(props) {
        super(props);
        this.state = {
            wallet: props.location.state.address,
            contract_instance: ''
        }
    }


    checkLogin = async () => {

        const storage = await this.state.contract_instance.storage();
        console.log(storage.get(this.state.wallet));
        if (storage.get(this.state.wallet) == "")
            alert("User Not Registered, Please Register")
        else {
            history.push('/loggedin', { address: this.state.wallet });
            window.location.reload();
        }
    }
    render() {
        const { classes } = this.props;

        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.checkLogin}
                                className={classes.submit}
                            >
                                Sign In 
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link variant="body2" onClick={() => {
                                        history.push('/');
                                        window.location.reload();
                                    }}>
                                        {"Don't have an account? Register"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
        );
    }
}
export default (withStyles(styles))(Login);