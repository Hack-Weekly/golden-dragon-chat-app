export class Chat {
  constructor(id, username, message, timestamp) {
    this.id = id;
    this.username = username;
    this.message = message;
    this.timestamp = new Date();
  }
}
