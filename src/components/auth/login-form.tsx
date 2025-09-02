'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

const emailRegex = new RegExp(/^\d{2}[A-Za-z]{2}\d{2}@aiktc\.ac\.in$/);

const FormSchema = z.object({
  email: z.string().regex(emailRegex, {
    message: 'Use a valid student email (e.g., 24ai17@aiktc.ac.in).',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

type LoginFormProps = {
  onSwitch: () => void;
};

export function LoginForm({ onSwitch }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast({
        title: 'Login Successful (Demo)',
        description: 'You have been successfully logged in.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description:
          error.code === 'auth/invalid-credential'
            ? 'Invalid email or password.'
            : error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white font-headline">Login</h2>
        <p className="text-sm text-slate-300">Use your student credentials</p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex-grow flex flex-col"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Use student email for login"
                    {...field}
                    className="bg-white/5 border-white/10 placeholder:text-slate-400 focus:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Minimum 8 characters"
                    {...field}
                    className="bg-white/5 border-white/10 placeholder:text-slate-400 focus:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex-grow" />
          <div className="flex items-center justify-between pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg transform-gpu hover:scale-[1.02] transition"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <Button
              type="button"
              variant="link"
              onClick={onSwitch}
              className="text-sm text-slate-300"
            >
              Not registered? Register
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
