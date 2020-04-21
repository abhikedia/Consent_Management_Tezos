import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

const tezbridge = window.tezbridge;

const steps = [
  { name: 'Step 1', desc: 'In a new tab, visit https://faucet.tzalpha.net/., to get new account details' },
  { name: 'Step 2', desc: 'Give the confirmation of you not being a robot, and proceed.', },
  { name: 'Step 3', desc: 'Click on copy button and click on Setup Account button below.', },
  { name: 'Step 4', desc: 'Click on import key and paste the copied data.', },
  { name: 'Step 5', desc: 'Give a name and password, then click Confirm', },
  { name: 'Step 6', desc: 'Click on Choose Signer->Local Managers dropdown, select your name and enter the password', },
  { name: 'Step 7', desc: 'Click on use as signer and you are done.', },
  { name: 'Step 8', desc: "Move back to application's page and click on Register.", },
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
  constructor(props) {
    super(props);
  }
  setup = async () => {
    const address = await tezbridge.request({ method: 'get_source' });
    console.log(address);
    this.props.parentCallback11(address);
  }
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
        <Button variant="contained" color="secondary" fullWidth onClick={this.setup}>Setup Account</Button>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Submit);