import React from 'react';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    root: {
        width: '100%',
        maxWidth: 500,
        
      },
});

class Login extends React.Component {
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
                <Typography variant="h1" className={classes.root} component="h2" gutterBottom>
                    <strong>My Bookings</strong>
                </Typography>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(Login);   