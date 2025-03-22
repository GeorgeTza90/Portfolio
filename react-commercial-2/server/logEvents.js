const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path')

const LogDir = path.join(__dirname, 'temp');
const LogPath = path.join(__dirname, 'temp', 'logEvents.txt');


const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'MM-dd-yyyy\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\t${logName}\n`;
    console.log(logItem);
    try {
        if(!fs.existsSync( LogDir )) {   
            await fsPromises.mkdir(LogDir);
        }
        if(!fs.existsSync( LogPath )) {   
            await fsPromises.writeFile(LogPath, '');
        }

        await fsPromises.appendFile( LogPath , logItem);
    } catch(err) {
        console.log(err);
    }
}

module.exports = logEvents;