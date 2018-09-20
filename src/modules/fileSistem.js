import path from 'path'
import { remote } from 'electron'
import fs from 'fs'


function saveFile(data) {
    remote.dialog.showSaveDialog(filename => {
        fs.writeFile(filename, data, (err) => {
            if (err) console.error(err.message);
            console.log('Файл сохранен');
        });
    });
}
export {saveFile};