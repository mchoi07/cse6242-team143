import React, { useState } from 'react';
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
  const initialData = [
    { label: 'stock', values: props.chartData.stock },
    { label: 'textblob', values: props.chartData.sentiment['twitter'].textblob },
    { label: 'custom', values: props.chartData.sentiment['twitter'].custom },
  ];
  const [chartData, setChartData] = useState(initialData);

  const onControlChange = (control) => {
    const { normFactor, source, modelSelected } = control;
    let data = [
      {
        label: 'stock',
        values: props.chartData.stock.map((el) => {
          return { ...el, y: el.y * normFactor };
        }),
      },
    ];
    if (modelSelected.textblob)
      data.push({ label: 'textblob', values: props.chartData.sentiment[source].textblob });
    if (modelSelected.custom)
      data.push({ label: 'custom', values: props.chartData.sentiment[source].custom });
    setChartData(data);
  };

  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <ControlPanel onChange={onControlChange} />
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <ChartPanel data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
