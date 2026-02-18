import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";

export default function CGV() {
  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-8 md:p-12 border-[#F3E8EE]">
            <h1
              className="text-4xl md:text-5xl font-bold text-[#5C0029] mb-2"
              style={{ fontFamily: "'Abril Fatface', serif" }}
            >
              Conditions Générales de Vente
            </h1>
            <p className="text-gray-600 text-sm mb-8">
              Dernière mise à jour : 18 février 2026
            </p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <section>
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-4"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  1. Objet
                </h2>
                <p>
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Claudine et ses utilisateurs dans le cadre de la vente de services premium sur la plateforme.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-4"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  2. Services Proposés
                </h2>
                <p className="mb-3">
                  Claudine propose les services suivants :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Compte Gratuit :</strong> Accès aux fonctionnalités de base de la plateforme</li>
                  <li><strong>Compte Premium :</strong> Fonctionnalités avancées, visibilité accrue, statistiques détaillées</li>
                  <li><strong>Compte Entreprise :</strong> Solutions pour les entreprises avec gestion d'équipe et outils de recrutement</li>
                </ul>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-4"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  3. Tarifs
                </h2>
                <p>
                  Les tarifs de nos services sont indiqués en euros (€) toutes taxes comprises (TTC). Claudine se réserve le droit de modifier ses tarifs à tout moment, mais les services seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-4"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  4. Commande et Paiement
                </h2>
                <p className="mb-3">
                  La commande est validée après :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Acceptation des présentes CGV</li>
                  <li>Validation du paiement par notre prestataire de paiement sécurisé</li>
                  <li>Réception d'un email de confirmation</li>
                </ul>
                <p className="mt-3">
                  Les moyens de paiement acceptés sont : carte bancaire, PayPal, et virement bancaire pour les comptes entreprise.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-4"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  5. Droit de Rétractation
                </h2>
                <p>
                  Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours à compter de la souscription pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités. Pour exercer ce droit, contactez-nous à l'adresse : support@claudine.fr
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-4"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  6. Durée et Renouvellement
                </h2>
                <p>
                  Les abonnements sont souscrits pour une durée d'un mois ou d'un an selon l'offre choisie. Sauf résiliation avant la date d'échéance, l'abonnement est automatiquement renouvelé pour une période équivalente. Vous pouvez résilier votre abonnement à tout moment depuis les paramètres de votre compte.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-4"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  7. Remboursement
                </h2>
                <p>
                  En cas de résiliation dans le délai de rétractation, vous serez intégralement remboursé dans un délai de 14 jours. Passé ce délai, aucun remboursement ne sera effectué, mais votre abonnement restera actif jusqu'à sa date d'expiration.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-4"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  8. Responsabilité
                </h2>
                <p>
                  Claudine met tout en œuvre pour assurer la disponibilité et la sécurité de ses services. Toutefois, nous ne pouvons être tenus responsables des interruptions de service dues à des cas de force majeure ou à des problèmes techniques indépendants de notre volonté.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-4"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  9. Données Personnelles
                </h2>
                <p>
                  Les données personnelles collectées lors de la commande sont nécessaires au traitement de votre commande et à la gestion de votre compte. Elles sont traitées conformément à notre Politique de Confidentialité et au RGPD.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-4"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  10. Propriété Intellectuelle
                </h2>
                <p>
                  Tous les éléments de la plateforme Claudine (textes, images, logos, design) sont protégés par le droit de la propriété intellectuelle. Toute reproduction, représentation ou utilisation sans autorisation préalable est interdite.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-4"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  11. Droit Applicable et Litiges
                </h2>
                <p>
                  Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux compétents de Paris seront seuls compétents.
                </p>
              </section>

              <section>
                <h2
                  className="text-2xl font-bold text-[#5C0029] mb-4"
                  style={{ fontFamily: "'Abril Fatface', serif" }}
                >
                  12. Contact
                </h2>
                <p>
                  Pour toute question concernant ces Conditions Générales de Vente, veuillez nous contacter :
                </p>
                <ul className="list-none space-y-2 ml-4 mt-3">
                  <li><strong>Email :</strong> support@claudine.fr</li>
                  <li><strong>Téléphone :</strong> +33 1 23 45 67 89</li>
                  <li><strong>Adresse :</strong> Claudine SAS, 123 Avenue de la Distribution, 75001 Paris, France</li>
                </ul>
              </section>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
