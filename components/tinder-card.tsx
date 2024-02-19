import {Animated, View, PanResponder, Dimensions} from 'react-native';
import {DataType} from '../App';
import {ReactNode, useState, useRef} from 'react';

type TinderCardProps = {
  renderCard: (item: DataType) => ReactNode;
  renderNoMoreCards?: () => void;
  data: DataType[];
};

type Direction = 'left' | 'right';

export const TinderCard = ({renderCard, data}: TinderCardProps) => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
  const SWIPE_OUT_DURATION = 250;

  const position = useRef(new Animated.ValueXY()).current;
  let [currentCardIndex, setCurrentCardIndex] = useState(0);
  let card = data[currentCardIndex];

  const onSwipeLeft = () => {
    setCurrentCardIndex(previousCardIndex => previousCardIndex + 1);
  };
  const onSwipeRight = () => {
    setCurrentCardIndex(previousCardIndex => previousCardIndex - 1);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove(e, gestureState) {
        // console.log('onPanResponderMove');
        position.setValue({x: gestureState.dx, y: gestureState.dy});
      },
      onPanResponderRelease: (e, gestureState) => {
        const swipedRight = gestureState.dx > SWIPE_THRESHOLD;
        const swipedLeft = gestureState.dx < -SWIPE_THRESHOLD;
        console.log('currentCardIndex', currentCardIndex);
        if (currentCardIndex === 0 && swipedRight) {
          resetPosition();
          return;
        }
        if (
          (swipedRight && currentCardIndex === 0) ||
          (swipedLeft && currentCardIndex === data.length)
        ) {
          console.log('currentPosition', currentCardIndex);
          resetPosition();
          return;
        }
        // console.log('onPanResponderRelease');
        if (swipedRight) {
          forceSwipe('right');
        } else if (swipedLeft) {
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
    direction === 'right' ? onSwipeRight() : onSwipeLeft();
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
    return data.map((item, index) => {
      if (index < currentCardIndex) {
        // console.log('return null for ', index);
        return null;
      }

      if (index === currentCardIndex) {
        console.log('ANIMATE ', index);
        return (
          <Animated.View
            key={card.id}
            style={getCardLayout()}
            {...panResponder.panHandlers}>
            {renderCard(card)}
          </Animated.View>
        );
      }
      console.log('DONT ANIMATE ', index);
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
