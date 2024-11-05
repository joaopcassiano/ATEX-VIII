create table CodigoValidacaoUsuario(
	CodigoValidacaoUsuarioID int identity(1,1) primary key,
	Email varchar(245) not null,
	TipoUsuario int not null,
	Codigo int not null,
	DataExpiracao datetime not null
);

CREATE TABLE Beneficiario(
	BenefiarioID int identity(1,1) primary key,
	Nome varchar(120) not null,
	CPF varchar(20) not null,
	Telefone varchar(20) not null,
	Email varchar(245) not null,
	Senha Varchar(200) not null,
	DataNascimento Datetime not null,
	EnderecoID int not null,
	SituacaoEconomica Decimal(18,2) not null,
	ImagemPerfil Varbinary(max) null,
	Ativo Bit not null
);

CREATE TABLE Endereco(
	EnderecoID int identity(1,1) primary key,
	Rua Varchar(250) not null,
	Bairro Varchar(250) not null,
	Numero INT not null,
	Complemento Varchar(250) not null,
	Cidade Varchar(250) not null,
	Estado Varchar(250) not null,
	Cep Varchar(10) not null,
	Ativo Bit not null
);