/* eslint-disable no-use-before-define */
import React from 'react';
//import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function TagControl(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={props.items}
        getOptionLabel={(option) => option.name}
        // defaultValue={[top100Films[13]]}
        filterSelectedOptions
        onChange={props.onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label={props.label}
            placeholder={props.label}
          />
        )}
      />
    </div>
  );
}