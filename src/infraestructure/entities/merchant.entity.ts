import EstablishmentEntity from "@/infraestructure/entities/establishment.entity";

export default interface MerchantEntity {
    id: BigInt;
    email: string | null;
    phone: string | null;
    registered_at: Date;
    status_id: number;
    subject_id: BigInt;
    municipality_id: number;
    updater_id: BigInt;
    establishments?: EstablishmentEntity[]
}