import React from 'react';
import {View, Text} from 'react-native';

export default function Orders({ route }) {
  const orderInfo = route.params?.orderInfo;
  return (
    <View style={{padding:20}}>
      <Text>Order Confirmation (demo)</Text>
      {orderInfo && <Text>Type: {orderInfo.type}</Text>}
      <Text>Order processing would call backend API in a full implementation.</Text>
    </View>
  );
}
