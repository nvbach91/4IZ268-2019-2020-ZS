import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { TextField, Button, Grid } from '@material-ui/core';

const styles = {
  root: {
    padding: '8px',
  },
  input: {
    width: '100%',
    height: '100%',
  },
};

class SearchBarComponent extends Component {
  onFormSubmit = (event) => {
    event.preventDefault();

    const { searchVideos } = this.props;
    searchVideos();
  };

  render() {
    const { searchPhrase, updateSearchPhrase, isSearching, classes } = this.props;
    return (
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={this.onFormSubmit}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <TextField
              label="Vyhledejte video"
              variant="outlined"
              value={searchPhrase}
              onChange={(e) => updateSearchPhrase(e.target.value)}
              placeholder="Vyhledej video"
              className={classes.input}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.onFormSubmit}
              disabled={isSearching || !searchPhrase}
              className={classes.input}
              size="large"
            >
              {isSearching ? 'Loading' : 'Hledej'}
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(SearchBarComponent);
