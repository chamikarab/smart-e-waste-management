import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import styles from "../../styles/dashboard.styles";
import { useRouter } from "expo-router"; // Import useRouter to navigate

const customers = [
  { id: "1", name: "Trader", location: "Austin, TX" },
  { id: "2", name: "Joe", location: "Austin, Tx" },
  { id: "3", name: "John", location: "Austin, TX" },
  { id: "4", name: "Kevin", location: "Austin, TX" },
];

export default function UserDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter(); // Initialize the router

  // Filter customers based on searchTerm (case-insensitive)
  const filteredCustomers = customers.filter((customer) => {
    const term = searchTerm.toLowerCase();
    return (
      customer.name.toLowerCase().includes(term) ||
      customer.location.toLowerCase().includes(term)
    );
  });

  return (
    <View style={styles.container}>
      {/* Reward Points Card */}
      <View style={styles.rewardCard}>
        <Text style={styles.cardTitle}>Rewarding Points</Text>
        <Text style={styles.rewardAmount}>$45,678.90</Text>
        <Text style={styles.rewardGrowth}>+20% month over month</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>


<TouchableOpacity 
  style={styles.requestButton}
  onPress={() => router.push("/screens/request")}
>
  <Text style={styles.requestText}>+ Request E-Waste Pickup</Text>
</TouchableOpacity>

 

        <TouchableOpacity style={styles.storeButton}>
          <Text style={styles.storeText}>+ In Store</Text>
        </TouchableOpacity>
      </View>

      {/* Pickup History */}
      <Text style={styles.sectionTitle}>Pickup History</Text>
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.listItemContent}>
              <Feather name="database" size={24} color="#00A52C" />
              <View style={styles.textContainer}>
                <Text style={styles.listTitle}>{item.name}</Text>
                <Text style={styles.listSubtitle}>{item.location}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
