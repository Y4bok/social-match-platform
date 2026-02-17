import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { toast } from "sonner";

const profileSchema = z.object({
  bio: z.string().max(500).optional(),
  profilePhotoUrl: z.string().url().optional(),
  age: z.number().min(18).max(120).optional(),
  gender: z.string().optional(),
  location: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfileEdit() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const { data: profile } = trpc.profile.get.useQuery();
  const updateProfile = trpc.profile.update.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: profile?.bio || "",
      profilePhotoUrl: profile?.profilePhotoUrl || "",
      age: profile?.age || undefined,
      gender: profile?.gender || "",
      location: profile?.location || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfile.mutateAsync(data);
      toast.success("Profil mis à jour avec succès");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil");
    }
  };

  if (!user) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-clair to-rose-pale py-12">
      <div className="container max-w-2xl mx-auto px-4">
        {/* Header - Variante Marron + Jaune */}
        <div className="mb-8 bg-marron-fonce text-jaune-or p-6 rounded-lg border-2 border-jaune-or">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: 'Abril Fatface' }}
          >
            Modifier mon profil
          </h1>
          <p className="text-lg">
            Complétez vos informations pour améliorer vos chances de matching
          </p>
        </div>

        {/* Edit Form - Variante Rose pâle */}
        <Card className="border-4 border-marron-fonce bg-rose-pale shadow-2xl">
          <CardHeader className="bg-marron-fonce text-jaune-or border-b-2 border-marron-fonce">
            <CardTitle className="text-primary text-2xl" style={{ fontFamily: 'Abril Fatface' }}>
              Vos informations
            </CardTitle>
            <CardDescription className="text-jaune-or/70">
              Mettez à jour vos détails personnels
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-marron-fonce font-semibold">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Parlez-nous de vous..."
                  {...register("bio")}
                  className="min-h-24 bg-white border-2 border-marron-fonce text-marron-fonce placeholder:text-marron-fonce/50 resize-none"
                />
                {errors.bio && (
                  <p className="text-sm text-marron-fonce">{errors.bio.message}</p>
                )}
              </div>

              {/* Profile Photo URL */}
              <div className="space-y-2">
                <Label htmlFor="profilePhotoUrl" className="text-marron-fonce font-semibold">URL de la photo de profil</Label>
                <Input
                  id="profilePhotoUrl"
                  type="url"
                  placeholder="https://exemple.com/photo.jpg"
                  {...register("profilePhotoUrl")}
                  className="bg-white border-2 border-marron-fonce text-marron-fonce placeholder:text-marron-fonce/50"
                />
                {errors.profilePhotoUrl && (
                  <p className="text-sm text-marron-fonce">{errors.profilePhotoUrl.message}</p>
                )}
              </div>

              {/* Age & Gender */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-marron-fonce font-semibold">Âge</Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="120"
                    {...register("age", { valueAsNumber: true })}
                    className="bg-white border-2 border-marron-fonce text-marron-fonce"
                  />
                  {errors.age && (
                    <p className="text-sm text-marron-fonce">{errors.age.message}</p>
                  )}
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-marron-fonce font-semibold">Genre</Label>
                  <select
                    id="gender"
                    {...register("gender")}
                    className="w-full px-3 py-2 border-2 border-marron-fonce rounded-md bg-white text-marron-fonce"
                  >
                    <option value="">Sélectionner...</option>
                    <option value="male">Homme</option>
                    <option value="female">Femme</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-marron-fonce font-semibold">Localisation</Label>
                <Input
                  id="location"
                  placeholder="Ville, Pays"
                  {...register("location")}
                  className="bg-white border-2 border-marron-fonce text-marron-fonce placeholder:text-marron-fonce/50"
                />
                {errors.location && (
                  <p className="text-sm text-marron-fonce">{errors.location.message}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6 border-t-2 border-marron-fonce">
                <Button
                  type="submit"
                  disabled={isSubmitting || updateProfile.isPending}
                  className="flex-1 bg-marron-fonce text-jaune-or hover:bg-jaune-or hover:text-marron-fonce text-lg py-6 transition"
                >
                  {isSubmitting || updateProfile.isPending ? "Enregistrement..." : "Enregistrer"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 border-marron-fonce text-marron-fonce hover:bg-marron-fonce hover:text-jaune-or"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card - Variante Jaune */}
        <Card className="bg-jaune-or border-2 border-marron-fonce p-6 mt-8">
          <h3 className="text-lg font-bold text-marron-fonce mb-2" style={{ fontFamily: 'Abril Fatface' }}>
            💡 Conseil
          </h3>
          <p className="text-marron-fonce">
            Une bio complète et des détails clairs augmentent vos chances de trouver un match parfait!
          </p>
        </Card>
      </div>
    </div>
  );
}
