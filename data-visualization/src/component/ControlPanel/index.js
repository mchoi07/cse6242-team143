import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
} from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      width: 200,
      padding: '8 16',
    },
    cardTitle: {
      textAlign: 'center',
    },
    cardAction: {
      textAlign: 'center',
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
    <Box alignItems="center" justifyContent="center">
      <Card className={classes.card}>
        <h3 className={classes.cardTitle}>Stock Movement</h3>
        <CardContent>
          <TextField
            className={classes.input}
            label="normalization factor"
            type="number"
            fullWidth={true}
            inputProps={{ min: 1, max: 5, step: '0.1', style: { textAlign: 'right' } }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={normFactor}
            onChange={(e) => {
              setNormFactor(+e.target.value);
            }}
          />
        </CardContent>
        <CardActions className={classes.cardAction}>
          <Button size="small" variant="outlined" onClick={handleButtonClick}>
            Apply
          </Button>
        </CardActions>
      </Card>
      <Card className={classes.card}>
        <h3 className={classes.cardTitle}>Sentiment Analysis</h3>
        <CardContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Source</FormLabel>
            <RadioGroup defaultValue="twitter" name="sentiment-model" onChange={handleRadioChange}>
              <FormControlLabel value="twitter" control={<Radio />} label="Twitter" />
              <FormControlLabel value="nytimes" control={<Radio />} label="NYTimes" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Model</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={handleCheckChange}
                    checked={selectedTextblob}
                    name="textblob"
                  />
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
        </CardContent>
      </Card>
    </Box>
  );
};
