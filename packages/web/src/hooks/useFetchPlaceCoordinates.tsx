import React, { useState } from 'react';
const placeIdService = { current: null };
export const useFetchPlaceCoordinates = (placeId?: string) => {
  const [coordinates, setCoordinates] = useState({});

  React.useEffect(() => {
    if (!placeId) return;
    if (!placeIdService.current && (window as any).google) {
      placeIdService.current = new (window as any).google.maps.Geocoder();
    }
    if (!placeIdService.current) {
      return undefined;
    }

    (placeIdService.current as any).geocode({ placeId: placeId }, function (
      results,
      status
    ) {
      if (status === 'OK') {
        if (results[0]) {
          setCoordinates({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }, [placeId]);

  return coordinates;
};
