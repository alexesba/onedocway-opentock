class Api::V1::OpentoksController < Api::V1::ApplicationController
  def token
    render json: {
      api_key: api_key,
      session_id: opentok_session.session_id,
      token: opentok.generate_token(opentok_session.session_id)
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

    def opentok_session
      @opentok_session ||= opentok.create_session
    end

end
