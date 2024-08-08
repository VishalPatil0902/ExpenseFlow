import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

const SafeAreaWrapper = ({ children }) => {
  return (
      <View style={styles.container}>
          {children}
      </View>
  )
};

const styles=StyleSheet.create({
    container:{
       flex:1,
       paddingTop:StatusBar.currentHeight,
       backgroundColor:'#FDF9F2'
    }
})


export default SafeAreaWrapper;
