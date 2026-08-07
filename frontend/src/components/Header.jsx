import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        localStorage.removeItem('token');

        dispatch(removeToken());

        navigate('/login');
    };

    return (
        <header>
            <Link to="/">
                Hexlet Chat
            </Link>

            {token && (
                <button
                    onClick={handleLogout}
                >
                    Log out
                </button>
            )}
        </header>
    );
}

export default Header;