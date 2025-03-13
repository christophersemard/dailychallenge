import {
    Injectable,
    ConflictException,
    BadRequestException,
} from "@nestjs/common";
import prisma from "../prisma/prisma.service";

@Injectable()
export class UsersService {
    async getAllUsers() {
        console.log("🚀 Prisma client instanciated");
        console.log(await prisma.user.findFirst());
        console.log("getAllUsers");
        console.log();
        return await prisma.user.findMany();
    }

    async createUser(email: string, password: string) {
        if (!email || !password) {
            throw new BadRequestException(
                "Email et mot de passe obligatoires."
            );
        }

        try {
            // return { email, password };
            return await prisma.user.create({ data: { email, password } });
        } catch (error) {
            console.error(error);
            if (error.code === "P2002") {
                throw new ConflictException("Cet email est déjà utilisé.");
            }
            throw new BadRequestException(
                "Erreur lors de la création de l’utilisateur."
            );
        }
    }

    async validateUser(email: string, password: string) {
        if (!email || !password) {
            throw new BadRequestException(
                "Email et mot de passe obligatoires."
            );
        }

        const user = await prisma.user.findUnique({
            where: { email, deletedAt: null },
        });
        // const user = { email, password };

        if (!user) {
            throw new BadRequestException("Email incorrect.");
        }

        if (user.password !== password) {
            throw new BadRequestException("Mot de passe incorrect.");
        }

        const { password: _, ...userWithoutPassword } = user;
        return user;
    }
}
