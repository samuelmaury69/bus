import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import {connect} from 'react-redux';
import { Camera } from 'expo-camera';
//import QRCode from 'react-native-qrcode';
import code from 'react-native-azteccode-qrcode-generator';
Aztec=code.Aztec;
QRCode=code.QRCode;
import * as Animatable from 'react-native-animatable';


 class Ticket extends React.Component {
    constructor(props){
    super(props);
    console.log(this.props)
  }
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    text:'https://github.com/umer990/react-native-azteccode-qrcode-generator',
    date:this.props.ticket.date,
    days:Math.round((this.props.ticket.days -new Date())/(1000*60*60*24))
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
          <View style={{flex: 3, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'  }}>
      <Text allowFontScaling={false} style={{ color: 'white', fontSize:50, fontFamily: 'Lato-Black'}}>MY <Text allowFontScaling={false} style={{ color: '#ec62b4', fontSize:50, fontFamily: 'Lato-Black'}}>TICKET</Text></Text>
        <Text allowFontScaling={false} style={styles.Text}>STANDARD</Text>
        <Text allowFontScaling={false} style={styles.Text}>{this.props.ticket.validate_days}-DAY</Text>
        </View>
            <View style={{flex: 5, backgroundColor: 'transparent' }}>
              <View style={{flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'  }}>
                <Text allowFontScaling={false} style={styles.Text}>TICKET <Text allowFontScaling={false} style={styles.Text}>{this.props.ticket.number_ticket}</Text></Text>
                <Text allowFontScaling={false} style={{ color: '#00ff21', fontSize:15, fontFamily: 'Lato-Black'}}>valid until</Text>
                <Text allowFontScaling={false} style={{ color: '#00ff21', fontSize:15, fontFamily: 'Lato-Black'}}>{this.props.ticket.expiration}</Text>
              </View>
              {/*<TouchableOpacity style={{ flex: 0.1,  alignSelf: 'flex-end', alignItems: 'center'}} onPress={() => { this.setState({
                                  type:
                                    this.state.type === Camera.Constants.Type.back
                                      ? Camera.Constants.Type.front
                                      : Camera.Constants.Type.back,
                                });
                              }}>
                              <Text allowFontScaling={false} style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
                            </TouchableOpacity>*/}
              <View style={{flex: 0.5, backgroundColor: '#000000a3', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{flex: 2 , alignItems: 'center'}}>
                <Text allowFontScaling={false} style={styles.Text}>purchased</Text>
                <Text allowFontScaling={false} style={styles.Text}>{this.state.date} </Text>
                <Text allowFontScaling={false} style={styles.Text}>Time left to use: </Text>
                <Text></Text>
                </View>
                 <View style={{flex: 1 , alignItems: 'center'}}>
                <Text allowFontScaling={false} style={{fontSize:25,color:'white',fontFamily: 'Lato-Black'}}>${this.props.ticket.amount}</Text>
                <Text></Text>
                <Text allowFontScaling={false} style={{fontSize:25,color:'white',fontFamily: 'Lato-Black'}}>{this.state.days} days</Text>
                </View>
              </View>
            </View>
            <View style={{flex:1.7, flexDirection: 'row'}}>
              <View style={{flex: 2, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
              <Animatable.Text animation={pulse} iterationCount="infinite" style={{ color: '#ec62b4', fontSize:40, fontFamily: 'Lato-Black'}}>{this.props.ticket.number}</Animatable.Text>
              </View>
              <View style={{flex:1, backgroundColor:'white',justifyContent:'space-evenly',alignItems:'center'}}>
              <Aztec  value={this.state.text}  size={100}  bgColor='black' fgColor='white'/>{/*modificacion en le nodemodules para q funcione el aztec comparar con el otro qr*/}
                              {/*<QRCode   value={{user: '2051020@gmail.com', loyaltyId: 'fasdfasdf'}} size={120}  bgColor='black' fgColor='white'/>*/}
                              </View>
                </View>
          </Camera>
        </View>
      );
    }
  }
}
const pulse = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.5,
  },
  2: {
    scale: 1,
  },
};
const styles = StyleSheet.create({
  Text:{
    color: 'white', 
    fontSize:20, 
    fontFamily: 'Lato-Black'
  }
});
  const mapStateProps = state =>({
    ticket: state.ReducerTicket,
  })

  const mapDispatchProps = (dispatch) => {return{}}

  export default connect(mapStateProps, mapDispatchProps)(Ticket);