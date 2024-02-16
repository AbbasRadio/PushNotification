/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Notification from './Notification';
import LocalNotification from './LocalNotification';

const App = () => {
  return (
    <View style={styles.container}>
      <Notification />
      <Text> Push Notification!! </Text>
      <Button title={'Click Here'} onPress={() => LocalNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
export default App;
