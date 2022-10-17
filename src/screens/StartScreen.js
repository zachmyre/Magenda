import React, {useEffect, useState} from 'react';
import { Text } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import { getUserFromToken } from '../helpers/getUserFromToken';

export default function StartScreen({ navigation }) {
  const [user, setUser] = useState(null);
  useEffect(() =>{
    const getUser = async () => {
      console.log('using the effect');
    setUser(await getUserFromToken());
    console.log(user);
    if(user){
      return navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    }
    }
    getUser();
  }, [])
  return (
    <Background>
      <Logo />
      <Header>Keep it professional, keep an agenda.</Header>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Log in
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Create an account
      </Button>
    </Background>
  )
}