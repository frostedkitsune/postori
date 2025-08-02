import { z } from 'zod';

const emailSchema = z.object({
  to: z.array(z.email()),
  cc: z.array(z.email()).optional(),
  bcc: z.array(z.email()).optional(),
  subject: z.string(),
  text: z.string(),
  html: z.string().optional(),
  from: z.email()
})

export {
  emailSchema
}
