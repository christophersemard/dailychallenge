export interface UserDto {
    id: number;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
}
