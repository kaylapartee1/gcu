import React, {useState} from 'react';
import {View, TextInput, Button, Text} from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Products');
    } catch (e) {
      setError(e.message);
    }
  };

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Products');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={{padding:20}}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={{color:'red'}}>{error}</Text> : null}
      <Button title="Login" onPress={login} />
      <Button title="Sign up" onPress={signup} />
    </View>
  );
}
