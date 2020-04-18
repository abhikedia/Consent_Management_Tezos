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
});

class AirlineLogin extends React.Component
{
    render()
    {
        const { classes } = this.props;
        return(
            <React.Fragment>
                <CssBaseline />
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            <strong>SHAttEr Technologies</strong>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </React.Fragment>
        );
    }
}
export default withStyles(styles)(AirlineLogin);