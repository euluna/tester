const config = {
    API_KEY: 'sk-4Ydk674523d3bbc2f7611',
    PLANT_OF_DAY_ID: (() => {
        const today = new Date();
        const dateString = today.getFullYear().toString() + 
                          (today.getMonth() + 1).toString().padStart(2, '0') + 
                          today.getDate().toString().padStart(2, '0');
        const seed = parseInt(dateString, 10);
        return (seed * 1234567) % 10102 + 1;
    })(),

    NOTION_API_KEY: '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',
    DATABASE_ID: '154b310caeb480d88f23e508a87cbebc',
};
