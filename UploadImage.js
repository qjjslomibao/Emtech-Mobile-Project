import React from 'react';
import { StyleSheet, Text, View, ImageBackground} from 'react-native';
const UploadImage = () => {
  return (
    <View style={styles.container}>
        <ImageBackground source={require('./assets/upload-image-bg2.png')} resizeMode="cover" style={styles.background}>
            <Text style={styles.text}>Find your{"\n"}Similar Fish</Text>

            <View style={styles.button}>
                <Text style={styles.buttonText}>Upload your Image</Text>
            </View>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      flex: 1, 
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
       width: '80%',
       height: '10%',
       backgroundColor: 'rgba(217,217, 217, .6)',
       borderRadius: 25,
       justifyContent: 'center',
    },
    buttonText: {
        fontSize: 26,
        fontWeight: '700',
        textAlign: 'center',
        color: 'white',
        opacity: 1,
    },
    text: {
      fontSize: 36,
      textAlign: 'center',
      color: 'white',
      paddingBottom: 100,
    },
  });

export default UploadImage;