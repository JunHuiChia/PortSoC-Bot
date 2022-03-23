const {readStudentCSV} = require('./readStudentCSV')

async function verifyUser(name, upNum){
    let userVerified = false;
    const student = await readStudentCSV(upNum);
    if(student == null){
        return userVerified;
    }
    console.log(student);
    const studentFullName = (student['first name'] + ' ' + student['last name']).toLowerCase()
    if(student['up number'] == upNum && studentFullName == name.toLowerCase()){
        userVerified = true;
    }
    return userVerified;
}

module.exports = { verifyUser }