// Global Auth0 client
let auth0Client = null;
let isAuth0Initialized = false;

// Auth0 Initialization
const configureAuth0Client = async () => {
    if (isAuth0Initialized) {
        console.log("Auth0 client already initialized");
        return auth0Client;
    }
    
    try {
        console.log("Initializing Auth0 client...");
        auth0Client = await auth0.createAuth0Client({
            domain: 'dev-7w4362if0qwpz4pc.us.auth0.com',
            clientId: 'fy4KqWv3ZGaMjZSgCwagUzWU2D8K97p6',
            authorizationParams: {
                redirect_uri: 'https://kirill-markin.com/login'
            },
            useRefreshTokens: true,
            cacheLocation: 'localstorage',
            cookieDomain: 'kirill-markin.com',
            useCookiesForTransactions: true
        });
        isAuth0Initialized = true;
        console.log("Auth0 client initialized successfully");
        return auth0Client;
    } catch (error) {
        console.error("Auth0 client initialization error:", error);
        console.log("If you're seeing 'auth0.createAuth0Client is not defined', refresh the page once.");
        return null;
    }
};

// Login handling - using redirect for better compatibility
const loginWithAuth0Provider = async (provider) => {
    try {
        const client = await configureAuth0Client();
        if (!client) {
            throw new Error("Auth0 client not initialized");
        }
        
        // Settings for different providers
        const params = {
            connection: provider,
            redirect_uri: 'https://kirill-markin.com/login'
        };
        
        // LinkedIn has specific requirements
        if (provider === 'linkedin') {
            console.log('Using LinkedIn specific settings');
            params.scope = 'openid email';
            params.response_type = 'code';
        }
        
        // Microsoft has specific requirements
        if (provider === 'windowslive') {
            console.log('Using Microsoft specific settings');
            params.scope = 'openid email profile';
            params.response_type = 'code';
        }
        
        await client.loginWithRedirect({
            authorizationParams: params
        });
    } catch (error) {
        console.error("Login error:", error);
        alert("Authentication failed. " + (error.error_description || error.message));
    }
};

// Logout from Auth0
const logoutFromAuth0 = async () => {
    try {
        const client = await configureAuth0Client();
        if (!client) {
            throw new Error("Auth0 client not initialized");
        }
        
        await client.logout({
            logoutParams: {
                returnTo: 'https://kirill-markin.com/login'
            }
        });
    } catch (error) {
        console.error("Logout error:", error);
        window.location.reload();
    }
};

// Check Auth0 authentication status
const checkAuth0Session = async () => {
    try {
        const client = await configureAuth0Client();
        if (!client) {
            return { isAuthenticated: false, user: null };
        }
        
        // First check if user is already authenticated
        // to avoid unnecessary redirect handling if already logged in
        const isAuthenticated = await client.isAuthenticated();
        
        if (isAuthenticated) {
            try {
                const user = await client.getUser();
                console.log("User is already authenticated:", user);
                
                // Clear URL parameters if they exist, even if already authenticated
                if (window.location.search) {
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
                
                return { isAuthenticated, user };
            } catch (error) {
                console.log("Error getting user info, but user is authenticated:", error);
                return { isAuthenticated: true, user: null };
            }
        }
        
        // Check if we have a callback from Auth0
        const query = window.location.search;
        const hasAuthParams = query.includes("code=") && query.includes("state=");
        
        // Handle redirect callback if present
        if (hasAuthParams) {
            try {
                // Process the callback
                await client.handleRedirectCallback();
                
                // Clear the URL parameters
                window.history.replaceState({}, document.title, window.location.pathname);
                
                console.log("Redirect callback handled successfully");
                
                // Check authentication status again after processing callback
                const isAuthenticatedAfterRedirect = await client.isAuthenticated();
                
                if (isAuthenticatedAfterRedirect) {
                    const user = await client.getUser();
                    console.log("User authenticated after redirect:", user);
                    return { isAuthenticated: true, user };
                }
            } catch (callbackError) {
                // Log but don't display as error for Invalid state
                if (callbackError.message && callbackError.message.includes('Invalid state')) {
                    console.log("Non-critical Auth0 callback issue (common during page refresh):", callbackError.message);
                    
                    // Check if user is authenticated despite the error
                    const isAuthenticatedAfterError = await client.isAuthenticated();
                    if (isAuthenticatedAfterError) {
                        const user = await client.getUser();
                        return { isAuthenticated: true, user };
                    }
                } else {
                    // Other errors are logged normally
                    console.error("Error handling callback:", callbackError.message);
                }
            }
        }
        
        // Re-check authentication status after all processing
        const finalAuthCheck = await client.isAuthenticated();
        if (finalAuthCheck) {
            const user = await client.getUser();
            return { isAuthenticated: true, user };
        }
        
        // User is not authenticated
        return { isAuthenticated: false, user: null };
    } catch (error) {
        console.error("Authentication check error:", error);
        return { isAuthenticated: false, error };
    }
}; 