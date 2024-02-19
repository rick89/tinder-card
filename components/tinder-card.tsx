import {Animated, View, PanResponder, Dimensions} from 'react-native';
import {DataType} from '../App';
import {ReactNode, useState, useRef} from 'react';

type TinderCardProps = {
  renderCard: (item: DataType) => ReactNode;
  renderNoMoreCards?: () => void;
  onSwipeRight: (item: DataType) => void;
  onSwipeLeft: (item: DataType) => void;
  currentCardIndex: number;
  card: DataType;
};

type Direction = 'left' | 'right';

export const TinderCard = ({
  renderCard,

  onSwipeLeft,
  onSwipeRight,
  currentCardIndex,
  card,
}: TinderCardProps) => {
  const position = useRef(new Animated.ValueXY()).current;

  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
  const SWIPE_OUT_DURATION = 250;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove(e, gestureState) {
        // console.log('onPanResponderMove');
        position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (e, gestureState) => {
        // console.log('onPanResponderRelease');
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
    console.log('force swipe', direction);
    const x = (direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH) * 2;
    Animated.timing(position, {
      useNativeDriver: false,
      toValue: {x, y: 0},
      duration: SWIPE_OUT_DURATION,
    }).start(() => {
      onSwipeComplete(direction);
    });
  };

  const onSwipeComplete = (direction: Direction) => {
    direction === 'right' ? onSwipeRight(card) : onSwipeLeft(card);
    position.setValue({x: 0, y: 0});
  };

  const resetPosition = () => {
    // console.log('resetPosition()');
    Animated.spring(position, {
      useNativeDriver: false,
      toValue: {x: 0, y: 0},
    }).start();
  };

  const renderCards = () => {
    // return data.map((item, index) => {
    //   if (index < currentCardIndex) {
    //     // console.log('return null for ', index);
    //     return null;
    //   }

    //   if (index === currentCardIndex) {
    // console.log('ANIMATE ', index);
    return (
      <Animated.View
        key={card.id}
        style={getCardLayout()}
        {...panResponder.panHandlers}>
        {renderCard(card)}
      </Animated.View>
    );
    //   }
    //   console.log('DONT ANIMATE ', index);
    //   renderCard(item);
    // });
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
