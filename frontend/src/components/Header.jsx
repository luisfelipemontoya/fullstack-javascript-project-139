import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import storage from '../api/storage';

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        storage.removeToken();

        dispatch(removeToken());

        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" className="shadow-sm">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    {t('app.title')}
                </Navbar.Brand>

                {token && (
                    <Button
                        type="button"
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        {t('auth.logout')}
                    </Button>
                )}
            </Container>
        </Navbar>
    );
}

export default Header;
