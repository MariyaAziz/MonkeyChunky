import * as React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default class PhonicSoundButton extends React.Component {
  constructor() {
    super();
    this.state = {
      pressedButtonIndex: null,
    };
  }
  playSound = async (soundChunk) => {
    var link =
      'https://s3-whitehatjrcontent.whjr.online/phones/' + soundChunk + '.mp3';
    await Audio.Sound.createAsync({ uri: link }, { shouldPlay: true });
  };
  render() {
    return (
      <TouchableOpacity
        style={
          this.state.pressedButtonIndex === this.props.buttonIndex
            ? [styles.chunkbutton, { backgroundColor: 'white' }]
            : [styles.chunkbutton, { backgroundColor: 'red' }]
        }
        onPress={() => {
          this.setState({ pressedButtonIndex: this.props.buttonIndex });
          this.playSound(this.props.soundChunk);
        }}>
        <Text
          style={
            this.state.pressedButtonIndex === this.props.buttonIndex
              ? [styles.text, { color: 'red' }]
              : [styles.text, { color: 'white' }]
          }>
          {this.props.wordChunk}
        </Text>
        <Text
          style={
            this.state.pressedButtonIndex === this.props.buttonIndex
              ? [styles.text, { color: 'red' }]
              : [styles.text, { color: 'white' }]
          }>
          {this.props.soundChunk}
        </Text>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: '#360963',
    alignSelf: 'left',
    fontSize: 20,
    fontStyle: 'bold',
    textAlign: 'center',
  },
  chunkbutton: {
    width: 100,
    height: 80,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'brown',
    borderRadius: 10,
    margin: 10,
  },
});
