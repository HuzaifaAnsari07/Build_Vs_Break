'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createUserWithEmailAndPassword } from 'firebase/auth';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PasswordInput } from '../ui/password-input';

const emailRegex = new RegExp(/^\d{2}[A-Za-z]{2}\d{2}@aiktc\.ac\.in$/);

const FormSchema = z.object({
  username: z.string().min(2, { message: 'Username is required.' }),
  email: z.string().regex(emailRegex, {
    message: 'Use a valid student email (e.g., 24ai17@aiktc.ac.in).',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  branch: z.string(),
  year: z.string(),
});

type RegisterFormProps = {
  onSwitch: () => void;
};

export function RegisterForm({ onSwitch }: RegisterFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      branch: 'AIML',
      year: 'SE',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      // In a real app, you would also save the username, branch, and year to a database.
      toast({
        title: 'Registration Successful (Demo)',
        description: 'Your account has been created.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Registration Failed',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white font-headline">Register</h2>
        <p className="text-sm text-slate-300">
          Sign up with your AIKTC student email
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 flex-grow flex flex-col"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Username</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white/5 border-white/10" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-200">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Use student email to register"
                    {...field}
                    className="bg-white/5 border-white/10"
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
                    className="bg-white/5 border-white/10"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">Branch</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="AIML">AIML</SelectItem>
                      <SelectItem value="CO">CO</SelectItem>
                      <SelectItem value="DS">DS</SelectItem>
                      <SelectItem value="ECS">ECS</SelectItem>
                      <SelectItem value="CE">CE</SelectItem>
                      <SelectItem value="ME">ME</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-200">Year</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white/5 border-white/10">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SE">SE</SelectItem>
                      <SelectItem value="TE">TE</SelectItem>
                      <SelectItem value="BE">BE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex-grow" />

          <div className="flex items-center justify-between pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg transform-gpu hover:scale-[1.02] transition"
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
            <Button
              type="button"
              variant="link"
              onClick={onSwitch}
              className="text-sm text-slate-300"
            >
              Already have an account? Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
