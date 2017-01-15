import { Promise } from "es6-promise";
import  Api  from "../../api";
import { OpenTokService } from "./OpenTokService";
export default  {
  publisherContainer: "publisherContainer",
  subscriberContainer: "subscriberContainer",
  userName:"Username",
  defaultOptions: {
    insertMode: 'append',
    width: '100%',
    height: '100%',
  },

  connect(type) {
    console.log("will be connected with:", this.userName);
    return new Promise((resolve, reject) => {
      this.getDevices().then(configOptions =>{
        this.session.connect(this.credentials.token, error => {
          if (error) return reject(error);
          this.publish(configOptions)
          resolve();
        });
      });
    });
  },

  disconnect() {
    return new Promise((resolve, reject) => {
      this.session.disconnect();
      resolve()
    });
  },

  publish(configOptions){
    this.publisher = OT.initPublisher(
      this.userName.match(/physician/i) ? this.publisherContainer: this.subscriberContainer,
      {...configOptions, ...this.defaultOptions, name: this.userName, style: { nameDisplayMode: "on" } }
    );

    this.session.publish(this.publisher, error => {
      if(error) {
        console.log(error);
      }else{
        console.log("Publishing a stream");
      }
    })
  },

  initSession(type) {
    this.userName = type;
    this.session = OT.initSession(this.credentials.api_key, this.credentials.session_id);
    this.session.on('streamCreated', event => {
      event.streams.forEach(stream => {
        if (stream.connection.connectionId != this.session.connection.connectionId) {
          this.subscribe(stream);
        }
      })

    })

    return new Promise((resolve) => {
      resolve(this.session);
    });
  },

  getCredentials(username) {
    return Api.get("opentok/token", { username })
      .then(response => {
        this.credentials  = response.body;
        return this.credentials;
      })
      .catch( error => console.log(error))
  },

  getDevices() {
    let audioInputDevices, videoInputDevices;
    return new Promise((resolve, reject) => {
      OT.getDevices((error, devices) => {
        if (error) return reject(error);
        audioInputDevices = devices.filter(element => element.kind == "audioInput");
        videoInputDevices = devices.filter(element => element.kind == "videoInput");
        const audioSource = audioInputDevices[0].deviceId;
        const videoSource = videoInputDevices[0].deviceId;
        return resolve({ audioSource, videoSource});
      });
    });
  },

  subscribe(stream) {
    let container = this.subscriberContainer;
    if(stream.connection.data.match(/physician/i))
      container  = this.publisherContainer;
    this.session.subscribe(stream, container, this.defaultOptions);
  }


}

