'use client';

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createRoot } from 'react-dom/client';

const userLngLtg = [139.7673068, 35.6809591];

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const popupRef = useRef(null);
  const popupTimeout = useRef(null);
  const isHoveringPopup = useRef(false);
  const isHoveringMarker = useRef(false);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/lys-0920/cm67izqbh008d01st8iup1856?optimize=true",
        center: userLngLtg,
        zoom: 14,
        attributionControl: false,
      });

      mapInstanceRef.current = map;
      map.on('load', handleMapLoad);
    }
  }, []);

  const handleMapLoad = () => {
    const map = mapInstanceRef.current;

    map.loadImage('/marker2.png', (error, image) => {
      if (error) throw error;
      if (!map.hasImage('custom-marker')) {
        map.addImage('custom-marker', image);
      }

      const geojson = {
        type: 'FeatureCollection',
        features: Array.from({ length: 20 }).map((_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [userLngLtg[0] + i * 0.001, userLngLtg[1] + i * 0.001],
          },
          properties: {
            title: `ゴルフガイド ${i + 1}`,
          },
        })),
      };

      if (!map.getSource('markers')) {
        map.addSource('markers', {
          type: 'geojson',
          data: geojson,
          cluster: false,
        });
      }

      if (!map.getLayer('markers')) {
        map.addLayer({
          id: 'markers',
          type: 'symbol',
          source: 'markers',
          layout: {
            'icon-image': 'custom-marker',
            'icon-allow-overlap': true,
            'text-allow-overlap': true,
            'text-variable-anchor': ['left', 'right', 'top'],
            'text-radial-offset': 0.5,
            'text-justify': 'auto',
            'icon-size': 0.8,
            'text-field': ['get', 'title'],
            'text-offset': [0, 1.5],
            'text-size': 12,
          },
          paint: {
            'text-color': '#000000',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1,
            'text-halo-blur': 1,
          },
        });
      }
      map.on('mouseenter', 'markers', (e) => {
        isHoveringMarker.current = true;

        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;

        if (popupRef.current) {
          popupRef.current.remove();
        }
        const popupContainer = document.createElement("div");
        const root = createRoot(popupContainer);
        root.render(popupcontent(title));
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: true,
        })
          .setLngLat(coordinates)
          .setDOMContent(popupContainer)
          .addTo(map);

        popupRef.current = popup;
        const popupElement = popup.getElement();
        if (popupElement) {
          popupElement.addEventListener('mouseenter', handleMouseEnter);
          popupElement.addEventListener('mouseleave', handleMouseLeave);
        }
        const markerElement = e.target._element;
        if (markerElement) {
          markerElement.addEventListener('mouseenter', () => handleMarkerMouseEnter());
          markerElement.addEventListener('mouseleave', () => handleMarkerMouseLeave());
        }
      });
      map.on('mouseleave', 'markers', () => {
        isHoveringMarker.current = false;
        handleMouseLeave();
      });
      map.on('mouseenter', 'markers', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', 'markers', () => {
        map.getCanvas().style.cursor = '';
      });
      map.on('click', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['markers'] });

        if (!features.length && !isHoveringPopup.current && popupRef.current) {
          popupRef.current.remove();
          popupRef.current = null;
        }
      });
    });
  };

  const handleMouseEnter = () => {
    clearTimeout(popupTimeout.current);
    isHoveringPopup.current = true;
  };

  const handleMouseLeave = () => {
    popupTimeout.current = setTimeout(() => {
      if (!isHoveringMarker.current && !isHoveringPopup.current && popupRef.current) {
        popupRef.current.remove();
        popupRef.current = null;
      }
    }, 300);
    isHoveringPopup.current = false;
  };

  const handleMarkerMouseEnter = () => {
    isHoveringMarker.current = true;
  };

  const handleMarkerMouseLeave = () => {
    isHoveringMarker.current = false;
    handleMouseLeave();
  };

  return (
    <div
      ref={mapContainerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default Map;


const popupcontent = (store) => {
  return (
    <div>
      <h1>{store}</h1>
    </div>
  )
}