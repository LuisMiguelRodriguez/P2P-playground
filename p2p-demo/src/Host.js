import React, { Component } from 'react';
import './App.css';
import Peer from 'peerjs';

//var lastPeerId = null;


class Host extends Component {

  static defaultProps = {
    peer: new Peer(null, {
        debug: 2
    })
  }

  state = {
    peer: new Peer(null, {
        debug: 2
    }),
    conn: null,
    players: []
  }

  initialize = () => {
    // Create own peer object with connection to shared PeerJS server
  //  this.setState({

  //  })


    this.state.peer.on('open', (id) => {
      // Workaround for peer.reconnect deleting previous id
      // modified for react, vanilla JS credit to: https://github.com/jmcker/Peer-to-Peer-Cue-System
      /*if (this.state.peer.id === null) {
          console.log('Received null id from peer open');
          this.setState({peer.id: lastPeerId});
      } else {
          lastPeerId = this.props.peer.id;
      }*/

      //handle connection message
      console.log("ID: " + this.props.peer.id);


    });

    this.props.peer.on('connection', (c) => {
      this.setState({conn: c});
      this.setState({
        players: this.state.players.push(this.state.conn)
      });
      console.log("Connected to: " + this.state.conn.peer);
      //ready()
      console.log(this.state.players);
    });

    this.props.peer.on('disconnected', () => {
      //handle connection message
      console.log("Connection lost. Please reconnect");


    // Workaround for peer.reconnect deleting previous id
    // modified for react, vanilla JS credit to: https://github.com/jmcker/Peer-to-Peer-Cue-System
    /*this.setState({
      peer.id: lastPeerId;
    })
    peer._lastServerId = lastPeerId;*/
      this.state.peer.reconnect();
    });

    this.state.peer.on('close', () => {
      this.setState({conn: null});
      //handle connection message
      console.log('Connection destroyed');
    });

    this.state.peer.on('error', (err) => {
      console.log(err);
      alert(''+ err);
    })
  }

  componentDidMount() {

    this.initialize();
  }

  render() {
    return (
      <div className="Host">
        <header className="Host-header">
          <h1>Host Page</h1>
        </header>
        <main className="main">
          <section className="connection-info">
            <div className="id-instructions">Use this ID for players to connect to host.</div>
            <div id="receiver-id-label" className="receiver-id-label">ID: </div>
            <div id="receiver-id" className="receiver-id">{this.props.peer.id}</div>
            <ol className="connected=players">Connected Players:
              <li className="no-players player-list-item" id="no-players">{(this.state.players.length > 0) ? this.state.players : "Waiting for players to connect"}</li>
            </ol>
          </section>
          <section className="data-section">
            <button className="begin-game">
              Begin Game
            </button>
            <input className="message-input" type="text" id="sendMessageBox" placeholder="Enter a message..." />
            <button className="send-message" id="sendButton">Send</button>
            <button className="clear-messages" id="clearMsgsButton">Clear Msgs (Local)</button>
            <button className="show-score">Show Scores</button>
          </section>
        </main>

      </div>



    );
  }
}

export default Host;
