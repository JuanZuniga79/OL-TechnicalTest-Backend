export default interface UserEntity{
    id: bigint;
    email: string;
    password: string;
    subject_id: bigint;
    role_id: number;
}