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
    saveProject(questionsArray, quizeName) {
        let outputPath = remote.dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        outputPath = outputPath.toString();
        let projectPath = path.join(outputPath, quizeName);

        function saveFile(data) {
            return readUrlBlob(data.img)
                .then((obj) => {
                    let extension = mime.getExtension(obj.type);
                    let imgName = 'img' + data.id + '.' + extension;
                    data.path = path.join('don', quizeName, imgName);
                    return writeFile(path.join(projectPath, imgName), obj.buffer)
                })
                .catch(er => { console.error(er) })
                .then(() => {
                    console.log('Save');
                })

        };
        function readUrlBlob(url) {
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

        mkdir(projectPath)
            .then(() => {
                return Promise.all(questionsArray.map(saveFile))

            })
            .then(() => console.log('End'))
            .then(() => {
                let xmlData = createQuize(questionsArray, quizeName);
                let xmlPath = path.join(projectPath, 'quize.xml')
                return writeFile(xmlPath, xmlData);
            }).catch((err) => {
                console.log('Ошибка! ' + err);
            }).then(() => console.log('Quiz project seved'))

        return
        // mkdir(projectPath)
        //     .then(() => {
        //         console.log('Папка создана ' + projectPath);
        //         function sequencer(sequence, question) {
        //             return sequence.then(() => {
        //                 return this.readUrlBlob(question.img);

        //             })
        //                 .then((obj) => {
        //                     let extension = mime.getExtension(obj.type);
        //                     let imgName = 'img' + question.id + '.' + extension;
        //                     question.path = path.join('don', quizeName, imgName);
        //                     return writeFile(path.join(projectPath, imgName), obj.buffer);
        //                 })
        //                 .catch((er) => {
        //                     console.error('Ошибка блока write blob ' + er);
        //                 })
        //                 .then(() => {
        //                     console.log('Saved')
        //                 })
        //         }
        //         return questionsArray.reduce(sequencer.bind(this), Promise.resolve('test'));
        //     }).then(() => { console.log('End ') })
        //     .then(() => {
        //         let xmlData = createQuize(questionsArray, quizeName);
        //         let xmlPath = path.join(projectPath, 'quize.xml')
        //         return writeFile(xmlPath, xmlData);
        //     }).catch((err) => {
        //         console.log('Ошибка! ' + err);
        //     });
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
}

