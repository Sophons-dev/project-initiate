'use client';

import { OpportunityDto } from '../../dto';

interface OpportunityCompensationInfoProps {
  opportunity: OpportunityDto;
}

// Helper function to safely access metadata properties
const getMetadataValue = (metadata: any, key: string) => {
  return metadata?.[key];
};

// Helper function to format currency display
const formatCurrencyDisplay = (value: { min: number; max: number; currency: string; range: string } | undefined) => {
  if (!value) return null;

  if (value.min > 0 && value.max > 0) {
    return {
      display: `${value.currency} ${value.min.toLocaleString()} - ${value.max.toLocaleString()}`,
      hasRange: true,
    };
  } else if (value.range) {
    return {
      display: value.range,
      hasRange: false,
    };
  }

  return null;
};

export const OpportunityCompensationInfo = ({ opportunity }: OpportunityCompensationInfoProps) => {
  const isJob = opportunity.type === 'job';
  const isCourse = opportunity.type === 'course';
  const isEvent = opportunity.type === 'event';

  // Job salary information
  const renderJobSalary = () => {
    const salary = getMetadataValue(opportunity.metadata, 'salary');
    const isSpecified = salary?.isSpecified;

    if (!isSpecified) {
      return (
        <div className='text-center text-gray-500'>
          <p className='text-sm'>Salary not specified</p>
        </div>
      );
    }

    const formattedSalary = formatCurrencyDisplay(salary);

    if (!formattedSalary) {
      return (
        <div className='text-center text-gray-500'>
          <p className='text-sm'>Salary information unavailable</p>
        </div>
      );
    }

    return (
      <div>
        <p>{formattedSalary.display}</p>
      </div>
    );
  };

  // Course tuition information
  const renderCourseTuition = () => {
    const tuition = getMetadataValue(opportunity.metadata, 'tuition');
    const isSpecified = tuition?.isSpecified;

    if (!isSpecified) {
      return (
        <div className='text-center text-gray-500'>
          <p className='text-sm'>Tuition not specified</p>
        </div>
      );
    }

    const formattedTuition = formatCurrencyDisplay(tuition);

    if (!formattedTuition) {
      return (
        <div className='text-center text-gray-500'>
          <p className='text-sm'>Tuition information unavailable</p>
        </div>
      );
    }

    return (
      <div className='text-center'>
        <p className={`text-2xl font-bold ${formattedTuition.hasRange ? 'text-blue-600' : 'text-gray-900'}`}>
          {formattedTuition.display}
        </p>
        <p className='text-sm text-gray-600'>{formattedTuition.hasRange ? 'Tuition range' : 'Tuition information'}</p>
      </div>
    );
  };

  // Event ticket price information
  const renderEventTicketPrice = () => {
    const ticketPrice = getMetadataValue(opportunity.metadata, 'ticketPrice');
    const isSpecified = ticketPrice?.isSpecified;

    if (!isSpecified) {
      return (
        <div className='text-center text-gray-500'>
          <p className='text-sm'>Ticket price not specified</p>
        </div>
      );
    }

    const formattedPrice = formatCurrencyDisplay(ticketPrice);

    if (!formattedPrice) {
      return (
        <div className='text-center text-gray-500'>
          <p className='text-sm'>Ticket price information unavailable</p>
        </div>
      );
    }

    return (
      <div className='text-center'>
        <p className={`text-2xl font-bold ${formattedPrice.hasRange ? 'text-purple-600' : 'text-gray-900'}`}>
          {formattedPrice.display}
        </p>
        <p className='text-sm text-gray-600'>
          {formattedPrice.hasRange ? 'Ticket price range' : 'Ticket price information'}
        </p>
      </div>
    );
  };

  // Get title based on opportunity type
  const getTitle = () => {
    if (isJob) return 'Salary Information';
    if (isCourse) return 'Tuition Information';
    if (isEvent) return 'Ticket Price Information';
    return 'Pricing Information';
  };

  // Don't render if not a supported type
  if (!isJob && !isCourse && !isEvent) {
    return null;
  }

  return (
    <div className='bg-white p-6 rounded-lg border shadow-sm'>
      <h3 className=' font-semibold text-gray-900 mb-4'>{getTitle()}</h3>
      <div className='space-y-3'>
        {isJob && renderJobSalary()}
        {isCourse && renderCourseTuition()}
        {isEvent && renderEventTicketPrice()}
      </div>
    </div>
  );
};
