const fs = require('fs');

async function verifyUser(name, upNum, year){
    let userVerified = false;
    const student = await readStudentCSV(upNum);
    console.log(student);
    const studentFullName = (student['first name'] + ' ' + student['last name']).toLowerCase()
    if(student['up number'] == upNum && studentFullName == name.toLowerCase() && student['year'] == year){
        console.log('Everything matched');
        userVerified = true;
    }
    return userVerified;
}

async function readStudentCSV(upNum){
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

    const result = studentObject.find( obj => {
        return obj['up number'] == upNum
    })
    return result;
}


module.exports = { verifyUser }