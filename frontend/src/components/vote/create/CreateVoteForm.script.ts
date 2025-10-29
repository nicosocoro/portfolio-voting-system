import { ref } from 'vue';
import { voteService } from '../../../services/vote/vote.service';
import { CreateVoteData } from '../../../models/vote/createVote.data';

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

  const today = ref<string>((new Date().toISOString().split('T')[0] as string));

  const addOption = () => {
    form.value.options.push('');
  };

  const removeOption = (index: number) => {
  if (form.value.options.length > 2) {
    form.value.options.splice(index, 1);
  }
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
    if (form.value.endDate < today.value) {
      errors.value.endDate = 'End date cannot be before today.';
    }

    // If no errors, show a toast (placeholder for now)
    const noErrors = !errors.value.title && !errors.value.options && !errors.value.endDate;
    if (noErrors) {
      voteService.send(new CreateVoteData(form.value.title, form.value.options, new Date(form.value.endDate)));
    }
  };

  return {
    form,
    errors,
    today,
    addOption,
    removeOption,
    handleSubmit
  };
}