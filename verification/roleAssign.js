const {readStudentCSV} = require('./readStudentCSV')
const { computerscience,
        softwareengineering,
        computernetworks,
        computing,
        cybersecurity,
        datascience,
    } = require('../config.json')

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
            case 'computer networks':
                ;(await member).roles.add([computernetworks])
                break;
            case 'computing':
                ;(await member).roles.add([computing])
                break;
            case 'cyber security':
                ;(await member).roles.add([cybersecurity])
                break;
            case 'data science':
                ;(await member).roles.add([datascience])
                break;
        }
        (await member).send('Course has been verified!')
    } else{
        (await member).send('Course does not match!')
    }

}


module.exports = { roleAssign };
