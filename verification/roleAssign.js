const {readStudentCSV} = require('./readStudentCSV')
const { computerscience, softwareengineering} = require('../config.json')

async function roleAssign(member, nickname, course){
    const nameArray = nickname.split(" ");
    const upNum = nameArray[3].slice(2);

    const studentData = await readStudentCSV(upNum);

    if(studentData['course'].toLowerCase() == course.toLowerCase()){
        console.log('Course matched up');
        switch(course){
            case 'computer science':
                ;(await member).roles.add([computerscience])
                break;
            case 'software engineering':
                ;(await member).roles.add([softwareengineering])
                break;
        }
        (await member).send('Course has been verified!')
    } else{
        (await member).send('Course does not match!')
    }

}


module.exports = { roleAssign };
