import React, { Component } from 'react';

import {
  View,
  Button,
  Image,
  StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  image: {
    width: 350,
    marginTop: 50,
    alignContent: "center",
    height: 400,
    resizeMode: "cover",
  },
  view: {
    backgroundColor: "#c2d9ea",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:"center",
  },

  button : {
    backgroundColor: '#2189dc',
    borderColor: 'white',
    borderWidth: 0,
    borderRadius: 5,
    color: 'white',
    fontSize: 24,
    fontWeight: 300,
    width: 124,
    fontWeight: 'bold',
    overflow: 'hidden',
    padding: 3,
    textAlign:'center'
  }
});

class HomePage extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.view}>
        <Image
          style={styles.image}
          source={require('../../assets/images/icon.png')}
        />
        <TouchableOpacity style={styles.button}>
        <Button
          title="GET STARTED"
          onPress={() =>
            this.props.navigation.navigate('UserList', {
              count: this.props.count,
            })
          }
        ></Button>
        </TouchableOpacity>
      </View>
    )
  }
}


export default HomePage;