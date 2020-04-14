import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  Helpers
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as firebase from "firebase"
import Moment from 'moment'
import { Icon, Avatar } from 'react-native-elements'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'
import _ from 'lodash'

var { height, width } = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, imageName, mine = 'image/jpg') => {
  return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS ==='ios' ? uri.replace('file://', '') : uri
      let uploadBlob = null
      const imageRef = firebase.storage().ref('images').child(imageName)
      fs.readFile(uploadUri, 'base64')
          .then((data) => {
              return Blob.build(data, {type: `${mine};BASE64`})
          })
          .then((blob) =>{
              uploadBlob = Blob
              return imageRef.put(blob, {contentType: mine })
          })
          .then(() => {
              uploadBlob.close()
              return imageRef.getDownloadURL()
          })
          .then((url) => {
              resolve(url)
          })
          .catch((error) => {
              reject(error)
          })
  })
}

type Props = {};
export default class NewRegister extends React.Component<Props> {

  constructor(props) {
    super(props);
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    this.state = {
      deviceWidth: width,
      deviceHeight: height,
      avatarSource: null,
      avatarPic: '',
      nome: "",
      email: "",
      cidade: "",
      telefone: "",
      idade: "",
      entrada: "",
      uid: "",
    };
  }



  maskTEL(v) {
    return new Promise((resolve, reject) => {
      if (!v) {
        resolve("");
        return;
      }
      v = v.replace(/\D/g, "");
      v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
      v = v.replace(/(\d)(\d{4})$/, "$1-$2");
      resolve(v);
    });
  }

  applyMask(value) {
    this.maskTEL(value).then(masked => {
      this.setState({
        phone: masked
      })
    })
  }

  selectPhotoTapped() {
    const options = {
      title: 'Selecione a Foto',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar foto',
      chooseFromLibraryButtonTitle: 'Selecionar na galeria',
      allowsEditing: false,
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      permissionDenied: {
        title: 'Permissão Negada',
        text:
          'Para poder tirar fotos com sua câmera e escolher imagens da sua biblioteca.',
        reTryTitle: 'Tentar Novamente',
        okTitle: "Tenho certeza",
      },
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          uri: source

        });
        console.log(source)
      }
    });
  }

  saveForm(){
    if(this.state.uid){
        try {
            this.state.name ? Helpers.setUserName(this.state.uid, this.state.name) : null
            this.state.bio ? Helpers.setUserBio(this.state.uid, this.state.bio): null
            this.state.place ? Helpers.setUserPlace(this.state.uid, this.state.place): null
            this.state.avatarSource ?
                uploadImage(this.state.avatarSource, `${this.state.uid}.jpg`)
                .then((responseData) => {
                    Helpers.setImageUrl(this.state.uid, responseData)
                })
                .done()
            : null

            this.props.navigator.push({
                id: 'App'
            })
        } catch (error){
            console.log(error)
        }
    }
}
  render() {
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    return (
      <View style={styles.container}>
      <View style={styles.view}>
        <Avatar
          large
          rounded
          source={(this.state.avatarSource)}
          icon={{ name: 'user', type: 'font-awesome' }}
          onPress={this.selectPhotoTapped.bind(this)}
          activeOpacity={0.7}
          containerStyle={{ marginTop: 5 }}
        />
        <Text style={styles.titleText}>Adicionar Foto</Text>

        <KeyboardAvoidingView>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => this.setState({ name: text })}
            placeholder="Ex: João Silva"
            value={this.state.name}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => this.setState({ mail: text })}
            placeholder="Ex: fulano@gmail.com"
            keyboardType='email-address'
            value={this.state.mail}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => this.setState({ city: text })}
            placeholder="Ex: Belo Horizonte"
            value={this.state.city}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => this.applyMask(text)}
            placeholder="Telefone"
            maxLength={15}
            keyboardType="numeric"
            value={this.state.phone}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => this.setState({ age: text })}
            placeholder="Ex: 19 anos"
            value={this.state.age}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={() => this.saveForm()} style={styles.registerButton} >
          <Text style={styles.buttonText}>REGISTRAR</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  registerNewPeople() {
    const PeoplesData = {
      name: this.state.name,
      mail: this.state.mail,
      city: this.state.city,
      phone: this.state.phone,
      age: this.state.age,
    }
    // firebase.database().ref("Peoples/")
      .push(PeoplesData)
      // .then((snapshot) => {
        .then(function (snapshot) {
        firebase.storage().ref('images')
        .put(`${this.state.avatarSource}`)
        .then(function (snapshot) {
          console.log('Uploaded a blob or file!');
        });
        // firebase.database().ref("Peoples/" + snapshot.key)
        //   .update({
        //     uid: snapshot.key
        //   })
        Actions.dashboard();
        Alert.alert("Sucesso!", "Pessoa cadastrada!")
      })
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: -1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#F5FCFF',
    height: height,
    // bottom: 15,
    // marginTop: 15
    // backfaceVisibility: 'hidden'
  },
  view: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 15
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 75,
    width: 100,
    height: 100,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  backButton: {
    backgroundColor: "gray",
    borderRadius: 10,
    padding: 10,
    // margin: 20,
    alignSelf: "flex-start"
  },
  registerButton: {
    borderColor: '#cfcfd0',
    backgroundColor: 'rgba(104, 150, 255, 0.9)',
    borderWidth: 0,
    borderRadius: 0,
    padding: 10,
    // margin: 35,
    width: width * 0.75,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff'
  },
  inputStyle: {
    height: height * 0.06,
    width: width * 0.85,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    margin: width * 0.04
  },
  titleText: {
    fontSize: 20,
    alignItems: 'center',
    textAlign: 'center',
    color: "#039BE5"
  }
});
