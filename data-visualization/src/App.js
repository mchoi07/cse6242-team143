import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
    <>
      <h1>Sentiment Analysis for Stockmarket</h1>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            {companies.map((company, idx) => (
              <Tab id={`tab-${idx}`} label={company} />
            ))}
          </Tabs>
        </AppBar>
        {companies.map((company, idx) => (
          <TabPanel value={value} index={idx} chartData={props.appData[company]} />
        ))}
      </div>
    </>
  );
}
