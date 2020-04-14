import React, { useEffect, useContext } from 'react';
import MapsSideScroller from '../components/MapsSideScroller';
import { Coords } from '../types/Coords';
import { useCurrentGeolocation, useInputValue } from '../hooks';
import GoogleMapReact from 'google-map-react';
import MapPoint from '../components/MapPoint';
import RadiusSelect from '../components/RadiusSelect';
import { key } from '../key';
import axios from 'axios';
import SearchFilter from '../components/SearchFilter';
import { SearchContext } from '../context/SearchState';
const Search: React.FC = () => {
  const geo = useCurrentGeolocation();
  const { gyms, radiusDist, zoom, dispatch } = useContext(SearchContext);
  const { value, onChange } = useInputValue('');

  useEffect(() => {
    axios.get('/api/gyms').then((res: any) => {
      dispatch({ type: 'UPDATE_GYM_RESULTS', gyms: res.data.gyms });
    });
  }, []);

  const isWithinDistance = (point: Coords) => {
    const center = geo.position;
    const distance = radiusDist;

    let withinLong =
      point.lng > center.lng - distance && point.lng < center.lng + distance;
    let withinLat =
      point.lat > center.lat - distance && point.lat < center.lat + distance;

    return withinLong && withinLat;
  };

  let filteredGyms = gyms;
  //filter by gyms inside radius
  filteredGyms = filteredGyms.filter(({ location }) =>
    isWithinDistance(location.coordinates)
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
        <GoogleMapReact zoom={zoom} center={geo.position}>
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
