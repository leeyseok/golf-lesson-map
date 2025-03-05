// 'use client';
// import React, { useEffect, useRef } from 'react';
// import { Loader } from '@googlemaps/js-api-loader';

// const MapComponent = () => {
//   const mapRef = useRef<HTMLDivElement | null>(null);
//   const markerRef = useRef<google.maps.Marker[]>([]);

//   useEffect(() => {
//     const initMap = async () => {
//       const loader = new Loader({
//         apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
//         version: 'weekly',
//       });

//       const { Map } = await loader.importLibrary('maps');
//       const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;
//       if (!mapRef.current || !window.google) return;
  
//       const position = { lat: 35.681236, lng: 139.767125 };
  
//       const mapOptions: google.maps.MapOptions = {
//         center: position,
//         zoom: 14,
//         mapId: 'MY_MAP_ID',
//         streetViewControl: false,
//       };
  
//       const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
  
//       // const markers: google.maps.Marker[] = [];
//       Array(10).fill(0).forEach((_, i) => {
//         const marker = new google.maps.marker.AdvancedMarkerElement({
//           position: { lat: 35.681236+ (i * 0.002), lng: 139.767125+ (i * 0.002) },
//           map: map,
//           collisionBehavior: google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
//           content: (() => {
//             const markerContainer = document.createElement("div");
//             markerContainer.classList.add("custom-marker");
        
//             const markerImage = document.createElement("img");
//             // markerImage.src = "https://image.gora.golf.rakuten.co.jp/img/golf/lesson/4932/main/001.jpg";
//             markerImage.src = "/marker2.png";
//             markerImage.alt = "marker";
//             markerImage.style.width = "32px";
//             markerImage.style.height = "32px";
//             markerImage.style.borderRadius = "50%"; // 원형 아이콘
        
//             const label = document.createElement("span");
//             label.classList.add("marker-label");
//             label.textContent = `ゴルフガイド${i + 1}`;
        
//             markerContainer.appendChild(markerImage);
//             markerContainer.appendChild(label);
        
//             return markerContainer;
//           })()
//         });
        
//         markerRef.current.push(marker);
//       });
//     };
  
//     initMap();
//   }, []);
//   return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
// };

// export default MapComponent;
import React from 'react'

const Map = () => {
  return (
    <div>Map</div>
  )
}

export default Map