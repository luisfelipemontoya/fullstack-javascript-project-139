import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import storage from '../api/storage';

function ProtectedRoute({ children }) {
    const token = storage.getToken();

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;