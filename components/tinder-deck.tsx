import {useState} from 'react';
import {View, Text, Image} from 'react-native';
import {DataType} from '../App';
import {TinderCard} from './tinder-card';

type TinderDeckProps = {
  data: DataType[];
};

export const TinderDeck = ({data}: TinderDeckProps) => {
  const renderCard = (item: DataType) => {
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
          resizeMode={'contain'}
          style={{
            backgroundColor: '#efefef',
            flex: 1,
            height: undefined,
            width: undefined,
          }}
          source={require('../images/avatar-1.jpg')}
          height={300}
          width={260}
        />
        <Text style={{marginTop: 10}}>{item.content}</Text>
      </View>
    );
  };

  return (
    <View>
      <TinderCard data={data} renderCard={renderCard} />
    </View>
  );
};
