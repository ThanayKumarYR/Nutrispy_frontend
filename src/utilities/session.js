// session.js
const SESSION_KEY = 'session';

export const setSession = (userData) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
};

export const getSession = () => {
    const sessionData = localStorage.getItem(SESSION_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
};

export const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
};
