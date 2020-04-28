import React from 'react';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Popover from '@material-ui/core/Popover';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import { Tezos } from '@taquito/taquito';
import { TezBridgeSigner } from '@taquito/tezbridge-signer';
//import history from '../history';

const swarm = require("swarm-js").at("http://swarm-gateways.net");
const contractAddress = "KT1X6q8unyUQ996t5VxcpJR4Ai9kopCQnXvB";
const CryptoJS = require('crypto-js');

const styles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    root: {
        width: '100%',
        maxWidth: 500,
        flexGrow: 1,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    button: {
        marginLeft: theme.spacing(190)
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },

    },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
    table: {
        maxWidth: 1500,
        marginLeft: 200,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(50),
        marginBottom: theme.spacing(50)
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
}));

export default function LoggedIn(props) {

    const [options, setOptions] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [contract_instance, setContract] = React.useState(null);
    const [open1, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose1 = () => {
        setOpen(false);
    };

    React.useEffect(async () => {
        Tezos.setProvider({
            rpc: "https://carthagenet.SmartPy.io",
            signer: new TezBridgeSigner()
        });

        const contract = await Tezos.contract.at(contractAddress);
        setContract(contract);
        var url = "http://localhost:4000/getPassengers/" + "tz1R4p21KgEqHGcEvJcDe7hRZfjVZCX47EwJ";

        function createData(id, name, user_address, to_, from_, time, date) {
            return { id, name, user_address, to_, from_, time, date };
        }

        fetch(url, {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(data => {
            const row = [];
            for (var i in data)
                row.push(createData(data[i].id, data[i].name, data[i].user_address, data[i].to_, data[i].from_, data[i].time, data[i].date));
            setOptions(row)
        }).catch(err => {
            console.log('caught it!', err);
        })


    }, [])

    const classes = styles();
    const classes1 = useStyles();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

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
            <Typography variant="h2" className={classes.root} component="h2" gutterBottom >
                <strong>Bookings</strong>
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes1.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Passenger's Address</StyledTableCell>
                            <StyledTableCell align="center">Passenger's Name</StyledTableCell>
                            <StyledTableCell align="center">From</StyledTableCell>
                            <StyledTableCell align="center">To</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="center">Time</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {options.map((options) => (
                            <StyledTableRow key={options.id}>
                                <StyledTableCell align="center" component="th" scope="row">{options.user_address}</StyledTableCell>
                                <StyledTableCell align="center">{options.name}</StyledTableCell>
                                <StyledTableCell align="center">{options.from_}</StyledTableCell>
                                <StyledTableCell align="center">{options.to_}</StyledTableCell>
                                <StyledTableCell align="center">{options.date}</StyledTableCell>
                                <StyledTableCell align="center">{options.time}</StyledTableCell>
                                <StyledTableCell align="center"><Button variant="contained" color="secondary" onClick={handleClick}>Contact</Button></StyledTableCell>
                                <div>
                                    <Popover
                                        //id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                    >
                                        <ButtonGroup
                                            orientation="vertical"
                                            color="primary"
                                            aria-label="vertical contained primary button group"
                                            variant="text"
                                        >
                                            <div>
                                                <Button onClick={handleOpen}>
                                                    Message
                                                </Button>
                                                <Modal
                                                    aria-labelledby="transition-modal-title"
                                                    aria-describedby="transition-modal-description"
                                                    className={classes1.modal}
                                                    open={open1}
                                                    onClose={handleClose1}
                                                    closeAfterTransition
                                                    BackdropComponent={Backdrop}
                                                    BackdropProps={{
                                                        timeout: 500,
                                                    }}
                                                >
                                                    <Fade in={open1}>
                                                        <div className={classes1.paper}>
                                                            <div>
                                                                <TextField
                                                                    id="outlined-multiline-static"
                                                                    label="Send your passenger a message"
                                                                    multiline
                                                                    fullWidth
                                                                    value={value}
                                                                    onChange={e => setValue(e.target.value)}
                                                                    rows={6}
                                                                    variant="outlined"
                                                                />
                                                            </div>
                                                            <Button variant="contained" color="secondary" fullWidth onClick={async () => {
                                                                const storage = await contract_instance.storage();
                                                                const temp = JSON.stringify(storage.get(options.user_address));
                                                                const result = JSON.parse(temp);
                                                                var flag = 1;
                                                                for (var i = 0; i < result.allowed.length; i++) {
                                                                    const addr = options.date + options.time + "tz1R4p21KgEqHGcEvJcDe7hRZfjVZCX47EwJ";
                                                                    if (result.allowed[i].localeCompare(addr) == 0) {
                                                                        flag = 0;
                                                                        swarm.download(result.qid).then(async array => {
                                                                            const str = swarm.toString(array);
                                                                            const bytes = CryptoJS.AES.decrypt(str, 'SHAttErTechnologies');
                                                                            const originalText = bytes.toString(CryptoJS.enc.Utf8);
                                                                            const answer = JSON.parse(originalText);
                                                                            console.log(answer.phone);
                                                                            console.log(value)
                                                                            await fetch("https://inteltech.p.rapidapi.com/send.php", {
                                                                                "method": "POST",
                                                                                "headers": {
                                                                                    "x-rapidapi-host": "inteltech.p.rapidapi.com",
                                                                                    "x-rapidapi-key": "4610a357fbmsh24f9687c37c28dbp14e889jsnac3da36d88ea",
                                                                                    "content-type": "application/x-www-form-urlencoded"
                                                                                },
                                                                                "body": {
                                                                                    "schedule": "1377959755",
                                                                                    "senderid": "MyCompany",
                                                                                    "return": "http://yourwebsite.com",
                                                                                    "username": "mogosa7105@iopmail.com",
                                                                                    "key": "841BB4B1-CC25-780C-C265-ED63A161968E",
                                                                                    "sms": parseInt(answer.phone),
                                                                                    "message": value
                                                                                }
                                                                            })
                                                                                .then(response => {
                                                                                    console.log(response);
                                                                                    window.location.reload();
                                                                                })
                                                                                .catch(err => {
                                                                                    console.log(err);
                                                                                });
                                                                        });
                                                                        break;
                                                                    }
                                                                }
                                                                if (flag === 1)
                                                                    alert("You don't have access to this data.");
                                                            }}>Send</Button>
                                                        </div>
                                                    </Fade>
                                                </Modal>
                                            </div>
                                            <Button>Call</Button>
                                        </ButtonGroup>
                                    </Popover>
                                </div>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

