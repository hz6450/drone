import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
//import firestore from '@react-native-firebase/firestore';

// import messaging from '@react-native-firebase/messaging';

const HomeScreen = () => {
  // 좌표 데이터 상태
  const [coordinates, setCoordinates] = useState([]);
  const [region, setRegion] = useState(null);

  // Firestore에서 좌표 데이터 가져오기
  const fetchCoordinates = async () => {
    try {
      const querySnapshot = await firestore().collection('coordinates').get();
      const coords = querySnapshot.docs.map(doc => doc.data());
      setCoordinates(coords);
      // 첫 번째 좌표를 초기 지역으로 설정
      if (coords.length > 0) {
        setRegion({
          ...coords[0],
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      }
    } catch (error) {
      console.error("Error fetching coordinates: ", error);
    }
  };

  useEffect(() => {
    fetchCoordinates();
  //   const subscribe = async () => {
  //     await messaging().subscribeToTopic('game');
  //   };
  //   subscribe();
  }, []);

  // 좌표 클릭 시 지도 중심 위치 변경
  const onCoordinatePress = (coordinate) => {
    setRegion({
      ...coordinate,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <View style={styles.container}>
      {/* 헤더 컨테이너 */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Image
            source={require('../assets/images/1.jpg')} 
            style={styles.image}
          />
          <View>
            <Text style={styles.headerText}>사용자명1</Text> 
            <Text style={styles.headerText}>관리자 소속</Text> 
          </View>
        </View>
      </View>

      {/* 중간 컨테이너 */}
      <View style={styles.middleContainer}>
        {region && (
          <MapView
            style={styles.map}
            region={region}
          >
            {coordinates.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={coordinate}
                pinColor={"red"} // 마커의 색상
              />
            ))}
          </MapView>
        )}
      </View>

      {/* 하단 컨테이너 */}
      <View style={styles.bottomContainer}>
        {coordinates.map((coordinate, index) => (
          <TouchableOpacity key={index} onPress={() => onCoordinatePress(coordinate)}>
            <Text style={styles.text}>{`${coordinate.latitude}, ${coordinate.longitude}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // 전체 배경색을 흰색으로 변경
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF', // 헤더 컨테이너 배경색을 흰색으로 변경
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerText: {
    marginLeft: 10,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    margin: 20,
    backgroundColor: '#ffffff', // 중간 컨테이너 배경색
    marginVertical: 10, // 상단 및 하단 여백
    padding: 20, // 중간 컨테이너 내부 패딩 추가
    borderWidth: 2, // 테두리 추가
    borderColor: '#ddd', // 테두리 색상
    borderRadius: 10, // 테두리 둥근 모서리
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF', // 하단 컨테이너 배경색을 흰색으로 변경
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});



export default HomeScreen;
