import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';

export default function App() {
  const [JokeModal, setJokeModal] = useState(false);
  const [active, setActive] = useState(false);
  const [press, setPress] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState(false);
  const [test, setTest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jokes, setJokes] = useState('');
  const [jokeSearched, setJokeSearched] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const JokeCategories = async () => {
    try {
      let data = await axios({
        url: 'https://api.chucknorris.io/jokes/categories',
        method: 'GET',
      });
      if (data) {
        setCategories(data.data);
      }
    } catch (e) {
      console.log('error>>>>>', e);
      console.log('error', e.response);
    }
  };


const reduce=(res)=>{
   console.warn('coming res reduce function',res)
    let name = '';
  if (res.length > 45) {
    name = `${res.slice(0, 45)}...`;
    return(name)
  }

  console.warn('seee it workng?>>>>',name)
  return(name)
}

  const fetchByCategory = async (res) => {
    console.warn(
      `>>>>>>>>>>>>https://api.chucknorris.io/jokes/random?category/${res}`
    );
    try {
      setLoading(true);
      let data = await axios({
        url: `https://api.chucknorris.io/jokes/random?category/${res}`,
        method: 'GET',
      });
      if (data) {
        setLoading(false);
        console.log('This is the picked categogy', data.data.value);
        setJokes(data.data.value);

        console.warn('This is the generated Joke', jokes);
      }
    } catch (e) {
      console.log('error>>>>>', e);
      console.log('error', e.response);
    }
  };

  const searchJokes = async (res) => {
    if (res.length > 2) {
      console.log('more than 2 now also this is the res incoming', res);
      try {
        setLoading(true);
        let data = await axios({
          url: `https://api.chucknorris.io/jokes/search?query=${res}`,
          method: 'GET',
        });
        let all = [];
        if (data) {
          setLoading(false);

          if (data.data.result.length > 0) {
            console.log('This is the search result', data.data.result);

            data.data.result.map((item, i) => {
              console.warn('i have warn u oooo >>>>>', item);
              console.warn('i have warn u oooo >>>>>', i);
              console.warn('entering into the  >>>>>', item.value);
              if (i < 5) {
                all.push(item.value);
              }
            });
            if (all.length > 0) {
              setDisplayData(all);
              console.log('result>>>>> this is the', all);
              setTest(true);

              console.log('done setting setSearch');
              setDisplayData(all);
            }
          } else {
            alert('no result found');
          }
        }
      } catch (e) {
        console.log('error>>>>>', e);
        console.log('error', e.response);
      }
    } else {
      console.log('less than 2');
      setTest(false)
    }
  };


 const selectedJoke = (res) => {
   setJokes(res)
    console.warn('this is what am passing>>', res);
setTest(false)
    
  };



  const myClick = (res) => {
    setActive(res);
    fetchByCategory(res);
    console.warn('this is what am passing>>', res);
  };

  useEffect(() => {
   
    JokeCategories();
  }, [search]);

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 60,
        backgroundColor: 'black',
        padding: 8,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <TextInput
            style={{
              width: '95%',
              borderColor: 'gray',
              backgroundColor: '#D3D3D3',
              borderWidth: 1,
              height: 40,
              borderRadius: 10,
              color: 'black',
              paddingLeft: 20,
            }}
            onChangeText={(value) => searchJokes(value)}
            placeholder={'Search'}
            placeholderTextColor="black"></TextInput>
        </View>
        {test ? (
          <View style={{ alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: '#D3D3D3',
                width: '95%',
                height: 200,
                alignItems: 'center',
                borderRadius: 10,
                paddingVertical: 10,
              }}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: '100%' }}>

                {displayData.map((item, i) => (
                  <TouchableOpacity
                    onPress={() => selectedJoke(item)}
                    style={{
                      borderColor: 'gray',
                      borderBottomWidth: 0.4,
                      width: '100%',
                      paddingVertical: 8,
                      borderRadius: 10,
                    }} 
                    
                    >
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'gray',
                        paddingLeft: 20,
                      }}>

                  
                     {reduce(item)} 
                    </Text>
                  </TouchableOpacity>
                ))}

              </ScrollView>
            </View>
          </View>
        ) : null}

        <View style={{ alignItems: 'center', marginTop: 30 }}>
          <View
            style={{
              width: '95%',
              borderRadius: 10,
            }}>
            <Image
              style={{ width: '100%', height: 200, borderRadius: 10 }}
              source={require('./assets/joke.jpg')}
            />
          </View>
        </View>

        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            
              alignItems: 'center',
           
              paddingVertical:20
            }}>
          {

  <FlatList
           
            data={categories}
       
            horizontal={ false }
            numColumns={ 3}
            renderItem={ ({ item }) => (
             <TouchableOpacity
                  style={{
                    backgroundColor:active == item ?'#00B3EF' :'#B9D42F',
                    height: 40,
                    paddigHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '28%',
                    borderRadius:  10,
                    marginHorizontal:10,
                    marginTop:10
                  }}
                  onPress={() => myClick(item)}>
              
                  <Text
                    style={{
                      fontSize: 16,
                      color: !active ? '#15253F' : 'white',
                    }}>
                    {item}
                  </Text>
                </TouchableOpacity>
            ) }
          />


              }
            
          
          </View>
        </View>

        <View style={{ marginTop: 10, alignItems: 'center' }}>
          {jokes !== '' ? (
            <View
              style={{
                backgroundColor: 'white',
                width: '95%',

                alignItems: 'center',
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 40,
              }}>
              <Text style={{ fontSize: 16, color: 'gray'}}>{jokes}</Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: 'white',
                width: '95%',

                alignItems: 'center',
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingVertical: 40,
              }}>
              <Text
                style={{ fontSize: 18, color: 'gray', textAlign: 'center' }}>
                Select a category from the above ones to catch more fun 🙃🥳😍
              </Text>
            </View>
          )}
        </View>
          <View
              style={{
             
                width: '95%',

                alignItems: 'center',
             height:60
              }}>
           
            </View>
      </ScrollView>
      <Modal
        isVisible={JokeModal}
        onBackButtonPress={() => setJokeModal(false)}
        onBackdropPress={() => setJokeModal(false)}>
        <View
          style={{
            backgroundColor: '#B9D42F',
            flex: 1,
            marginTop: 80,
            paddingHorizontal: 8,
            paddingTop: 40,
            paddingBottom: 20,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            marginBottom: -20,
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity
              style={{
                paddigHorizontal: 20,
                paddingVertical: 6,
                backgroundColor: 'white',
                width: '20%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
              onPress={() => setJokeModal(false)}>
              <Text style={{ color: 'red', fontSize: 14 }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{ color: 'white', fontSize: 12, marginTop: 40 }}>
              hbjbsd bjdijhevvdhjjghude hugwudgdwd uigwudgwue buiguwegw ugwuebwn
              uwewnw
            </Text>
          </ScrollView>
        </View>
      </Modal>
      {loading ? <Spinner visible={loading} color={'#00B3EF'} /> : null}
    </View>
  );
}
