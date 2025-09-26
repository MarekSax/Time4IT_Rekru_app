import { Control, FieldValues, Path } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './form';
import { Input } from './input';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  type?: string;
  className?: string;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  className,
}: FormInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative gap-1.5">
          <FormLabel className="text-sm font-medium text-gray-700">{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              className={cn(
                'h-auto border-1 border-gray-300 bg-white px-[14px] py-2.5 font-normal placeholder:text-gray-500 md:text-base',
                className,
              )}
              placeholder={placeholder}
              {...field}
              onChange={(e) => {
                if (type === 'number') {
                  const value = e.target.value;
                  field.onChange(value === '' ? undefined : Number(value));
                } else {
                  field.onChange(e);
                }
              }}
            />
          </FormControl>
          <FormMessage className="absolute top-[100%] text-xs" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
