import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground, Modal, ActivityIndicator } from 'react-native';
import { getDBConnection, fetchFishes } from '../database/database';

const Calico = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fish, setFish] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state to handle UI feedback

  useEffect(() => {
    async function loadDataAsync() {
      try {
        setLoading(true); // Start loading
        const db = await getDBConnection();
        const fishes = await fetchFishes(db);
        const targetFish = fishes.find(f => f.name === 'Calico');
        setFish(targetFish);
        setLoading(false); // End loading
      } catch (error) {
        console.error('Failed to load the fish data:', error);
        setLoading(false); // Make sure to turn off loading if there's an error
      }
    }

    loadDataAsync();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (!fish) {
    return <View style={styles.container}><Text>No fish data available.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.readMoreButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.readMoreText}>READ MORE</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{fish.name}</Text>
      <Image source={{ uri: fish.imageURL }} resizeMode="contain" style={styles.fishImage} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <ImageBackground
            source={require('./bgcalico.png')}  // Ensure the path is correct
            resizeMode="cover"
            style={styles.modalView}
            imageStyle={styles.backgroundImageStyle}
            onLoadEnd={() => setImageLoaded(true)}
          >
            {imageLoaded && (
              <>
                <Text style={styles.modalTitle}>{fish.name}</Text>
                <Text style={styles.modalText}>{fish.description}</Text>
                <Text style={styles.modalInfo}>Tank Size: {fish.tankSize}</Text>
                <Text style={styles.modalInfo}>Diet: {fish.diet}</Text>
                <Text style={styles.modalInfo}>Temperature Range: {fish.temperatureRange}</Text>
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </ImageBackground>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 150,
    paddingHorizontal: 20,
  },
  readMoreButton: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  readMoreText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  fishImage: {
    width: 400, 
    height: 600, 
    marginTop: -40,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  },
  modalView: {
    margin: 20,
    width: 300, // Adjust as needed
    height: 400, // Adjust as needed
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 20,
  },
  backgroundImageStyle: {
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  modalInfo: {
    fontSize: 16,
    color: 'white',
    textAlign: 'justify',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default Calico;
