// session.js
const SESSION_KEY = 'session';

export const setSession = (userData) => {
    console.log("setting the session to ", userData);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
};

export const getSession = () => {
    const sessionData = localStorage.getItem(SESSION_KEY);
    console.log("getting the session")
    return sessionData ? JSON.parse(sessionData) : null;
};

export const clearSession = () => {
    console.log("clearing the session")
    localStorage.removeItem(SESSION_KEY);
};
