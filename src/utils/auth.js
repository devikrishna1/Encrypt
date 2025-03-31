export const setSession = (userData) => {
    const session = {
      user: userData,
      expires: Date.now() + 30 * 60 * 1000 // 30 minutes from now
    };
    localStorage.setItem('session', JSON.stringify(session));
  };
  
  export const getSession = () => {
    const session = localStorage.getItem('session');
    if (!session) return null;
    
    const parsedSession = JSON.parse(session);
    if (Date.now() > parsedSession.expires) {
      localStorage.removeItem('session');
      return null;
    }
    return parsedSession;
  };
  
  export const clearSession = () => {
    localStorage.removeItem('session');
  };
  
  export const isAuthenticated = () => {
    return getSession() !== null;
  };