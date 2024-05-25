import { Text, View, StyleSheet,TextInput, Pressable, Alert } from "react-native";
import { UserContext } from "../services/Usercontext";
import { useContext, useState } from "react";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export const Profileupdate =({route, navigation})=>{
    // const {token} = route.params
    const{user,setUser}=useContext(UserContext)

    const token = user.token
    const username = user.username
    const email = user.email

    const [newemail, setnewEmail] = useState('')

    const changeEmailHandler=(val)=>{
        setnewEmail(val)
    }
    const [newpassword, setnewPassword] = useState('')
  
    const changePasswordHandler=(val)=>{
        setnewPassword(val)
    }
    



    const clearAll=()=>{
      navigation.goBack();
    }

    const handleLogin = () => {
      
      const data = {name: newemail, password: newpassword };
      console.log(newemail, newpassword)
      
      fetch('http://10.0.2.2:3000/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          if (data.status === 'OK') {
            setUser({ token: token, username: data.name, email: email })
            Alert.alert('Success', 'You login successfully');

            clearAll();
          } else {
            Alert.alert('error', data.message || 'An error occurred');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          Alert.alert('Error', 'An error occurred while registering');
        });
    };




    return (
        <View style={styles.container}>
           <Text style = {styles.header}>Update Profile</Text> 
           <View style = {styles.card}>
            <Text>Update username and password</Text>
            <Text style={styles.emailText}>New User Name:</Text>
            <TextInput 
                placeholder="New Email address"
                editable
                style = {styles.email} 
                value = {newemail}
                onChangeText={changeEmailHandler}
                />   
            <Text style={styles.emailText}>New Password:</Text>
            <TextInput 
                placeholder="Password"
                editable
                style = {styles.email} 
                value = {newpassword}
                onChangeText={changePasswordHandler}
                />  
    
            <View style ={styles.buttons}>
                <Pressable 
                onPress={()=> clearAll()}
                style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.button,]}>
    
                <Text><MaterialIcons name="cancel" size={19} color="#b148d2" /> Cancel </Text>
                </Pressable>
    
                <Pressable 
                onPress={()=> handleLogin()}
                style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.button,]}>
    
                <Text ><AntDesign name="check" size={19} color="#b148d2" />  Confirm  </Text>
                </Pressable>
                
                
            </View>        
    
            </View>
        </View>
    )

}

const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',      
        alignItems: 'center',
        justifyContent: 'center',
    },
  
    header:{
        color: 'white',
        backgroundColor: '#0096FF',
        position: 'absolute',
        left: 0,
        right: 0,
        top:10,    
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 70,
        textAlign: 'center',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',  
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
    
      },
      signupText:{
        textAlign: 'center',
        paddingTop: 10,
        // paddingLeft: 10,
      }
})