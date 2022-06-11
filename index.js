const express = require('express');
const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');

start();


async function start() {
    const port = 3000;
    const app = express();
    
   

    await databaseConfig(app);
    expressConfig(app);
    
   
   

    app.listen(port, () => console.log(`Server listening on port ${port}`));
}