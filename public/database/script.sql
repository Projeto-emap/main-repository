-- Banco de dados
-- drop database emap;
CREATE DATABASE IF NOT EXISTS emap;
USE emap;

-- Criação da tabela Empresa
CREATE TABLE empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    razaoSocial VARCHAR(80) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    estado VARCHAR(50) NOT NULL,
    cep CHAR(8) NOT NULL
);

-- Criação da tabela Usuario
CREATE TABLE usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(12) NOT NULL,
    numeroCelular VARCHAR (13) NOT NULL UNIQUE,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa) ON DELETE SET NULL
);

-- Criação da tabela PontoDeRecarga
CREATE TABLE pontoDeRecarga (
    idPontoDeRecarga INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    cep CHAR(8) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    rua VARCHAR(50) NOT NULL,
    numero VARCHAR(8) NOT NULL,
    qtdEstacoes INT NOT NULL,
    tipoConector VARCHAR(45) NOT NULL,
    potenciaDeRecarga INT,
    redeDeRecarga VARCHAR(45) NOT NULL,
    fkUsuario INT,
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario) ON DELETE CASCADE
);

-- Criação da tabela emplacamento
CREATE TABLE emplacamento (
    idEmplacamento INT AUTO_INCREMENT PRIMARY KEY,
    qtdCarros INT NOT NULL,
    tipoCombustivel VARCHAR(45) NOT NULL,
    mesEmplacamento VARCHAR(10) NOT NULL,
    anoEmplacamento CHAR(4) NOT NULL,
    procedencia VARCHAR(45) NOT NULL
);

-- Inserindo dados na tabela empresa
INSERT INTO empresa (razaoSocial, cnpj, estado, cep)
VALUES 
('Tech Solutions LTDA', '12345678000123', 'São Paulo', '12345678'),
('Green Energy Corp', '98765432000145', 'Rio de Janeiro', '87654321'),
('Smart Charge S/A', '45612378000189', 'Minas Gerais', '65498732');

-- Inserindo dados na tabela usuario
INSERT INTO usuario (nome, cpf, email, senha, numeroCelular, fkEmpresa)
VALUES 
('João Silva', '12345678901', 'joao.silva@email.com', 'senha123', '11987654321', 1),
('Maria Oliveira', '98765432100', 'maria.oliveira@email.com', 'senha456', '11976543210', 2),
('Carlos Souza', '45612378902', 'carlos.souza@email.com', 'senha789', '11965498732', 3);

-- Inserindo dados na tabela pontoDeRecarga
INSERT INTO pontoDeRecarga (nome, cep, bairro, rua, numero, qtdEstacoes, tipoConector, potenciaDeRecarga, redeDeRecarga, fkUsuario)
VALUES 
('Estação Central', '13345678', 'Centro', 'Rua das Flores', '100', 5, 'Tipo 2', 10, 'lenta', 1),
('Recarga Verde', '37654321', 'Zona Norte', 'Avenida Verde', '200', 10, 'CCS', 20, 'media', 2),
('Charge Fácil', '65498332', 'Zona Sul', 'Rua da Esperança', '300', 3, 'cha', 30, 'rapida', 3);

-- Inserindo dados na tabela emplacamento
INSERT INTO emplacamento (qtdCarros, tipoCombustivel, mesEmplacamento, anoEmplacamento, procedencia)
VALUES 
(500, 'Elétrico', 'Janeiro', '2023', 'Nacional'),
(1200, 'Híbrido', 'Fevereiro', '2023', 'Importado'),
(800, 'Combustão', 'Março', '2023', 'Nacional');

-- Verificando os dados inseridos
SELECT * FROM empresa;
SELECT * FROM usuario;
SELECT * FROM pontoDeRecarga;
SELECT * FROM emplacamento;
