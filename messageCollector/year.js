
async function getYear(filter, message){
    let year;
    await message.channel.send('What is your year?').then( async () => {
        await message.channel.awaitMessages({filter, max: 1, time: 60_000, errors: ['time'] }).then( response => {
        message = response.first()
        year = message.content;
        })
    })
    return year;
}

module.exports = { getYear }
