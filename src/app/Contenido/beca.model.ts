
export interface Beca{
    id: string,
    nombre: string,
    monto: number,
    fechaApertura: string,
    fechaCierre: string,
    limitePostulantes: number,
    postulantesRegistrados?: number,
    limiteAceptados: number,
    postulantesAceptados?: number,
    nivelEducativo: string,
    rutaImagen: string,
    estado?: number
}

