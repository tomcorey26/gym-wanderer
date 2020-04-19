import React, { ChangeEvent } from 'react';
import throttle from 'lodash/throttle';
import {
  useRouter,
  useGoogleMapsApi,
  useFetchPlaceCoordinates,
} from '../hooks';
import { PlaceType } from '../types/Placetype';

const autocompleteService = { current: null };

interface Settings {
  withFormik?: boolean;
  setCoords?: (value: any) => void;
}
export const useGooglePlacesAutoComplete = (settings?: Settings) => {
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<PlaceType[]>([]);
  const [selectedPlace, setSelectedPlace] = React.useState<PlaceType | null>(
    null
  );
  const [locationString, setLocationString] = React.useState<string>('');
  const isGoogleMapsApiLoaded = useGoogleMapsApi();
  const coords = useFetchPlaceCoordinates(selectedPlace?.place_id);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAutoChange = (
    event: ChangeEvent<{}>,
    value: PlaceType | null
  ) => {
    event.preventDefault();

    if (value) {
      setSelectedPlace(value);
      setLocationString(value?.description);
    }
    //With formik
    if (settings?.withFormik) {
      return;
    }
    //without formik
    if (value && value.hasOwnProperty('place_id')) {
      router.history.push(`/search/?place_id=${value.place_id}`);
    } else {
      // modal push here?
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

  React.useEffect(() => {
    if (settings?.withFormik && selectedPlace?.place_id && settings.setCoords) {
      settings.setCoords(coords);
    }
  }, [selectedPlace?.place_id, coords]);

  return { options, handleAutoChange, handleChange, locationString };
};
