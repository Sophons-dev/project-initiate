'use server';

import { ResponseDto } from '@/lib/dto/response.dto';
import { db } from '@/lib/db';
import { Organization } from '@prisma/client';
import { CreateOrganizationDto, OrganizationDto } from '../../dto/organization.dto';
import { toOrganizationDto } from '../../mappers/organization.mapper';

export async function updateOrganization(
  id: string,
  data: Partial<CreateOrganizationDto>
): Promise<ResponseDto<OrganizationDto>> {
  console.log('Updating organization with data:', data);

  try {
    const updated = await db.organization.update({
      where: { id },
      data: {
        name: data.name,
        type: data.type as Organization['type'],
        description: data.description,
        website: data.website,
        logoUrl: data.logoUrl,
        location: data.location,
        organizationUrl: data.organizationUrl,

        // Enhanced organization details for AI recommendations
        aboutTheCompany: data.aboutTheCompany,
        industry: data.industry,
        employmentSize: data.employmentSize,
        companyRating: data.companyRating,
        reviewCount: data.reviewCount,

        updatedAt: new Date(),
      },
    });

    return new ResponseDto({ success: true, data: toOrganizationDto(updated) });
  } catch (error) {
    console.error('Error updating organization:', error);
    return new ResponseDto({ success: false, error: 'Failed to update organization' });
  }
}
