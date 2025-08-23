import { PrismaClient } from '@prisma/client';

export async function seedRoles(prisma: PrismaClient) {
  console.log('Seeding roles and permissions...');

  const roles = [
    { name: 'student', description: 'Student user with access to learning resources and opportunities' },
    { name: 'professional', description: 'Professional user with access to career development resources' },
  ] as const;

  const permissions = [
    { name: 'sign_up', description: 'Ability to create a new account' },
    { name: 'log_in', description: 'Ability to authenticate and access the system' },
    { name: 'edit_profile', description: 'Ability to modify personal profile information' },
    { name: 'delete_account', description: 'Ability to remove account from the system' },
    { name: 'search_resources', description: 'Ability to search for available resources' },
    { name: 'view_resource_details', description: 'Ability to view detailed information about resources' },
    { name: 'bookmark_resource', description: 'Ability to save resources for later reference' },
    { name: 'save_progress', description: 'Ability to save learning or application progress' },
    { name: 'view_recommendations', description: 'Ability to view personalized recommendations' },
    { name: 'view_course_listings', description: 'Ability to browse available courses' },
    { name: 'view_job_listings', description: 'Ability to browse available job opportunities' },
    { name: 'view_event_listings', description: 'Ability to browse available events' },
  ] as const;

  console.log('Creating roles...');
  const createdRoles = await Promise.all(
    roles.map((role) =>
      prisma.role.upsert({
        where: { name: role.name },
        update: role,
        create: role,
      }),
    ),
  );
  createdRoles.forEach((r) => console.log(`Created role: ${r.name}`));

  console.log('Creating permissions...');
  const createdPermissions = await Promise.all(
    permissions.map((permission) =>
      prisma.permission.upsert({
        where: { name: permission.name },
        update: permission,
        create: permission,
      }),
    ),
  );
  createdPermissions.forEach((p) => console.log(`Created permission: ${p.name}`));

  console.log('Creating role-permission relationships...');
  await Promise.all(
    createdRoles.flatMap((role) =>
      createdPermissions.map((permission) =>
        prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: role.id,
              permissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: role.id,
            permissionId: permission.id,
          },
        }),
      ),
    ),
  );
  createdRoles.forEach((r) => console.log(`Assigned all permissions to role: ${r.name}`));

  console.log('Auth seeding completed successfully!');
  console.log(`Summary:`);
  console.log(` - Created ${createdRoles.length} roles`);
  console.log(` - Created ${createdPermissions.length} permissions`);
  console.log(` - Created ${createdRoles.length * createdPermissions.length} role-permission relationships`);
}
