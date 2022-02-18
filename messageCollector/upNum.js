
async function getUP(filter, message){
    let upNumber;
    let pass = false;
    await message.channel.send('What is your 6 digit UP number?').then( async () => {
        await message.channel.awaitMessages({filter, max: 1, time: 60_000, errors: ['time'] }).then( response => {
            message = response.first()
            upNumber = message.content.toLowerCase();
            console.log('before', upNumber);
            if(upNumber.startsWith('up')){
                upNumber = upNumber.slice(2)
            }
            let isNum = /^\d+$/.test(upNumber);
            console.log(isNum);
            if(upNumber.length == 6 && isNum){
                pass = true;
                return
            };
        })
    })
    if(pass){
        return upNumber;
    } else{
        message.channel.send('Given input is not 6 digits or numerical')
        return getUP(filter, message);
    }
}

module.exports = { getUP }
