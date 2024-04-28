
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './src/screens/Home';
import { Product } from './src/screens/Product';
import { ProductDetails } from './src/screens/ProductDetails';


export default function App() {
  const Stack = createStackNavigator()
  return(
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
      </Stack.Navigator>
    </NavigationContainer>

  )
 
}

