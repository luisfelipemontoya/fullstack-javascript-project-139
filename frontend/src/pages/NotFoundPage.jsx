import { useTranslation } from 'react-i18next';

function NotFoundPage() {
    const { t } = useTranslation();

    return <h1>{t('errors.notFound')}</h1>
}

export default NotFoundPage;
