import React, {useState} from 'react';
import {Text, StyleSheet, View,Image, TextInput, TouchableOpacity} from 'react-native';
import StarRating from 'react-native-star-rating';
import Background from '../components/Background';
import UserOrder from '../core/api/UserOrder';
import { theme } from '../core/theme';
import { withNavigation } from 'react-navigation';


const AddReview = ({navigation}) =>{

const [value,onChangeText]=useState('');
 const [star,setStar]=useState(1);
 const [res,setRes]=useState();
 const [errorMsg,setErrorMsg]=useState();

  const onStarRatingPress = (rating) => {
      setStar(rating);  
  };

  const postReview = async (id, st, comment) => {
      try {
          const response = await UserOrder.post('/addReview',{
            _id: id,
            stars: st,
            review: comment,
          });
          console.log(response.data);
          setRes(response.data);
      }
      catch (err) {
        console.log(err);
          setErrorMsg('something went Wrong');
      }
  }; 

  const onSubmitPressed = async () =>{
    await postReview('6292598428b3d1b99ce3b2ba', star, value);
      navigation.navigate('Home');
  }
  
  return (
     
        <Background>
          <Text style={styles.header}>How was your expierence?</Text>
            
        <StarRating
          disabled={false}
          maxStars={5}
          rating={star}
          selectedStar={(rating) => onStarRatingPress(rating)}
        />
           <TextInput
              style={styles.input}
              placeholder="Comments..."
              multiline={true}
              numberOfLines={4}
              value={value}
              onChangeText={onChangeText}
                          
            />
        
        <TouchableOpacity style={styles.buton} onPress={onSubmitPressed}>

          <Text style={styles.textButton}>Post Review!</Text>

        </TouchableOpacity>
        </Background>
 );
}


const styles = StyleSheet.create(
  {
    head:{
      padding: 10,
      fontSize: 25 ,
      marginTop: 50,
      marginBottom: 70,
      alignSelf: 'center',
      fontWeight:'bold',
    },  
    input: {
          height: '20%',
          marginVertical:50,
          width: 300,
          alignSelf:'center',
          borderWidth: 1,
          padding: 10,
          borderRadius: 4,
        },
        textButton:{
          color: 'white',
          fontWeight:'bold',
          fontSize: 20,
          alignSelf: 'center',
          marginBottom: 10,
          marginTop: 10,
        },
      buton: {
          alignSelf:'center',
          width: 250,
          backgroundColor: theme.colors.primary,
          borderRadius: 6,
          margin: 12, 
        },
        header: {
          fontSize: 21,
          color: theme.colors.primary,
          fontWeight: 'bold',
          paddingVertical: 12,
          alignSelf:'center',
          marginVertical: 50,
          
        },
  }
);


export default withNavigation(AddReview);