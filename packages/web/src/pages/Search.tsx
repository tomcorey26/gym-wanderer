import React, { useEffect, useContext, useState } from 'react';
import MapsSideScroller from '../components/MapsSideScroller';
import { Coords } from '../types/Coords';
import {
  useCurrentGeolocation,
  useInputValue,
  useGoogleMapsApi,
  useFetchPlaceCoordinates,
} from '../hooks';
import GoogleMapReact from 'google-map-react';
import MapPoint from '../components/MapPoint';
import RadiusSelect from '../components/RadiusSelect';
import axios from 'axios';
import SearchFilter from '../components/SearchFilter';
import { SearchContext } from '../context/SearchState';
import { useLocation } from 'react-router-dom';
import { isWithinDistance } from '../utils';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: React.FC = () => {
  const geo = useCurrentGeolocation();
  const { gyms, radiusDist, zoom, dispatch } = useContext(SearchContext);
  const { value, onChange } = useInputValue('');
  const [{ lat, lng }, setCoords] = useState<Coords>({ lat: 0, lng: 0 });
  const [error, setError] = useState<string>('');
  let query = useQuery();

  console.log('lat,lng', lat, lng);

  const handleMapApiLoaded = (map, maps) => {
    const geoService = new maps.Geocoder();

    geoService.geocode({ placeId: query.get('place_id') }, (response) => {
      if (!response[0]) {
        console.error("Can't find the address");
        setError("Can't find the address");
        // if empty, set to original location
        setCoords({ lat, lng });
        return;
      }
      const { location } = response[0].geometry;
      setCoords({ lat: location.lat(), lng: location.lng() });
    });
  };

  let filteredGyms = gyms;
  //filter by gyms inside radius
  filteredGyms = filteredGyms.filter(({ location }) =>
    isWithinDistance(location.coordinates, { lat, lng }, radiusDist)
  );
  //Filter gym results based off query
  if (value) {
    filteredGyms = filteredGyms.filter((gym) =>
      gym.gymName.toLowerCase().includes(value.toLowerCase())
    );
  }

  return (
    <div
      className="search-gym-page"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        overflow: 'auto',
      }}
    >
      <div
        className="gym-map"
        style={{
          height: '100%',
          width: '35%',
          position: 'sticky',
          top: 0,
        }}
      >
        <GoogleMapReact
          zoom={zoom}
          center={!lat && !lng ? geo.position : { lat, lng }}
          bootstrapURLKeys={{
            key: process.env.REACT_APP_GOOGLE_KEY as string,
            libraries: 'places',
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleMapApiLoaded(map, maps)}
        >
          {filteredGyms.map(({ location, cost, id }, i) => (
            <MapPoint
              key={i}
              id={id}
              lat={location.coordinates.lat + 0.001}
              lng={location.coordinates.lng + 0.001}
              text={`${cost}/hr`}
            />
          ))}
        </GoogleMapReact>
      </div>
      <div style={{ width: '65%' }} className="scroller-box">
        <div style={{ display: 'flex' }} className="top-bar">
          <SearchFilter value={value} onChange={onChange} />
          <RadiusSelect />
        </div>
        <MapsSideScroller gyms={filteredGyms} />
      </div>
    </div>
  );
};
//{"lat":41.8288777,"lng":-71.39347599999999}
export default Search;
