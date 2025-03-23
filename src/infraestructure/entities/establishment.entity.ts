export default interface EstablishmentEntity {
    id: bigint;
    name: string;
    income: string;
    employees: number;
    ownerId: bigint;
    updatedAt: Date;
    updatedBy: bigint;
}