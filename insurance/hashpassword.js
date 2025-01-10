const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(`Hashed password: ${hashedPassword}`);
    } catch (error) {
        console.error('Error hashing password:', error);
    }
};

const password = '933993';
hashPassword(password);