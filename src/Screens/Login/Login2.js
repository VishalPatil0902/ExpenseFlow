import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, Modal, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useAuth } from '../../Firebase/AuthContextProvider'; // Importing the authentication context

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null); 

  const { handleAuthentication } = useAuth();

  const handleLogin = async () => {
    try {
      await handleAuthentication(email, password, isLogin);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        {/* <View style={{ width: width * 0.85, height: height * 0.2, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ display:'flex',width: '90%', height: '90%', borderRadius: 10, elevation: 10,shadowColor:'blue'}}>
                  <Image source={item} style={{ flex: 1, width:'100%'}} className='rounded-[10px] '/> 
                </TouchableOpacity>
        </View> */}

      <View style={styles.authContainer}>
        <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleLogin} color="#fcc442" />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </Text>
        </View>
      </View>

      <Modal
        visible={!!error} // Show modal if error is present
        animationType="none" // No animation
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setError(null)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    width: '95%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  errorText: {
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
  },
  closeButton: {
    backgroundColor: "#f00", // Red color for the close button
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Login;