import React, {useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dashboard({ navigation }) {

  useEffect(async () =>{
    console.log('using the effect');
    await AsyncStorage.getItem("@app:session").then(async (token) => {
      console.log(`Token captured: ${token} `);
      await fetch("http://localhost:8080/task/add/task", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({token: token})
      }).then((res) => res.json()).then((user) => {
        console.log(user);
      })
    })
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
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Sign out
      </Button>
    </Background>
  )
}