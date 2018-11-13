const iconv = require('iconv-lite');
const parser = require('xml2js-parser');
class Parser {
    constructor() {

    }
    parseXML(xml) {
        // TODO: Реализовать проверку кодировки и приведение к utf8
        // TODO: Реализовать замену адреса картинки на относительные от папки xml
        // Добавить предупреждение при отсусутсвии картинок и возможность вручную указать папку

        xml = iconv.encode(iconv.decode(xml, 'win1251'), 'utf8');
        return new Promise((resolve, reject) => {
            parser.parseString(xml, (err, result) => {
                if (err) reject(err);
                console.dir(result);
                let json = result.root.questions[0].group[0].question;
                let quizName = result.root.quizes["0"].quiz["0"].$.name;
                let id = 0;
                let questions = json.map((question) => {
                    let newQestion = {};
                    newQestion.true_answer = question.$.answer;
                    newQestion.timeout = question.$.timeout;
                    newQestion.pic_path = question.picture[0];
                    newQestion.question = question.text[0];
                    newQestion.answers = question.answer;
                    newQestion.id = id++;
                    return newQestion;
                })
                resolve({questions: questions, name: quizName });
            })
        })
            .catch((er) => console.error('Ошибка парсинга ' + er))
    }
}
export default new Parser;

