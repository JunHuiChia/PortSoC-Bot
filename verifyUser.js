const fs = require('fs');

async function verifyUser(upNum){
    let userVerified = false;
    const student = await readStudentCSV();
    if(student['up number'] == upNum){
        console.log('UP number Matched!');
        userVerified = true;
    }
    return userVerified;
}

async function readStudentCSV(){
    const studentObject = [];
    const data = fs.readFileSync('./data.csv', 'utf-8')
    const allTextLine = data.split(/\r\n|\n/);
    const headings = allTextLine[0].split(',');
    
    for(let i = 1; i < allTextLine.length; i++){
        const studentData = {};
        const allText = allTextLine[i].split(',');
        if (allText.length == headings.length){
            for (let j = 0; j < headings.length; j++){
                studentData[headings[j]] = allText[j];
            }
            studentObject.push(studentData);
        }
    }

    const result = await verifyUserData(studentObject);
    return result;
}

async function verifyUserData(userData){
    const result = userData.find( obj => {
        return obj['up number'] == '937100'
    })
    return result;
}

module.exports = { verifyUser }