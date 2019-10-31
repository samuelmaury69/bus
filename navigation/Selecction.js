import React, { Component } from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import Ticket from '../screens/Ticket';
import Generate from '../screens/Generate';

class Selection extends Component {

  constructor(props){
    super(props);
  }
  render() {
    return (
      <View style={{flex:1}}>
      {Math.round((this.props.ticket.days -new Date())/(1000*60*60*24))>0?<Ticket/>:<Generate/>}
      </View>
      );
    }
  }
  const mapStateProps = state =>({
    ticket: state.ReducerTicket,
  })

  const mapDispatchProps = (dispatch) => {return{}}

  export default connect(mapStateProps, mapDispatchProps)(Selection);