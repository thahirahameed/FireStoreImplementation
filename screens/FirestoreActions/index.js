import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, TextInput} from 'react-native';
import firestore, {collection, addDoc} from '@react-native-firebase/firestore';
import styles from './styles';

const db = firestore();

const FireStoreActions = () => {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [county, setCounty] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('UserCollection')
        .get();

      const documents = querySnapshot.docs.map(doc => doc.data());
      setUsers(documents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addData = async () => {
    try {
      const userCollection = firestore().collection('UserCollection');
      await userCollection.add({
        first_name: firstName,
        last_name: lastName,
        county: county,
        email: email,
        id: id,
      });
      console.log('Added successfully');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
    fetchData();
  };

  return (
    <View style={{backgroundColor: 'lightblue'}}>
      <Text style={styles.titleStyle}>
        The List of Users from Firestore Database:{' '}
      </Text>
      <FlatList
        data={users}
        renderItem={({item}) => {
          return (
            <View style={styles.dataContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textLabelStyle}>ID: </Text>
                <Text style={styles.textStyle}>{item.id}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textLabelStyle}>First Name: </Text>
                <Text style={styles.textStyle}>{item.first_name}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textLabelStyle}>Last Name: </Text>
                <Text style={styles.textStyle}>{item.last_name}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textLabelStyle}>County: </Text>
                <Text style={styles.textStyle}>{item.county}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textLabelStyle}>Email: </Text>
                <Text style={styles.textStyle}>{item.email}</Text>
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
      <View style={styles.dataContainer}>
        <View style={{backgroundColor: 'lightblue'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textLabelStyle}>ID: </Text>
            <TextInput
              defaultValue=" "
              onChangeText={changedText => {
                setId(parseInt(changedText));
              }}
              style={styles.textInputStyle}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textLabelStyle}>First Name: </Text>
            <TextInput
              defaultValue=" "
              onChangeText={changedText => {
                setFirstName(changedText);
                //setEnteredData({...enteredData, first_name: changedText});
              }}
              style={styles.textInputStyle}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textLabelStyle}>Last Name: </Text>
            <TextInput
              defaultValue=" "
              onChangeText={changedText => {
                setLastName(changedText);
                //setEnteredData({...enteredData, last_name: changedText});
              }}
              style={styles.textInputStyle}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textLabelStyle}>County: </Text>
            <TextInput
              defaultValue=" "
              onChangeText={changedText => {
                setCounty(changedText);
                //setEnteredData({...enteredData, county: changedText});
              }}
              style={styles.textInputStyle}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textLabelStyle}>Email: </Text>
            <TextInput
              autoCapitalize="none"
              defaultValue=" "
              onChangeText={changedText => {
                setEmail(changedText);
                // setEnteredData({...enteredData, email: changedText});
              }}
              style={styles.textInputStyle}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          addData();
          setFirstName('');
          setLastName('');
          setCounty('');
          setEmail('');
          setId('');
        }}>
        <Text style={styles.textLabelStyle}>Add Details to Fire Store</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FireStoreActions;
