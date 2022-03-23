const {readStudentCSV} = require('./readStudentCSV')
const { computerScience,
        softwareEngineering,
        computerNetworks,
        computing,
        cyberSecurity,
        dataScience,
        firstYear,
        secondYear,
        finalYear,
        placement
    } = require('../config.json')

async function roleManager(member, type, course, nickname){
    const nameArray = nickname.split(" ");
    const upNum = nameArray[3].slice(2);
    
    const studentData = await readStudentCSV(upNum);
    const studentCourse = studentData['course'].toLowerCase();
    const studentYear = studentData['year'].toLowerCase();

    if(type == 'assign'){
        if(studentCourse.toLowerCase() == course.toLowerCase()){
            roleUpdate(member, studentCourse, studentYear)
        }
    } else if( type == 'update'){
        roleUpdate(member, studentCourse, studentYear)
    }

}


async function roleUpdate(member, course, year){

    const studentNewRoles = []

    switch(course){
        case 'computer science':
            studentNewRoles.push(computerScience)
            break;
        case 'software engineering':
            studentNewRoles.push(softwareEngineering)
            break;
        case 'computer networks':
            studentNewRoles.push(computerNetworks)
            break;
        case 'computing':
            studentNewRoles.push(computing)
            break;
        case 'cyber security':
            studentNewRoles.push(cyberSecurity)
            break;
        case 'data science':
            studentNewRoles.push(dataScience)
            break;
    }
    switch(year){
        case 'first':
            studentNewRoles.push(firstYear)
            break;
        case 'second':
            studentNewRoles.push(secondYear)
            break;
        case 'final':
            studentNewRoles.push(finalYear)
            break;
        case 'placement':
            studentNewRoles.push(placement)
            break;
    }
    
    ;(await member).roles.set(studentNewRoles)

}


module.exports = { roleManager };
