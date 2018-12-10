import React from "react";
import moment from "moment";

const MessageList = props => {
  const myMessages = [].concat(props.messages).sort((a, b) => {
    if (a.dateCreated > b.dateCreated) {
      return 1;
    } else if (a.dateCreated < b.dateCreated) {
      return -1;
    }
    return 0;
  });

  return myMessages ? (
    myMessages.map(message => (
      <div className="chats">
        <div className="chats">
          {message.fromUserId === props.user.id ? (
            <div className="chat ">
              <div className="chat-avatar">
                <a
                  className="avatar"
                  data-toggle="tooltip"
                  href="#"
                  data-placement="right"
                  title=""
                  data-original-title=""
                >
                  <img
                    src="https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg"
                    className="width-50 rounded-circle"
                    alt="avatar"
                  />
                </a>
              </div>

              <div className="chat-body" key={message.id}>
                <div className="chat-content">
                  <p>
                    <span style={{ fontSize: "12px" }}>
                      {" "}
                      {props.user.firstName + " " + props.user.lastName}
                    </span>{" "}
                    <br />
                    {message.message}
                    <br />
                    {moment(message.dateCreated).format("ddd LT")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="chat chat-left">
              <div className="chat-avatar">
                <a
                  className="avatar"
                  data-toggle="tooltip"
                  href="#"
                  data-placement="left"
                  title=""
                  data-original-title=""
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTa6XDaVThj2_rJwBBne8IBqiyQBkunYkg6S1UAa8XmxGz4C-uxCQ"
                    className="width-50 rounded-circle"
                    alt="avatar"
                  />
                </a>
              </div>

              <div className="chat-body" key={message.id}>
                <div className="chat-content">
                  <p>
                    <span style={{ fontSize: "16px" }}> {message.fromUser}</span> <br />
                    {message.message}
                    <br />
                    {moment(message.dateCreated).format("ddd LT")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    ))
  ) : (
    <div>Begin a Conversation</div>
  );
};

export default MessageList;
