import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default class PaymentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      aadhar:'',
      email:'',
    };
  }
  myChangeHandler8 = async (event) => {
    await this.setState({ mobile: event.target.value });
    this.props.parentCallback8(this.state.mobile);
  }
  myChangeHandler9 = async (event) => {
    await this.setState({ aadhar: event.target.value });
    this.props.parentCallback9(this.state.aadhar);
  }
  myChangeHandler10 = async (event) => {
    await this.setState({ email: event.target.value });
    this.props.parentCallback10(this.state.email);
  }
  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Contact Details
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField required label="Contact Number" type="Number" fullWidth onChange={this.myChangeHandler8}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required label="Aadhar Number" type="Number" fullWidth onChange={this.myChangeHandler9}/>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <TextField required label="Email" fullWidth onChange={this.myChangeHandler10}/>
          </Grid>

        </Grid>
      </React.Fragment>
    );
  }
}