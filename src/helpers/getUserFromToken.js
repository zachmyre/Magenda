import AsyncStorage from "@react-native-async-storage/async-storage";
import API_URL from '../core/environment';

export async function getUserFromToken(){
    let user = null;
    await AsyncStorage.getItem("@app:session").then(async (token) => {
        console.log(`Token captured: ${token} `);
        await fetch(`${API_URL}/user/token`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({token: token})
        }).then((res) => res.json()).then((userResp) => {
          if(userResp.error){
            return;
          }
          console.log(userResp);
          user = userResp.data;
        })
      })
      return user;
}