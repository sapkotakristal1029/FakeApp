
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './src/screens/Home';
import { Product } from './src/screens/Product';
import { ProductDetails } from './src/screens/ProductDetails';
import { Provider } from "react-redux";
import { ShoppingCart } from './src/screens/ShoppingCart';
import store from './src/redux/store';

export default function App() {
  const Stack = createStackNavigator()
  return(
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator intialRouteName='Home'>
        <Stack.Screen name = 'Home' 
            component={Home} 
            options= {{headerShown: false,}}/>
          <Stack.Screen name='Product'
          component={Product}
          options={{headerShown: false}}/>
          <Stack.Screen name='ProductDetails'
          component={ProductDetails}
          options={{headerShown: false}}/>
          <Stack.Screen name='ShoppingCart'
          component={ShoppingCart}
          options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
 
}

