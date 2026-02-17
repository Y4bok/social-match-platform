import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Plus, Search } from "lucide-react";

export default function Groups() {
  const [groups] = useState([
    {
      id: 1,
      name: "Logistique Urbaine",
      category: "Logistique",
      members: 2847,
      image: "🏙️",
      description: "Discussions sur les défis de la logistique en zone urbaine",
      joined: false
    },
    {
      id: 2,
      name: "Supply Chain Innovation",
      category: "Supply Chain",
      members: 1923,
      image: "🔧",
      description: "Innovations et tendances dans la supply chain",
      joined: true
    },
    {
      id: 3,
      name: "E-commerce & Distribution",
      category: "E-commerce",
      members: 3456,
      image: "📦",
      description: "Stratégies de distribution pour l'e-commerce",
      joined: false
    },
    {
      id: 4,
      name: "Développement Durable",
      category: "Durabilité",
      members: 1234,
      image: "🌱",
      description: "Distribution écologique et responsable",
      joined: false
    },
    {
      id: 5,
      name: "Entrepreneurs Distribution",
      category: "Entrepreneuriat",
      members: 892,
      image: "🚀",
      description: "Pour les entrepreneurs du secteur",
      joined: true
    },
    {
      id: 6,
      name: "Ressources Humaines",
      category: "RH",
      members: 1567,
      image: "👥",
      description: "Recrutement et gestion des talents",
      joined: false
    }
  ]);

  return (
    <div className="min-h-screen bg-beige-clair">
      {/* Header */}
      <div className="bg-marron-fonce text-jaune-or shadow-lg border-b-4 border-jaune-or">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'Abril Fatface' }}>
            ❤️ Groupes Claudine
          </h1>
          <p className="text-jaune-or mb-4">Rejoignez des communautés thématiques et connectez-vous avec des experts</p>
          
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-marron-fonce" size={20} />
              <input
                type="text"
                placeholder="Rechercher des groupes..."
                className="w-full pl-10 pr-4 py-2 rounded-lg text-marron-fonce"
              />
            </div>
            <Button className="bg-jaune-or text-marron-fonce hover:bg-white hover:text-marron-fonce flex items-center gap-2">
              <Plus size={20} />
              Créer un groupe
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card key={group.id} className="bg-white border-2 border-marron-fonce p-6 hover:shadow-xl transition">
              <div className="text-5xl mb-4">{group.image}</div>
              
              <h3 className="text-2xl font-bold text-marron-fonce mb-2" style={{ fontFamily: 'Abril Fatface' }}>
                {group.name}
              </h3>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-rose-pale text-marron-fonce px-3 py-1 rounded-full text-sm font-bold">
                  {group.category}
                </span>
              </div>
              
              <p className="text-marron-fonce mb-4">{group.description}</p>
              
              <div className="flex items-center gap-2 text-marron-fonce/70 mb-4 pb-4 border-b-2 border-rose-pale">
                <Users size={16} />
                <span>{group.members.toLocaleString()} membres</span>
              </div>
              
              <Button
                className={`w-full ${
                  group.joined
                    ? "bg-marron-fonce text-jaune-or hover:bg-jaune-or hover:text-marron-fonce"
                    : "bg-jaune-or text-marron-fonce hover:bg-marron-fonce hover:text-jaune-or"
                }`}
              >
                {group.joined ? "Quitter" : "Rejoindre"}
              </Button>
            </Card>
          ))}
        </div>

        {/* Create Group CTA */}
        <Card className="bg-gradient-to-r from-marron-fonce to-marron-fonce/80 text-jaune-or p-8 mt-12 border-2 border-jaune-or">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Abril Fatface' }}>
            Créez votre propre groupe
          </h2>
          <p className="mb-6">
            Rassemblez les experts autour d'une thématique spécifique et créez une communauté engagée.
          </p>
          <Button className="bg-jaune-or text-marron-fonce hover:bg-white hover:text-marron-fonce font-bold">
            Lancer un groupe
          </Button>
        </Card>
      </div>
    </div>
  );
}
