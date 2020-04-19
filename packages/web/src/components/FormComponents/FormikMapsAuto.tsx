import React, { ChangeEvent } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import { useGooglePlacesAutoComplete } from '../../hooks';
import { AutoCompleteField } from './AutoCompleteField';
import { useField } from 'formik';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

//Uncomment line 59-63 to use the api
export const FormikMapsAuto: React.FC = () => {
  const [_, __, { setValue }] = useField({ name: 'coordinates' });
  const {
    options,
    handleAutoChange,
    handleChange,
    locationString,
  } = useGooglePlacesAutoComplete({ withFormik: true, setCoords: setValue });
  const classes = useStyles();

  return (
    <Autocomplete
      id="google-map-demo"
      style={{
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
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
        <AutoCompleteField
          placeholder="Location"
          name="location"
          {...params}
          onChange={handleChange}
          autoVal={locationString}
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
