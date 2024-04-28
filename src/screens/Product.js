import { StyleSheet, View, Text, ActivityIndicator} from "react-native";
import { Pressable } from "react-native";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { FontAwesome5 } from '@expo/vector-icons';

export const Product=({route, navigation})=>{

  const {itemName} = route.params;

  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);

  useEffect(()=>{
    const fetchCategories = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${itemName}`);
        const data = await response.json();
        setProducts(data);
        setProductLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setcategoryLoading(false);
      }
    };
  
    fetchCategories();
  }, [])

  const  productClickHandle=(item)=>{
    navigation.navigate('ProductDetails',{item})

  }
    return(
      <View style={styles.container}>
        <Text style = {styles.header}>{itemName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Text>
          {productLoading ? ( // Render ActivityIndicator while loading is true
            <ActivityIndicator size="large" color="#0000ff" />
              ) : (
            <View style = {styles.context}>
              <FlatList
              data={products}
              renderItem={({ item }) => (
                  
                <Pressable
                  onPress={()=> productClickHandle(item)}
                  style = {({pressed}) =>[(pressed? {opacity: 0.2}:{})]}>
                  <View style={styles.productItems}>
                    <View style={styles.productImage}>     
                      <Image
                        source={{uri:`${item.image}`}}
                        style={{ width:70, height:70}}/>
                    </View>                             
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productPrice}>{`Price: $${item.price}`}</Text>               
                  </View>
                </Pressable>
                        
              )}
              keyExtractor={(item, index) => index.toString()}/>    

              <Pressable
                onPress={()=> navigation.goBack()}
                style = {({pressed}) => [(pressed ? {opacity: 0.2}:{}), styles.backButton,]}>
                <FontAwesome5 name="backspace" size={24} color="white" />
                <Text style = {styles.backtext} >BACK</Text>
                  
              </Pressable>
          </View>
        )}
          <StatusBar style="auto" />
        </View>
    )
}

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

  context:{
    width: 380,
    height: 690,
    position: 'absolute',
    left: 5,
    top:100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },

  productItems:{
    backgroundColor: '#D3D3D3',
    width: 350,
    height: 100,
    marginBottom: 10,
    marginTop: 20,
    borderWidth: 1,
    textAlign: 'center',

  },
  
  productImage: {
    padding: 15,
  },

  productTitle:{
    marginLeft: 100,
    position:'absolute',
    top: 12,
  },

  productPrice:{
    marginLeft: 100,
    fontWeight: 'bold',
    position:'absolute',
    top: 70,
  },

  backtext:{
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft:3,
    color: 'white',
  },

  backButton:{
    flexDirection: 'row',
    paddingTop:5,
    width: 100,
    height:35,
    borderRadius: 5,
    backgroundColor: '#0096FF',
    textAlign: 'center',
    justifyContent: 'center',
  },
    
})