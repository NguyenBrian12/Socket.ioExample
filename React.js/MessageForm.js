import React from "react";
import LoggedIn from "../Redux/LoggedIn";
class MessageForm extends React.Component {
  render() {
    return (
      <section className="chat-app-form bg-blue-grey bg-lighten-5">
        <LoggedIn>
          <form className="chat-app-input row">
            <fieldset className="form-group position-relative has-icon-left col-lg-10 col-8 m-0">
              <div className="form-control-position">
                <i className="icon-emoticon-smile" />
              </div>
              <input
                type="text"
                className="form-control"
                id="iconLeft4"
                placeholder="Type your message"
                name="message"
                onChange={this.props.chatInput}
                value={this.props.message}
              />
              <div className="form-control-position control-position-right">
                <i className="ft-image" />
              </div>
            </fieldset>
            <fieldset className="form-group position-relative has-icon-left col-lg-2 col-4 m-0">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.props.sendMessage}
                disabled={this.props.message === ""}
              >
                <i className="fa fa-paper-plane-o hidden-lg-up" /> Send
              </button>
            </fieldset>
          </form>
        </LoggedIn>
      </section>
    );
  }
}

export default MessageForm;
