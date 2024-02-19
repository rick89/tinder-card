import React from 'react';
import {View, SafeAreaView} from 'react-native';
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
    image: '/Users/ric/Sites/animations/images/avatar-1.jpg',
  },
  {
    id: 2,
    text: 'Card #2',
    content: 'Lorem ipsum dolors sit amet...',
    image: '/Users/ric/Sites/animations/images/avatar-1.jpg',
  },
  {
    id: 3,
    text: 'Card #3',
    content: 'Lorem ipsum dolors sit amet...',
    image: '/Users/ric/Sites/animations/images/avatar-1.jpg',
  },
  {
    id: 4,
    text: 'Card #4',
    content: 'Lorem ipsum dolors sit amet...',
    image: '/Users/ric/Sites/animations/images/avatar-1.jpg',
  },
  {
    id: 5,
    text: 'Card #5',
    content: 'Lorem ipsum dolors sit amet...',
    image: '/Users/ric/Sites/animations/images/avatar-1.jpg',
  },
  {
    id: 6,
    text: 'Card #6',
    content: 'Lorem ipsum dolors sit amet...',
    image: '/Users/ric/Sites/animations/images/avatar-1.jpg',
  },
  {
    id: 7,
    text: 'Card #7',
    content: 'Lorem ipsum dolors sit amet...',
    image: '/Users/ric/Sites/animations/images/avatar-1.jpg',
  },
  {
    id: 8,
    text: 'Card #8',
    content: 'Lorem ipsum dolors sit amet...',
    image: '/Users/ric/Sites/animations/images/avatar-1.jpg',
  },
];
console.log('avatarImage', './images/avatar-1.jpg');
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
