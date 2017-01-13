class Api::V1::OpentoksController < Api::V1::ApplicationController
  def token
    render json: {
      api_key: api_key,
      session_id: room.name,
      token: opentok.generate_token(room.name)
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
     @room ||= ( Room.first ||  create_room)
    end

    def open_tock_session
      @open_tock_session ||= opentok.create_session
    end

    def create_room
      Room.create(name: open_tock_session.session_id)
    end

end
