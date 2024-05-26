import { StatusBar, } from 'expo-status-bar';
import { useState, useContext } from 'react';
import { StyleSheet, Text, View,TextInput, Pressable} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { UserContext } from '../services/Usercontext';
import { Footer } from './Footer';

export const Login =({navigation})=>{
    const [email, setEmail] = useState('')

    const changeEmailHandler=(val)=>{
      setEmail(val)
    }
    const [password, setPassword] = useState('')
  
    const changePasswordHandler=(val)=>{
      setPassword(val)
    }
    
    const { setUser } = useContext(UserContext)

    const switchsignupHandler=()=>{
      navigation.navigate("Signup")
    }

    const clearAll=()=>{
      setEmail('');
      setPassword('');
    }

    const handleLogin = () => {
      if ( !email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }
      
      const data = {email: email, password: password };
      
      fetch('http://10.0.2.2:3000/users/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          if (data.status === 'OK') {
            Alert.alert('Success', 'You login successfully');

            setUser({ token: data.token, username: data.name, email: data.email });
            navigation.navigate("Userprofile")


            console.log('Access Token:', data.token);

            clearAll();
          } else {
            Alert.alert('Error', data.status || 'An error occurred');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          Alert.alert('Error', 'An error occurred while registering');
        });
    };


    return (
      <View style={styles.container}>
        <View style = {styles.card}>
          <Text>Sign in with email and password</Text>
          <Text style={styles.emailText}>Email:</Text>
          <TextInput 
              placeholder="Email address"
              editable
              style = {styles.email} 
              value = {email}
              onChangeText={changeEmailHandler}
              />   
          <Text style={styles.emailText}>Password:</Text>
          <TextInput 
              placeholder="Password"
              editable
              style = {styles.email} 
              value = {password}
              onChangeText={changePasswordHandler}
              />  
  
          <View style ={styles.buttons}>
            <Pressable 
              onPress={()=> clearAll()}
              style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.button,]}>
                <AntDesign name="minuscircle" size={19} color="#b148d2" />
                <Text> Clear </Text>
            </Pressable>
  
            <Pressable 
              onPress={()=> handleLogin()}
              style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.button,]}>
                <Ionicons name="happy" size={19} color="#b148d2" />
              <Text >  Sign In  </Text>
            </Pressable>
            
              
          </View>
          <Pressable 
              onPress={()=> switchsignupHandler()}
              style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), ]}>
  
            <Text style={styles.signupText}>Switch to: signup a new user</Text>
            </Pressable>  
  
        </View>

  
        <Footer/>
        
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
    card:{
      padding: 10,
      width: 350,
      backgroundColor: '#b148d2',
      borderRadius: 20,
      
    },
    email:{
      borderWidth: 2,
      height: 35,
      borderRadius:5,
      backgroundColor:'#f3ccff',
    },
    emailText:{
      paddingTop: 10,
    },
    buttons:{
      padding: 20,
      paddingBottom: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
  
    },
    button:{
      borderWidth: 1,
      backgroundColor:'#e79aff',
      borderRadius: 5,
      flexDirection:"row",
      padding:3
  
    },
    signupText:{
      textAlign: 'center',
      paddingTop: 10,
      // paddingLeft: 10,
    }
  });
  