import { ref } from 'vue';

export default function useCreateVoteForm() {
  const form = ref({
    title: '',
    options: ['', ''], // Initialize with two empty options
    endDate: ''
  });

  const errors = ref({
    title: '',
    options: '',
    endDate: ''
  });

  const today = new Date().toISOString().split('T')[0]!; // Ensure 'today' is always defined

  const addOption = () => {
    form.value.options.push('');
  };

  const handleSubmit = () => {
    // Reset errors
    errors.value = { title: '', options: '', endDate: '' };

    // Validate title
    if (form.value.title.length < 5) {
      errors.value.title = 'Title must be at least 5 characters long.';
    }

    // Validate options
    const validOptions = form.value.options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) {
      errors.value.options = 'Please provide at least two options.';
    }

    // Validate end date
    if (form.value.endDate < today) {
      errors.value.endDate = 'End date cannot be before today.';
    }

    // If no errors, show a toast (placeholder for now)
    if (!errors.value.title && !errors.value.options && !errors.value.endDate) {
      alert('Vote created successfully!');
    }
  };

  return {
    form,
    errors,
    today,
    addOption,
    handleSubmit
  };
}