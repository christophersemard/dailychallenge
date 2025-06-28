import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PasswordChangeBlock from "./PasswordChangeBlock";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";

// mock fetch + toast
jest.mock("@/lib/fetchClientWithAuth", () => ({
    fetchClientWithAuth: jest.fn(),
}));

jest.mock("sonner", () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
    },
}));

describe("PasswordChangeBlock", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("affiche une erreur si des champs sont vides", async () => {
        render(<PasswordChangeBlock />);
        fireEvent.click(screen.getByText("Modifier mon mot de passe"));
        expect(toast.error).toHaveBeenCalledWith("Tous les champs sont obligatoires.");
    });

    it("affiche une erreur si le mot de passe est trop court", async () => {
        render(<PasswordChangeBlock />);
        fireEvent.change(screen.getByPlaceholderText("Mot de passe actuel"), {
            target: { value: "12345678" },
        });
        fireEvent.change(screen.getByPlaceholderText("Nouveau mot de passe"), {
            target: { value: "short" },
        });
        fireEvent.change(screen.getByPlaceholderText("Confirmation"), {
            target: { value: "short" },
        });
        fireEvent.click(screen.getByText("Modifier mon mot de passe"));
        expect(toast.error).toHaveBeenCalledWith(
            "Le mot de passe doit contenir au moins 8 caractères."
        );
    });

    it("affiche une erreur si les mots de passe ne correspondent pas", async () => {
        render(<PasswordChangeBlock />);
        fireEvent.change(screen.getByPlaceholderText("Mot de passe actuel"), {
            target: { value: "currentpassword" },
        });
        fireEvent.change(screen.getByPlaceholderText("Nouveau mot de passe"), {
            target: { value: "newpassword" },
        });
        fireEvent.change(screen.getByPlaceholderText("Confirmation"), {
            target: { value: "differentpassword" },
        });
        fireEvent.click(screen.getByText("Modifier mon mot de passe"));
        expect(toast.error).toHaveBeenCalledWith("Les mots de passe ne correspondent pas.");
    });

    it("affiche un succès si tout est bon", async () => {
        (fetchClientWithAuth as jest.Mock).mockResolvedValue({ data: null, error: null });

        render(<PasswordChangeBlock />);

        await userEvent.type(screen.getByPlaceholderText("Mot de passe actuel"), "ancien1234");
        await userEvent.type(screen.getByPlaceholderText("Nouveau mot de passe"), "nouveau1234");
        await userEvent.type(screen.getByPlaceholderText("Confirmation"), "nouveau1234");

        await userEvent.click(screen.getByRole("button", { name: /modifier mon mot de passe/i }));

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Mot de passe mis à jour !");
        });
    });
});
