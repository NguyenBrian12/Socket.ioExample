import React from "react";

const Title = props => {
  return (
    <div>
      <div className="chat-name p-2 bg-white">
        <div className="media">
          <span className="chat-app-sidebar-toggle ft-align-justify font-large-1 mr-2 d-none d-block d-sm-block d-md-none" />
          <img
            src="https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg"
            width="37"
            className="rounded-circle mr-1"
            alt="avatar"
          />
          <div className="media-body">
            <span className="float-left">
              {props.tenantName}
              <p className="success font-small-2 m-0">Online / Offline</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
