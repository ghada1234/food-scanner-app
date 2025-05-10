import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setPhoto(data.uri);
      recognizeFood(data.uri); // Placeholder
    }
  };

  const recognizeFood = async (imageUri) => {
    // You can replace this with actual food recognition logic or ML model/API
    console.log('Image captured:', imageUri);
    alert("Food recognition coming soon!");
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      {photo ? (
        <>
          <Image source={{ uri: photo }} style={styles.preview} />
          <TouchableOpacity style={styles.button} onPress={() => setPhoto(null)}>
            <Text style={styles.buttonText}>Scan Another</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Camera style={styles.camera} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
              <Text style={styles.buttonText}>Scan Food</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    padding: 20,
  },
  captureButton: {
    backgroundColor: '#8B0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18 },
  preview: { flex: 1, resizeMode: 'contain' },
  button: {
    backgroundColor: '#006400',
    padding: 15,
    alignItems: 'center',
  },
});
