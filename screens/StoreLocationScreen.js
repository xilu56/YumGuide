import React, { useContext, useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, FlatList, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { LocationContext } from '../Context/LocationContext';
import getColors from '../Helper/colors';

const colors = getColors();

const StoreLocationScreen = ({ navigation }) => {
  const { currentLocation, fetchNearbyPlaces, nearbyPlaces, permissionGranted, getUserLocation } = useContext(LocationContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapRegion, setMapRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    if (currentLocation) {
      setMapRegion({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  }, [currentLocation]);

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: colors.primary },
      headerTintColor: colors.white,
    });
  }, [navigation]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('Error', 'Please enter a search query.');
      return;
    }
    await fetchNearbyPlaces(searchQuery);
    if (nearbyPlaces.length > 0) {
      const firstPlace = nearbyPlaces[0];
      setMapRegion({
        latitude: firstPlace.geometry.location.lat,
        longitude: firstPlace.geometry.location.lng,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    setMapRegion({
      latitude,
      longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for grocery stores or supermarkets"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
      <Button title="Refresh My Location" onPress={getUserLocation} />
      {mapRegion && (
        <MapView
          style={styles.map}
          region={mapRegion}
          onPress={handleMapPress}
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              }}
              title="You are here"
              pinColor="blue"
            />
          )}
          {nearbyPlaces.map((place) => (
            <Marker
              key={place.place_id}
              coordinate={{
                latitude: place.geometry.location.lat,
                longitude: place.geometry.location.lng,
              }}
              title={place.name}
              description={place.vicinity}
            />
          ))}
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              pinColor="green"
            />
          )}
        </MapView>
      )}
      <FlatList
        data={nearbyPlaces}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <View style={styles.placeItem}>
            <Text style={styles.placeName}>{item.name}</Text>
            <Text style={styles.placeAddress}>{item.vicinity}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginRight: 5,
  },
  map: {
    width: '100%',
    height: 300,
    marginBottom: 10,
  },
  placeItem: {
    padding: 10,
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  placeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  placeAddress: {
    fontSize: 14,
    color: colors.text,
  },
});

export default StoreLocationScreen;