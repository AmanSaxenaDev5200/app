import "./styles.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

export default function App() {
  // markers
  const markers = [
    { geocode: [28.6139, 77.209], popup: "New Delhi" },
    { geocode: [19.076, 72.8777], popup: "Mumbai" },
    { geocode: [13.0827, 80.2707], popup: "Chennai" },
    { geocode: [22.5726, 88.3639], popup: "Kolkata" },
    { geocode: [12.9716, 77.5946], popup: "Bangalore" },
  ];

  const customIcom = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/256/2642/2642502.png",
    iconUrl: require("./image/marker-icon.png"),
    iconSize: [38, 38],
  });

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: L.point(33, 33, true),
    });
  };

  return (
    <MapContainer center={[28.6139, 77.209]} zoom={13}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createCustomClusterIcon}
      >
        {markers.map((marker) => (
          <Marker position={marker.geocode} icon={customIcom}>
            <Popup>{marker.popup}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
