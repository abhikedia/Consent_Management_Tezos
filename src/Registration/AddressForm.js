import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


export default class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname:'',
      address:'',
      city:'',
      state:'',
      zip:'',
      country:''
    };
  }
  myChangeHandler1 = async (event) => {
    await this.setState({ firstname: event.target.value });
    this.props.parentCallback1(this.state.firstname);
  }
  myChangeHandler2 = async (event) => {
    await this.setState({ lastname: event.target.value });
    this.props.parentCallback2(this.state.lastname);
  }
  myChangeHandler3 = async (event) => {
    await this.setState({ address: event.target.value });
    this.props.parentCallback3(this.state.address);
  }
  myChangeHandler4 = async (event) => {
    await this.setState({ city: event.target.value });
    this.props.parentCallback4(this.state.city);
  }
  myChangeHandler5 = async (event) => {
    await this.setState({ state: event.target.value });
    this.props.parentCallback5(this.state.state);
  }
  myChangeHandler6 = async (event) => {
    await this.setState({ zip: event.target.value });
    this.props.parentCallback6(this.state.zip);
  }
  myChangeHandler7 = async (event) => {
    await this.setState({ country: event.target.value });
    this.props.parentCallback7(this.state.country);
  }
  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Permanent Address
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="First name"
              fullWidth
              onChange={this.myChangeHandler1}
              autoComplete="fname"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Last name"
              fullWidth
              onChange={this.myChangeHandler2}
              autoComplete="lname"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              label="Address line 1"
              fullWidth
              onChange={this.myChangeHandler3}
              autoComplete="billing address-line1"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="City"
              fullWidth
              onChange={this.myChangeHandler4}
              autoComplete="billing address-level2"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField 
            label="State/Province/Region" 
            fullWidth 
            onChange={this.myChangeHandler5}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Zip / Postal code"
              fullWidth
              onChange={this.myChangeHandler6}
              autoComplete="billing postal-code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              label="Country"
              fullWidth
              onChange={this.myChangeHandler7}
              autoComplete="billing country"
            />
          </Grid>

        </Grid>
      </React.Fragment>
    );
  }
}