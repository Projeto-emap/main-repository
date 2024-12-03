-- Banco de dados

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