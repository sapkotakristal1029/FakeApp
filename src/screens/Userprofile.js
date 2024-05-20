import { Text,StyleSheet, View, Pressable, Alert } from "react-native";
import { useState, useEffect, useContext } from "react";
import { Footer } from "../components/Footer";
import { UserContext } from "../services/Usercontext";

export const Userprofile =({ navigation})=>{

    const{user,setUser}=useContext(UserContext)
    

    const updateHandler=()=>{
        navigation.navigate("Profileupdate")

    }

    const signOutHandler=()=>{
        Alert.alert("You sign out successfully")
        setUser({ token: null, username: '', email: '' });
        navigation.navigate("Login")

    }

    return(
        <View style={styles.container}>
            <Text style ={styles.header}>USER PROFILE</Text>
            <Text style={styles.username}>User Name:  {user.username}</Text>
            <Text style={styles.email}>Email Address:  {user.email}</Text>

            <View style={styles.buttons}>

                <Pressable
                    onPress={()=> updateHandler()}
                    style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.button,]}>
                    <Text style = {styles.backtext} >Update</Text>
                </Pressable>
                <Pressable
                    onPress={()=> signOutHandler()}
                    style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.button,styles.signoutButton]}>
                    <Text style = {styles.backtext} >Sign Out</Text>
                </Pressable>
            </View>

        <Footer/>
        </View>
       
    )
}
const styles=StyleSheet.create({
    container:{
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

    username:{
        position: 'absolute',
        left: 50,
        top:150,
    
    },

    email:{
        position: 'absolute',
        left: 50,
        top:180,

    },
    buttons:{
        position: 'relative',
        bottom: 150,
        right: 10,
        flexDirection: 'row',

        
    },

    button:{
        borderRadius: 10,
        
        backgroundColor:"#0096FF"
    },
    signoutButton:{
        marginLeft: 100,
    },
    backtext:{
        padding: 5,

    }
    
})