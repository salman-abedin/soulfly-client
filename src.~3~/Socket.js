import socketIOClient from 'socket.io-client';
import React,{ useState, useEffect, useRef } from 'react';

const socketRef = useRef();
socketRef.current = socketIOClient('http://localhost:5000');

const typing = data => {
   socketRef.current.emit('typing');
};

const send = msg => {
   socketRef.current.emit('message', msg);
};

const saw = () => {
   !seen && socketRef.current.emit('seen') && setSeen(true)
   // socketRef.current.emit('seen')
};
