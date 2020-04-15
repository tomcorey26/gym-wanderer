import React from 'react';
import { loadScript } from '../utils/';
import { key } from '../key';

export const useGoogleMapsApi = () => {
  const loaded = React.useRef(false);
  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`,
        document.querySelector('head'),
        'google-maps'
      );
    }

    loaded.current = true;
  }

  return loaded.current;
};
