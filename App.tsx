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
import {TinderDeck} from './components/tinder-deck';

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
  return (
    <SafeAreaView>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <TinderDeck data={DATA} />
      </View>
    </SafeAreaView>
  );
}

export default App;
