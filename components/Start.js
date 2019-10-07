import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  DeviceEventEmitter,
  ToastAndroid,
  TouchableOpacity,
  Image,
  SafeAreaView
} from 'react-native';

import RNAndroidScanner from 'react-native-android-scanner';
import RNTesseractOcr from 'react-native-tesseract-ocr';
import { Header,Body,Title, Container, Text, Content, H1,Button } from 'native-base' ;
import { createStackNavigator } from 'react-navigation'; 
import Final from './Final';

const tessOptions = {
  whitelist: null, 
  // blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
  blacklist: ''
};

class App extends Component {
 
  static navigationOptions = {
    header: null,
  };

  state = {
    imageUri: null,
    ocrResult:'',
  }

  componentWillMount = () => {
    ToastAndroid.show('Listening for SCANNED_RESULT', ToastAndroid.SHORT);
    DeviceEventEmitter.addListener(RNAndroidScanner.SCANNED_RESULT, this.onResult);
  }

  onScan = (preference = 5) => {
    
    // PICKFILE_REQUEST_CODE = 1
    // START_CAMERA_REQUEST_CODE = 2
    // OPEN_CAMERA = 4;
    // OPEN_MEDIA = 5;
    
    RNAndroidScanner.startScan(preference);
  }

  onResult = (image) => {
    // ToastAndroid.show('onResult completion callback:', ToastAndroid.SHORT);

    this.props.navigation.navigate('final', {
      uri: image.uri,
      base: image.base,
        });


    // this.setState({imageUri: image.uri})
    
    console.log("OCR Result: ", image);


// RNTesseractOcr.recognize(image.base, 'LANG_ENGLISH', tessOptions)
//   .then((result) => {
//     this.setState({ ocrResult: result });
//     console.log("OCR Result: ", result);
//   })
//   .catch((err) => {
//     console.log("OCR Error: ", err);
//   })
//   .done();

  }

  render() {
    return (
      // <SafeAreaView style={styles.container}>
      <Container>
      <Header style={{backgroundColor:'#00c497'}}>
           <Body>
            <Title style={{alignSelf:'center'}}>
               Text Extractor   
        </Title>
          </Body>
      </Header>


    <Content>
      <View style={styles.button}>
          {/* <Button light><Text> Light </Text></Button> */}
          <Button style={{marginBottom:2}} rounded info onPress={() => this.onScan(4)}>
          <Text>open camera</Text>       
          </Button>

        <Button rounded  warning onPress={() => this.onScan(5)}>
        <Text>open file manager</Text>              
        </Button>
      </View> 

          {/* <Image
            style={styles.image}
            source={{
            uri: this.state.imageUri
          }}
            resizeMode="contain"/>
        <Text>{this.state.ocrResult}</Text> */}
       </Content>
         </Container>
  // </SafeAreaView>
    );
  }
}

export default RootStack = createStackNavigator(
  {
    home: App,
    final: Final,
  },
  {
    initialRouteName: 'home',
  }
);


// onPress={() => this.onScan()}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  button:{
  flex:1,
  // justifyContent:'center',
  alignItems:"center",
   marginTop:'50%',
  },
  // imageContainer: {
  //   flex: 1,
  //   justifyContent: 'flex-start',
  //   alignItems: 'center'
  // },
  image: {
    width: 150,
    height: 150,
  },
  // buttonContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   marginTop: 50,
  //   alignItems: 'center'
  // },
  // welcome: {
  //   fontSize: 15,
  //   textAlign: 'center',
  //   margin: 10
  // },
  // scanButton: {
  //   fontSize: 17,
  //   textAlign: 'center',
  //   color: '#333333',
  //   marginBottom: 30
  // }
});