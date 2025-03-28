export interface UserDto {
    id: number;
    email: string;
    pseudo: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
}
