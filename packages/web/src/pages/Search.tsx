import React, { useEffect, useContext, useState } from 'react';
import MapsSideScroller from '../components/MapsSideScroller';
import { Coords } from '../types/Coords';
import { useCurrentGeolocation, useInputValue } from '../hooks';
import GoogleMapReact from 'google-map-react';
import MapPoint from '../components/MapPoint';
import RadiusSelect from '../components/RadiusSelect';
import SearchFilter from '../components/SearchFilter';
import { SearchContext } from '../context/SearchState';
import { useLocation } from 'react-router-dom';
import { isWithinDistance } from '../utils';
import { useFetchGymsQuery, Gyms } from '@gw/controllers';
import { CircularProgress, useMediaQuery } from '@material-ui/core';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: React.FC = () => {
  const geo = useCurrentGeolocation();
  const { gyms, radiusDist, zoom, dispatch } = useContext(SearchContext);
  const { value, onChange } = useInputValue('');
  const [{ lat, lng }, setCoords] = useState<Coords>({ lat: 0, lng: 0 });
  const [error, setError] = useState<string>('');
  const { data, loading } = useFetchGymsQuery();
  const matches = useMediaQuery('(max-width:1048px)');
  let query = useQuery();

  useEffect(() => {
    if (data && data.gyms) {
      dispatch({ type: 'UPDATE_GYM_RESULTS', gyms: data.gyms });
    }
  }, [data, dispatch]);

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

  if (loading) {
    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  //filter by gyms inside radius
  const mapCoords = lat || lng ? { lat, lng } : geo.position;
  let filteredGyms: Gyms[] = gyms;
  if (radiusDist) {
    filteredGyms = gyms.filter(({ coordinates }) =>
      isWithinDistance(coordinates, mapCoords, radiusDist)
    );
  }

  //Filter gym results based off query
  if (value) {
    filteredGyms = filteredGyms.filter((gym) =>
      gym.gym_name.toLowerCase().includes(value.toLowerCase())
    );
  }

  return (
    <div
      className="search-gym-page"
      style={{
        display: 'flex',
        width: '100vw',
        flexDirection: matches ? 'column' : 'row',
        alignItems: 'flex-start',
        position: 'relative',
        top: 0,
      }}
    >
      <div
        className="gym-map"
        style={{
          height: matches ? '40vh' : '93.5vh',
          width: matches ? '100%' : '35%',
          zIndex: matches ? 20 : 0,
          position: 'sticky',
          top: 0,
        }}
      >
        {error}
        <GoogleMapReact
          zoom={zoom}
          center={!lat && !lng ? geo.position : { lat, lng }}
          // bootstrapURLKeys={{
          //   key: process.env.REACT_APP_GOOGLE_KEY as string,
          //   libraries: 'places',
          // }}
          yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map, maps }) => handleMapApiLoaded(map, maps)}
        >
          {filteredGyms.map(({ id, membership_cost, coordinates }, i) => (
            <MapPoint
              key={i}
              id={id}
              lat={coordinates.lat}
              lng={coordinates.lng}
              text={`${membership_cost}/month`}
            />
          ))}
        </GoogleMapReact>
      </div>
      <div
        style={{
          width: matches ? '100%' : '65%',
          // height: matches ? '50vh' : '5vh',
        }}
        className="scroller-box"
      >
        <div
          style={{
            display: 'flex',
            position: 'sticky',
            top: matches ? 'calc(40vh)' : 0,
            zIndex: 10,
            backgroundColor: 'white',
          }}
          className="top-bar"
        >
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
