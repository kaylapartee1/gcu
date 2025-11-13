import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function Feedback() {
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  const submit = async ()=>{
    await addDoc(collection(db,'feedback'), {text, createdAt: new Date()});
    setDone(true);
  };

  return (
    <View style={{padding:20}}>
      <TextInput placeholder="Leave feedback" value={text} onChangeText={setText} />
      <Button title="Submit" onPress={submit} />
      {done && <Text>Thanks for your feedback!</Text>}
    </View>
  );
}
