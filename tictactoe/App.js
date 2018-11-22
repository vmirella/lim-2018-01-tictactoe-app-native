import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, Button, Text } from 'react-native';
import {MaterialCommunityIcons as Icon} from 'react-native-vector-icons';

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
    this.setState({
      currentPlayer: 1
    });
  }

  //Verifica si el tablero esta lleno --> 1: lleno / 0: hay espacio
  fullTiles = () => {
    let flag = 1;
    let numTiles = 3;
    for (let i = 0; i < numTiles; i++) {
      for (let j = 0; j < numTiles; j++) {
        if (this.state.gameState[i][j] === 0) {
          flag = 0;
        }
      }
    }
    return flag;
  }

  getWinner = () => {
    let sum = 0;
    let numTiles = 3;
    //rows
    for (let i = 0; i < numTiles; i++) {
      sum = this.state.gameState[i][0] + this.state.gameState[i][1] + this.state.gameState[i][2];
      if (sum === numTiles) {
        return 1;
      } else if (sum === (-1 * numTiles)) {
        return -1;
      }
    }
    //cols
    for (let i = 0; i < numTiles; i++) {
      sum = this.state.gameState[0][i] + this.state.gameState[1][i] + this.state.gameState[2][i];
      if (sum === numTiles) {
        return 1;
      } else if (sum === (-1 * numTiles)) {
        return -1;
      }
    }
    //diagonals
    //(1)
    let sumDiagonal = 0;
    for (let i = 0; i < numTiles; i++) {
      for (let j = 0; j < numTiles; j++) {
        if (i === j) {
          sumDiagonal += this.state.gameState[i][j];
        }
      }
    }
    if (sumDiagonal === numTiles) {
      return 1;
    } else if (sumDiagonal === (-1 * numTiles)) {
      return -1;
    }
    //(2)
    sumDiagonal = 0;
    for (let i = 0; i < numTiles; i++) {
      for (let j = 0; j < numTiles; j++) {
        if ((i + j) === (numTiles -1)) {
          sumDiagonal += this.state.gameState[i][j];
        }
      }
    }
    if (sumDiagonal === numTiles) {
      return 1;
    } else if (sumDiagonal === (-1 * numTiles)) {
      return -1;
    }

    //No hay ganadores
    let full = this.fullTiles();
    if (full === 1) {
      return 2; //Tablero lleno
    } else {
      return 0; //Aún hay espacios
    }    
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

    //Verificando si ya hay un ganador
    let winner = this.getWinner();
    if (winner === 1) {
      Alert.alert('El jugador X es el ganador');
    } else if (winner === -1) {
      Alert.alert('El jugador O es el ganador');
    } else if (winner === 2) {
      Alert.alert('No hay ganador');
    }
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
    let player;
    if (this.state.currentPlayer === 1) {
      player = 'X';
    }
    else if (this.state.currentPlayer === -1) {
      player = 'O';
    }
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.textTitle}>Tic Tac Toe</Text>
            <Text style={styles.textPlayer}>Turno de:  {player}</Text>
          </View>
          <View style={{flex: 0.5, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={this.initializeGame} style={styles.buttonReload}><Icon name='reload' style={styles.iconReload}></Icon></TouchableOpacity>
          </View>
        </View>        
        
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
    backgroundColor: '#003432',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tile: {
    backgroundColor: '#679B99',
    borderWidth: 2,
    borderColor: '#fff',
    width: 100,
    height: 100,
    alignItems: 'center'
  },
  tileX: {
    color: 'red',
    fontSize: 90
  },
  tileO: {
    color: 'green',
    fontSize: 90
  },
  buttonReload: {
    backgroundColor: 'blue',
    padding: 5,
    width: 50,
    alignItems: 'center'
  },
  iconReload: {
    color: '#fff',
    fontSize: 25
  },
  textPlayer: {
    color: '#fff',
    fontSize: 20
  },
  textTitle: {
    color: '#fff',
    fontSize: 30
  }
});
