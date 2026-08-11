import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        lng: 'en',
        fallbackLng: 'en',
        defaultNS: 'translation',

        interpolation: {
            escapeValue: false,
        },

        resources: {
		    en: {
			    translation: {
                    app: {
                        title: 'Hexlet Chat',
                    },
                    auth: {
                        login: 'Log in',
                        signup: 'Sign up',
                        logout: 'Log out',
                        username: 'Username',
                        nickname: 'Your nickname',
                        password: 'Password',
                        confirmPassword: 'Confirm password',
                        submit: 'Submit',
                        invalidCredentials: 'Username or password are incorrect',
                        noAccount: 'Don\'t have an account?',
                        userExists: 'Username already taken',
                        haveAccount: 'Already have an account?',
                    },
                    validation: {
                        min3: 'Must be from 3 to 20 characters',
                        max20: 'Must be from 3 to 20 characters',
                        required: 'This field is required',
                        passwordMin: 'Must be > 6 characters',
                        passwordMatch: 'Passwords must match',
                    },
                    chat: {
                        title: 'Chat',
                        channels: 'Channels',
                        addChannel: 'Add channel',
                        channelManagement: 'Channel management',
                        rename: 'Rename',
                        remove: 'Remove',
                        messages: 'Messages',
                        messagePlaceholder: 'Write a message...',
                        send: 'Send',
                        channelName: 'Channel name',
                        create: 'Create',
                        createChannel: 'Create channel',
                        cancel: 'Cancel',
                        renameChannel: 'Rename channel',
                        newChannelName: 'New channel name',
                        removeChannel: 'Remove channel',
                        confirmRemove: 'Are you sure you want to remove this channel?',
                    },
                    errors: {
                        notFound: '404 - Page not found',
                    },
			        notifications: {
                    channelCreated: 'Channel created successfully',
                    channelRenamed: 'Channel renamed successfully',
                    channelRemoved: 'Channel removed successfully',
                    loadChannelsError: 'Failed to load channels',
                    loadMessagesError: 'Failed to load messages',
                    networkError: 'Network error',
                },
            },
        },
    }
});

export default i18n;
