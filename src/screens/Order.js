import { Text, View, StyleSheet } from "react-native";
import { Footer } from "../components/Footer";

export const Order =()=>{





    return (
        <View style={styles.container}>
           <Text style = {styles.header}>Orders</Text> 
           <Footer/>
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
})