'use client';

import { OpportunityDto } from '../../dto';

type FieldType = {
  label: string;
  value: string | null;
  show: boolean;
  isBoolean?: boolean;
};

interface OpportunityTypeSpecificSidebarProps {
  opportunity: OpportunityDto;
}

// Helper function to safely access metadata properties
const getMetadataValue = (metadata: any, key: string) => {
  return metadata?.[key];
};

// Helper function to format currency values
const formatCurrency = (value: { min: number; max: number; currency: string; range: string } | undefined) => {
  if (!value) return null;

  // Don't display if both min and max are 0
  if (value.min === 0 && value.max === 0) return null;

  return value.range || `${value.currency} ${value.min} - ${value.max}`;
};

// Helper function to format boolean values
const formatBoolean = (value: boolean | undefined) => {
  if (value === undefined) return null;
  return value ? 'Yes' : 'No';
};

// Helper function to format array values
const formatArray = (value: string[] | undefined) => {
  if (!value || value.length === 0) return null;
  return value.join(', ');
};

export const OpportunityTypeSpecificSidebar = ({ opportunity }: OpportunityTypeSpecificSidebarProps) => {
  const isJob = opportunity.type === 'job';
  const isCourse = opportunity.type === 'course';
  const isEvent = opportunity.type === 'event';

  // Common fields for all types
  const commonFields = [
    {
      label: 'Type',
      value: opportunity.type,
      show: true,
    },
  ];

  // Job-specific fields
  const jobFields = [
    {
      label: 'Employment Type',
      value: getMetadataValue(opportunity.metadata, 'employmentType')?.replace('-', ' '),
      show: isJob && !!getMetadataValue(opportunity.metadata, 'employmentType'),
    },
    {
      label: 'Experience Required',
      value: getMetadataValue(opportunity.metadata, 'yearsOfExperience'),
      show: isJob && !!getMetadataValue(opportunity.metadata, 'yearsOfExperience'),
    },
    {
      label: 'Job Category',
      value: getMetadataValue(opportunity.metadata, 'jobCategory'),
      show: isJob && !!getMetadataValue(opportunity.metadata, 'jobCategory'),
    },
  ];

  // Course-specific fields
  const courseFields = [
    {
      label: 'Difficulty Level',
      value: getMetadataValue(opportunity.metadata, 'difficultyLevel'),
      show: isCourse && !!getMetadataValue(opportunity.metadata, 'difficultyLevel'),
    },
    {
      label: 'Duration',
      value: getMetadataValue(opportunity.metadata, 'duration'),
      show: isCourse && !!getMetadataValue(opportunity.metadata, 'duration'),
    },
    {
      label: 'Course Category',
      value: getMetadataValue(opportunity.metadata, 'courseCategory'),
      show: isCourse && !!getMetadataValue(opportunity.metadata, 'courseCategory'),
    },
    {
      label: 'Certification',
      value: formatBoolean(getMetadataValue(opportunity.metadata, 'certification')),
      show: isCourse && getMetadataValue(opportunity.metadata, 'certification') !== undefined,
      isBoolean: true,
    },
    {
      label: 'Tuition',
      value: formatCurrency(getMetadataValue(opportunity.metadata, 'tuition')),
      show: isCourse && !!getMetadataValue(opportunity.metadata, 'tuition'),
    },
  ];

  // Event-specific fields
  const eventFields = [
    {
      label: 'Capacity',
      value: getMetadataValue(opportunity.metadata, 'capacity')?.toString(),
      show: isEvent && !!getMetadataValue(opportunity.metadata, 'capacity'),
    },
    {
      label: 'Event Category',
      value: getMetadataValue(opportunity.metadata, 'eventCategory'),
      show: isEvent && !!getMetadataValue(opportunity.metadata, 'eventCategory'),
    },
    {
      label: 'Ticket Price',
      value: formatCurrency(getMetadataValue(opportunity.metadata, 'ticketPrice')),
      show: isEvent && !!getMetadataValue(opportunity.metadata, 'ticketPrice'),
    },
    {
      label: 'Speakers',
      value: formatArray(getMetadataValue(opportunity.metadata, 'speakers')),
      show: isEvent && !!getMetadataValue(opportunity.metadata, 'speakers')?.length,
    },
  ];

  // Get the appropriate fields based on opportunity type
  const getFieldsForType = (): FieldType[] => {
    const fields: FieldType[] = [...commonFields];

    if (isJob) {
      fields.push(...jobFields);
    } else if (isCourse) {
      fields.push(...courseFields);
    } else if (isEvent) {
      fields.push(...eventFields);
    }

    return fields.filter(field => field.show && field.value !== null);
  };

  const fields = getFieldsForType();

  // Don't render if no fields to show
  if (fields.length === 0) {
    return null;
  }

  const getTitle = () => {
    if (isJob) return 'Job Details';
    if (isCourse) return 'Course Details';
    if (isEvent) return 'Event Details';
    return 'Opportunity Details';
  };

  return (
    <div className='bg-white p-6 rounded-lg border shadow-sm'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>{getTitle()}</h3>
      <div className='space-y-3'>
        {fields.map((field, index) => (
          <div key={index} className='flex justify-between'>
            <span className='text-gray-600'>{field.label}:</span>
            <span
              className={`font-medium ${
                field.isBoolean ? (field.value === 'Yes' ? 'text-green-600' : 'text-red-600') : ''
              }`}
            >
              {field.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
