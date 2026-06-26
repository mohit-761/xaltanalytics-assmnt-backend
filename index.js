import './src/config/env.config.js';
import app from './src/app.js';
import { dbConnect } from './src/config/db.config.js';

let port = process.env.PORT || 3000;

(async () => {
    try {
        await dbConnect();
        app.listen(port, () => {
            console.log(`server is listening on ${port}`)
        })
    } catch (error) {
        console.log('error: ', error);
    }
})();