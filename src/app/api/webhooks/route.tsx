import { createUser, updateUser, deleteUser } from '@/features/user/actions';
import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const { type, data } = evt;

    if (!data?.id) {
      return new Response('Invalid event payload', { status: 400 });
    }

    switch (type) {
      case 'user.created': {
        const result = await createUser(mapClerkUser(data));
        if (!result.success) throw new Error(result.error);
        console.log('✅ User created in DB:', result.data?.id);
        break;
      }

      case 'user.updated': {
        const user = mapClerkUser(data);
        const result = await updateUser(
          { key: 'clerkId', value: data.id },
          {
            email: user.email as string,
            profile: {
              name: user.name,
              image: user.image ?? null,
            },
          }
        );
        if (!result.success) throw new Error(result.error);
        console.log('✅ User updated in DB:', result.data?.id);
        break;
      }

      case 'user.deleted': {
        const result = await deleteUser(data.id);
        if (!result.success) throw new Error(result.error);
        console.log('🗑️ User deleted from DB:', data.id);
        break;
      }

      default:
        console.log(`ℹ️ Ignored event: ${type}`);
    }

    return new Response('Webhook processed', { status: 200 });
  } catch (err) {
    console.error('❌ Webhook error:', err);
    return new Response('Webhook error', { status: 400 });
  }
}

/**
 * Map Clerk user object → minimal DTO for our DB
 */
function mapClerkUser(data: any) {
  return {
    clerkId: data.id,
    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
    email: data.email_addresses?.[0]?.email_address,
    image: data.image_url,
  };
}
