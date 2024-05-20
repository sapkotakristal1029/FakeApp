import { Text,Pressable, View,StyleSheet } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import {  useSelector, useDispatch } from "react-redux";

import { toogleSelected } from "../redux/cartReducer";

export const Footer=()=>{
    const route = useRoute(); 


    const navigation = useNavigation();

    const dispatch = useDispatch();
    const selected = useSelector((state) => state.cart.selected);


    const cart = useSelector((state)=> state.cart.cart);
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)


    const goToCartHandler=()=>{
      dispatch(toogleSelected());
      navigation.navigate('ShoppingCart')
    
    }
    const goToHomeHandler=()=>{


      navigation.navigate("Home")

        
    
    }
    const goToOrderHandler=()=>{
      // dispatch(toogleSelected());
      navigation.navigate("Order")

        
    
    }
    const goToProfileHandler=()=>{
      // dispatch(toogleSelected());
      navigation.navigate("Userprofile")

        
    
    }
return(
    <View style= {styles.footer}>
        <Pressable
            onPress={() => goToHomeHandler()}
            style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.homeButton,]}>
            <Entypo name="home" size={30} color={selected? "grey": 'blue'} />
            <Text style = {[styles.homeText,{color: selected? "grey": 'blue'}]} >HOME</Text>
            
        </Pressable>
        {
          cartItemCount>0 && (
              <View style = {styles.cartCountBadge}>
                  <Text style = {styles.cartCount}>{cartItemCount}</Text>
              </View>)
                
            
        }
        <Pressable
            onPress={() => goToCartHandler()}
            style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.cartButton,]}>
            <Entypo name="shopping-cart" 
              size={30} 
              color={selected?"blue":"grey"} />
            <Text style = {[styles.homeText,{color: selected? "blue": 'grey'}]} >MY CART</Text>
            
            
        </Pressable>
        
        <Pressable
            onPress={() => goToOrderHandler()}
            style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.cartButton,]}>
            <SimpleLineIcons name="present" 
              size={30} 
              color="grey" />
            <Text style = {[styles.homeText,{color: 'grey'}]} >MY ORDERS</Text>
            
            
        </Pressable>
        <Pressable
            onPress={() => goToProfileHandler()}
            style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.cartButton,]}>
            <FontAwesome name="user" 
              size={30} 
              color="grey"  />

            <Text style = {[styles.homeText,{color: 'grey'}]} >PROFILE</Text>
            
            
        </Pressable>
        

 
        
</View>
)

}
const styles = StyleSheet.create({
    footer:{
        position:'absolute',
        bottom:5,
        left:0,
        flexDirection: 'row',
    
        // justifyContent: space
      },
      homeButton:{
        // paddingRight: 30,
        paddingLeft: 20,
      },
      cartButton:{
        // paddingRight: 30,
        paddingLeft: 35,
      },
      homeText:{
        fontWeight: 'bold',
        fontSize: 15,
    
        paddingLeft:0,
        color: 'black',
      },
      cartCount:{
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',


      },
      cartCountBadge:{
        position: 'absolute',
        bottom:43,
        left:120,
        backgroundColor: 'red',
        borderRadius: 50,
        // padding: 10,
        minWidth: 20,
        minHeight: 20,
        alignItems: 'center',
        justifyContent: 'center'
        
      }
})