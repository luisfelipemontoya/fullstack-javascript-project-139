import './socket/index.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
throw new Error('Error de prueba Rollbar producción');
    return (
        <BrowserRouter>
            <ToastContainer />
            <Header />
            <Routes>
                <Route path="/" element={(
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>)} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/signup"
                    element={<SignupPage />}
                />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
