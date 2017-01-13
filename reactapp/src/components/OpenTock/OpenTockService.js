import { Promise } from "es6-promise";
export default  {
  publisherContainer: "publisherContainer",
  subscriberContainer: "subscriberContainer",
  defaultOptions: {
    insertMode: 'append',
    width: '100%',
    height: '100%',
  },
  init(credentials) {
    console.log("Initialize OpenTock Service", credentials);
    this.session = OT.initSession(credentials.api_key, credentials.session_id);
    this.session.on("streamCreated", (event) => {
      this.subscribe(event);
    });


    this.session.connect(credentials.token, error => {
      this.getDevices().then( configOptions =>{
        const publisher = OT.initPublisher(this.publisherContainer, {...configOptions, ...this.defaultOptions} );

        this.session.publish(publisher, error => {
          if(error) {
            console.log(error);
          }else{
            console.log("Publishing a stream");
          }
        })
      }).catch(error => console.log(error));
    });

    this.session.on("sessionDisconnected", event =>  {
      console.log("Session Disconnnected", event.reason);
    });
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

  subscribe(event) {
    this.session.subscribe(event.stream, this.subscriberContainer, this.defaultOptions);
  }

}

