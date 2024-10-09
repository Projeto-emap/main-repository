-- Criação do banco de dados eMap
CREATE DATABASE IF NOT EXISTS emap;
USE emap;

-- Criação da tabela Empresa
CREATE TABLE Empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    razaoSocial VARCHAR(80) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE
);

-- Criação da tabela PontoDeRecarga
CREATE TABLE PontoDeRecarga (
    idPontoDeRecarga INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    tipoDeLocal VARCHAR(45) NOT NULL,
    qtdEstacoes INT NOT NULL,
    tipoConector VARCHAR(45) NOT NULL,
    redeDeRecarga VARCHAR(45) NOT NULL
);

-- Criação da tabela Usuario
CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(12) NOT NULL,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa) ON DELETE SET NULL
);

-- Criação da tabela Endereco
CREATE TABLE Endereco (
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    cep VARCHAR(8) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    fkPontoRecarga INT,
    FOREIGN KEY (fkPontoRecarga) REFERENCES PontoDeRecarga(idPontoDeRecarga) ON DELETE CASCADE
);

-- Criação da tabela Telefone
CREATE TABLE Telefone (
    idTelefone INT AUTO_INCREMENT PRIMARY KEY,
    ddd CHAR(2) NOT NULL,
    prefixo CHAR(5) NOT NULL,
    sufixo CHAR(4) NOT NULL,
    fkEmpresa INT,
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa) ON DELETE CASCADE
);

-- Criação da tabela CarrosEmplacados
CREATE TABLE CarrosEmplacados (
    idCarrosEmplacados INT AUTO_INCREMENT PRIMARY KEY,
    municipio VARCHAR(45) NOT NULL,
    qtdCarros INT NOT NULL,
    tipoCombustivel VARCHAR(45) NOT NULL,
    mes VARCHAR(45) NOT NULL,
    procedencia VARCHAR(45) NOT NULL
);

-- Criação da tabela contatoSite
CREATE TABLE contatoSite (
    idLeads INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    mensagem VARCHAR(500) NOT NULL
);

-- Muda o delimitador para `//` temporariamente para evitar conflitos
DELIMITER //

-- Trigger para validar o CPF antes de inserir na tabela Usuario
CREATE TRIGGER validar_cpf_insert BEFORE INSERT ON Usuario
FOR EACH ROW
BEGIN
    -- Verifica se o CPF tem 11 dígitos numéricos
    IF (NEW.cpf NOT REGEXP '^[0-9]{11}$') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'CPF inválido. Deve conter 11 dígitos.';
    END IF;
END;
//

-- Trigger para validar o CPF antes de atualizar na tabela Usuario
CREATE TRIGGER validar_cpf_update BEFORE UPDATE ON Usuario
FOR EACH ROW
BEGIN
    -- Verifica se o CPF tem 11 dígitos numéricos
    IF (NEW.cpf NOT REGEXP '^[0-9]{11}$') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'CPF inválido. Deve conter 11 dígitos.';
    END IF;
END;
//

-- Trigger para validar o CNPJ antes de inserir na tabela Empresa
CREATE TRIGGER validar_cnpj_insert BEFORE INSERT ON Empresa
FOR EACH ROW
BEGIN
    -- Verifica se o CNPJ tem 14 dígitos numéricos
    IF (NEW.cnpj NOT REGEXP '^[0-9]{14}$') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'CNPJ inválido. Deve conter 14 dígitos.';
    END IF;
END;
//

-- Trigger para validar o CNPJ antes de atualizar na tabela Empresa
CREATE TRIGGER validar_cnpj_update BEFORE UPDATE ON Empresa
FOR EACH ROW
BEGIN
    -- Verifica se o CNPJ tem 14 dígitos numéricos
    IF (NEW.cnpj NOT REGEXP '^[0-9]{14}$') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'CNPJ inválido. Deve conter 14 dígitos.';
    END IF;
END;
//

-- Trigger para validar o e-mail antes de inserir na tabela Usuario
CREATE TRIGGER validar_email_usuario_insert BEFORE INSERT ON Usuario
FOR EACH ROW
BEGIN
    -- Verifica se o e-mail segue um padrão de e-mail válido
    IF (NEW.email NOT REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'E-mail inválido no campo Usuario.';
    END IF;
END;
//

-- Trigger para validar o e-mail antes de atualizar na tabela Usuario
CREATE TRIGGER validar_email_usuario_update BEFORE UPDATE ON Usuario
FOR EACH ROW
BEGIN
    -- Verifica se o e-mail segue um padrão de e-mail válido
    IF (NEW.email NOT REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'E-mail inválido no campo Usuario.';
    END IF;
END;
//

-- Trigger para validar o e-mail antes de inserir na tabela contatoSite
CREATE TRIGGER validar_email_contatoSite_insert BEFORE INSERT ON contatoSite
FOR EACH ROW
BEGIN
    -- Verifica se o e-mail segue um padrão de e-mail válido
    IF (NEW.email NOT REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'E-mail inválido no campo contatoSite.';
    END IF;
END;
//

-- Trigger para validar o e-mail antes de atualizar na tabela contatoSite
CREATE TRIGGER validar_email_contatoSite_update BEFORE UPDATE ON contatoSite
FOR EACH ROW
BEGIN
    -- Verifica se o e-mail segue um padrão de e-mail válido
    IF (NEW.email NOT REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'E-mail inválido no campo contatoSite.';
    END IF;
END;
//

-- Volta o delimitador ao padrão
DELIMITER ;
