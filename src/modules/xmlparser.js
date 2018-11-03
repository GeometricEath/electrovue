const iconv = require('iconv-lite');
const parser = require('xml2js-parser');
class Parser {
    constructor() {

    }
    parseXML(xml) {
        xml = iconv.encode(iconv.decode(xml, 'win1251'), 'utf8');
        return new Promise((resolve, reject) => {
            parser.parseString(xml, (err, result) => {
                if (err) reject(err);
                console.dir(result);
                let json = result.root.questions[0].group[0].question;
                let questions = json.map((question) => {
                    let newQestion = {}
                    newQestion.true_answer = question[i].$.answer;
                    newQestion.timeout = question[i].$.timeout;
                    newQestion.pic_path = question[i].picture[0];
                    newQestion.question = question[i].text[0];
                    newQestion.answers = question[i].answer;
                    newQestion.id = i;
                })
                resolve(questions);
            })
        })
            .catch((er) => console.error('Ошибка парсинга ' + er))
    }
}
export default new Parser;

