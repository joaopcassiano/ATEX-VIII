create table CodigoValidacaoUsuario(
	CodigoValidacaoUsuarioID int identity(1,1) primary key,
	Email varchar(245) not null,
	TipoUsuario int not null,
	Codigo int not null,
	DataExpiracao datetime not null
);

CREATE TABLE Beneficiario(
	BeneficiarioID int identity(1,1) primary key,
	Nome varchar(120) not null,
	CPF varchar(20) not null,
	Telefone varchar(20) not null,
	Email varchar(245) not null,
	Senha Varchar(200) not null,
	DataNascimento Datetime not null,
	Necessidade varchar(100) not null,
	SituacaoEconomica Decimal(18,2) not null,
	ImagemPerfil Varchar(max) null,
	Ativo Bit not null
);

CREATE TABLE EnderecoBeneficiario(
	EnderecoID int identity(1,1) primary key,
	Rua Varchar(250) not null,
	Bairro Varchar(250) not null,
	Numero INT not null,
	Complemento Varchar(250) not null,
	BeneficiarioID int not null FOREIGN KEY REFERENCES Beneficiario(BeneficiarioID) ON DELETE NO ACTION ON UPDATE CASCADE,
	Cidade Varchar(250) not null,
	Estado Varchar(250) not null,
	Cep Varchar(10) not null,
	Ativo Bit not null
);

CREATE TABLE EnderecoDoador(
	EnderecoID int identity(1,1) primary key,
	Rua Varchar(250) not null,
	Bairro Varchar(250) not null,
	Numero INT not null,
	Complemento Varchar(250) not null,
	DoadorID int not null,
	Cidade Varchar(250) not null,
	Estado Varchar(250) not null,
	Cep Varchar(10) not null,
	Ativo Bit not null
);

CREATE TABLE EnderecoEmpresa(
	EnderecoID int identity(1,1) primary key,
	Rua Varchar(250) not null,
	Bairro Varchar(250) not null,
	Numero INT not null,
	Complemento Varchar(250) not null,
	EmpresaID int not null,
	Cidade Varchar(250) not null,
	Estado Varchar(250) not null,
	Cep Varchar(10) not null,
	Ativo Bit not null
);

CREATE TABLE EnderecoVoluntario(
	EnderecoID int identity(1,1) primary key,
	Rua Varchar(250) not null,
	Bairro Varchar(250) not null,
	Numero INT not null,
	Complemento Varchar(250) not null,
	VoluntarioID int not null,
	Cidade Varchar(250) not null,
	Estado Varchar(250) not null,
	Cep Varchar(10) not null,
	Ativo Bit not null
);

create table Doacao(
	DoacaoID int not null identity(1,1) primary key,
	DescricaoDoacao varchar(200) not null,
	Quantidade Decimal(18,2) not null,
	DataDoacao date not null,
	BeneficiarioID int not null,
	DoadorID int not null,
	Ativo bit not null
)