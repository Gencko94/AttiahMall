import React from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';
import mapStyles from '../helpers/mapStyles';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import PlacesSearch from './Cart/GuestCheckout/GoogleMaps/PlacesSearch';
import { useMediaQuery } from 'react-responsive';
import LocationForm from './LocationForm';
const libraries = ['places'];

const center = {
  lat: 29.3759,
  lng: 47.9774,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
export default function GoogleMapsAddress({ addMutation }) {
  const isTabletOrAbove = useMediaQuery({ query: '(min-width: 768px)' });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg',
    libraries,
  });

  const [marker, setMarker] = React.useState(null);
  const [markerInfoWindowDetails, setMarkerInfoWindowDetails] = React.useState(
    null
  );
  const [markerAddress, setMarkerAddress] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map;
  }, []);
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    setMarker({ lat, lng });
    setMarkerInfoWindowDetails(null);
  }, []);

  React.useEffect(() => {
    if (marker) {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lng}&key=AIzaSyAYprqr3Vrnmhwx9UQozUNNks7CVH9m3Xg`
        )
        .then(res => {
          console.log(res.data);
          setMarkerAddress(
            `${res.data.results[0].address_components
              .map(address => address.short_name)
              .join(', ')}`
          );
          setMarkerInfoWindowDetails(
            `${res.data.results[0].address_components
              .map(address => address.short_name)
              .join(', ')}`
          );
        })
        .catch(err => console.log(err));
    }
  }, [marker]);

  if (loadError)
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: 'calc(-173px + 100vh)' }}
      >
        <h1>There was an Error loading maps, Please try again </h1>
      </div>
    );
  if (!isLoaded)
    return (
      <div
        className="flex justify-center items-center"
        style={{ height: 'calc(-173px + 100vh)' }}
      >
        <BeatLoader size={10} color={'#b72b2b'} />
      </div>
    );
  return (
    <div
      className={`${
        isTabletOrAbove
          ? 'my-addresses-desktop-maps__grid'
          : 'my-addresses-mobile-maps__grid'
      }`}
    >
      <div className="relative h-full">
        <PlacesSearch panTo={panTo} markerAddress={markerAddress} />

        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: isTabletOrAbove ? '100%' : '500px',
          }}
          zoom={15}
          center={center}
          options={options}
          clickableIcons={false}
          onLoad={onMapLoad}
          onClick={e => {
            setMarker({
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            });
          }}
        >
          {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
          {markerInfoWindowDetails && (
            <InfoWindow
              onCloseClick={() => setMarkerInfoWindowDetails(null)}
              position={{ lat: marker.lat, lng: marker.lng }}
              options={{
                pixelOffset: new window.google.maps.Size(0, -50),
              }}
            >
              <div className="p-2">
                <div>
                  <h1>{markerInfoWindowDetails}</h1>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
      <LocationForm
        markerAddress={markerAddress}
        addMutation={addMutation}
        marker={marker}
      />
    </div>
  );
}
