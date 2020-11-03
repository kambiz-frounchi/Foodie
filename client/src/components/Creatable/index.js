/* eslint-disable no-use-before-define */
import React from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function Creatable(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
<<<<<<< HEAD
      <Autocomplete
        // getOptionSelected={(option, value) => option.name == value.name}
        multiple
        id="tags-outlined"
        options={props.items}
        value={props.value}
        getOptionLabel={(option) => option.name}
=======
      <TextField
        id="standard-basic"
        label="Ingredient"
        onChange={props.onInputChange}
      />
      <Button variant="contained" color="primary" onClick={props.onClick}>
        Add
      </Button>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={props.items}
        value={props.added}
        getOptionLabel={(option) => option.name}
        // defaultValue={[top100Films[13]]}
>>>>>>> d5a913ae67adda23e84b2203ce6d84c5fc8924ff
        filterSelectedOptions
        onChange={props.onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
<<<<<<< HEAD
            label={`${props.label}s`}
            placeholder={props.label}
          />
        )}
      />
      <span>Add New Ingredient:</span>
      <br></br>
      <div>
        <TextField
          id="standard-basic"
          label={props.label}
          onChange={props.onInputChange}
        />
        <Button variant="contained" color="primary" onClick={props.onClick}>
          Add
        </Button>
      </div>
=======
            label={props.label}
            placeholder="Favorites"
          />
        )}
      />
>>>>>>> d5a913ae67adda23e84b2203ce6d84c5fc8924ff
    </div>
  );
}
