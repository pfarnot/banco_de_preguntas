import bcrypt from 'bcryptjs'

export function encrypt(field){
    return bcrypt.hashSync(field, 10)
}

export function compareEncrypted(field, encryptedField){
    return bcrypt.compareSync(field, encryptedField)
}