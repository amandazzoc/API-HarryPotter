// Importa os módulos necessários
const express = require('express') // Importa o framework Express
const mongoose = require('mongoose') // Importa o ODM Mongoose para trabalhar com o MongoDB
const cors = require('cors')

const app = express() // Avisa que essa é uma aplicação express
app.use(express.json()) // Para conseguir ler uma requisição JSON
const port = 3000 // Define a porta na qual o servidor irá escutar

// Define um modelo para documentos do MongoDB usando Mongoose
const Film = mongoose.model('Film', {
    title: String,
    description: String,
    image_url: String,
    trailer_url: String
});

app.use(cors());

// Rota para lidar com requisições GET na raiz da aplicação
app.get("/", async (req, res) =>{
    // Busca todos os documentos da coleção "films" no MongoDB
    const films = await Film.find()
    // Retorna os documentos encontrados como resposta
    return res.send(films)
})

// Rota para lidar com requisições DELETE com um parâmetro de ID
app.delete("/:id", async (req, res) => {
    // Encontra e exclui um documento pelo ID especificado
    const film = await Film.findByIdAndDelete(req.params.id)
    // Retorna o documento excluído como resposta
    return res.send(film)
})

// Rota para lidar com requisições PUT com um parâmetro de ID
app.put("/:id", async (req, res) => {
     // Encontra e atualiza um documento pelo ID especificado
    const film = await Film.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    }, {
        new: true
    })
    // Retorna o documento atualizado como resposta
    return res.send(film)
})

// Rota para lidar com requisições POST
app.post("/", async (req, res) => {
    // Cria um novo documento com base nos dados recebidos
    const film = new Film ({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })
    
    await film.save() // Salva o novo documento no banco de dados
    return res.send(film) // Retorna o documento recém-criado como resposta
})

// Inicia o servidor Express na porta especificada
app.listen(port, () =>{
    // Conecta-se ao banco de dados MongoDB
    mongoose.connect('mongodb+srv://amandaol7b:amanda123@harrypotter-api.gqjqihf.mongodb.net/?retryWrites=true&w=majority&appName=HarryPotter-API');
    console.log('App rodando')
})