'use server';

import { ResponseDto } from '@/lib/dto/response.dto';
import { CreateOrganizationDto, OrganizationDto } from '../dto/organization.dto';
import { db } from '@/lib/db';
import { Organization } from '@prisma/client';

export async function createOrganization(data: CreateOrganizationDto): Promise<ResponseDto<OrganizationDto>> {
  console.log('Creating organization with data:', data);

  try {
    const created = await db.organization.create({
      data: {
        name: data.name,
        type: data.type as Organization['type'],
        description: data.description ?? null,
        website: data.website ?? null,
        logoUrl: data.logoUrl ?? null,
        location: data.location ?? null,
        organizationUrl: data.organizationUrl ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return new ResponseDto({ success: true, data: convertToDto(created) });
  } catch (error) {
    console.error('Error creating organization:', error);
    return new ResponseDto({ success: false, error: 'Failed to create organization' });
  }
}

function convertToDto(created: Organization): OrganizationDto {
  return {
    id: created.id,
    name: created.name,
    type: created.type as unknown as string,
    description: created.description ?? null,
    website: created.website ?? null,
    logoUrl: created.logoUrl ?? null,
    location: created.location ?? null,
    organizationUrl: created.organizationUrl ?? null,
    createdAt: created.createdAt ?? null,
    updatedAt: created.updatedAt ?? null,
  };
}
