export interface Produto {
    //? identifica que o atributo é opcional
    _id?: number
    nome: string
    preco: number
    descricao: string
    estoque: number
    foto: string
    fotoAvatar: string
}