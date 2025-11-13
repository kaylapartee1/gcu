import React from 'react';
import {View, Text, Button} from 'react-native';

export default function Cart({ route, navigation }) {
  const product = route.params?.product;
  return (
    <View style={{padding:20}}>
      <Text>Cart (demo)</Text>
      {product && <Text>1x {product.name} - ${product.price}</Text>}
      <Button title="Place Order" onPress={()=>navigation.navigate('Orders',{orderInfo:{items:[product], type:'pickup'}})} />
    </View>
  );
}
