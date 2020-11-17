import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ChartPanel } from '../ChartPanel';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

export const ChartContainer = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>stock chart selector</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>model selector</Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <ChartPanel />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
