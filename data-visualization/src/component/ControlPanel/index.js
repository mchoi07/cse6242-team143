import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

export const ControlPanel = (props) => {
  const classes = useStyles();
  const [normFactor, setNormFactor] = useState(1);
  const [selectedTextblob, setSelectedTextblob] = useState(true);
  const [selectedCustom, setSelectedCustom] = useState(true);
  const [source, setSource] = useState('twitter');
  const modelSelected = {
    textblob: selectedTextblob,
    custom: selectedCustom,
  };

  const handleCheckChange = (event) => {
    modelSelected[event.target.name] = event.target.checked;
    if (event.target.name === 'textblob') {
      setSelectedTextblob(event.target.checked);
    } else {
      setSelectedCustom(event.target.checked);
    }
    props.onChange({ normFactor, source, modelSelected });
  };

  const handleRadioChange = (event) => {
    setSource(event.target.defaultValue);
    props.onChange({ normFactor, source: event.target.defaultValue, modelSelected });
  };

  const handleButtonClick = (event) => {
    props.onChange({ normFactor, source, modelSelected });
  };

  return (
    <>
      <Paper className={classes.paper}>
        <h3>Stock Movement</h3>
        <div>
          <TextField
            label="normalization factor"
            type="number"
            fullWidth={true}
            inputProps={{ min: '0', max: '2', step: '0.1' }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={normFactor}
            onChange={(e) => {
              setNormFactor(+e.target.value);
            }}
          />
        </div>
      </Paper>
      <Paper className={classes.paper}>
        <h3>Sentiment Analysis</h3>
        <FormControl component="fieldset">
          <FormLabel component="legend">Source</FormLabel>
          <RadioGroup defaultValue="twitter" name="sentiment-model" onChange={handleRadioChange}>
            <FormControlLabel value="twitter" control={<Radio />} label="Twitter" />
            <FormControlLabel value="nytimes" control={<Radio />} label="NYTimes" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Source</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox onChange={handleCheckChange} checked={selectedTextblob} name="textblob" />
              }
              label="TextBlob"
            />
            <FormControlLabel
              control={
                <Checkbox onChange={handleCheckChange} checked={selectedCustom} name="custom" />
              }
              label="Custom"
            />
          </FormGroup>
        </FormControl>
      </Paper>
      <Button size="small" onClick={handleButtonClick}>
        Update Chart
      </Button>
    </>
  );
};
