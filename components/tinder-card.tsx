import {Animated, View, PanResponder, Dimensions} from 'react-native';
import {DataType} from '../App';
import {ReactNode, useState, useRef} from 'react';

type TinderCardProps = {
  renderCard: (item: DataType) => ReactNode;
  renderNoMoreCards?: () => void;
  data: DataType[];
  onSwipeRight: (item: DataType) => void;
  onSwipeLeft: (item: DataType) => void;
};

type Direction = 'left' | 'right';

export const TinderCard = ({
  renderCard,
  data,
  onSwipeLeft,
  onSwipeRight,
}: TinderCardProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  let position = new Animated.ValueXY();

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
  const SWIPE_OUT_DURATION = 250;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove(e, gestureState) {
        position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          forceSwipe('right');
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left');
        } else {
          resetPosition();
        }
      },
    }),
  ).current;

  const forceSwipe = (direction: Direction) => {
    const x = (direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH) * 2;
    console.log('force swipe');
    Animated.timing(position, {
      useNativeDriver: false,
      toValue: {x, y: 0},
      duration: SWIPE_OUT_DURATION,
    }).start(() => {
      console.log('start swipe completed');
      onSwipeComplete(direction);
    });
  };

  const onSwipeComplete = (direction: Direction) => {
    setCurrentCardIndex(currentCardIndex + 1);
    const item = data[currentCardIndex];
    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    position.setValue({x: 0, y: 0});
  };

  const resetPosition = () => {
    Animated.spring(position, {
      useNativeDriver: false,
      toValue: {x: 0, y: 0},
    }).start();
  };

  const renderCards = () => {
    return data.map((item, index) => {
      if (index < currentCardIndex) {
        console.log('return null for -> ', index);
        return null;
      }

      if (index === currentCardIndex) {
        console.log('ANIMATE currentCardIndex -> ', currentCardIndex);
        return (
          <Animated.View
            key={item.id}
            style={getCardLayout()}
            {...panResponder.panHandlers}>
            {renderCard(item)}
          </Animated.View>
        );
      }
      console.log('NO ANIMATE -> ', index);
      renderCard(item);
    });
  };

  const getCardLayout = () => {
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, +SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg'],
    });
    return {
      ...position.getLayout(),
      transform: [{rotate}],
    };
  };

  return <View>{renderCards()}</View>;
};
