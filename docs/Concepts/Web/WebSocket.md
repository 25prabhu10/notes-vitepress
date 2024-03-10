---
title: WebSocket
description: WebSocket is a computer communications protocol, providing full-duplex communication channels over a single TCP connection.
---

# WebSocket

It is Application Layer protocol.

## Internet Protocol Suite

- Application Layer: HTTP, WebSockets, SSL, IMAP, POP
- Internet Layer: IPv4, IPv6
- Transport Layer: TCP, UDP

> OSI Internet Model or the Internet Protocol Suite Networking

## HTTP (Hyper Text Transfer Protocol)

- HTTP is stateless: After the initial request is done, the server-client communication is lost
- Clients specify actions: GET / POST / PUT / DELETE ...
- Data sent with headers: Headers sent with request and response
- For more details see: [HTTP](./HTTP.md)

## AJAX Requests

- AJAX - Asynchronous JavaScript And XML
- Asynchronously send data to server without refreshing

## WebSockets

- Full-duplex bi-directional communication
- WebSockets is a HTTP upgrade. Uses the same TCP connection over `ws://` or `wss://`
- Easy to implement and standardised
- Only sends header once
- _Example:_ Initial request header (sent only once)

  Request:

  ```http
  ...
  Connection: upgrade
  Upgrade: websockets
  ...
  ```

  Response:

  ```http
  Request URL: wss://...
  Request Method: GET
  Status Code: 101 Switching Protocols
  ...
  ```

### Intended Use Case

- **WebSockets not == replacement of HTTP**
- WS is an upgrade for HTTP
- HTTP provides automatic caching
- WS often needs special configuration for load balancing
- Can't communicate with REST
- **Use when you need full-duplex connection**
- Useful for web-based games, chatting applications, anything which needs low-latency realtime connection

### WebSocket Clients

- Used to interface with WebSockets Servers: Built in many languages
- Clients exist for _MicroPy_ and Arduino (IoT)
- Most common client is web based and uses JavaScript
- Require the Server to be able to interface WS

> See SocketIO Docs and WebSocket JavaScript Library

### SocketIO

- JavaScript library for manipulating WebSockets: Includes fallback mechanisms and auto-reconnection
- Handles disconnection and connection event
- Namespacing and Room broadcasting

### WebSockets Clientside Code

Native WebSockets support using JavaScript:

```javascript
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = (event) => {
  // ON CONNECTION, DO SOMETHING...
  socket.send("PyCon AU!!");
};

socket.onmessage = (event) => {
  // MESSAGE FROM SERVER
  console.log(event.data);
};
```

Using SocketIO:

```javascript
var socket = io("http://localthost:8000/<MY_NAMESPACE>");

socket.on("connect", () => {
  socket.emit("event_on_my_server", (data = "PyConAU!!"));
});

socket.on("my_custom_event", (data) => {
  // DO SOMETHING
});
```

### WebSocket Server-Side Code

Using Native Flask WebSockets implementation: `flask_sockets` library:

```python
# DO A;; THE IMPORTS, SETUP APPLICATION ABOVE ^
socket = Sockets(app)

@socket.route('/my_sockets')
def my_socket_event(ws):
    while not ws.closed:
        message = ws.receive()
        ws.send(message)
```

Using SocketIO Server: `python_socketio` library:

```python
# DO A;; THE IMPORTS, SETUP APPLICATION ABOVE ^
socket = socketio.Server()

@socket.on('my custom event', namespace = '/pycon')
def custome_event(sesstion_id, data):
    # DO STUFF WITH DATA FROM CLIENT, SIDE TO ALL CONNECTED TO "pycon"
    socket.emit('my event on the server', data, broadcast=True)

app = socketio.Middleware(socket, app)
```

#### Python Servers w/WebSocket

- SocketIO with python-socketio: Flask, Tornado, Pyramid, Bottle, Sanic, AioHTTP
- Native WebSockets:
  - Out of the box: Sanic, AioHTTP, Tornado
  - With library: Flask, Django (Channels 2.0), Bottle

## Performance Comparison

- HTTP and WebSockets have the same sized header
- **2 bytes/msg overhead**
- SocketIO increases latency and initial connection:
  - Under the hood starts: uses AJAX Long Polling initially and then upgrades

## Deployment

- `Eventlet` and `Gevent` to monkey patch `async`: or just use standard threading...
- Async web frameworks are ideal
- Use message queue to run multiple instances behind load balancers with sticky sessions on workers

## Alternate Methods

Alternate ways to replicate real time communication functionality.

### Polling and Long Polling

- Alternative to WebSockets: Much better backwards compatibility
- Polling: Send AJAX request every X amount of seconds for new data (not true real time)
- Long Polling: Send request to server and keep connection open until new data is sent back and keep repeating this process

### Server Sent Events

ways to replicate real time communication functionality.

- Another "real-time" alternative: Uses _EventSource_ API to send messages from server. Not truly bi-directional
- Generally requires an event loop
- No binary message capabilities

> See EventSource API, Python/Django Implementations of SSE
