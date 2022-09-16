export interface EstadoDTO {
    id: string;
    nome: string;
    estado: EstadoDTO;
}