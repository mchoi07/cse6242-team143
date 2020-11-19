import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, AppBar, Tabs, Tab } from '@material-ui/core';

import { ChartContainer } from './component/ChartContainer';

import config from './config/config.json';

function TabPanel(props) {
  const { value, index, chartData, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} {...other}>
      {value === index && <ChartContainer chartData={chartData} />}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    width: 1280,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function App(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { companies } = config;

  return (
    <div className={classes.root}>
      <Typography variant="h2" align="center">
        Sentiment Analysis for Stockmarket
      </Typography>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          {companies.map((company, idx) => (
            <Tab key={`tab-${idx}`} label={company} />
          ))}
        </Tabs>
      </AppBar>
      {companies.map((company, idx) => (
        <TabPanel
          key={`panel-${idx}`}
          value={value}
          index={idx}
          chartData={props.appData[company]}
        />
      ))}
    </div>
  );
}
