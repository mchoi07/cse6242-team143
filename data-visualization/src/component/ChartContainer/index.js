import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ChartPanel } from '../ChartPanel';
import { ControlPanel } from '../ControlPanel';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
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
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <ControlPanel />
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <ChartPanel />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
