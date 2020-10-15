## Creating a session --
Create an OpenTok session that clients can connect to, publish streams to, and subscribe to streams within. in our case we need to implement the ruby version in our backend.
The code below will ilustrate how we can implement a simple controller to create a session and how to generate tockens with the permission to publish their audio-video streams.
```ruby
class Api::V1::OpentoksController < Api::V1::ApplicationController
  def token
    render json: {
      api_key: api_key,
      session_id: room.name,
      token: generate_token(params[:username])
    }
  end

  private
    def api_key
      @api_key ||= ENV['OPEN_TOK_KEY']
    end

    def api_secret
      @api_secreet ||= ENV['OPEN_TOK_SECRET']
    end

    def opentok
      @opentok ||= ::OpenTok::OpenTok.new(api_key, api_secret)
    end

    def room
     #this method will create a new session or returns an existing 
     @room ||= ( Room.first ||  create_room)
    end

    def open_tock_session
      #this method creates a new session by using the api_key and the api_secret
      @open_tock_session ||= opentok.create_session
    end

    def generate_token(username)
     #this method creates a token with the permissions to publish 
      opentok.generate_token(room.name, role: :publisher, data: "username=#{params[:username]}")
    end

    def create_room
      Room.create(name: open_tock_session.session_id)
    end

end

```
## What is OpenTock?
- OpenTock **API** platform is built on three key concepts: streams, connections and sessions
 - **Stream**: is a single audio-video signal which includes a user's published camera and microphone feed.
 - **Connection**: is a logical abstraction of a single browser tab's interaction with a session. The connection is 
   the mechanism through which a client publishes and subscribes to streams within a session.
- **Session**: represents an entire video chat environent. It is a collection of connections publishing or subscribing to streams.
   A session also dispatches events representing changes in the session.


## OpenTok Pros --

- **Multi-platform Capability:**
   - OpenTok works on the latest versions of Google Chrome, Mozilla Firefox, and Internet Explorer 10-11 (via the OpenTok Plugin)
- **Voice and Video Calls Made easy:**
   - Easy generation of sessions(rooms)
   - Unique token generation for users in order to allow subscribe or publish the video-audio streams
- **OpenTock gives you the ability to embed it on your website or mobile app.**
- **It works with modern devices by using the web browser feature(webRTC).**
  > **Note:** Tested on Android Phone.
- OpenTock gives you the ability to record the video calls in 
 
- **Based Role implementation:**
  - **Subscriber:** This users can connect to OpenTok sessions and subscribe to other client's streams. They cannot publish their own streams to a session
  - **Publisher:** This users can connect to OpenTok sessions, publish audio-video streams to the session and subscribe to other client's streams.
  - **Moderator:** In addition to publishing and subscribing to streams, moderators can force other clients to disconnect from a session or force a client to stop publishing an
  audio-video stream
  
## OpenTok Cons --
  - Built with WebRTC(which means some devises will not be able to use the app).
  - Safari Doesn't support that feature.
  - Talking about "Moderation" feature this is not supported on mobile devices it is supported only for OpenTock.js(web browser) version
  - To get quality support with Tockbox you will have to pay a monthly fee(free support only comes with community forums self-service and stardard production infrastructure).
  - Doesn't offer unlimited calls like other competitors do, instead you have a base fee that comes with 10,000 subscribed minutes.
  - Archiving Pricing
    - **Composited File:** For easy playback with a single MPEG4 archive file.
      - **price**: $0.035 per session minute
    - **Individual Stream File:** For post-processing control over layout and media format of each invidual stream.
      - **price**: $0.025 per session minute
