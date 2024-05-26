import { Text, StyleSheet,View, Image, Pressable, Alert } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import { Footer } from "../components/Footer";
import {  useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import { useEffect } from "react";
import { UserContext } from "../services/Usercontext";
import { useContext } from "react";



export const ProductDetails =({navigation, route})=>{

  const {user} = useContext(UserContext);
  const token = user.token;

  const cart = useSelector((state)=> state.cart.cart);

  

  const {item} = route.params;

  const dispatch = useDispatch();

  const addToCartHandler=(item) => {

    dispatch(addToCart(item));
    Alert.alert("Item added to cart")

  };
  useEffect(() => {
    const sendCartToServer = async () => {

      const response = await fetch('http://10.0.2.2:3000/cart', {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: cart })
      });

      if (!response.ok) {
        console.error('Failed to update cart on the server', response.statusText);
      }
    };

    if (cart.length > 0) {
      sendCartToServer();
    }
  }, [cart]);

 
  
  return(   
    <View style={styles.container}>
      <Text style = {styles.header}>Product Details</Text>
      <View style={styles.productDetailsImage}> 
        <Image
          source={{uri:`${item.image}`}}
          style={styles.image}/>
      </View>

      <Text style = {styles.productDetailsCaption}>{item.title}</Text>
      <Text style = {styles.productDetailsRate}>{`RATE: ${item.rating.rate}              SOLD: ${item.rating.count}              PRICE:$ ${item.price}`}</Text>

      <Pressable
          onPress={()=> navigation.goBack()}
          style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.backButton,]}>
          <FontAwesome5 name="backspace" size={20} color="white" />
          <Text style = {styles.backtext} >BACK</Text>
      </Pressable>

      <Pressable
          onPress={() => addToCartHandler(item)}
          style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.addToCart,]}>
          <Entypo name="shopping-cart" size={20} color="white" />
          <Text style = {styles.addToCartText} >ADD TO CART</Text> 
      </Pressable>
      
      <Text style={styles.descriptionText}>Description: </Text>
      <View style={styles.descriptionTextView}>
        <ScrollView>
          <Text style={styles.descriptionDetails} >{item.description}</Text>
        </ScrollView>

      </View>
      <Footer/>
          
    </View>
  )};


const styles = StyleSheet.create({
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

  productDetailsImage:{
    borderWidth: 1,
    position: 'absolute',
    top: 90,
    borderRadius:15,
    width:370, 
    height:310, 
  },

  image:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 15,
  },

  productDetailsCaption:{
    fontSize:15,
    position: 'absolute',
    top:400,
    fontWeight:'bold'
  },

  productDetailsRate:{
    fontSize:15,
    width: 370,
    height: 30,
    position: 'absolute',
    top:450,
    fontWeight:'bold',
    backgroundColor: '#0096FF',
    borderRadius: 5,
    paddingTop: 4,
    textAlign: 'center',
  },
    
  backtext:{
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft:5,
    color: 'white',
  },

  backButton:{
    flexDirection: 'row',
    paddingTop:5,
    width: 80,
    height:35,
    borderRadius: 5,
    backgroundColor: '#0096FF',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top:490,
    left:30,
  },

  addToCartText:{
    fontWeight: 'bold',
    fontSize: 15,
    paddingLeft:3,
    color: 'white',
  },

  addToCart:{
    flexDirection: 'row',
    paddingTop:5,
    width: 130,
    height:35,
    borderRadius: 5,
    backgroundColor: '#0096FF',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top:490,
    left:240,
  },

  descriptionText:{
    fontWeight: 'bold',
    fontSize: 15,
    position:'absolute',
    top:537,
    left:20,
  },

  descriptionTextView:{
    position:'absolute',
    top:560,
    left:10,
    width:370,
    height:180,
    borderRadius:9,
    borderWidth: 1,
    backgroundColor:'#D3D3D3'
  },

  descriptionDetails:{
    fontSize: 17,
    paddingLeft:10,
    paddingRight:5,
  },
       
})