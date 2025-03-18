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
        
        // First check if the user is already authenticated
        // Do this before handling any callbacks to avoid state issues
        const isAuthenticated = await client.isAuthenticated();
        console.log("Is user authenticated:", isAuthenticated);
        
        if (isAuthenticated) {
            // User is already authenticated, get their info
            const user = await client.getUser();
            console.log("User info:", user);
            return { isAuthenticated, user };
        }
        
        // Only try to handle redirect if not already authenticated
        // and if there are query parameters to process
        const hasQueryParams = window.location.search.includes('code=');
        
        if (hasQueryParams) {
            try {
                // Process the login state
                await client.handleRedirectCallback();
                
                // Clear the URL parameters
                window.history.replaceState({}, document.title, window.location.pathname);
                
                // Check authentication status again after processing callback
                const isAuthenticatedAfterRedirect = await client.isAuthenticated();
                
                if (isAuthenticatedAfterRedirect) {
                    const user = await client.getUser();
                    return { isAuthenticated: true, user };
                }
            } catch (callbackError) {
                console.error("Error handling redirect callback:", callbackError);
                // Just log the error and continue checking authentication
            }
        }
        
        // If we reach here, the user is not authenticated
        return { isAuthenticated: false, user: null };
    } catch (error) {
        console.error("Authentication check error:", error);
        return { isAuthenticated: false, error };
    }
}; 