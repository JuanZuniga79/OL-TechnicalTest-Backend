export default interface ResponsePageableDto<T> {
    data: T,
    total: number
}