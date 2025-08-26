# Clerk Webhook Integration

This document explains how to integrate Clerk webhooks with our Next.js application to handle user events in real-time.

---

## 1. Overview

Clerk webhooks allow your application to receive real-time notifications for various user events. The current implementation handles:

- `user.created` - Triggered when a new user registers
- Other Clerk events can be easily added as needed

---

## 2. Environment Setup

### Prerequisites

1. **Ngrok** (for local development)
   Install ngrok and forward your local server:

   ```bash
   ngrok http 3000
   ```

   Example output:

   ```
   https://your-subdomain.ngrok-free.app -> http://localhost:3000
   ```

2. **Webhook Secret**
   Clerk generates a webhook signing secret when you create a webhook. Add it to your environment variables:
   ```env
   CLERK_WEBHOOK_SECRET=your_webhook_secret_here
   ```

---

## 3. Setting Up Clerk Webhook

1. Go to [Clerk Dashboard](https://dashboard.clerk.com) → Webhooks → Create Webhook
2. Configure the webhook:
   - **Webhook URL**: `https://your-ngrok-url.ngrok-free.app/api/webhooks`
   - **Events to Send**: Select `user.created` and any other events you want to handle
3. Copy the "Signing Secret" and add it to your environment variables

---

## 4. Implementation Details

The webhook handler is implemented in `src/app/api/webhooks/route.tsx` and includes:

- Request verification using Clerk's `verifyWebhook`
- Basic logging of webhook events
- Example handling for `user.created` event
- Error handling and proper HTTP responses

### Current Implementation

```typescript
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const { id } = evt.data;
    const eventType = evt.type;

    if (evt.type === 'user.created') {
      console.log('New user created with ID:', evt.data.id);
      // Add your user creation logic here
    }

    console.log(`Received webhook with ID ${id} and type ${eventType}`);
    console.log('Webhook payload:', evt.data);

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
```

---

## 5. Testing

1. Start your development server:
   ```bash
   npm run dev
   ```
2. Start ngrok in a separate terminal:
   ```bash
   ngrok http 3000
   ```
3. Update your Clerk webhook URL if needed
4. Test the webhook from the Clerk dashboard or by creating a new user
5. Check your console logs for the webhook events

---

## 6. Best Practices

- Always verify webhook signatures using `verifyWebhook`
- Keep your webhook secret secure and never commit it to version control
- Implement proper error handling and logging
- Add rate limiting in production
- Consider adding webhook retry logic for failed deliveries

## 7. Next Steps

- [ ] Add more event handlers as needed
- [ ] Implement database operations for user management
- [ ] Add input validation for webhook payloads
- [ ] Set up monitoring and alerting for webhook failures

## 8. References

- [Clerk Webhooks Documentation](https://clerk.com/docs/webhooks/overview)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Ngrok Documentation](https://ngrok.com/docs)
