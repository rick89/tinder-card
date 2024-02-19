import {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {DataType} from '../App';
import {TinderCard} from './tinder-card';

type TinderDeckProps = {
  data: DataType[];
};

export const TinderDeck = ({data}: TinderDeckProps) => {
  const renderCard = (item: DataType) => {
    const uri = Image.resolveAssetSource({uri: item.image}).uri;

    return (
      <View
        key={item.id}
        style={{
          backgroundColor: 'white',
          height: 500,
          width: 280,
          borderWidth: 1,
          borderColor: '#999',
          borderRadius: 15,
          padding: 10,
        }}>
        <Text
          style={{
            fontSize: 22,
            marginVertical: 10,
          }}>
          {item.text}
        </Text>
        <Image
          style={{backgroundColor: '#efefef'}}
          height={300}
          width={260}
          source={{uri}}
        />
        <Text style={{marginTop: 10}}>{item.content}</Text>
      </View>
    );
  };

  const onSwipeLeft = (item: DataType) => {
    console.log('swipeLeft');
    setCurrentCardIndex(previousCardIndex => previousCardIndex + 1);
  };
  const onSwipeRight = (item: DataType) => {
    console.log('swipeRight');
    setCurrentCardIndex(previousCardIndex => previousCardIndex - 1);
  };

  let [currentCardIndex, setCurrentCardIndex] = useState(0);
  let card = data[currentCardIndex];

  return (
    <View>
      <TinderCard
        key={card.id}
        currentCardIndex={currentCardIndex}
        onSwipeRight={item => onSwipeRight(item)}
        onSwipeLeft={item => onSwipeLeft(item)}
        card={card}
        renderCard={renderCard}
      />
    </View>
  );
};
