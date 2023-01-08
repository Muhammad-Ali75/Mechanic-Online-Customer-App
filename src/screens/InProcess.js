import React from 'react';
import { Text, StyleSheet, View,FlatList,TouchableOpacity,ImageBackground} from 'react-native';
import { theme } from '../core/theme';
import { ScrollView } from 'react-native-virtualized-view';
import { withNavigation } from 'react-navigation';

const friends = [
  { name: 'hello',age:10 },
  { name: 'hello',age:20 },
  { name: 'hello',age:30 },
  { name: 'hello',age:40 },
  { name: 'hello',age:50 },
  { name: 'hello',age:60 },
  { name: 'hello',age:70 },
  { name: 'hello',age:80 },
  { name: 'hello',age:90 },
  ];
  const Service = ({ title, price }) => (
    <View style={styles.view}>
      <Text style={styles.textLeft}>{title}</Text>
      <Text style={styles.textRight}>{price}</Text>
    </View>
  );
const InProcess = ({navigation}) => {
  const orderID=navigation.getParam('orderID');
  const order=navigation.getParam('order');
  const list=order.order_items;
  const shop=navigation.getParam('shop');
  
      // const renderService = ({ item }) => (
      //   <Service title={item.title} price={item.price} />
      // );

  return (
    
    <View style={{flex:1}}>
      <ImageBackground
      source={require('../assets/background_dot.png')}
      resizeMode="repeat"
      style={styles.backgroundImg}
    >
            <Text style={styles.header}>  Repairing{'\n'}In Progress!</Text>
            <Text style={styles.text2}>Services:</Text>
          
      <ScrollView style={{flex:1,borderBottomWidth:1}}>
            <FlatList
              data={list}
              keyExtractor={list => list._id}
              renderItem={ ({item}) =>{
                return(
                  <Service title={item.title} price={item.price}/>
                )
            }}   
              scrollEnabled={false}             
                />
      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width:'100%', }} />
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
            <TouchableOpacity style={styles.buton}>
              <Text style={styles.buttonText}>Re-evaluate</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.buton}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
        </View> 

        <Text style={styles.text2}>Order:</Text>  
        <Text style={styles.text3}>Total</Text>

        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
          <Text style={{fontWeight:'bold', fontSize: 14}}>Travel Fee:{'\n'}{'\n'}Repair Cost:</Text>
          <Text style={{fontWeight:'600', fontSize: 14}}>75 Rs.{'\n'}{'\n'}In-Progress</Text>
        </View>
       
        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width:'100%', marginVertical:15, }} /> 
        
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
          <Text style={{fontWeight:'bold', fontSize: 18}}>Payable:</Text>
          <Text style={{fontWeight:'600', fontSize: 14}}>75 Rs.</Text>
        </View>

        <TouchableOpacity style={styles.butonFinal}>
              <Text style={styles.buttonText}>Proceed (75 Rs.)</Text>
            </TouchableOpacity>

      </ScrollView>
      </ImageBackground>
    </View>
      
    
  );
};

const styles = StyleSheet.create({
  view:
  {     flexDirection:'row',
    justifyContent:'space-between',
  },
    header: {
        fontSize: 21,
        color: theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 12,
        alignSelf:'center',
      },
      backgroundImg: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.surface,
      },
    text2:{
        fontWeight:'bold',
        margin: 12,
        fontSize: 20,
        alignSelf:'flex-start'
    },
    text3:{
      fontWeight:'bold',
      margin: 12,
      paddingLeft:15,
      fontSize: 16,
      alignSelf:'flex-start'
  },
    textLeft:{
      flex:3,
      fontWeight:'bold',
      margin: 10,
      paddingLeft:5,
      alignSelf:'flex-start',
    },
    textRight:{
      flex:1,
      fontWeight:'bold',
      alignSelf:'flex-end',
    },
    buton: {
      alignSelf:'center',
      width: '40%',
      backgroundColor: theme.colors.primary,
      borderRadius: 10,
      margin: 12, 
      padding: 5
    },
    buttonText:{
      color: 'white',
      fontWeight:'bold',
      fontSize: 18,
      lineHeight: 26,
      textAlign:'center',
      paddingVertical: 7,
  },
  butonFinal: {
    alignSelf:'center',
    width: '60%',
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    margin: 12, 
    padding: 5
  },
  
});

export default withNavigation(InProcess);