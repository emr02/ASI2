import { io } from 'socket.io-client';

class GameSocketService {
  constructor() {
    this.socket = null;
    this.connected = false;
  }

  connect() {
    if (this.socket && this.connected) {
      console.log('Already connected to game service');
      return;
    }

    this.socket = io('http://localhost:3001', {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to game service');
      this.connected = true;
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Disconnected from game service');
      this.connected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.connected = false;
    }
  }

  // JOIN MATCHMAKING
  joinMatchmaking(userId, username, cards) {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }
    console.log('🎮 Joining matchmaking...', { userId, username, cardsCount: cards.length });
    this.socket.emit('joinMatchmaking', { userId, username, cards });
  }

  // ATTACK
  attack(gameId, attackerCardId, defenderCardId) {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }
    console.log('⚔️ Attacking...', { gameId, attackerCardId, defenderCardId });
    this.socket.emit('attack', { gameId, attackerCardId, defenderCardId });
  }

  // END TURN
  endTurn(gameId) {
    if (!this.socket) {
      console.error('Socket not connected');
      return;
    }
    console.log('🔄 Ending turn...', { gameId });
    this.socket.emit('endTurn', { gameId });
  }

  // EVENT LISTENERS
  onWaiting(callback) {
    if (this.socket) {
      this.socket.on('waiting', callback);
    }
  }

  onMatchFound(callback) {
    if (this.socket) {
      this.socket.on('matchFound', callback);
    }
  }

  onGameStart(callback) {
    if (this.socket) {
      this.socket.on('gameStart', callback);
    }
  }

  onAttackResult(callback) {
    if (this.socket) {
      this.socket.on('attackResult', callback);
    }
  }

  onTurnChanged(callback) {
    if (this.socket) {
      this.socket.on('turnChanged', callback);
    }
  }

  onGameEnd(callback) {
    if (this.socket) {
      this.socket.on('gameEnd', callback);
    }
  }

  onError(callback) {
    if (this.socket) {
      this.socket.on('error', callback);
    }
  }

  // REMOVE LISTENERS
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners('waiting');
      this.socket.removeAllListeners('matchFound');
      this.socket.removeAllListeners('gameStart');
      this.socket.removeAllListeners('attackResult');
      this.socket.removeAllListeners('turnChanged');
      this.socket.removeAllListeners('gameEnd');
      this.socket.removeAllListeners('error');
    }
  }
}

export default new GameSocketService();