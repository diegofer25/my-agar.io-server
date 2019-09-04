export default class SocketService {
  constructor({ io }) {
    this.socket = io('ws://localhost:5000', { transports: ['websocket'] });
  }

  listen(event, callback) {
    this.socket.on(event, callback);
  }

  emit(event, payload, callback) {
    this.socket.emit(event, payload, callback);
  }

  get socketId () {
    return this.socket.id;
  }
}
