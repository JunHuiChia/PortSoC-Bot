const {readStudentCSV} = require('./readStudentCSV')

async function verifyYear(nickname, year){
    let yearVerified = false;
    console.log(nickname, year);
    const nameArray = nickname.split(" ");
    const upNum = nameArray[3].slice(2);
    const student = await readStudentCSV(upNum);
    if(student['year'] == year ){
        yearVerified = true;
    }
    return yearVerified;
}

module.exports = { verifyYear }