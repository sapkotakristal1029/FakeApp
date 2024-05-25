import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Footer } from "../components/Footer";
import { UserContext } from "../services/Usercontext";
import { useDispatch } from "react-redux";
import { toogleSelected } from "../redux/cartReducer";
import { AntDesign } from '@expo/vector-icons';

export const Order = () => {
    const { user } = useContext(UserContext);
    const token = user.token;

    const dispatch = useDispatch();



    const [orders, setOrders] = useState([]);
    const [paidOrders, setPaidOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);


    const [selectedOrderId, setSelectedOrderId] = useState(null);


    const [newOrdersVisible, setNewOrdersVisible] = useState(false);
    const [paidOrdersVisible, setPaidOrdersVisible] = useState(false);
    const [deliveredOrdersVisible, setDeliveredOrdersVisible] = useState(false);

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
            setOrders(filteredOrders);
            setNewOrdersVisible(!newOrdersVisible);
            
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        if (paidOrdersVisible){
            setPaidOrdersVisible(!paidOrdersVisible)

        }
        if (deliveredOrdersVisible){
            setDeliveredOrdersVisible(!deliveredOrdersVisible)

        }

    };

    const payOrderHandler = async (orderID) => {
        try {
            const response = await fetch('http://10.0.2.2:3000/orders/updateorder', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderID: orderID,
                    isPaid: 1,
                    isDelivered: 0,
                })
            });
            if (response.ok) {
                const updatedOrder = orders.find(order => order.id === orderID);
                setOrders(orders.filter(order => order.id !== orderID));
                setPaidOrders([...paidOrders, updatedOrder]);
                dispatch(toogleSelected())
            } else {
                console.error('Error updating order status:', await response.text());
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const deliverOrderHandler = async (orderID) => {
        try {
            const response = await fetch('http://10.0.2.2:3000/orders/updateorder', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderID: orderID,
                    isPaid: 1,
                    isDelivered: 1,
                })
            });
            if (response.ok) {
                const updatedOrder = paidOrders.find(order => order.id === orderID);
                setPaidOrders(paidOrders.filter(order => order.id !== orderID));
                setDeliveredOrders([...deliveredOrders, updatedOrder]);
            } else {
                console.error('Error updating order status:', await response.text());
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const paidOrderHandler = async () => {

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
            const filteredOrders = dataObj.orders.filter(order => order.is_delivered === 0 && order.is_paid === 1);
            setPaidOrdersVisible(!paidOrdersVisible);

            setPaidOrders(filteredOrders);
            if (newOrdersVisible){
                setNewOrdersVisible(!newOrdersVisible)

            }
            if (deliveredOrdersVisible){
                setDeliveredOrdersVisible(!deliveredOrdersVisible)

            }
            
        } catch (error) {
            console.error('Error fetching orders:', error);
        }


    
    };

    const deliveredOrderHandler = async () => {

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
            const filteredOrders = dataObj.orders.filter(order => order.is_delivered === 1 && order.is_paid === 1);
            setDeliveredOrdersVisible(!deliveredOrdersVisible);
            setDeliveredOrders(filteredOrders);
            if (newOrdersVisible){
                setNewOrdersVisible(!newOrdersVisible)

            }
            if (paidOrdersVisible){
                setPaidOrdersVisible(!paidOrdersVisible)

            }
            
        } catch (error) {
            console.error('Error fetching orders:', error);
        }

    };

    const toggleOrderDetails = (orderId) => {
        setSelectedOrderId(selectedOrderId === orderId ? null : orderId);
    };

    const renderOrderItems = (orderItems) => {
        try {
            const items = JSON.parse(orderItems);
            return items.map((item, index) => (
                <View key={index} style={styles.orderItemDetail}>
                    {item.image && (
                        <Image
                            source={{ uri: item.image }}
                            style={styles.productImage}
                        />
                    )}
                    <Text style={styles.orderItemDetailsTitle}>{item.title || `Product ID: ${item.prodID}`}</Text>
                    <Text style={styles.orderItemDetailsPrice}>{`Price: $${item.price}`}</Text>
                    <Text style={styles.orderItemDetailsQuantity}>{`Quantity: ${item.quantity}`}</Text>
                </View>
            ));
        } catch (error) {
            console.error('Error parsing order items:', error);
            return null;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Orders</Text>
            <View style={styles.card}>
                <Pressable
                    onPress={newOrderHandler}
                    style={({ pressed }) => [(pressed ? { opacity: 0.2 } : {}), styles.orderButton]}>
                    <View style={styles.clickableHandler}>

                        <Text style={styles.orderText}>New Orders</Text>
                        <Text>                              </Text>
                        <AntDesign name={newOrdersVisible?"caretup":"caretdown"} size={20} color="green" />
                    </View>
                </Pressable>

                {newOrdersVisible && (
                    <View style={styles.newOrderBox}>
                        <FlatList
                            data={orders}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.orderItems}>
                                    <Pressable
                                        onPress={() => toggleOrderDetails(item.id)}
                                        style={({ pressed }) => [(pressed ? { opacity: 0.2 } : {})]}>
                                        <View style={styles.orderItem}>
                                            <Text style={styles.orderItemText}>Order Id: {item.id}</Text>
                                            <Text style={styles.orderItemText}>Items: {item.item_numbers}</Text>
                                            <Text style={styles.orderItemText}>Total Price: {item.total_price}</Text>
                                            <AntDesign name={(selectedOrderId === item.id)?"caretup":"caretdown"} size={15} color="green" />

                                        </View>
                                    </Pressable>
                                    {selectedOrderId === item.id && (
                                        <View style={styles.orderItemDetails}>
                                            {renderOrderItems(item.order_items)}
                                            <Pressable
                                                onPress={() => payOrderHandler(item.id)}
                                                style={({ pressed }) => [(pressed ? { opacity: 0.2 } : {}), styles.payButton]}>

                                                <Text style={styles.payButtonText}>Pay Now</Text>
                                            </Pressable>
                                        </View>
                                    )}
                                </View>
                            )}
                        />
                    </View>
                )}

                <Pressable
                    onPress={paidOrderHandler}
                    style={({ pressed }) => [(pressed ? { opacity: 0.2 } : {}), styles.orderButton]}>
                    <View style={styles.clickableHandler}>

                        <Text style={styles.orderText}>Paid Orders</Text>
                        <Text>                              </Text>
                        <AntDesign name={paidOrdersVisible?"caretup":"caretdown"} size={20} color="green" />
                    </View>
                    
                </Pressable>

                {paidOrdersVisible && (
                    <View style={styles.newOrderBox}>
                        <FlatList
                            data={paidOrders}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.orderItems}>
                                    <Pressable
                                        onPress={() => toggleOrderDetails(item.id)}
                                        style={({ pressed }) => [(pressed ? { opacity: 0.2 } : {})]}>
                                        <View style={styles.orderItem}>
                                            <Text style={styles.orderItemText}>Order Id: {item.id}</Text>
                                            <Text style={styles.orderItemText}>Items: {item.item_numbers}</Text>
                                            <Text style={styles.orderItemText}>Total Price: {item.total_price}</Text>
                                            <AntDesign name={(selectedOrderId === item.id)?"caretup":"caretdown"} size={15} color="green" />
                                        </View>
                                    </Pressable>
                                    {selectedOrderId === item.id && (
                                        <View style={styles.orderItemDetails}>
                                            {renderOrderItems(item.order_items)}
                                            <Pressable
                                                onPress={() => deliverOrderHandler(item.id)}
                                                style={({ pressed }) => [(pressed ? { opacity: 0.2 } : {}), styles.deliverButton]}>
                                                <Text style={styles.deliverButtonText}>Mark as Delivered</Text>
                                            </Pressable>
                                        </View>
                                    )}
                                </View>
                            )}
                        />
                    </View>
                )}

                <Pressable
                    onPress={deliveredOrderHandler}
                    style={({ pressed }) => [(pressed ? { opacity: 0.2 } : {}), styles.orderButton]}>
                    <View style={styles.deliveryClickableHandler}>

                        <Text style={styles.orderText}>      Delivered Orders</Text>
                        <Text>                      </Text>
                        <AntDesign name={deliveredOrdersVisible?"caretup":"caretdown"} size={20} color="green" />
                    </View>

                    
                </Pressable>

                {deliveredOrdersVisible && (
                    <View style={styles.newOrderBox}>
                        <FlatList
                            data={deliveredOrders}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.orderItems}>
                                    <Pressable
                                        onPress={() => toggleOrderDetails(item.id)}
                                        style={({ pressed }) => [(pressed ? { opacity: 0.2 } : {})]}>
                                        <View style={styles.orderItem}>
                                            <Text style={styles.orderItemText}>Order Id: {item.id}</Text>
                                            <Text style={styles.orderItemText}>Items: {item.item_numbers}</Text>
                                            <Text style={styles.orderItemText}>Total Price: {item.total_price}</Text>
                                            <AntDesign name={(selectedOrderId === item.id)?"caretup":"caretdown"} size={15} color="green" />
                                        </View>
                                    </Pressable>
                                    {selectedOrderId === item.id && (
                                        <View style={styles.orderItemDetails}>
                                            {renderOrderItems(item.order_items)}
                                        </View>
                                    )}
                                </View>
                            )}
                        />
                    </View>
                )}

            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    clickableHandler:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        marginLeft: 100,
    },
    deliveryClickableHandler:{
        flexDirection: 'row',
        justifyContent:'flex-end',
        marginLeft: 50,
    },
    orderButton: {
        alignItems: 'center',
        backgroundColor: 'skyblue',
        paddingTop: 10,
        paddingBottom: 10,
        marginLeft: 10,
        width: "95%",
        borderRadius: 10,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    newOrderBox: {
        marginBottom: 10,
    },
    orderText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    orderItems: { },
    orderItem: {
        
        padding: 5,
        borderWidth:2,
        margin: 5,
        borderRadius: 5,

        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    orderItemText: {
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
    },
    orderItemDetails: {
        backgroundColor: '#D3D3D3',
        

        marginLeft: 10,
        marginRight: 10,
        borderRadius: 5,
        padding: 10,
    },
    orderItemDetail: {
        marginBottom: 10,

    },
    orderItemDetailsTitle: {
        fontWeight: 'bold',
        marginLeft: 70,
        position:'absolute',


    },
    orderItemDetailsPrice: {
        marginTop: 5,
        marginLeft: 70,
        position: 'absolute',
        top: 35
    },
    orderItemDetailsQuantity: {
        marginTop: 5,
        marginLeft: 250,
        position: 'absolute',
        top: 35
    },
    productImage: {
        width: 50,
        height: 50,
        margin: 2,
        borderRadius: 5,
    },
    payButton: {
        backgroundColor: 'green',
        padding: 5,

        borderRadius: 5,
        alignItems: 'center',
    },
    payButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    deliverButton: {
        backgroundColor: 'blue',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    deliverButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
