import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Mail, MessageSquare } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Nous contacter
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Avez-vous des questions? Nous sommes là pour vous aider.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-slate-200 dark:border-slate-800 text-center">
            <CardHeader>
              <Mail className="w-8 h-8 mx-auto text-red-500 mb-2" />
              <CardTitle className="text-lg">Email</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                support@socialmatch.com
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 text-center">
            <CardHeader>
              <MessageSquare className="w-8 h-8 mx-auto text-blue-500 mb-2" />
              <CardTitle className="text-lg">Chat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Disponible 24/7
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 text-center">
            <CardHeader>
              <MessageSquare className="w-8 h-8 mx-auto text-green-500 mb-2" />
              <CardTitle className="text-lg">Réponse rapide</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400">
                Moins de 24h
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Formulaire de contact</CardTitle>
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
                  <p className="text-sm text-red-500">{errors.name.message}</p>
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
                  <p className="text-sm text-red-500">{errors.email.message}</p>
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
                  <p className="text-sm text-red-500">{errors.subject.message}</p>
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
                  <p className="text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || submitContact.isPending}
                className="w-full"
              >
                {isSubmitting || submitContact.isPending ? "Envoi..." : "Envoyer le message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
