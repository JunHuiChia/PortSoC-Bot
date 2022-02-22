const {readStudentCSV} = require('./readStudentCSV')

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

module.exports = { verifyUser }