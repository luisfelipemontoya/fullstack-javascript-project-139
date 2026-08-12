import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        dispatch(removeToken());

        navigate('/login');
    };

    return (
        <header className="app-header">
            <div className="header-container">
                <Link
                    to="/"
                    className="header-brand"
                >
                    {t('app.title')}
                </Link>

                {token && (
                    <button
                        type="button"
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        {t('auth.logout')}
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
