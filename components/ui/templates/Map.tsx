'use client';
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
        version: 'weekly',
      });

      await loader.load();
      
      if (!mapRef.current || !window.google) return;

      const position = { lat: 35.681236, lng: 139.767125 };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 14,
        mapId: 'MY_MAP_ID',
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      console.log(map)
    };

    initMap();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
