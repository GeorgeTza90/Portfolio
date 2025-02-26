const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fsPromises = require('fs').promises;
const path = require('path');

const LogDir = path.join(__dirname, 'temp'); 
const LogPath = path.join(LogDir, 'logEvents.txt'); 

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'MM-dd-yyyy\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\t${logName}\n`;
    console.log(logItem);

    try {
        const fileExists = await fsPromises.access(LogPath)
            .then(() => true)
            .catch(() => false);
            
        if (!fileExists) {
            await fsPromises.writeFile(LogPath, ''); 
        }

        await fsPromises.appendFile(LogPath, logItem);
    } catch (err) {
        console.log(err);
    }
}

module.exports = logEvents;
