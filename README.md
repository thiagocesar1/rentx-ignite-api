Api Rentx - Aluguel de Carros
Essa é a API desenvolvida na trilha de NodeJS da plataforma da Rocketseat.
Esse repositório tem o intuito de manter o andamento dos estudos.

# Cadastro de carro
**RF**
[*] Deve ser possível cadastrar um novo carro.

**RN**
[*] Não deve ser possível cadastrar um carro com uma placa já existente
[*] Não deve ser possível alterar a placa de um carro já cadastrado
[*] O carro deve ser cadastrado, por padrão, com a disponibilidade verdadeira.
[*] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros
**RF**
[*] Deve ser possível listar os carros.
[*] Deve ser possível listar os carros pelo nome da categoria.
[*] Deve ser possível listar os carros pelo nome da marca.
[*] Deve ser possível listar os carros pelo nome do carro.

**RN**
[*] Deverão ser listados apenas os carros disponíveis.
[*] O usuário não precisa estar logado no sistema.


# Cadastro de Especificações do carro
**RF**
[*] Deve ser possível cadastrar uma especificação para um carro.
[*] Deve ser possível listar todas as especificações
[*] Deve ser possível listar todos os carros

**RN**
[*] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
[*] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
[*] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro
**RF**
[*] Deve ser possível cadastrar a imagem do carro.

**RNF**
[*] Utilizar o multer para upload dos arquivos.

**RN**
[*] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
[*] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro
**RF**
[] Deve ser possível cadastrar um aluguel.

**RN**
[] O aluguel ter duração mínima de 24 horas.
[] Não deve ser possível um usuário cadastrar dois alugueis ativos;
