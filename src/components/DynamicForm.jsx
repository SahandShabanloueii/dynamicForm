import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

const formConfig = {
    title: 'Advanced Dynamic Form',
    description: 'Fill out the required fields to proceed.',
    fields: [
      { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter your full name', required: true },
      { 
        label: 'Email', name: 'email', type: 'email', placeholder: 'Enter your email address', required: true,
        validation: { regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', errorMessage: 'Please enter a valid email address.' }
      },
      {
        label: 'Age', name: 'age', type: 'number', placeholder: 'Enter your age', required: true,
        validation: { min: 18, max: 100, errorMessage: 'Age must be between 18 and 100.' }
      },
      { label: 'Newsletter Subscription', name: 'newsletter', type: 'checkbox', default: false }
    ],
    submitUrl: 'https://api.example.com/submit-form'
  };


// text / email / number
function TextField({ field, register, errors }) {
  return (
    <div className="mb-4">
      <label className="block font-medium text-gray-700">
        {field.label}{field.required && ' *'}
      </label>
      <input
        type={field.type}
        placeholder={field.placeholder}
        {...register(field.name, {
          required: field.required ? 'This field is required!' : false,
          pattern: field.validation?.regex ? {
            value: new RegExp(field.validation.regex),
            message: field.validation.errorMessage
          } : undefined,
          min: field.validation?.min ? {
            value: field.validation.min,
            message: field.validation.errorMessage
          } : undefined,
          max: field.validation?.max ? {
            value: field.validation.max,
            message: field.validation.errorMessage
          } : undefined,
        })}
        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors[field.name] && <p className="text-red-600 text-sm mt-1">{errors[field.name].message}</p>}
    </div>
  );
}


// checkbox
function CheckboxField({ field, control, errors }) {
  return (
    <div className="mb-4">
      <Controller
        name={field.name}
        control={control}
        defaultValue={field.default ?? false}
        render={({ field: controllerField }) => (
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...controllerField}
              checked={controllerField.value}
              className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            {field.label}
          </label>
        )}
      />
      {errors[field.name] && <p className="text-red-600 text-sm mt-1">{errors[field.name].message}</p>}
    </div>
  );
}


export default function DynamicForm({ config = formConfig }) {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Submit handler
  async function onSubmit(formData) {
    setLoading(true);
    setSubmitError(null);
    try {
      // console.log(formData);
      const res = await fetch(config.submitUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Something went wrong');
      alert('Form submitted successfully!');
      reset();
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{config.title}</h2>
      <p className="mb-6 text-gray-600">{config.description}</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {config.fields.map((field, index) => (
          <div key={index}>
            {['text', 'email', 'number'].includes(field.type) && (
              <TextField field={field} register={register} errors={errors} />
            )}
            {field.type === 'checkbox' && (
              <CheckboxField field={field} control={control} errors={errors} />
            )}
          </div>
        ))}

        {submitError && <p className="text-red-600 text-sm mb-4">{submitError}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}