import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider, useAuth } from './src/Firebase/AuthContextProvider'; // Import the AuthContextProvider and useAuth hook
import BottomTab from './src/Navigation/BottomTab';
import Login from './src/Screens/Login/Login2';
import SafeAreaWrapper from './src/Components/SafeAreaWrapper';



const AppContent = () => {

  const { user } = useAuth(); 

  return (
     <SafeAreaWrapper>
          <NavigationContainer>
            { user ? <BottomTab /> : <Login />} 
          </NavigationContainer>
      </SafeAreaWrapper>
  );
};

const App = () => {
  return (
    <AuthContextProvider> 
      <AppContent />
    </AuthContextProvider>
  );
};

export default App;
