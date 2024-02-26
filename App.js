import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from './components/HomeScreen'; // 임포트 추가
// import SettingsScreen from './components/SettingsScreen'; // 임포트 추가

// const Tab = createBottomTabNavigator();

function App() {

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

useEffect(() => {
  if(requestUserPermission()){
    messaging().getToken().then(token => {
      console.log(token);
    });
  }
  else {
    console.log("fail", authStatus);
  }

  messaging()
  .getInitialNotification()
  .then( async(remoteMessage) => {
    if (remoteMessage) {
      console.log(
        'notification : ',
        remotoMessage.notification,
      );   
    }
  });

  messaging().onNotificationOpenedApp( async(remoteMessage) => {
    console.log(
      'notification :',
      remoteMessage.notification,
    );
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });

}, [])

return (
  <View style={styles.container}>
    <Text>test</Text>
    <StatusBar style="auto" />
  </View>
);
}

// return (
//   <>
//   </>
//   // <NavigationContainer>
//   //   <Tab.Navigator>
//   //     <Tab.Screen name="Home" component={HomeScreen} />
//   //     <Tab.Screen name="Settings" component={SettingsScreen} />
//   //   </Tab.Navigator>
//   // </NavigationContainer>
// );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;