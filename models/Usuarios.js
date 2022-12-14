const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const usuariosSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    token: String,
    expira: Date,
    imagen: String
})

//Método para hasheo
usuariosSchema.pre('save', async function(next){
    //Si el pw ya está hasheado
    if(!this.isModified('password')){
        return next();
    }
    //Si no está Hasheado
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
    next();
});

//Alerta para cuando el usuario ya se encuentre registrado
usuariosSchema.post('save', function(error,doc,next){
    if(error.name ==='MongoServerError' && error.code === 11000){
        next('El correo ya está registrado')
    } else{
        next(error);
    }
});

//Autenticar usuarios
usuariosSchema.methods = {
    compararPassword : function(password){
        return bcrypt.compareSync(password, this.password); 
    }
}

module.exports = mongoose.model('Usuarios', usuariosSchema)