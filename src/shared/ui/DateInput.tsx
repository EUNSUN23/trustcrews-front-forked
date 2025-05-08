import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import { AiTwotoneCalendar } from '@react-icons/all-files/ai/AiTwotoneCalendar';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

export interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  date?: string | null;
  setDate: (value: string) => void;
  disabled?: boolean;
  minDate?: Date | null | undefined;
  includeDateIntervals?: Array<{ start: Date; end: Date }> | undefined;
  openToDate?: Date | undefined;
}

const DateInput = ({
  id,
  label,
  required = false,
  date = format(new Date(), 'yyyy-MM-dd'),
  setDate,
  disabled = false,
  minDate,
  includeDateIntervals,
  openToDate,
  ...props
}: DateInputProps) => {
  const datePickerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleChange = (date: Date | null) => {
    if (date) {
      setIsOpen(false);
      setDate(format(date, 'yyyy-MM-dd'));
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', (e) => handleDocumentClick(e));

    return () => {
      document.removeEventListener('click', (e) => handleDocumentClick(e));
    };
  }, []);

  return (
    <div className='relative mobile:text-sm' ref={datePickerRef}>
      {label ? (
        <label htmlFor={id} className='text-gray-700'>
          {label}
          {required ? (
            <span className='text-red-500 required-dot ml-1.5 align-middle'>
              *
            </span>
          ) : (
            <></>
          )}
        </label>
      ) : (
        <></>
      )}
      <input
        tabIndex={-1}
        aria-live='assertive'
        type='text'
        value={date ?? ''}
        readOnly
        disabled={disabled}
        id={id}
        className='mobile:text-sm block rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 pr-10 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:text-gray-700/60'
        {...props}
      />
      <button
        aria-label={`${label || ''} 달력 팝업`}
        aria-expanded={isOpen}
        aria-controls='datePicker-popup'
        type='button'
        className='absolute right-2 bottom-3 text-greyDarkblue disabled:text-greyDarkblue/50'
        onClick={handleClick}
        disabled={disabled}
      >
        <AiTwotoneCalendar className='h-5 w-5' aria-hidden={true} />
      </button>
      {isOpen && (
        <div className='absolute z-50'>
          <DatePicker
            id='datePicker-popup'
            selected={date ? new Date(date) : null}
            onChange={handleChange}
            inline
            minDate={minDate !== null ? minDate : undefined}
            includeDateIntervals={includeDateIntervals}
            openToDate={openToDate}
            showDisabledMonthNavigation
          />
        </div>
      )}
    </div>
  );
};

export default DateInput;
