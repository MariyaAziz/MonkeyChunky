import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './localdb';
import PhonicSoundButton from './PhonicSoundButton';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor="#900C3F"
            centerComponent={{
              text: 'Monkey Chunkey',
              style: { color: 'white', fontSize: 20 },
            }}></Header>
          <Image
            style={styles.imageicon}
            source={{
              uri:
                'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
            }}></Image>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              this.setState({
                text: text,
                chunks:[],
              });
            }}
            value={this.state.text}
            placeholder="Type Here"></TextInput>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var word=this.state.text.toLowerCase().trim();
              db[word]?(
              this.setState({ chunks: db[word].chunks }),
              this.setState({ phonicSounds: db[word].phones })):
              Alert.alert("This word is not in our database")
            }}>
            <Text style={{ fontSize: 20, color: 'white', alignSelf: 'center' }}>
              GO
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row', alignSelf:'center'}}>
            {this.state.chunks.map((t, i) => {
              return (
                <PhonicSoundButton
                  wordChunk={this.state.chunks[i]}
                  soundChunk={this.state.phonicSounds[i]}
                  buttonIndex={i}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAF7A6',
  },
  input: {
    margin: 20,
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
    height: 50,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: 'red',
    color: '#360963',
    borderRadius: 10,
    backgroundColor: '#FAE7E3',
  },
  button: {
    width: 80,
    height: 50,
    backgroundColor: 'teal',
    alignContent: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageicon: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
  },
});
