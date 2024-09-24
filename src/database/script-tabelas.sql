-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

create database emap;
use emap;

create table usuario(
idUsuario int primary key auto_increment,
nomeUsuario varchar(100),
cpf char(11),
emailUsuario varchar(100),
numeroCelular char(11),
senha varchar(100)
);

create table empresa(
idEmpresa int primary key auto_increment,
cnpj char(14),
nomeEmpresa varchar(100),
estado varchar(100),
cep char(8)
);

create table mensagem(
idMensagem int primary key auto_increment,
nomeMensagem varchar(100),
emailMensagem varchar(100),
mensagem varchar(500)
);

insert into empresa (cnpj, nomeEmpresa, estado, cep) values ('12345678901234', 'Eletroposto 1', 'São Paulo', '12345678');
insert into usuario (nomeUsuario, cpf, email, numeroCelular, senha) values ('Usuario 1', '12345678901', 'usuario1@gmail.com', '12345678901', 'usuario1');

select * from usuario;