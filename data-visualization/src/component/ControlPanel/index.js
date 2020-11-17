import React from 'react';
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
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
          />
        </div>
      </Paper>
      <Paper className={classes.paper}>
        <h3>Sentiment model</h3>
        <FormControl component="fieldset">
          <FormLabel component="legend">Sentiment</FormLabel>
          <RadioGroup defaultValue="textblob" aria-label="sentiment" name="sentiment-model">
            <FormControlLabel value="textblob" control={<Radio />} label="textblob" />
            <FormControlLabel value="custom" control={<Radio />} label="custom" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Source</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox onChange={handleChange} name="twitter" />}
              label="Twitter"
            />
            <FormControlLabel
              control={<Checkbox onChange={handleChange} name="nyt" />}
              label="NYT"
            />
          </FormGroup>
        </FormControl>
      </Paper>
      <Button size="small">Update Chart</Button>
    </>
  );
};
