/**
 * Map Clerk user object → minimal DTO for our DB
 */

type ClerkUserData = {
  id: string;
  email_addresses?: Array<{ email_address: string }>;
  first_name?: string | null;
  last_name?: string | null;
  image_url?: string;
};

export function mapClerkUser(data: ClerkUserData) {
  const email = data.email_addresses?.[0]?.email_address;
  if (!email) {
    throw new Error('User email is required');
  }

  return {
    clerkId: data.id,
    email,
    profile: {
      name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
      image: data.image_url ?? null,
    },
  };
}
