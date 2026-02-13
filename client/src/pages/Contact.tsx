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

const contactSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 
            className="text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "'Abril Fatface', serif" }}
          >
            Nous contacter
          </h1>
          <p className="text-xl text-foreground/70">
            Avez-vous des questions? Nous sommes là pour vous aider.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-border text-center hover:border-secondary/50 transition-colors">
            <CardHeader>
              <Mail className="w-8 h-8 mx-auto text-secondary mb-2" />
              <CardTitle className="text-primary">Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                support@socialmatch.com
              </p>
            </CardContent>
          </Card>

          <Card className="border-border text-center hover:border-secondary/50 transition-colors">
            <CardHeader>
              <MessageSquare className="w-8 h-8 mx-auto text-secondary mb-2" />
              <CardTitle className="text-primary">Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                Disponible 24/7
              </p>
            </CardContent>
          </Card>

          <Card className="border-border text-center hover:border-secondary/50 transition-colors">
            <CardHeader>
              <Phone className="w-8 h-8 mx-auto text-secondary mb-2" />
              <CardTitle className="text-primary">Téléphone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/70">
                +33 (0)1 23 45 67 89
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-primary text-2xl">Formulaire de contact</CardTitle>
            <CardDescription>
              Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  placeholder="Votre nom"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Sujet</Label>
                <Input
                  id="subject"
                  placeholder="Sujet de votre message"
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="text-sm text-destructive">{errors.subject.message}</p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Votre message..."
                  {...register("message")}
                  className="min-h-32"
                />
                {errors.message && (
                  <p className="text-sm text-destructive">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || submitContact.isPending}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isSubmitting || submitContact.isPending ? "Envoi en cours..." : "Envoyer le message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
