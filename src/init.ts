import initApplication from '../frontend/src/init.jsx';

export default async function init(socket: unknown) {
    return initApplication(socket);
}