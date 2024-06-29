import { io } from "socket.io-client";

const URL = process.env.REACT_APP_SOCKET_API;
const sockets = (() => {
  var instance;
  return {
    init: function (_id, role) {
      instance = new io(URL, {
        query: {
          _id: _id,
          role: role,
        },
      });
      return instance;
    },
    getInstance: function (_id, role) {
      if (!instance) this.init(_id, role);
      return instance;
    },
    clearInstance: function () {
      instance = null;
    },
  };
})();

export default sockets;
