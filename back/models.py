from pydantic import BaseModel
from typing import Optional

class Linea(BaseModel):
    idLinea: str
    codigo: str
    nombre: str
    hayNoticia: str
    modo: str
    idModo: str
    operadores: str
    observacionesModoTransporte: Optional[str]

class Parada(BaseModel):
    idParada: str
    idNucleo: str
    idZona: str
    nombre: str
    latitud: str
    longitud: str
    idMunicipio: str
    nucleo: str

class Nucleo(BaseModel):
    idNucleo: str
    idMunicipio: str
    idZona: str
    nombre: str

class LineasPorMunicipioYNucleo(BaseModel):
    idLinea: str
    codigo: str
    nombre: str
    idmodo: str
    hayNoticias: str
    modo: str
    operadores: str
    idNucleo: str
    idMunicipio: str

class ModosTransporte(BaseModel):
    idModo: str
    descripcion: str
    observaciones: Optional[str]

class Municipio(BaseModel):
    idMunicipio: str
    datos: str
