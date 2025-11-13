import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function ProductDetail({ route, navigation }) {
  const { id } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(()=>{
    const load = async () => {
      const d = await getDoc(doc(db,'products',id));
      setProduct({id:d.id, ...d.data()});
    };
    load();
  },[]);

  if(!product) return <Text>Loading...</Text>;
  return (
    <View style={{padding:20}}>
      <Text style={{fontSize:22}}>{product.name}</Text>
      <Text>{product.description}</Text>
      <Text>Price: ${product.price}</Text>
      <Text>Stock: {product.stock}</Text>
      <Button title="Add to Cart" onPress={()=>navigation.navigate('Cart',{product})} />
    </View>
  );
}
