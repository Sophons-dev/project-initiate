'use server';

import { ResponseDto } from '@/lib/dto/response.dto';
import { toOrganizationDto } from '../../mappers/organization.mapper';
import { CreateOrganizationDto, OrganizationDto } from '../../dto/organization.dto';
import { Organization } from '@prisma/client';
import { db } from '@/lib/db';

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

        // Enhanced organization details for AI recommendations
        aboutTheCompany: data.aboutTheCompany ?? null,
        industry: data.industry ?? null,
        employmentSize: data.employmentSize ?? null,
        companyRating: data.companyRating ?? null,
        reviewCount: data.reviewCount ?? null,

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return new ResponseDto({ success: true, data: toOrganizationDto(created) });
  } catch (error) {
    console.error('Error creating organization:', error);
    return new ResponseDto({ success: false, error: 'Failed to create organization' });
  }
}
