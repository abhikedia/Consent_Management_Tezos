import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const steps = [
  { name: 'Step 1', desc: 'In a new tab, visit https://tezbridge.com/ to setup a new tezos account.' },
  { name: 'Step 2', desc: 'Again, In a new tab, visit https://faucet.tzalpha.net/., to get new account details' },
  { name: 'Step 3', desc: 'Give the confirmation of you not being a robot, and proceed.', },
  { name: 'Step 4', desc: 'Click on copy button and come back to the previous tab to link your account.', },
  { name: 'Step 5', desc: 'Click on import key and paste the copied data.', },
  { name: 'Step 6', desc: 'Give a name and password, then click Confirm', },
  { name: 'Step 7', desc: 'Click on Register button below, a new tab will open.' },
  { name: 'Step 8', desc: 'Click on Choose Signer->Local Managers dropdown, select your name and enter the password', },
  { name: 'Step 9', desc: 'Click on use as signer and you will be done', },
];

const styles = theme => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
});

class Submit extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Follow these steps to complete your registration.
      </Typography>
        <List disablePadding>
          {steps.map((product) => (
            <ListItem className={classes.listItem} key={product.name}>
              <ListItemText primary={product.name} secondary={product.desc} />
              <Typography variant="body2">{product.price}</Typography>
            </ListItem>))}
        </List>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Submit);