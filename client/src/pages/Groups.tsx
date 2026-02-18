import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Users, Plus, Lock, Globe } from "lucide-react";
import Layout from "@/components/Layout";
import { useLocation } from "wouter";

export default function Groups() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  const [groups] = useState([
    {
      id: 1,
      name: "Logistique & Supply Chain",
      description: "Échanges sur les meilleures pratiques en logistique et supply chain",
      members: 2450,
      posts: 1230,
      isPrivate: false,
      isMember: true,
      category: "Logistique",
    },
    {
      id: 2,
      name: "E-commerce & Distribution",
      description: "Tout sur le e-commerce et la distribution en ligne",
      members: 1820,
      posts: 890,
      isPrivate: false,
      isMember: true,
      category: "E-commerce",
    },
    {
      id: 3,
      name: "Innovation Retail",
      description: "Les dernières innovations dans le secteur du retail",
      members: 980,
      posts: 456,
      isPrivate: false,
      isMember: false,
      category: "Retail",
    },
    {
      id: 4,
      name: "Directeurs Logistique France",
      description: "Réseau privé des directeurs logistique en France",
      members: 340,
      posts: 234,
      isPrivate: true,
      isMember: false,
      category: "Logistique",
    },
    {
      id: 5,
      name: "Optimisation des Flux",
      description: "Techniques et outils pour optimiser les flux de distribution",
      members: 1560,
      posts: 678,
      isPrivate: false,
      isMember: false,
      category: "Supply Chain",
    },
    {
      id: 6,
      name: "Dernière Livraison Urbaine",
      description: "Défis et solutions pour la livraison en zone urbaine",
      members: 1120,
      posts: 543,
      isPrivate: false,
      isMember: true,
      category: "Logistique",
    },
  ]);

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1
                className="text-4xl font-bold text-[#5C0029] mb-2"
                style={{ fontFamily: "'Abril Fatface', serif" }}
              >
                Groupes & Communautés
              </h1>
              <p className="text-gray-700">
                Rejoignez des groupes thématiques et échangez avec des experts
              </p>
            </div>
            <Button className="bg-[#5C0029] hover:bg-[#5C0029]/90 text-white mt-4 md:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Créer un groupe
            </Button>
          </div>

          {/* Search Bar */}
          <Card className="p-4 mb-6 border-[#F3E8EE]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher un groupe par nom, description ou catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#F3E8EE] focus:border-[#5C0029]"
              />
            </div>
          </Card>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <Card
                key={group.id}
                className="p-6 border-[#F3E8EE] hover:shadow-xl transition-shadow"
              >
                {/* Group Header */}
                <div className="mb-4">
                  <div className="w-full h-32 rounded-lg bg-gradient-to-br from-[#5C0029] to-[#F2ED6F] mb-4 flex items-center justify-center">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-[#5C0029] flex-1">
                      {group.name}
                    </h3>
                    {group.isPrivate ? (
                      <Lock className="w-5 h-5 text-gray-500 flex-shrink-0 ml-2" />
                    ) : (
                      <Globe className="w-5 h-5 text-gray-500 flex-shrink-0 ml-2" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                  <div className="inline-block px-3 py-1 bg-[#F3E8EE] text-[#5C0029] text-xs font-medium rounded-full">
                    {group.category}
                  </div>
                </div>

                {/* Group Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#5C0029]" />
                    <span>{group.members} membres</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>📝 {group.posts} posts</span>
                  </div>
                </div>

                {/* Actions */}
                {group.isMember ? (
                  <Button
                    variant="outline"
                    className="w-full border-[#5C0029] text-[#5C0029] hover:bg-[#F3E8EE]"
                  >
                    Membre
                  </Button>
                ) : (
                  <Button className="w-full bg-[#5C0029] hover:bg-[#5C0029]/90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Rejoindre
                  </Button>
                )}
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredGroups.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Aucun groupe trouvé pour "{searchQuery}"
              </p>
            </div>
          )}

          {/* Load More */}
          {filteredGroups.length > 0 && (
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="border-[#5C0029] text-[#5C0029] hover:bg-[#5C0029] hover:text-white"
              >
                Charger plus de groupes
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
