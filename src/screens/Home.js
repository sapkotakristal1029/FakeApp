import { StyleSheet, View, Text , ActivityIndicator, Pressable} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { useRoute } from "@react-navigation/native";

// import { StyleSheet, Text, View } from 'react-native';
export const Home =()=>{
    const navigation = useNavigation();
    const route = useRoute();


    const [categories, setCategories] = useState([])
    const[categoryLoading, setcategoryLoading] = useState(true)

    useEffect(()=>{
      const fetchCategories = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products/categories');
          const data = await response.json();
          setCategories(data);
          setcategoryLoading(false);
        } catch (error) {
          console.error('Error fetching categories:', error);
          setcategoryLoading(false);
        }
      };
  
      fetchCategories();
    }, [])
      
    const categoryClickHandle = (itemName)=>{
      navigation.navigate('Product',{itemName})
    }
      
    // })
    // const FakeStoreCategory = 'https://fakestoreapi.com/products/categories'
    // fetch(FakeStoreCategory)
    //     .then(res=>res.json())
    //     .then(data=>{
    //       data.forEach(value)})
    // console.log(categories)
        
    return (
        <View style={styles.container}>
          <Text style = {styles.header}>CATEGORIES</Text>
          {categoryLoading ? ( // Render ActivityIndicator while loading is true
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
          <View style = {styles.context}>
            <FlatList
              data={categories}
              renderItem={({ item }) => (
                <Pressable 
                  onPress={()=> categoryClickHandle(item)}
                  style = {({pressed}) =>[(pressed? {opacity: 0.2}:{})]}>
                  <View style={styles.categoryItems}>
                    <Text style={styles.categoryItem}>{item.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</Text>
                  </View>
                </Pressable>
                
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            

          </View>
        )}
          {/* <Text>THis is app.js</Text> */}
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
      // width: '95%',
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
      // right: 5,
      top:100,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
    },
    categoryItems:{
      width: 370,
      backgroundColor: '#D3D3D3',

      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      padding: 10,
      margin: 20,
      borderWidth: 1,
      textAlign: 'center',

    },
    categoryItem:{
      color: '#0096FF',
      fontWeight: 'bold',
      fontSize: 20,
    }


  });
  