'use client';
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
        version: 'weekly',
      });
      const { Map } = await loader.importLibrary('maps');
      const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;
      if (!mapRef.current || !window.google) return;
  
      const position = { lat: 35.681236, lng: 139.767125 };
  
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 14,
        mapId: 'MY_MAP_ID',
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
      };
  
      const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
  
      // const markers: google.maps.Marker[] = [];
      Array(10).fill(0).forEach((_, i) => {
        const marker = new Marker({
          map: map,
          position: {
            lat: position.lat + (0.002 * i),
            lng: position.lng + (0.002 * i),
          },
          icon: {
            url: "/marker2.png",
            labelOrigin: new window.google.maps.Point(16, 16),
          },
          label: {
            text: `ゴルフガイドゴルフガイド ${i + 1}`,
            className: "marker-label",
          },
        });
        markerRef.current.push(marker);
      });
    };
  
    initMap();
  }, []);
  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;