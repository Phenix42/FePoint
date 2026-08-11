import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Send } from 'lucide-react';
import { cloneElement, useState, type ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/common/Button';
import { PageHero } from '@/components/common/PageHero';
import { Seo } from '@/components/common/Seo';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter at least 2 characters.').max(80),
  email: z.email('Enter a valid email address.'),
  subject: z.string().trim().min(3, 'Please add a short subject.').max(120),
  message: z.string().trim().min(20, 'Please include at least 20 characters.').max(3000),
});
type ContactValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactValues) => {
    const environment = import.meta.env as unknown as Record<string, string | undefined>;
    const endpoint = environment.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      await new Promise((resolve) => window.setTimeout(resolve, 350));
      setStatus('Demo complete — no message was sent because a form endpoint is not configured.');
      reset();
      return;
    }
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (!response.ok) throw new Error('The configured form service did not accept the message.');
    setStatus('Thanks — your message has been sent.');
    reset();
  };

  return (
    <>
      <Seo
        description="Contact the FEPoint project team or configure the demonstration form for a form service."
        path="/contact"
        title="Contact"
      />
      <PageHero
        aside={
          <span className="surface-card grid size-24 place-items-center rounded-3xl">
            <Mail className="size-8 text-brand-500" />
          </span>
        }
        description="Have a content correction, contribution question, or project idea? Share the details below."
        eyebrow="Contact"
        title="Send a thoughtful signal."
      />
      <div className="page-shell section-space">
        <form
          className="surface-card mx-auto max-w-2xl rounded-3xl p-6 sm:p-8"
          onSubmit={(event) => void handleSubmit(onSubmit)(event)}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field error={errors.name?.message} label="Name">
              <input autoComplete="name" {...register('name')} />
            </Field>
            <Field error={errors.email?.message} label="Email">
              <input autoComplete="email" type="email" {...register('email')} />
            </Field>
          </div>
          <Field className="mt-5" error={errors.subject?.message} label="Subject">
            <input {...register('subject')} />
          </Field>
          <Field className="mt-5" error={errors.message?.message} label="Message">
            <textarea className="min-h-40 resize-y" {...register('message')} />
          </Field>
          <p className="mt-4 text-xs leading-5 text-[var(--text-faint)]">
            Without VITE_FORMSPREE_ENDPOINT, this form validates locally and displays a
            demonstration response without sending data.
          </p>
          {status && (
            <p
              aria-live="polite"
              className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/7 p-3 text-sm text-emerald-600"
            >
              {status}
            </p>
          )}
          <Button className="mt-6" loading={isSubmitting} type="submit">
            <Send className="size-4" /> Send message
          </Button>
        </form>
      </div>
    </>
  );
}

function Field({
  label,
  error,
  className,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: ReactElement<{
    className?: string;
    id?: string;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
  }>;
}) {
  const id = 'contact-' + label.toLowerCase();
  return (
    <label className={'block ' + (className ?? '')} htmlFor={id}>
      <span className="text-sm font-bold">{label}</span>
      {cloneElement(children, {
        id,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? id + '-error' : undefined,
        className:
          'mt-2 h-11 w-full rounded-xl border bg-[var(--surface-muted)] px-3 text-sm outline-none focus:border-brand-500 ' +
          (children.props.className ?? ''),
      })}
      {error && (
        <span className="mt-1.5 block text-xs text-red-500" id={id + '-error'}>
          {error}
        </span>
      )}
    </label>
  );
}
