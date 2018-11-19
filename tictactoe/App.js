import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';
import { red } from 'ansi-colors';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]});
  }

  onTilePress = (row, col) => {
    //Validando los tile para ser presionados una sola vez
    let value = this.state.gameState[row][col];
    if(value != 0) {
      return;
    }
    //Activando el evento press
    let currentPlayer = this.state.currentPlayer;
    let matrix = this.state.gameState.slice();
    matrix[row][col] = currentPlayer;
    this.setState({gameState:matrix});

    //Cambiando a otro jugador
    let nextPlayer = (currentPlayer == 1)? -1 : 1;
    this.setState({currentPlayer: nextPlayer});
  }

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch(value) {
      case 1: return <Icon name='close' style={styles.tileX}></Icon>;
      case -1: return <Icon name='circle-outline' style={styles.tileO}></Icon>;
      default: return <View></View>;
    }

  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, {borderTopWidth: 0}]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, {borderTopWidth: 0, borderRightWidth: 0}]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, {borderLeftWidth: 0}]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={styles.tile}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, {borderRightWidth: 0}]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, {borderBottomWidth: 0}]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, {borderBottomWidth: 0, borderRightWidth: 0}]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tile: {
    borderWidth: 10,
    width: 100,
    height: 100
  },
  tileX: {
    color: 'red',
    fontSize: 60
  },
  tileO: {
    color: 'green',
    fontSize: 60
  }
});
