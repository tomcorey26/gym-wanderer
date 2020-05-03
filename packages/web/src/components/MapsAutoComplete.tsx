import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import { useGooglePlacesAutoComplete, useGoogleMapsApi } from '../hooks';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

//Uncomment line 59-63 to use the api
export const GoogleMapsAutoComplete = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isGoogleMapsApiLoaded = useGoogleMapsApi();
  const {
    options,
    handleAutoChange,
    handleChange,
  } = useGooglePlacesAutoComplete();
  const classes = useStyles();

  return (
    <Autocomplete
      id="google-map-demo"
      style={{
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '1.5rem',
      }}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      autoHighlight
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      freeSolo
      onChange={handleAutoChange}
      // disableOpenOnFocus
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for Gyms"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
      )}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [
            match.offset,
            match.offset + match.length,
          ])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}
              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};
