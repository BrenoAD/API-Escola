const express = require('express')
const app = express()

app.use(express.json())

const alunos = [
    {
        id: 1,
        nome: "Breno Amaral",
        email: "brenoad@gmail.com"
    },
    {
        id: 2,
        nome: "Gabriel bento",
        email: "Gabriel@gmail.com"
    },
    {
        id: 3,
        nome: "Murilo eduardo",
        email: "Murilo@gmail.com"
    }
]
app.get("/", function (req, res) {
    res.send("Hello World!, você conseguiu!")
})

app.get("/alunos", function (req, res) {
    const nome = req.query.nome

    if (!nome) {
        return res.json(alunos)
    }

    const alunosFiltrados = alunos.filter(a => a.nome.toLowerCase().includes(nome.toLowerCase())
    )

    res.json(alunosFiltrados)
})

app.post("/alunos", function (req, res) {
    const nomeQueVeioDoCliente = req.body.nome
    const emailQueVeioDoCliente = req.body.email

    // Validacao
    if (!nomeQueVeioDoCliente || !emailQueVeioDoCliente) {
        return res.status(400).json({ erro: "Nome e email sao obrigatorios" })
    }

    // Criando um Objeto novo com as informações
    // Que veio do cliente
    const novoAluno = {
        id: 4,
        nome: nomeQueVeioDoCliente,
        email: emailQueVeioDoCliente
    }

    // Adiciona o novo aluno no final da lista
    alunos.push(novoAluno)
    res.status(201).send()
})

app.get("/alunos/:id", function (req, res) {
    const id = parseInt(req.params.id)

    const aluno = alunos.find(a => a.id = id)

    if (aluno) {
        return res.json(aluno)
    } else {
        res.status(404).json("Aluno não encontrado")
    }
})

app.put("/alunos/:id", function (req, res) {
    const id = parseInt(req.params.id)


    const { nome, email } = req.body

    if (!nome || !email) {
        return res.status(400).json("Nome e email são obrigatórios")
    }


    const indexDoAluno = alunos.findIndex(a => a.id == id)

    if (indexDoAluno === -1) {
        return res.status(404).json("Aluno não encontrado")
    }

    alunos[indexDoAluno].email = email
    alunos[indexDoAluno].nome = nome

    return res.json(alunos[indexDoAluno])
})

app.delete("/alunos/:id", function (req, res) {
    const id = parseInt(req.params.id)
    const index = alunos.findIndex(a => a.id === id)

    const alunoRemovido = alunos.splice(index, 1)

    return res.status(204).json("Aluno deletado com sucesso!")
})

const professores = [
    {
        id: 1,
        nome: "Mateus",
        disciplina: "Back-End",
        anoContratacao: 2025
    },
    {
        id: 2,
        nome: "Giovanni",
        disciplina: "Mobile",
        anoContratacao: 2022
    },
    {
        id: 3,
        nome: "Artur",
        disciplina: "IoT",
        anoContratacao: 2024
    }
]
app.get("/", function (req, res) {
    res.send("Hello World!, você conseguiu!")
})

app.get("/professores", function (req, res) {
    const anoContratado = parseInt(req.query.anoContratado)

    if (!anoContratado) {
        return res.json(professores)
    }

    const professoresFiltrados = professores.filter(p => p.anoContratacao == anoContratado
    )

    res.json(professoresFiltrados)
})

app.post("/professores", function (req, res) {
    const nomeQueVeioDoCliente = req.body.nome
    const disciplinaQueVeioDoCliente = req.body.disciplina
    const anoContratacaoQueVeioDoCliente = req.body.anoContratacao

    
    if (!nomeQueVeioDoCliente || !disciplinaQueVeioDoCliente || !anoContratacaoQueVeioDoCliente) {
        return res.status(400).json({ erro: "Nome e email sao obrigatorios" })
    }

    
    const novoProfessores = {
        id: 4,
        nome: nomeQueVeioDoCliente,
        disciplina: disciplinaQueVeioDoCliente,
        anoContratacao: anoContratacaoQueVeioDoCliente
    }

    
    professores.push(novoProfessores)
    res.status(201).send()
})

app.get("/professores/:id", function (req, res) {
    const id = parseInt(req.params.id)

    const professores = professores.find(a => a.id = id)

    if (professores) {
        return res.json(professores)
    } else {
        res.status(404).json("Professor não encontrado")
    }
})

app.put("/professores/:id", function (req, res) {
    const id = parseInt(req.params.id)


    const { nome, disciplina, anoContratacao } = req.body

    if (!nome || !disciplina || !anoContratacao) {
        return res.status(400).json("Nome, disciplina e o ano de contratacao são obrigatórios")
    }


    const indexDoProfessor = professores.findIndex(a => a.id == id)

    if (indexDoProfessor === -1) {
        return res.status(404).json("Professor não encontrado")
    }

    professores[indexDoProfessor].anoContratacao = anoContratacao
    professores[indexDoProfessor].disciplina = disciplina
    professores[indexDoProfessor].nome = nome

    return res.json(professores[indexDoProfessor])
})

app.delete("/professores/:id", function (req, res) {
    const id = parseInt(req.params.id)
    const index = professores.findIndex(a => a.id === id)

    const professoresRemovidos = professores.splice(index, 1)

    return res.status(204).json("Professor deletado com sucesso!")
})


// Minitora/ Escuta a porta 3000!
app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000!")
})