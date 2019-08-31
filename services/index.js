import GameService from './game';
import SocketService from './socket';

export default class Services {
  constructor(context) {
    this.context = context;
  }

  get gameService() {
    return new GameService(this.context);
  }

  get socketService() {
    return new SocketService(this.context);
  }
}
