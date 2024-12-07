
const config = {
    API_KEY: 'sk-YiLu67441e9ba21997759',
    PLANT_OF_DAY_ID: (() => {
        // Get current date in YYYYMMDD format
        const today = new Date();
        const dateString = today.getFullYear().toString() + 
                          (today.getMonth() + 1).toString().padStart(2, '0') + 
                          today.getDate().toString().padStart(2, '0');
        
        // Convert date string to a number and use it as a seed
        let seed = parseInt(dateString);
        
        // Use a larger multiplier to get better distribution
        seed = seed * 1234567;
        
        // Use modulo to get a number between 0 and 10101, then add 1
        const randomNum = (seed % 10102) + 1;
        
        return randomNum;
    })(),
    
    // Google API credentials
    GOOGLE_CLIENT_ID: '1092792530032-1rb8apfgl9ndhvuteuq4sr3kcfph3smb.apps.googleusercontent.com',
    GOOGLE_API_KEY: 'AIzaSyAQ_85hoZstHGA36ydO-R7WR3RjmCPa-WY',
    GOOGLE_DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest',
    GOOGLE_SCOPES: 'https://www.googleapis.com/auth/tasks'
};

module.exports = config;
