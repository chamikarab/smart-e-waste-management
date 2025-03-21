import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import MapView, { Marker, MapViewProps } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

const CollectorDashboard: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([
    { id: 1, name: "Maleen", lat: 6.9271, lng: 79.8612 },
    { id: 2, name: "Chamikara", lat: 6.9147, lng: 79.9737 },
    { id: 3, name: "Savinda", lat: 6.9325, lng: 79.8438 },
    { id: 4, name: "Mahimi", lat: 6.9452, lng: 79.8520 },
    { id: 5, name: "Kasun", lat: 6.9215, lng: 79.8823 },
    { id: 6, name: "Devmi", lat: 6.9098, lng: 79.9156 },
  ]);
  const [optimizedRoute, setOptimizedRoute] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  // Create a ref for the MapView
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const fetchOptimizedRoute = async () => {
      try {
        const response = await axios.post("http://192.168.1.3:5000/optimize-route", {
          locations,
        });
        setOptimizedRoute(response.data.optimizedRoute);
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };
    fetchOptimizedRoute();
  }, [locations]);

  // Handle selecting a location from the list
  const handleSelectLocation = (location: Location) => {
    setSelectedLocation(location);
    // Animate the map to center on the selected location
    mapRef.current?.animateToRegion({
      latitude: location.lat,
      longitude: location.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Pickup Button */}
      <TouchableOpacity style={styles.pickupButton}>
        <Text style={styles.pickupButtonText}>+ Pickup New Collection</Text>
      </TouchableOpacity>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: locations[0].lat,
            longitude: locations[0].lng,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {locations.map((loc) => (
            <Marker
              key={loc.id}
              coordinate={{ latitude: loc.lat, longitude: loc.lng }}
              title={loc.name}
              // Highlight the marker if it's selected
              pinColor={selectedLocation && selectedLocation.id === loc.id ? "red" : "blue"}
            />
          ))}

          {optimizedRoute.length > 0 && (
            <MapViewDirections
              origin={{ latitude: locations[0].lat, longitude: locations[0].lng }}
              destination={{ latitude: locations[locations.length - 1].lat, longitude: locations[locations.length - 1].lng }}
              waypoints={optimizedRoute.map((loc) => ({ latitude: loc.lat, longitude: loc.lng }))}
              apikey={GOOGLE_MAPS_API_KEY}
              strokeWidth={5}
              strokeColor="blue"
            />
          )}
        </MapView>
      </View>

      {/* Pickup Requests List */}
      <Text style={styles.heading}>Next Pickup Requests</Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectLocation(item)}>
            <View style={styles.requestItem}>
              <View style={[styles.icon, { backgroundColor: getColor(item.id) }]}>
                <Text style={styles.iconText}>{item.name.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.city}>Austin, TX</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Function to get a different color for each request icon
const getColor = (id: number) => {
  const colors = ["#FFD700", "#8A2BE2", "#ADFF2F", "#FF4500", "#32CD32", "#1E90FF"];
  return colors[id % colors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  pickupButton: {
    backgroundColor: "#32CD32",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  pickupButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  mapContainer: {
    borderRadius: 10,
    overflow: "hidden",
    height: 200,
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  requestItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  city: {
    fontSize: 14,
    color: "gray",
  },
});

export default CollectorDashboard;
