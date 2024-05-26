import { Text,Pressable, View,StyleSheet, Alert } from "react-native"
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";
import { Entypo } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useState,useContext, useEffect } from "react";
import {  useSelector, useDispatch } from "react-redux";
import { UserContext } from "../services/Usercontext";

export const Footer=()=>{
    const { user } = useContext(UserContext);
    const token = user.token;
    const route = useRoute(); 

    const navigation = useNavigation();

    const dispatch = useDispatch();
    const selected = useSelector((state) => state.cart.selected);

    const isFocused = useIsFocused();

    const [neworderNo, setNewOrderNo] = useState(0)

    useEffect(() => {
      if (isFocused) {

          const screenName = route.name;
          switch (screenName) {
              case 'Home':
                  setHomePressed(true);
                  setCartPressed(false);
                  setOrderPressed(false);
                  setProfilePressed(false);
                  break;
              case 'ShoppingCart':
                  setHomePressed(false);
                  setCartPressed(true);
                  setOrderPressed(false);
                  setProfilePressed(false);
                  break;
              case 'Order':
                  setHomePressed(false);
                  setCartPressed(false);
                  setOrderPressed(true);
                  setProfilePressed(false);
                  break;
              case 'Userprofile':
                  setHomePressed(false);
                  setCartPressed(false);
                  setOrderPressed(false);
                  setProfilePressed(true);
                  break;
              default:
                  setHomePressed(false);
                  setCartPressed(false);
                  setOrderPressed(false);
                  setProfilePressed(false);
          }
      }
  }, [isFocused, route]);

    const [isHomePressed, setHomePressed] = useState(false);
    const [isCartPressed, setCartPressed] = useState(false);
    const [isOrderPressed, setOrderPressed] = useState(false);
    const [isProfilePressed, setProfilePressed] = useState(false);

    const cart = useSelector((state)=> state.cart.cart);

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
    
    useEffect(()=>{
      if(route.name !== 'Login' && route.name !== 'Signup'){
        const newOrderHandler = async () => {
          try {
              const response = await fetch('http://10.0.2.2:3000/orders/all', {
                  method: 'GET',
                  headers: {
                      'Accept': 'application/json',
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json'
                  }
              });
              const dataObj = await response.json();
              const filteredOrders = dataObj.orders.filter(order => order.is_delivered === 0 && order.is_paid === 0);
              setNewOrderNo(filteredOrders.length);
              
          } catch (error) {
              console.error('Error fetching orders:', error);
          }
         
        };
        newOrderHandler();
      }

    },[cartItemCount, selected])

    const showLoginAlert = () => {
      Alert.alert('Not Logged In', 'You must Login to View This tab');
    };
    
    const goToCartHandler=()=>{
      if (route.name === 'Login' || route.name === 'Signup'){
        showLoginAlert();

      }else{
        setHomePressed(false);
        setCartPressed(true);
        setOrderPressed(false);
        setProfilePressed(false);
        navigation.navigate('ShoppingCart')

      }
    }
    const goToHomeHandler=()=>{
      if (route.name === 'Login' || route.name === 'Signup'){
        showLoginAlert();

      }else{
        setHomePressed(true);
        setCartPressed(false);
        setOrderPressed(false);
        setProfilePressed(false);
        navigation.navigate("Home")
      }

    }
    const goToOrderHandler=()=>{
      if (route.name === 'Login' || route.name === 'Signup'){
        showLoginAlert();
      }else{
        setHomePressed(false);
        setCartPressed(false);
        setOrderPressed(true);
        setProfilePressed(false);     
        navigation.navigate("Order")   

      }

    }
    const goToProfileHandler=()=>{
      if (route.name === 'Login' || route.name === 'Signup'){
        showLoginAlert();
         
      }else{
        setHomePressed(false);
        setCartPressed(false);
        setOrderPressed(false);
        setProfilePressed(true); 
        navigation.navigate("Userprofile")

      }     
    
    }
return(
    <View style= {styles.footer}>
        <Pressable
            onPress={() => goToHomeHandler()}
            style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.homeButton,]}>
              <View style={styles.buttons}>
                <Entypo name="home" size={30} color={isHomePressed? "blue": 'grey'} />
                <Text style = {[styles.homeText,{color: isHomePressed? "grey": 'grey'}]} >HOME</Text>
              </View>           
        </Pressable>

        <Pressable
            onPress={() => goToCartHandler()}
            style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.cartButton,]}>
              <View style={styles.buttons}>

                <Entypo name="shopping-cart" 
                  size={30} 
                  color={isCartPressed?"blue":"grey"} />
                <Text style = {[styles.homeText,{color: isCartPressed? "blue": 'grey'}]} >MY CART</Text>

              </View>        
        </Pressable>
        {
          cartItemCount>0 && (
              <View style = {styles.cartCountBadge}>
                  <Text style = {styles.cartCount}>{cartItemCount}</Text>
              </View>)
                
            
        }
        
        
        <Pressable
            onPress={() => goToOrderHandler()}
            style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.cartButton,]}>
            <View style={styles.buttons}>

              <SimpleLineIcons name="present" 
                size={30} 
                color={isOrderPressed?"blue":"grey"} />
              <Text style = {[styles.homeText,{color: isOrderPressed? "blue": 'grey'}]} >MY ORDERS</Text>

            </View>
            
            
        </Pressable>
        {
          neworderNo>0 && (
            <View style = {styles.orderCountBadge}>
                  <Text style = {styles.orderCount}>{neworderNo}</Text>
              </View>
          )
        }
        <Pressable
            onPress={() => goToProfileHandler()}
            style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.cartButton,]}>
            <View style={styles.buttons}>
              <FontAwesome name="user" 
                size={30} 
                color={isProfilePressed?"blue":"grey"} />

              <Text style = {[styles.homeText,{ color:isProfilePressed? "blue": 'grey'}]} >PROFILE</Text>

            </View>          
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
      },
      buttons:{
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',

      },
      homeButton:{
        // paddingRight: 30,
        paddingLeft: 10,
      },
      cartButton:{
        flexDirection: 'column',
        paddingLeft: 40,
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
        bottom:41,
        left:132,
        backgroundColor: 'red',
        borderRadius: 50,
        // padding: 10,
        minWidth: 20,
        minHeight: 20,
        alignItems: 'center',
        justifyContent: 'center'
        
      },
      orderCount:{
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',


      },
      orderCountBadge:{
        position: 'absolute',
        bottom: 40,
        right: 112 ,
        backgroundColor: 'red',
        borderRadius: 50,
        minWidth: 20,
        minHeight: 20,
        alignItems: 'center',
        justifyContent: 'center'
        
      }
})