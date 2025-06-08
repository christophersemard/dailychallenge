import { generateEmailTemplate } from "./email-template";

export function emailWelcome(pseudo: string) {
    return generateEmailTemplate({
        title: "Bienvenue sur DailyChallenge 🎉",
        message: `Salut ${pseudo}, merci de nous avoir rejoints ! Prêt à relever ton premier défi ?`,
        buttonLabel: "Découvrir les jeux",
        buttonUrl: `${process.env.FRONTEND_URL}/`,
        footer: "Amuse-toi bien sur DailyChallenge",
    });
}

export function emailPasswordChanged() {
    return generateEmailTemplate({
        title: "Ton mot de passe a été modifié",
        message: `Ton mot de passe a bien été mis à jour. Si tu n'es pas à l'origine de cette action, change-le immédiatement.`,
        buttonLabel: "Accéder à mon compte",
        buttonUrl: `${process.env.FRONTEND_URL}/mon-compte`,
        footer:
            "Si tu n’es pas à l’origine de cette action, change ton mot de passe au plus vite.",
    });
}

export function emailEmailChanged(oldEmail: string, newEmail: string) {
    return generateEmailTemplate({
        title: "Ton adresse email a changé",
        message: `Ton email de connexion est maintenant <strong>${newEmail}</strong>. Si tu n'es pas à l'origine de ce changement, contacte notre support.`,
        buttonLabel: "Voir mon profil",
        buttonUrl: `${process.env.FRONTEND_URL}/mon-compte`,
        footer:
            "Si tu n’es pas à l’origine de cette action, contacte notre équipe.",
    });
}

export function emailAccountDeleted(pseudo: string) {
    return generateEmailTemplate({
        title: "Ton compte a été supprimé",
        message: `Ton compte <strong>${pseudo}</strong> a bien été supprimé. On espère te revoir bientôt parmi nous.`,
        footer:
            "Cet email est une confirmation automatique. Aucune action n’est requise.",
    });
}

export function emailResetPassword(token: string) {
    const url = `${process.env.FRONTEND_URL}/reset?token=${token}`;
    return generateEmailTemplate({
        title: "Réinitialise ton mot de passe",
        message:
            "Tu as demandé à réinitialiser ton mot de passe. Clique sur le bouton ci-dessous pour continuer.",
        buttonLabel: "Réinitialiser",
        buttonUrl: url,
        footer:
            "Si tu n’es pas à l’origine de cette demande, tu peux ignorer cet email.",
    });
}

export function emailVipSubscribed(pseudo: string, endDate: Date) {
    return generateEmailTemplate({
        title: "Bienvenue parmi les VIP 👑",
        message: `Merci ${pseudo} pour ton soutien ! Ton abonnement VIP est maintenant actif jusqu’au <strong>${endDate.toLocaleDateString(
            "fr-FR"
        )}</strong>.`,
        buttonLabel: "Voir mes avantages",
        buttonUrl: `${process.env.FRONTEND_URL}/vip`,
        footer: "Profite bien de tous les avantages VIP sur DailyChallenge ✨",
    });
}

export function emailVipCancelled(pseudo: string, endDate: Date) {
    return generateEmailTemplate({
        title: "Abonnement VIP résilié",
        message: `Ton abonnement VIP a été résilié. Tu conserveras tes avantages jusqu’au <strong>${endDate.toLocaleDateString(
            "fr-FR"
        )}</strong>.`,
        buttonLabel: "Gérer mon abonnement",
        buttonUrl: `${process.env.FRONTEND_URL}/mon-compte`,
        footer: "Tu pourras te réabonner à tout moment depuis ton compte.",
    });
}

export function emailVipReactivated(pseudo: string) {
    return generateEmailTemplate({
        title: "Renouvellement automatique activé",
        message: `Le renouvellement automatique de ton abonnement VIP a bien été réactivé, ${pseudo}.`,
        buttonLabel: "Voir mon abonnement",
        buttonUrl: `${process.env.FRONTEND_URL}/mon-compte`,
        footer: "Merci pour ton soutien ! 💛",
    });
}

export function emailVipExpired(pseudo: string) {
    return generateEmailTemplate({
        title: "Ton abonnement VIP a expiré",
        message: `Ton abonnement VIP est arrivé à expiration. Tu n’as plus accès aux avantages VIP.`,
        buttonLabel: "Se réabonner",
        buttonUrl: `${process.env.FRONTEND_URL}/vip`,
        footer: "Tu peux te réabonner à tout moment depuis ton compte.",
    });
}
