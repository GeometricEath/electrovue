import path from 'path'
import { remote } from 'electron'
import fs from 'fs'
import { createQuize } from "../modules/QuizeBuilder.js";


export default class FileSistem {
    constructor() {

    }
    saveProject(questionsArray) {
        let xmlData = createQuize(questionsArray);
        let projectPath = remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        projectPath = projectPath.toString();
        let xmlPath = path.join(projectPath, 'quize.xml')
        this.saveFile(xmlPath, xmlData);
        this.readUrlBlob(questionsArray[0].img)
        .then(data => this.saveFile(path.join(projectPath, 'img0.png'), data));
        
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
                    let blob = new Blob(arrayBuffer, { type: 'image/png' });
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
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(blob);
                    reader.onloadend = (evt => {
                        let buffer = Buffer.from( new Uint8Array(evt.target.result) )
                        resolve(buffer);
                    });
                }
            };
            xhr.send();
        })


        
    }
}

