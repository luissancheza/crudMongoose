const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo')
.then(()=> console.log('Conectado a MongoDB..'))
.catch(err => console.log('No se pudo conectar con MongoDB...', err));

const cursoSchema = new mongoose.Schema({
    nombre : String,
    autor : String,
    etiquetas: [String],
    fecha : {type:Date, default:Date.now},
    publicado : Boolean
});

const Curso = mongoose.model('Curso', cursoSchema);

async function crearCurso(){
    const curso = new Curso({
        nombre: 'NODE',
        autor: 'Pedro',
        etiquetas: ['desarrollo web', 'front end'],
        publicado: true
    });

    const resultado = await curso.save();
    console.log(resultado);
}

async function listarCursos(){
    // eq (equalm igual)
    // nq (not equal, no igual)
    // gt (greater than, mayor que)
    // gte (greater than or equal to, mayor o igual que)
    // lt (less than, menor que)
    // lte (less than or equal to, menor o igual que)
    // in 
    // nin (not in)
// Operadores logicos
    // or
    // and

    const numeroPage = 3;
    const sizePage = 3;

    const cursos = await Curso.
    find({publicado : true})
    // find({precio: {$gte:10, $lte: 30}})
    // find({precio:{$in:[10, 15, 25]}})
    // find()
    // .or([{autor:'Griver'}, {pubicado: true}])
    //Empiece don la palabra Gro
    // find({autor: /^Grro/})
    //Termina en una palabra o expresion
    // find({autor: /ver$/})
    //Cuando un campo tiene un contenido especifico o un like en SQL
    // find({autor: /.*ro.*/})
    .skip((numeroPage -1)* sizePage)
    .limit(sizePage)
    .sort({autor: -1})
    .select({nombre:1, etiquetas:1});
    console.log(cursos);
}

async function actualizaCurso(id){
    // const curso = await Curso.findById(id);
    // if(!curso){
    //     console.log("El curso no existe");
    //     return;
    // }

    // curso.publicado = false;
    // curso.autor = "José Luis Sanchez arenas";

    // curso.set({
    //     publicado : false,
    //     autor: "José Luis Sánchez Arenas"
    // });

    // const resultado = await curso.save();
    // console.log(resultado);

    // Update 2do ejemplo
    // const resultado = await Curso.updateOne({_id: id}, {$set:{
    //     autor: "Grover",
    //     publicado : true
    // }});

    // Update 3er ejemplo
    const resultado = await Curso.findByIdAndUpdate(id, 
        {$set:{
        autor: "José Luis Sánchez Arenas",
        publicado : false
        }
    }, {new: true});
    console.log(resultado);
}

async function eliminarDocumentos(id){
    // const result = await Curso.deleteOne({_id:id});
    const result = await Curso.findByIdAndDelete(id);
    console.log(result);
}
// crearCurso();
// listarCursos();
// actualizaCurso('6184a1f18ea5cbcd7c683866');
// eliminarDocumentos('6184a5106145f5985dec7720');

