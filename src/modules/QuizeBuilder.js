import builder from "xmlbuilder";

function createQuize(questions) {
    console.dir(questions);
    let obj = builder
        .create("root", { version: "1.0", encoding: "windows-1251" })
        .ele("questions")
        .ele("group", { name: "Group0" });

    for (var i = 0; i < questions.length; i++) {
        obj.ele('question',
            {
                'answer': questions[i].true_answer,
                'name': 'Question' + questions[i].id,
                'timeout': questions[i].timeout||20,
            })
            .ele('text', questions[i].question).up()
            //TODO: Релаизовать подстановку расширений и имен картинок
            .ele('picture', 'img ' + questions[i].id + '.jpg').up()
            .ele('answer', questions[i].answers[0]).up()
            .ele('answer', questions[i].answers[1]).up()
            .ele('answer', questions[i].answers[2]).up()
            .ele('answer', questions[i].answers[3]).up();
    }

    obj
        .up()
        .up()
        .ele("quizes")
        .ele("quiz", { name: "Quiz", tossAnswers: "true" })
        .ele(cunk());
    function cunk() {
        var ar = [];
        for (var i = 0; i < questions.length; i++) {
            ar.push({
                question: {
                    "@groupName": "Group0",
                    "@questionName": "Question" + (i)
                }
            });
        }
        return ar;
    }

    return obj.end({ pretty: true });
};

export {createQuize}
