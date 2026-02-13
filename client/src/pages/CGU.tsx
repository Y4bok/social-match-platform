import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

export default function CGU() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3E8EE] via-[#F5E6D3] to-[#F2ED6F]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#5C0029]/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-[#5C0029] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">❤️</span>
            </div>
            <span className="font-abril text-2xl font-bold text-[#5C0029]">SocialMatch</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate("/")} className="text-[#5C0029] hover:text-[#F2ED6F] transition">
              Accueil
            </button>
            <button onClick={() => navigate("/contact")} className="text-[#5C0029] hover:text-[#F2ED6F] transition">
              Contact
            </button>
            {isAuthenticated ? (
              <Button onClick={() => navigate("/dashboard")} className="bg-[#5C0029] hover:bg-[#5C0029]/90">
                Dashboard
              </Button>
            ) : (
              <Button asChild className="bg-[#5C0029] hover:bg-[#5C0029]/90">
                <a href={getLoginUrl()}>Se connecter</a>
              </Button>
            )}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="font-abril text-4xl md:text-5xl text-[#5C0029] mb-2">Conditions Générales d'Utilisation</h1>
          <p className="text-[#5C0029]/60 text-sm mb-8">Dernière mise à jour : 13 février 2026</p>

          <div className="space-y-8 text-[#5C0029]/80 font-nunito">
            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">1. Acceptation des Conditions</h2>
              <p>
                En accédant et en utilisant la plateforme SocialMatch, vous acceptez de respecter les présentes Conditions Générales d'Utilisation (CGU). Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">2. Définitions</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Plateforme</strong> : Le site web et l'application mobile SocialMatch</li>
                <li><strong>Utilisateur</strong> : Toute personne ayant créé un compte sur SocialMatch</li>
                <li><strong>Contenu</strong> : Tous les textes, images, vidéos et autres matériels postés par les utilisateurs</li>
                <li><strong>Services</strong> : Les fonctionnalités et services offerts par SocialMatch</li>
              </ul>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">3. Accès à la Plateforme</h2>
              <p>
                SocialMatch est accessible aux personnes âgées de 18 ans ou plus. En créant un compte, vous certifiez que vous avez au moins 18 ans et que vous êtes légalement capable de conclure des contrats.
              </p>
              <p className="mt-3">
                Vous êtes responsable de maintenir la confidentialité de vos identifiants de connexion et acceptez toute responsabilité pour les activités effectuées sous votre compte.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">4. Utilisation Autorisée</h2>
              <p>
                Vous acceptez d'utiliser SocialMatch uniquement à des fins légales et conformément à ces conditions. Vous ne devez pas :
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Violer les lois ou réglementations applicables</li>
                <li>Harceler, menacer ou intimider d'autres utilisateurs</li>
                <li>Poster du contenu offensant, obscène ou discriminatoire</li>
                <li>Utiliser la plateforme pour des activités frauduleuses ou trompeuses</li>
                <li>Tenter de pirater ou contourner les mesures de sécurité</li>
                <li>Collecter ou utiliser les données d'autres utilisateurs sans consentement</li>
              </ul>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">5. Contenu Utilisateur</h2>
              <p>
                Vous êtes entièrement responsable du contenu que vous postez sur SocialMatch. En postant du contenu, vous accordez à SocialMatch une licence non exclusive, mondiale et perpétuelle pour utiliser, reproduire et afficher ce contenu.
              </p>
              <p className="mt-3">
                Vous garantissez que vous possédez tous les droits nécessaires sur le contenu que vous postez et que ce contenu ne viole pas les droits de tiers.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">6. Modération et Suppression</h2>
              <p>
                SocialMatch se réserve le droit de modérer, modifier ou supprimer tout contenu jugé contraire à ces conditions. Nous pouvons également suspendre ou résilier le compte de tout utilisateur qui viole ces conditions.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">7. Limitation de Responsabilité</h2>
              <p>
                SocialMatch est fourni "en l'état" sans garanties d'aucune sorte. Nous ne sommes pas responsables des :
              </p>
              <ul className="list-disc list-inside mt-3 space-y-2">
                <li>Dommages directs ou indirects résultant de l'utilisation de la plateforme</li>
                <li>Interruptions ou erreurs de la plateforme</li>
                <li>Interactions entre utilisateurs après leur rencontre</li>
                <li>Perte de données ou de contenu</li>
              </ul>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">8. Sécurité et Authentification</h2>
              <p>
                SocialMatch utilise des mesures de sécurité avancées, notamment l'authentification à deux facteurs (2FA), pour protéger votre compte. Vous êtes responsable de maintenir la sécurité de vos identifiants.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">9. Données Personnelles et Confidentialité</h2>
              <p>
                Votre utilisation de SocialMatch est également régie par notre Politique de Confidentialité. Veuillez consulter cette politique pour comprendre nos pratiques en matière de traitement des données.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">10. Propriété Intellectuelle</h2>
              <p>
                Tous les contenus de SocialMatch, y compris le design, les logos, les textes et les images, sont la propriété exclusive de SocialMatch ou de ses partenaires. Toute reproduction ou utilisation sans autorisation est interdite.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">11. Liens Externes</h2>
              <p>
                SocialMatch peut contenir des liens vers des sites externes. Nous ne sommes pas responsables du contenu de ces sites et vous utilisez ces liens à vos propres risques.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">12. Résiliation</h2>
              <p>
                Vous pouvez résilier votre compte à tout moment en contactant notre équipe support. SocialMatch peut également résilier votre compte en cas de violation de ces conditions.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">13. Modifications des Conditions</h2>
              <p>
                SocialMatch se réserve le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication. Votre utilisation continue de la plateforme après les modifications constitue votre acceptation des nouvelles conditions.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">14. Droit Applicable</h2>
              <p>
                Ces conditions sont régies par la loi française. Tout litige sera soumis aux tribunaux compétents de France.
              </p>
            </section>

            <section>
              <h2 className="font-abril text-2xl text-[#5C0029] mb-4">15. Contact</h2>
              <p>
                Pour toute question concernant ces CGU, veuillez nous contacter via notre formulaire de contact ou à l'adresse email : contact@socialmatch.fr
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-[#5C0029]/10">
            <Button
              onClick={() => navigate("/")}
              className="bg-[#5C0029] hover:bg-[#5C0029]/90 text-white font-nunito"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#5C0029] text-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2026 SocialMatch. Tous droits réservés.</p>
          <div className="mt-4 flex justify-center gap-6">
            <button onClick={() => navigate("/cgu")} className="hover:text-[#F2ED6F] transition">
              CGU
            </button>
            <button onClick={() => navigate("/cgv")} className="hover:text-[#F2ED6F] transition">
              CGV
            </button>
            <button onClick={() => navigate("/contact")} className="hover:text-[#F2ED6F] transition">
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
