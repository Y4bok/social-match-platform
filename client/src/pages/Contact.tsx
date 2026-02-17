import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useLocation } from "wouter";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [, navigate] = useLocation();
  const submitContact = trpc.contact.submit.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContact.mutateAsync(data);
      toast.success("Message envoyé avec succès!");
      reset();
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-beige-clair via-rose-pale to-jaune-or py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-5xl font-bold text-marron-fonce mb-4"
            style={{ fontFamily: 'Abril Fatface' }}
          >
            Nous contacter
          </h1>
          <p className="text-xl text-marron-fonce/70">
            Avez-vous des questions? Nous sommes là pour vous aider.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 - Rose pâle */}
          <Card className="border-2 border-marron-fonce bg-rose-pale text-center hover:shadow-lg transition">
            <CardHeader>
              <Mail className="w-8 h-8 mx-auto text-marron-fonce mb-2" />
              <CardTitle className="text-marron-fonce" style={{ fontFamily: 'Abril Fatface' }}>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-marron-fonce/70">
                contact@socialmatch.fr
              </p>
            </CardContent>
          </Card>

          {/* Card 2 - Jaune */}
          <Card className="border-2 border-marron-fonce bg-jaune-or text-center hover:shadow-lg transition">
            <CardHeader>
              <MessageSquare className="w-8 h-8 mx-auto text-marron-fonce mb-2" />
              <CardTitle className="text-marron-fonce" style={{ fontFamily: 'Abril Fatface' }}>Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-marron-fonce/70">
                Disponible 24/7
              </p>
            </CardContent>
          </Card>

          {/* Card 3 - Marron */}
          <Card className="border-2 border-jaune-or bg-marron-fonce text-center hover:shadow-lg transition">
            <CardHeader>
              <Phone className="w-8 h-8 mx-auto text-jaune-or mb-2" />
              <CardTitle className="text-jaune-or" style={{ fontFamily: 'Abril Fatface' }}>Téléphone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-jaune-or/70">
                +33 (0)1 23 45 67 89
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form - Rose pâle + Marron */}
        <Card className="border-4 border-marron-fonce bg-rose-pale shadow-2xl">
          <CardHeader className="bg-marron-fonce text-jaune-or border-b-2 border-marron-fonce">
            <CardTitle className="text-2xl" style={{ fontFamily: 'Abril Fatface' }}>Formulaire de contact</CardTitle>
            <CardDescription className="text-jaune-or/70">
              Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-marron-fonce font-semibold">Nom</Label>
                <Input
                  id="name"
                  placeholder="Votre nom"
                  {...register("name")}
                  className="bg-white border-2 border-marron-fonce text-marron-fonce placeholder:text-marron-fonce/50"
                />
                {errors.name && (
                  <p className="text-sm text-marron-fonce">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-marron-fonce font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  {...register("email")}
                  className="bg-white border-2 border-marron-fonce text-marron-fonce placeholder:text-marron-fonce/50"
                />
                {errors.email && (
                  <p className="text-sm text-marron-fonce">{errors.email.message}</p>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-marron-fonce font-semibold">Sujet</Label>
                <Input
                  id="subject"
                  placeholder="Sujet de votre message"
                  {...register("subject")}
                  className="bg-white border-2 border-marron-fonce text-marron-fonce placeholder:text-marron-fonce/50"
                />
                {errors.subject && (
                  <p className="text-sm text-marron-fonce">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="text-marron-fonce font-semibold">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Votre message..."
                  {...register("message")}
                  className="min-h-32 bg-white border-2 border-marron-fonce text-marron-fonce placeholder:text-marron-fonce/50 resize-none"
                />
                {errors.message && (
                  <p className="text-sm text-marron-fonce">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || submitContact.isPending}
                  className="flex-1 bg-marron-fonce text-jaune-or hover:bg-jaune-or hover:text-marron-fonce text-lg py-6 transition"
                >
                  {isSubmitting || submitContact.isPending ? "Envoi en cours..." : "Envoyer le message"}
                </Button>
                <Button
                  type="button"
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="border-marron-fonce text-marron-fonce hover:bg-marron-fonce hover:text-jaune-or"
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
