import React,{useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

const Home = (props) => {
  
  const [data,setData] = useState([]);

  const url = "https://ipinfo.io/json?token=34399f2fd1edd6"

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then((json)=>setData(json))
    .catch((error)=>console.log(error))
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.ip}>
        <Text>Ip: "{[data.ip]}"</Text>
        <Text>City: "{[data.city]}"</Text>
        <Text>Region: "{[data.region]}"</Text>
        <Text>Country: "{[data.country]}"</Text>
        <Text>Loc: "{[data.loc]}"</Text>
        <Text>Org: "{[data.org]}"</Text>
        <Text>Postal: "{[data.postal]}"</Text>
        <Text>Timezone: "{[data.timezone]}"</Text>
      </View>
      <Button title="Logout" onPress={() => props.navigation.navigate('Login')} />
    <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ip: {
    textAlign: "left",
    marginBottom: 50,
  },
});

export default Home;