import path from 'path';
import { remote } from 'electron';
import { createQuize } from "../modules/QuizeBuilder.js";
const fs = require('fs');
const util = require('util');
const mime = require('mime/lite');
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

export default class FileSistem {
    constructor() {

    }
    sp(questionsArray, quizeName) {
        let outputPath = remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        outputPath = outputPath.toString();
        let projectPath = path.join(outputPath, quizeName);

        Promise.all(questionsArray.map())

        mkdir(projectPath)
            .then(() => {
                console.log('Папка создана ' + projectPath);
                function sequencer(sequence, question){
                    return sequence.then(() => {
                        return this.readUrlBlob(question.img);
                        
                    }).catch((er)=>{
                        console.error('Ошибка блоб ' + er);
                    })
                    .then((obj) => {
                        let extension = mime.getExtension(obj.type);
                        let imgName = 'img' + question.id + '.' + extension;
                        question.path = path.join('don', quizeName, imgName);
                        return writeFile(path.join(projectPath, imgName), obj.buffer);
                    }).then(() => {
                        console.log('Saved ' + question.img);
                    });
                }
                // sequencer.bind(this);
                // questionsArray.reduce(function (sequence, question) {
                questionsArray.reduce(sequencer.bind(this) 
                // return sequence.then(() => {
                    //     console.log(readUrlBlob);
                    //     let objBuff = readUrlBlob(question.img);
                    //     resolve(objBuff);
                    // }).catch((er)=>{
                    //     console.log('Ошибка блоб ' + er);
                    // })
                    // .then((obj) => {
                //         let extension = mime.getExtension(obj.type);
                //         let imgName = 'img' + question.id + '.' + extension;
                //         question.path = path.join('don', quizeName, imgName);
                //         return writeFile(path.join(projectPath, imgName), obj.buffer);
                //     }).then(() => {
                //         console.log('saved' + question.img);
                //     });
                , Promise.resolve()
                );
            }).then(()=>console.log('End'));
            // .then(() => {
            //     let xmlData = createQuize(questionsArray, quizeName);
            //     let xmlPath = path.join(projectPath, 'quize.xml')
            //     return writeFile(xmlPath, xmlData);
            // }).cath((err) => {
            //     console.log('Ошибка! ' + err);
            // })

    }

    saveProject(questionsArray, quizeName) {
        let outputPath = remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        outputPath = outputPath.toString();
        let projectPath = path.join(outputPath, quizeName);


        fs.mkdir(projectPath, er => {
            console.log('Директория создана')
            if (er) console.error(er.message)
        });

        questionsArray.forEach(element => {
            console.log(element.img.type);
            this.readUrlBlob(element.img)
                .then(data => {
                    let extension = mime.getExtension(data.type);
                    let imgName = 'img' + element.id + '.' + extension;
                    element.path = path.join('don', quizeName, imgName)
                    this.saveFile(path.join(projectPath, imgName), data.buffer);
                });
        });

        let xmlData = createQuize(questionsArray, quizeName);
        let xmlPath = path.join(projectPath, 'quize.xml')
        this.saveFile(xmlPath, xmlData);

        // console.log(projectPath);
        // console.log(xmlPath);
    }
    saveFile(path, data) {
        fs.writeFile(path, data, (err) => {
            if (err) console.error(err.message);
            console.log('Файл сохранен: ' + path);
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
                        console.log('Чтение блоба' + url);
                        resolve({ buffer: buffer, type: blob.type });
                    });
                } else { reject(Error(xhr.statusText)) }
            };
            xhr.send();
        })
    }
}

