const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
    host: config.SERVER_DB,
    password: config.PASSWORD_DB,
    user: config.USER_DB,
    database: config.NAME_DB,
    multipleStatements: true
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.message);
      return;
    }   
    console.log('Conectado a mysql');
  });

module.exports = connection;

/*
SCRIPT

CREATE TABLE denunciante (
  id_Denunciante int NOT NULL auto_increment primary key,
  documento_identidad varchar(45) DEFAULT NULL,
  edad int DEFAULT NULL,
  genero int DEFAULT NULL,
  profesion varchar(45) DEFAULT NULL,
  nombre varchar(80) null
)

CREATE TABLE `denuncia` (
  `id_denuncia` int NOT NULL AUTO_INCREMENT,
  `id_denunciante` int NOT NULL DEFAULT '0',
  `denunciado` varchar(100) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `tipo_corrupcion` int DEFAULT NULL,
  `detalles_denuncia` varchar(300) DEFAULT NULL,
  `nivel_corrupcion` int DEFAULT NULL,
  `es_denuncia_real` bit(1) DEFAULT NULL,
  `correo_electronico` varchar(45) DEFAULT NULL,
  `id_institucion` int NOT NULL,
  `archivo` varchar(300) DEFAULT NULL,
  `descripcion` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_denuncia`),
  KEY `fk_Denuncia_Institucion1_idx` (`id_institucion`),
  CONSTRAINT `fk_Denuncia_Institucion1` FOREIGN KEY (`id_institucion`) REFERENCES `institucion` (`id_institucion`)

  CREATE TABLE `ciudad` (
    `id_ciudad` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(45) DEFAULT NULL,
    `latitud` varchar(45) DEFAULT NULL,
    `longitud` varchar(45) DEFAULT NULL,
    PRIMARY KEY (`id_ciudad`)
  )
  CREATE TABLE `institucion` (
    `id_institucion` int NOT NULL,
    `nombre` varchar(45) DEFAULT NULL,
    `abreviatura` varchar(45) DEFAULT NULL,
    `tipo_institucion` varchar(45) DEFAULT NULL,
    `id_provincia` int NOT NULL,
    PRIMARY KEY (`id_institucion`),
    KEY `fk_Institucion_Provincia_idx` (`id_provincia`),
    CONSTRAINT `fk_Institucion_Provincia` FOREIGN KEY (`id_provincia`) REFERENCES `provincia` (`id_provincia`)
  )
  CREATE TABLE `provincia` (
    `id_provincia` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(45) DEFAULT NULL,
    `latitud` varchar(45) DEFAULT NULL,
    `longitud` varchar(45) DEFAULT NULL,
    `id_ciudad` int NOT NULL,
    PRIMARY KEY (`id_provincia`)
  )
  CREATE TABLE `tipocorrupcion` (
    `id_tipo` int NOT NULL AUTO_INCREMENT,
    `nombre` varchar(60) DEFAULT NULL,
    PRIMARY KEY (`id_tipo`)
  )

  CREATE PROCEDURE `filtrar_instituciones`
  (
    in idProvincia int
  )
    begin 
      declare idCiudad int;
      select  id_ciudad into idCiudad from corruptometro.provincia where id_provincia  = idProvincia;
      select * from corruptometro.ciudad as ciudad where id_ciudad = idCiudad;
      select * from corruptometro.institucion as institucion where id_provincia  = idProvincia;
    end

  CREATE PROCEDURE `all_pro_ciu_ins`
  ()
    begin
      select * from corruptometro.ciudad as ciudades;
      select * from corruptometro.provincia as provincias;
      select * from corruptometro.institucion as instituciones ;
      select * from corruptometro.tipocorrupcion as tipo;
    end
*/