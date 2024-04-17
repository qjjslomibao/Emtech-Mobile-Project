import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

const FishInfo = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.infoButton}>
          <Text style={styles.infoButtonText}>INFO</Text>
        </TouchableOpacity>
        <Text style={styles.title}>SHUBUNKIN GOLDFISH</Text>
        <View style={styles.textBackground}>
          <Text style={styles.description}>
            Single-tailed with calico coloration, more streamlined body allowing for active swimming.
          </Text>
          <Text style={styles.infoTitle}>Tank Size (for 1 fish) - 20 Gallons</Text>
          <Text style={styles.infoContent}>Diet - Omnivore: Plant and animal-based foods</Text>
          <Text style={styles.infoContent}>Water Temperature 65-75°F (18-24°C)</Text>
        </View>
      </View>
      <Image source={require('./assets/SHUBUKIN.png')} resizeMode="contain" style={styles.image} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', 
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: 100,
  },
  infoButton: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
  },
  infoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  textBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 10,
    padding: 20, 
    alignItems: 'flex-start', 
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  infoContent: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 600,
    marginTop: -100,
  },
});

export default FishInfo;
