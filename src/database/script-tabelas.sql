-- Criação do banco de dados emap

CREATE DATABASE IF NOT EXISTS emap;
USE emap;

-- Criação da tabela Empresa
CREATE TABLE empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    razaoSocial VARCHAR(80) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE,
    estado VARCHAR(40) NOT NULL,
    cep VARCHAR(8) NOT NULL
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

-- Criação da tabela Endereco
CREATE TABLE endereco (
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    cep CHAR(8) NOT NULL,
    municipio VARCHAR(20) NOT NULL
);

-- Criação da tabela PontoDeRecarga
CREATE TABLE pontoDeRecarga (
    idPontoDeRecarga INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    bairro VARCHAR(50) NOT NULL,
    rua VARCHAR(50) NOT NULL,
    numero VARCHAR(8) NOT NULL,
    qtdEstacoes INT NOT NULL,
    tipoConector VARCHAR(45) NOT NULL,
    potenciaDeRecarga INT NOT NULL,
    redeDeRecarga VARCHAR(45) NOT NULL,
    fkUsuario INT,
    fkEndereco INT,
	FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario) ON DELETE CASCADE
    FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco) ON DELETE CASCADE
);

-- Criação da tabela CarrosEmplacados
CREATE TABLE carrosEmplacados (
    idCarrosEmplacados INT AUTO_INCREMENT PRIMARY KEY,
    qtdCarros INT NOT NULL,
    tipoCombustivel VARCHAR(45) NOT NULL,
    dataEmplacamento VARCHAR(45) NOT NULL,
    procedencia VARCHAR(45) NOT NULL,
    fkPontoDeRecarga INT,
    fkEndereco INT,
    FOREIGN KEY (fkPontoDeRecarga) REFERENCES pontoDeRecarga(idPontoDeRecarga) ON DELETE SET NULL
    FOREIGN KEY (fkEndereco) REFERENCES endereco(idEndereco) ON DELETE CASCADE
);

-- Criação da tabela contatoSite
CREATE TABLE contatoSite (
    idLeads INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    mensagem VARCHAR(500) NOT NULL
);