import {useEffect} from 'react';
import {View, Animated} from 'react-native';

export const Ball = () => {
  let position = new Animated.ValueXY({x: 0, y: 0});
  useEffect(() => {
    Animated.spring(position, {
      useNativeDriver: false,
      toValue: {x: 200, y: 200},
    }).start();
  });

  return (
    <Animated.View style={position.getLayout()}>
      <View
        style={{
          height: 60,
          width: 60,
          borderRadius: 30,
          backgroundColor: 'blue',
        }}></View>
    </Animated.View>
  );
};
