import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { usernameValidator } from '../helpers/usernameValidator'
import { getUserFromToken } from '../helpers/getUserFromToken';
import API_URL from '../core/environment';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [user, setUser] = useState(null);

  const onSignUpPressed = async () => {
    const usernameError = usernameValidator(username.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || usernameError) {
      setUsername({ ...username, error: usernameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    await fetch(`${API_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({username: username.value, password: password.value, email: email.value})
    }).then((res) => res.json()).then(async (data) => {
      console.log(data);
      if(data.error){
        data.message.includes('password') ? setPassword({...password, error: data.message}) : setUsername({...username, error: data.message});
        return;
      }
      await AsyncStorage.setItem('@app:session', data.data).then((storageData) =>{
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      })

    });
  }


  useEffect(async () =>{
    console.log('using the effect');
    setUser(await getUserFromToken());
    console.log(user);
    if(user){
      return navigation.reset({
        index: 0,
        routes: [{ name: 'Dashboard' }],
      })
    }
  }, [])

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Register</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: '' })}
        error={!!username.error}
        errorText={username.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Next
      </Button>
      <View style={styles.row}>
        <Text>I already have an account !</Text>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})