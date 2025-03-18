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
            useCookiesForTransactions: true,
            legacySameSiteCookie: false
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
        
        // Generate a unique state value for this login attempt
        const stateValue = Math.random().toString(36).substring(2);
        localStorage.setItem('auth0_state', stateValue);
        
        // Settings for different providers
        const params = {
            connection: provider,
            redirect_uri: 'https://kirill-markin.com/login',
            state: stateValue
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
        
        // Check if there is a callback from Auth0 login
        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) {
            console.log("Callback detected, processing...");
            
            // Extract state parameter from URL
            const urlParams = new URLSearchParams(window.location.search);
            const returnedState = urlParams.get('state');
            const savedState = localStorage.getItem('auth0_state');
            
            // Log state comparison for debugging
            console.log("Returned state:", returnedState);
            console.log("Saved state:", savedState);
            
            try {
                // Process the login state
                const result = await client.handleRedirectCallback();
                console.log("Redirect callback result:", result);
                
                // Clear the URL parameters and saved state
                window.history.replaceState({}, document.title, window.location.pathname);
                localStorage.removeItem('auth0_state');
                
                console.log("Redirect callback handled successfully");
            } catch (callbackError) {
                console.error("Error handling redirect callback:", callbackError);
                return { isAuthenticated: false, error: callbackError };
            }
        }
        
        // Check if user is authenticated
        const isAuthenticated = await client.isAuthenticated();
        console.log("Is user authenticated:", isAuthenticated);
        
        if (isAuthenticated) {
            const user = await client.getUser();
            console.log("User info:", user);
            return { isAuthenticated, user };
        }
        
        return { isAuthenticated, user: null };
    } catch (error) {
        console.error("Authentication check error:", error);
        return { isAuthenticated: false, error };
    }
}; 