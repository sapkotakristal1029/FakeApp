import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, Alert, Image } from 'react-native';
import { Footer } from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
import { incrementQuantity, decrementQuantity, emptyCart, addToCart } from "../redux/cartReducer";
import { UserContext } from "../services/Usercontext";

export const ShoppingCart = () => {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const { user } = useContext(UserContext);
    const token = user.token;

    const increaseQuantity = (item) => {
        dispatch(incrementQuantity(item));
    };

    const decreaseQuantity = (item) => {
        dispatch(decrementQuantity(item));
    };

    const totalCost = cart.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const getCartData = async () => {
            try {
                const response = await fetch('http://10.0.2.2:3000/cart', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch cart data');
                }

                const data = await response.json();


                dispatch(emptyCart());
                data.items.forEach(item => dispatch(addToCart(item)));
                

            } catch (error) {
                console.error('Error fetching cart data:', error.message);
            }
        };

        getCartData();
    }, []);

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

    const checkoutHandler = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3000/orders/neworder', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items: cart })
            });
    
            if (!response.ok) {
                throw new Error('Failed to place order');
            }
    
            const emptyCartResponse = await fetch('http://10.0.2.2:3000/cart', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ items: [] }) // Send an empty array to clear the cart
            });
    
            if (!emptyCartResponse.ok) {
                throw new Error('Failed to empty cart on the server');
            }
    
            dispatch(emptyCart());
            Alert.alert('Order Placed', 'Your order has been placed successfully.');
        } catch (error) {
            console.error('Error placing order:', error.message);
            Alert.alert('Error', 'Failed to place order. Please try again later.');
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Shopping Cart</Text>
            {cartItemCount === 0 ? (
                <Text style={styles.emptyMessage}>
                    Your cart is currently empty. To view items, please add products from the product list.
                </Text>
            ) : (
                <View style={styles.context}>
                    <Text style={styles.secondHeader}>
                        Items: {cartItemCount}                 Total Cost: ${totalCost.toFixed(2)}
                    </Text>
                    <FlatList
                        data={cart}
                        renderItem={({ item }) => (
                            <View style={styles.box}>
                                <View style={styles.productImage}>
                                    <Image
                                        source={{ uri: `${item.image}` }}
                                        style={{ width: 70, height: 70 }}
                                    />
                                </View>
                                <View style={styles.productDetails}>
                                    <Text style={styles.productDetailsText}>{item.title}</Text>
                                    <Text style={styles.productPriceText}>Price: ${item.price}</Text>
                                    <View style={styles.addMinusHandler}>
                                        <Pressable
                                            onPress={() => increaseQuantity(item)}
                                            style={({ pressed }) => [(pressed ? { opacity: 0.2 } : {}), styles.backButton]}
                                        >
                                            <Ionicons name="add-circle" size={24} color="green" />
                                        </Pressable>
                                        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                                        <Pressable
                                            onPress={() => decreaseQuantity(item)}
                                            style={({ pressed }) => [(pressed ? { opacity: 0.2 } : {}), styles.backButton]}
                                        >
                                            <Entypo name="circle-with-minus" size={24} color="red" />
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Pressable
                        onPress={checkoutHandler}
                        style={({ pressed }) => [(pressed ? { opacity: 0.2 } : {}), styles.checkoutButton]}
                    >
                        <MaterialIcons name="payment" size={24} color="black" />
                        <Text style={styles.checkoutText}>Checkout</Text>
                    </Pressable>
                </View>
            )}
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        color: 'white',
        backgroundColor: '#0096FF',
        position: 'absolute',
        left: 0,
        right: 0,
        top: 10,
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 70,
        textAlign: 'center',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    secondHeader: {
        color: 'black',
        backgroundColor: 'skyblue',
        position: 'absolute',
        left: 0,
        top: -75,
        width: 360,
        borderRadius: 15,
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 25,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'center',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    context: {
        position: 'absolute',
        top: 150,
        left: 10,
        height: 580,
        padding: 5,
        borderWidth: 1,
        borderRadius: 15,
    },
    box: {
        marginBottom: 15,
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
        width: 360,
    },
    productImage: {
        height: 90,
        width: 90,
        position: 'relative',
        top: 10,
        left: 10,
    },
    productDetails: {
        flexDirection: 'column',
    },
    productDetailsText: {
        fontSize: 12,
        position: 'relative',
        top: 10,
        width: 265,
    },
    productPriceText: {
        fontWeight: 'bold',
        fontSize: 12,
        position: 'relative',
        top: 10,
        width: 265,
    },
    addMinusHandler: {
        flexDirection: 'row',
        position: 'relative',
        top: 20,
        left: 5,
    },
    quantity: {
        paddingLeft: 30,
        paddingRight: 40,
    },
    checkoutButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#0096FF',
        borderRadius: 20,
    },
    checkoutText: {
        position: 'relative',
        top: 4,
    },
});
