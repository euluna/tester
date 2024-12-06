const config = {
    API_KEY: 'sk-VEc667528c487e7ce7904',
    FREE_PLANT_IDS: [
        1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        // Add more verified free plant IDs here
    ],
    get PLANT_OF_DAY_ID() {
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        return this.FREE_PLANT_IDS[dayOfYear % this.FREE_PLANT_IDS.length];
    }
};

// Add both export methods to support both module systems
module.exports = config;
