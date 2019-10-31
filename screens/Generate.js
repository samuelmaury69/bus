import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import {connect} from 'react-redux';
import { StyleSheet, View, TextInput, Text , ImageBackground, Button, Alert} from 'react-native';

 class Generate extends Component {
  constructor(props){
    super(props);
  }
  state = {
    text: '',
    validate_days:''
  };
    formatStandardTime = (date) => {
        let time = date.toLocaleTimeString();
        time = time.split(':'); // convert to array
        // fetch
        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        var seconds = Number(time[2]);
        // calculate
        var timeValue;
        if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
        } else if (hours > 12) {
        timeValue= "" + (hours - 12);
        } else if (hours == 0) {
        timeValue= "12";
        }
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
        timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
        return timeValue
    }
  Generate_Ticket=()=>{
    var monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];
 var today= new Date();
  var TuFecha = new Date();
  var dias = parseInt(this.state.validate_days);
  TuFecha.setDate(TuFecha.getDate() + dias);
  var resultado= monthNames[TuFecha.getMonth()]+' '+TuFecha.getDate()+','+TuFecha.getFullYear()+','+ this.formatStandardTime(TuFecha)
    const value = {
      amount:this.state.text, 
      days:TuFecha.getTime(),
      expiration:resultado,
      date:today.getDate()+'/'+today.getMonth()+'/'+today.getFullYear()+' '+this.formatStandardTime(today),
      number:Math.floor((Math.random() * 10000) + 1), 
      validate_days:this.state.validate_days,
      number_ticket:'#'+Math.floor(Math.random() * (9999 - 1000) + 1000),}
    this.props.Generate(value); 
    console.log(this.props.ticket)
  }

  render() {
    return (
    <ImageBackground source={require('../assets/images/bus1.png')} style={{width: '100%', height: '100%' ,justifyContent: 'center', alignItems:'center' }}>
      <View style={{backgroundColor: '#6ad7f6', width:'50%', height:'36%', marginBottom:4}}>
      <Text style={{  marginVertical:5,color: 'white', fontSize:20,  fontFamily: 'Lato-Black'}}> Monto del pasaje </Text>
       <TextInput style={styles.input}  onChangeText={(text) => this.setState({text: text})} keyboardType='numeric'/>
       <Text style={{  marginVertical:5,color: 'white', fontSize:15,  fontFamily: 'Lato-Black'}}> Dias validos del pasaje </Text>
       <TextInput style={styles.input}  onChangeText={(texto) => this.setState({validate_days: texto})} keyboardType='numeric'/>
      <Button  title="Generar" onPress={()=>this.Generate_Ticket()} />
      </View>

    </ImageBackground>
      );
  }
}
const styles = StyleSheet.create({
  input:{
    marginVertical:5, 
    height: 35, 
    borderColor: 'gray', 
    borderWidth: 1 
  }
});
  const mapStateProps = state =>({
    ticket: state.ReducerTicket,
  })

  const mapDispatchProps = dispatch => ({
       Generate: (value) => {
        dispatch({ type: 'GENERATE', value});
       }
     });

  export default connect(mapStateProps, mapDispatchProps)(Generate);