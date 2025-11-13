import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const q = collection(db, 'products');
      const snap = await getDocs(q);
      setProducts(snap.docs.map(d => ({id: d.id, ...d.data()})));
    };
    load();
  }, []);

  return (
    <View style={{flex:1, padding:10}}>
      <FlatList
        data={products}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=> (
          <TouchableOpacity onPress={()=>navigation.navigate('ProductDetail',{id:item.id})}>
            <Text style={{fontSize:18}}>{item.name} - ${item.price}</Text>
            <Text>Stock: {item.stock}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
