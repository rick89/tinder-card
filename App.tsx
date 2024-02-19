/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {TinderCard} from './components/tinder-card';
import {avatarImage} from './images/avatar-1.jpg';

export type DataType = {
  id: number;
  text: string;
  content: string;
  image: string;
};

const DATA: DataType[] = [
  {
    id: 1,
    text: 'Card #1',
    content: 'Lorem ipsum dolors sit amet...',
    image: avatarImage,
  },
  {
    id: 2,
    text: 'Card #2',
    content: 'Lorem ipsum dolors sit amet...',
    image: avatarImage,
  },
  {
    id: 3,
    text: 'Card #3',
    content: 'Lorem ipsum dolors sit amet...',
    image: avatarImage,
  },
  {
    id: 4,
    text: 'Card #4',
    content: 'Lorem ipsum dolors sit amet...',
    image: avatarImage,
  },
  {
    id: 5,
    text: 'Card #5',
    content: 'Lorem ipsum dolors sit amet...',
    image: avatarImage,
  },
  {
    id: 6,
    text: 'Card #6',
    content: 'Lorem ipsum dolors sit amet...',
    image: avatarImage,
  },
  {
    id: 7,
    text: 'Card #7',
    content: 'Lorem ipsum dolors sit amet...',
    image: avatarImage,
  },
  {
    id: 8,
    text: 'Card #8',
    content: 'Lorem ipsum dolors sit amet...',
    image: avatarImage,
  },
];
console.log('avatarImage', avatarImage);
function App(): React.JSX.Element {
  const renderCard = (item: DataType) => {
    const uri = Image.resolveAssetSource({uri: item.image}).uri;

    return (
      <View
        key={item.id}
        style={{
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
    setCurrentCardIndex(currentCardIndex++);
  };
  const onSwipeRight = (item: DataType) => {
    setCurrentCardIndex(currentCardIndex--);
  };

  let [currentCardIndex, setCurrentCardIndex] = useState(0);

  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <TinderCard
          currentCardIndex={currentCardIndex}
          onSwipeRight={item => onSwipeRight(item)}
          onSwipeLeft={item => onSwipeLeft(item)}
          data={DATA}
          renderCard={renderCard}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;
