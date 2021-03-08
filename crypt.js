const bcrypt = require('bcrypt');

async function crypt(data) {
    // register
    const salt = await bcrypt.genSalt(10);
    console.log(salt);

    const hash = await bcrypt.hash(data,salt);
    console.log(hash)

    //login 
    console.log(await bcrypt.compare(data,hash));
}

crypt("1234")
crypt("1234")