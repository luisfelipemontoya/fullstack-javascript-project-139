import './App.css';
import PropTypes from 'prop-types';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';

import ChatPage from './pages/ChatPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({ socket }) {
    return (
        <BrowserRouter>
            <ToastContainer />
            <Header />
            <Routes>
                <Route path="/" element={(
                    <ProtectedRoute>
                        <ChatPage socket={socket} />
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

App.propTypes = {
    socket: PropTypes.shape({
        subscribe: PropTypes.func.isRequired,
        unsubscribe: PropTypes.func.isRequired,
    }).isRequired,
};

export default App;
