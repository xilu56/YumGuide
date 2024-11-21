import React, { createContext, useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const LocationContext = createContext();

const apiKey = process.env.EXPO_PUBLIC_mapsApiKey;

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const verifyPermission = async () => {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      setPermissionGranted(granted);
      return granted;
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  };

  const getUserLocation = async () => {
    try {
      const hasPermission = await verifyPermission();
      if (!hasPermission) {
        console.warn('Permission denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync();
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const fetchNearbyPlaces = async (query) => {
    if (!currentLocation) return;
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${currentLocation.latitude},${currentLocation.longitude}&radius=3000&type=grocery_or_supermarket&keyword=${query}&key=${apiKey}`
      );
      const data = await response.json();
      setNearbyPlaces(data.results || []);
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ currentLocation, getUserLocation, fetchNearbyPlaces, nearbyPlaces, permissionGranted }}>
      {children}
    </LocationContext.Provider>
  );
};
