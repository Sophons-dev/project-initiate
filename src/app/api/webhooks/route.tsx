import { createUser } from '@/features/user/actions';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Verify the webhook request with proper type
    const evt = await verifyWebhook(req);

    const eventType = evt.type;

    // Type guard to ensure we have user data
    if (evt.type !== 'user.created' || !('id' in evt.data)) {
      return new Response('Invalid event type', { status: 400 });
    }

    const userData = evt.data;

    if (eventType === 'user.created') {
      const result = await createUser({
        clerkId: userData.id,
        name: `${userData.first_name || ''} ${userData.last_name || ''}`.trim(),
        email: userData.email_addresses?.[0]?.email_address,
        image: userData.image_url,
      });

      if (result.success) {
        console.log('User synced to DB:', result.data.userId);
      } else {
        console.error('Error syncing user to DB:', result.error);
      }
    }

    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('Webhook error', { status: 400 });
  }
}
