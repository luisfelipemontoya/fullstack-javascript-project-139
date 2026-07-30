
import { io } from 'socket.io-client';
console.log('📌 socket/index.js cargado');

const socket = io();

socket.on('connect', () => {
    console.log('✅ Socket conectado:', socket.id);
});

socket.on('connect_error', (error) => {
    console.error('❌ Error de conexión Socket:', error);
});

socket.onAny((event, ...args) => {
    console.log('📨 Evento:', event, args);
});

export default socket;