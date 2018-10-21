import path from 'path'
import { remote } from 'electron'
import fs from 'fs'
import { createQuize } from "../modules/QuizeBuilder.js";
const mime = require('mime/lite');

export default class FileSistem {
    constructor() {

    }
    saveProject(questionsArray) {
        let projectPath = remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        projectPath = projectPath.toString();

        let xmlData = createQuize(questionsArray);
        let xmlPath = path.join(projectPath, 'quize.xml')
        this.saveFile(xmlPath, xmlData);

        questionsArray.forEach(element => {
            this.readUrlBlob(element.img)
                .then(data => {
                    let extension = mime.getExtension(data.type);
                    this.saveFile(path.join(projectPath, 'img' + element.id + '.' + extension), data.buffer);
                });
        });

        // console.log(projectPath);
        // console.log(xmlPath);
    }
    saveFile(path, data) {
        fs.writeFile(path, data, (err) => {
            if (err) console.error(err.message);
            console.log('Файл сохранен');
        });
    }
    // saveImg(url, path) {
    //     let arryBuffer = this.readUrlBlob(url);
    //     fs.writeFile(path, arryBuffer, (err) => {
    //         if (err) console.error(err.message)
    //     });
    // }
    openFile() {
        let buff;
        remote.dialog.showOpenDialog(path => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    alert('Ошибка при чтении файла: ' + err.message);
                    return
                }
                buff = data;
            })
        })
        console.log("data: " + buff)
        return buff
    }
    openImg() {
        return new Promise(function (resolve, reject) {
            remote.dialog.showOpenDialog(path => {
                console.log(path);
                fs.readFile(path[0], (err, data) => {
                    if (err) {
                        console.log('Ошибка при чтении файла: ' + err.message);
                        return
                    }
                    let arrayBuffer = [];
                    arrayBuffer.push(data);
                    let mimeType = mime.getType(path[0])
                    let blob = new Blob(arrayBuffer, { type: mimeType });
                    console.log(blob.type);
                    resolve(window.URL.createObjectURL(blob));
                })
            })
        })
    }
    readUrlBlob(url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.onload = function (e) {
                if (this.status == 200) {
                    let blob = this.response;
                    console.log(blob.type);
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(blob);
                    reader.onloadend = (evt => {
                        let buffer = Buffer.from(new Uint8Array(evt.target.result))
                        resolve({ buffer: buffer, type: blob.type });
                    });
                }
            };
            xhr.send();
        })
    }
}

