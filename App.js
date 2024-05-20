
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from './src/screens/Home';
import { Product } from './src/screens/Product';
import { ProductDetails } from './src/screens/ProductDetails';
import { Provider } from "react-redux";
import { ShoppingCart } from './src/screens/ShoppingCart';
import store from './src/redux/store';
import { Login } from './src/components/Login';
import { Signup } from './src/components/Signup';
import { Userprofile } from './src/screens/Userprofile';
import { Order } from './src/screens/Order';
import { Profileupdate } from './src/screens/Profileupdate';
import { UserProvider } from './src/services/Usercontext';

export default function App() {
  const Stack = createStackNavigator()
  return(
    
    <Provider store={store}>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator intialRouteName='Login'>
            <Stack.Screen name = 'Login' 
                  component={Login} 
                  options= {{headerShown: false,}}/>

              <Stack.Screen name = 'Order' 
                  component={Order} 
                  options= {{headerShown: false,}}/>
              <Stack.Screen name = 'Profileupdate' 
                  component={Profileupdate} 
                  options= {{headerShown: false,}}/>
              <Stack.Screen name = 'Userprofile' 
                  component={Userprofile} 
                  options= {{headerShown: false,}}/>
              

              <Stack.Screen name = 'Signup' 
                  component={Signup} 
                  options= {{headerShown: false,}}/>
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
    </UserProvider>
    </Provider>
  )
 
}

