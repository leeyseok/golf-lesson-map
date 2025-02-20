'use client';
import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const MapComponent = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!, // ✅ 클라이언트 환경 변수 사용
        version: 'weekly',
      });

      await loader.load(); // ✅ 로드 완료 후 google 객체 사용 가능
      
      if (!mapRef.current || !window.google) return;

      const position = { lat: 35.681236, lng: 139.767125 };

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 14,
        mapId: 'MY_MAP_ID',
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);
    };

    initMap();
  }, []);

  return <div ref={mapRef} style={{ width: '100%', height: '100vh' }} />;
};

export default MapComponent;
