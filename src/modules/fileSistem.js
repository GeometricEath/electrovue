import path from 'path'
import { remote } from 'electron'
import fs from 'fs'

export default class FileSistem {
    constructor() {

    }
    saveFile(data) {
        remote.dialog.showSaveDialog(filename => {
            fs.writeFile(filename, data, (err) => {
                if (err) console.error(err.message);
                console.log('Файл сохранен');
            });
        });
    }
    openFile(path) {
        remote.dialog.showOpenDialog(path => {
            fs.readFile(path, (err, data) =>{
                if (err) {
                    alert ('Ошибка при чтении файла: ' + err.message);
                    return
                }
                return data
            })
        })
    }
}

// export {saveFile};