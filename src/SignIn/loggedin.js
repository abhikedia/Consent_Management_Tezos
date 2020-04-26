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
import history from '../history';

const styles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    root: {
        width: '100%',
        maxWidth: 500,
        flexGrow: 1,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
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
        //minWidth: 700
    },
}));

export default function LoggedIn(props) {

    const [options, setOptions] = React.useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        var url = "http://localhost:4000/getBookings/" + props.location.state.address;

        function createData(id, name, airline_address, to_, from_, date) {
            return { id, name, airline_address, to_, from_, date };
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
                row.push(createData(data[i].id, data[i].name, data[i].airline_address, data[i].to_, data[i].from_, data[i].date));
            setOptions(row)
        }).catch(err => {
            console.log('caught it!', err);
        })

        console.log(options)
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
                    <Button color="inherit" className={classes.button} onClick={() => {
                        history.push('/booking', { address: props.location.state.address });
                        window.location.reload();
                    }}><strong>Make Booking</strong></Button>
                </Toolbar>
            </AppBar>
            <Typography variant="h2" className={classes.root} component="h2" gutterBottom >
                <strong>My Bookings</strong>
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes1.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell >Airline</StyledTableCell>
                            <StyledTableCell align="center">Passenger's Name</StyledTableCell>
                            <StyledTableCell align="center">From</StyledTableCell>
                            <StyledTableCell align="center">To</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {options.map((options) => (
                            <StyledTableRow key={options.id}>
                                <StyledTableCell align="center" component="th" scope="row">{options.airline_address}</StyledTableCell>
                                <StyledTableCell align="center">{options.name}</StyledTableCell>
                                <StyledTableCell align="center">{options.from_}</StyledTableCell>
                                <StyledTableCell align="center">{options.to_}</StyledTableCell>
                                <StyledTableCell align="center">{options['date']}</StyledTableCell>
                                <StyledTableCell align="center"><Button variant="contained" color="secondary" onClick={handleClick}>Alter</Button></StyledTableCell>
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
                                            <Button>Modify Booking</Button>
                                            <Button>Cancel Booking</Button>
                                        </ButtonGroup>
                                    </Popover>
                                </div>
                            </StyledTableRow>
                            //</TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );


}

