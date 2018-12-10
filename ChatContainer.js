import React from "react";
import { getAllChatMessages, getAllTenants } from "../../services/chatMessage.service";
import GroupChatList from "./GroupChatList";

import Title from "./Title";
import MessageList from "./MessageList";
import MessageForm from "./MessageForm";
import io from "socket.io-client";
import "./Chat.css";
import { connect } from "react-redux";
import LoggedIn from "../Redux/LoggedIn";
import InfiniteScroll from "../../shared/InfiniteScroll";

class ChatContainer extends React.Component {
  state = {
    messages: [],
    to: null,
    tenantName: null,
    tenants: [],
    filtered: [],
    totalCount: 24,
    pageSize: 0,
    totalPages: 0,
    message: "",
    formErrors: [],
    alreadyScrolled: false
  };
  componentDidMount() {
    this.fetchTenants();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  fetchData = () => {
    if (this.state.pageSize === 0 || this.state.pageSize < this.state.totalPages) {
      getAllChatMessages(
        this.state.to || this.props.user.tenantId,
        this.state.pageSize,
        this.state.totalCount
      ).then(response => {
        if (response.data.item) {
          const result = response.data.item.pageItems;
          this.setState(prevState => {
            return {
              messages: result.concat(prevState.messages),
              totalPages: response.data.item.totalPages,
              pageSize: prevState.pageSize + 1
            };
          });
          if (this.state.alreadyScrolled === false) {
            this.scrollToBottom();
            this.setState({ alreadyScrolled: true });
          }
        }
      });
    }
  };
  fetchTenants = () => {
    getAllTenants().then(response => {
      console.log(response);
      this.setState({ tenants: response.data.item.pageItems });
    });
  };

  constructor(props) {
    super(props);
    this.socket = io();

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      this.setState({ messages: [...this.state.messages, data] });
      this.scrollToBottom();
    };
  }
  toWhichTenant = data => {
    if (this.state.to !== data.id) {
      this.setState(
        {
          to: data.id,
          tenantName: data.companyName,
          totalCount: 24,
          totalPages: 0,
          pageSize: 0,
          messages: [],
          alreadyScrolled: false
        },
        () => this.fetchData()
      );
    }
  };
  sendMessage = ev => {
    ev.preventDefault();
    if (this.props.user.tenantId === 1) {
      this.socket.emit("SEND_MESSAGE", {
        fromUser: this.props.user.firstName + " " + this.props.user.lastName,
        message: this.state.message,
        to: this.state.to,
        fromUserId: this.props.user.id
      });
    } else {
      this.socket.emit("SEND_MESSAGE", {
        fromUser: this.props.user.firstName + " " + this.props.user.lastName,
        message: this.state.message,
        to: this.props.user.tenantId,
        fromUserId: this.props.user.id
      });
    }
    this.setState({ message: "" });
  };
  chatInput = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    this.setState({ formErrors, [name]: value });
  };
  render() {
    return (
      <React.Fragment>
        <div className="content-wrapper">
          <LoggedIn>
            <div className="container-fluid">
              <div className="chat-application mt-2">
                <div className="content-overlay" />
                {this.props.user.tenantId === 1 ? (
                  <div class="chat-sidebar float-right d-none d-sm-none d-md-block d-lg-block ps-container ps-theme-default ps-active-y ">
                    <div class="chat-sidebar-content">
                      <GroupChatList
                        tenants={this.state.tenants}
                        toWhichTenant={this.toWhichTenant}
                        filtered={this.state.filtered}
                      />
                    </div>
                    <div class="ps-scrollbar-x-rail" style={{ left: "0px", bottom: "-371.4px" }}>
                      <div
                        class="ps-scrollbar-x"
                        tabIndex="0"
                        style={{ left: "0px", width: "0px" }}
                      />
                    </div>
                    <div
                      class="ps-scrollbar-y-rail"
                      style={{ top: "0px", height: "448px", right: "3px" }}
                    >
                      <div
                        class="ps-scrollbar-y"
                        tabIndex="0"
                        style={{ top: "0px", height: "208px" }}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <Title tenantName={this.state.tenantName} />
                <section className="chat-app-window">
                  <InfiniteScroll onVisible={this.fetchData}> </InfiniteScroll>
                  <MessageList
                    messages={this.state.messages}
                    user={this.props.user}
                    to={this.state.to}
                    tenantName={this.state.tenantName}
                  />
                  <div
                    style={{ float: "left", clear: "both" }}
                    ref={el => {
                      this.messagesEnd = el;
                    }}
                  />
                </section>
                <MessageForm
                  message={this.state.message}
                  sendMessage={e => this.sendMessage(e)}
                  chatInput={e => this.chatInput(e)}
                />
              </div>
            </div>
          </LoggedIn>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(ChatContainer);
