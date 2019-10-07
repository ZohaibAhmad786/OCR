import React, { Component } from 'react'
import {Alert, KeyboardAvoidingView,KeyboardAwareScrollView,ActivityIndicator,View,StyleSheet,Image,Picker,ScrollView ,TextInput } from 'react-native'
import RNTesseractOcr from 'react-native-tesseract-ocr';
import { Container,Header,Body,Title, Text, Content, H1,Button,Form,Textarea } from 'native-base' ;
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const tessOptions = {
  whitelist: null, 
  // blacklist: null
  blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>'
};


export default class Final extends Component {
    static navigationOptions = {
        header: null,
      };
      
    constructor(props) {
      super(props)
      const { navigation } = this.props;
      const uri = navigation.getParam('uri');
      const base = navigation.getParam('base');
      
      
      // const uri = "content://media/external/images/media/12550";
      // const base = '';

      this.state = {
         uri:uri,
         base:base,
         language:null,
         ocrResult:null,
         loading:false,
      };
    }
   getResult=()=>{
    console.log('get clicked');
    console.log(this.state.language);
    console.log(this.state.base);
  if(this.state.language != null){
      this.setState({ loading: true });
      setTimeout(()=>{
        this.extractor();
      },2000)
        
      } 
      else{
        Alert.alert('please select language');
      }
   }
   extractor(){
        RNTesseractOcr.recognize(this.state.base, this.state.language, tessOptions)
        .then((result) => {
        this.setState({loading:false, ocrResult: result });
        console.log("OCR Result: ", result);
        })
        .catch((err) => {
        console.log("OCR Error: ", err);
        })
        .done();
   }
    
    render() {
        return (
        
          <ScrollView >
                <Header style={{width:'100%', backgroundColor:'#00c497'}}>
                  <Body>
                      <Title style={{alignSelf:'center'}}>
                          Text Extractor   
                    </Title>
                  </Body>
                </Header>
 
          <View>
              <Image
                      style={styles.image}
                      source={{
                      uri: this.state.uri
                    }}
                      resizeMode="contain"/>
              
            <Picker
                selectedValue={this.state.language}
                style={{width:'50%',alignSelf:'center'}}
                onValueChange={(itemValue, itemIndex) =>
                this.setState({language: itemValue})
                // console.log();
                }>
                <Picker.Item label="select language"  />
                <Picker.Item label="English" value="LANG_ENGLISH" />
                <Picker.Item label="Bangla" value="LANG_BANGLA" />
            </Picker>
     
<Button style={{alignSelf:"center",}} rounded  warning onPress={this.getResult}>
                    <Text>extract</Text>              
                </Button>
  
  
  {this.state.loading &&
      <ActivityIndicator
               color = '#bc2b78'
               size = "large"
               style = {styles.activityIndicator}/>
    }
    {this.state.ocrResult &&
      <Form>
            <Textarea rowSpan={5} bordered 
            value={this.state.ocrResult}
             />
          </Form>
    
    }
         

   
            {/* <Text>{this.state.language}</Text> */}
        
          
          </View>
          </ScrollView>


        )
    }
}
const styles = StyleSheet.create({
  con:{
    flex:1,
    // justifyContent:'center',
    alignItems:"center",
    //  marginTop:'50%',

  },
    image: {
      alignSelf:'center',
      width: 200,
      height: 200,
      marginTop:20,
      },

 Pik:{
  //  backgroundColor:'#00c497',
  //  alignSelf:'center',
  // height: 50, 
  // width: '50%'
 },
 activityIndicator:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  height: 80
},

})