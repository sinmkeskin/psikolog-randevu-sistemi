import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.7128,
  lng: -74.006,
};

export const Map = () => (
  <LoadScript googleMapsApiKey="AIzaSyB0bBMrnONtIyZuzVrd0JFb2X3ptgGwdHA">
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      {/* Marker gibi ek özellikler burada yer alabilir */}
    </GoogleMap>
  </LoadScript>
);

export default Map;
