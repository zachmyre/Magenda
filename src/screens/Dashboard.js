import React, {useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserFromToken } from '../helpers/getUserFromToken';

export default function Dashboard({ navigation }) {
  let user;

  useEffect(async () =>{
    console.log('using the effect');
    user = await getUserFromToken();
    console.log(user);
    if(!user){
      return navigation.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      })
    }
  })
  return (
    <Background>
      <Logo />
      <Header>Welcome 💫</Header>
      <Paragraph>
        Congratulations you are logged in.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={async () =>{
          await AsyncStorage.clear();
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
          
        }
          
        }
      >
        Sign out
      </Button>
    </Background>
  )
}