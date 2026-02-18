import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";


export default function Onboarding() {
  const [, setLocation] = useLocation();

  const completeProfile = trpc.profile.completeProfile.useMutation();

  const [formData, setFormData] = useState({
    bio: "",
    jobTitle: "",
    company: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await completeProfile.mutateAsync(formData);
      alert("Profil complété ! Bienvenue sur Claudine 🎉");
      setLocation("/feed");
    } catch (error) {
      alert("Erreur : Impossible de compléter le profil");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5E6D3] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-[#5C0029]">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#5C0029] flex items-center justify-center text-white font-bold text-xl">
              C
            </div>
            <h1 className="text-3xl font-['Abril_Fatface'] text-[#5C0029]">Claudine</h1>
          </div>
          <CardTitle className="text-2xl font-['Abril_Fatface'] text-[#5C0029]">
            Complétez votre profil
          </CardTitle>
          <CardDescription>
            Aidez-nous à mieux vous connaître pour vous connecter avec les bons professionnels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Poste actuel *</Label>
              <Input
                id="jobTitle"
                placeholder="Ex: Directeur Commercial"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                required
                className="border-[#5C0029]/20 focus:border-[#5C0029]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Entreprise *</Label>
              <Input
                id="company"
                placeholder="Ex: Carrefour Supply Chain"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
                className="border-[#5C0029]/20 focus:border-[#5C0029]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Localisation *</Label>
              <Input
                id="location"
                placeholder="Ex: Paris, France"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                className="border-[#5C0029]/20 focus:border-[#5C0029]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio professionnelle</Label>
              <Textarea
                id="bio"
                placeholder="Parlez-nous de votre parcours, vos expertises et vos objectifs professionnels..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                className="border-[#5C0029]/20 focus:border-[#5C0029]"
              />
              <p className="text-sm text-muted-foreground">
                Optionnel - Vous pourrez compléter plus tard
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#5C0029] hover:bg-[#5C0029]/90 text-white"
              disabled={completeProfile.isPending}
            >
              {completeProfile.isPending ? "Enregistrement..." : "Commencer l'aventure →"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
