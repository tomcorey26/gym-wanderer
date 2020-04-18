import React, { ChangeEvent } from 'react';
import throttle from 'lodash/throttle';
import { useRouter, useGoogleMapsApi } from '../hooks';
import { PlaceType } from '../types/Placetype';

const autocompleteService = { current: null };

interface Settings {
  withFormik: boolean;
}
export const useGooglePlacesAutoComplete = (settings?: Settings) => {
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<PlaceType[]>([]);
  const [locationString, setLocationString] = React.useState<string>('');
  const isGoogleMapsApiLoaded = useGoogleMapsApi();
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAutoChange = (
    event: ChangeEvent<{}>,
    value: PlaceType | null
  ) => {
    if (settings?.withFormik && value) {
      setLocationString(value?.description);
      return;
    }
    event.preventDefault();
    if (value && value.hasOwnProperty('place_id')) {
      router.history.push(`/search/?place_id=${value.place_id}`);
    } else {
      console.log(value + 'is not a valid place');
    }
  };

  const fetch = React.useMemo(
    () =>
      throttle((input: any, callback: any) => {
        (autocompleteService.current as any).getPlacePredictions(
          input,
          callback
        );
      }, 200),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (window as any).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: PlaceType[]) => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return { options, handleAutoChange, handleChange, locationString };
};
