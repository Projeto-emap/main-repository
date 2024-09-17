create database emap;
use emap;

create table usuario(
idUsuario int primary key auto_increment,
nome varchar(100),
cpf char(11),
email varchar(100),
numeroCelular char(11),
senha varchar(100)
);

create table empresa(
idEmpresa int primary key auto_increment,
cnpj char(14),
nome varchar(100),
estado varchar(100),
cep char(8)
);

create table mensagem(
idMensagem int primary key auto_increment,
nome varchar(100),
email varchar(100),
mensagem varchar(500)
);
