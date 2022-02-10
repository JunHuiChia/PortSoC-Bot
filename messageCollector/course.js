
async function getCourse(filter, message){
    let course;
    await message.channel.send('What is your course?').then( async () => {
        await message.channel.awaitMessages({filter, max: 1, time: 60_000, errors: ['time'] }).then( response => {
        message = response.first()
        course = message.content;
        })
    })
    return course;
}

module.exports = { getCourse }
