require('dotenv').config();

const data = require('./MOCK_DATA (2).json')
const Job = require('./models/Job')
const connectDb = require('./db/connect');

const start = async () =>{
    try {
        await connectDb(process.env.MONGO_URI)
        await Job.create(data)
        console.log("succes");
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

start()