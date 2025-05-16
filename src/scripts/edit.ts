import type { Experience } from './types';

const API_URL = 'https://backend-moment3-1.onrender.com/api/experience';

// Get references to the form and message containers
const form = document.getElementById('edit-form') as HTMLFormElement;
const errorDiv = document.getElementById('error') as HTMLDivElement;
const successDiv = document.getElementById('success-message') as HTMLDivElement;

// Parse the ID from the URL query string (?id=...)
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

// If no ID was provided, show an error and hide the form

if (!id) {
  errorDiv.textContent = 'Ingen ID angiven i URL.';
  errorDiv.classList.remove('hidden');
  form.style.display = 'none';
} else {
  // Fetch the experience by ID and populate the form, if the fetch fails, show an error message
  fetch(`${API_URL}/${id}`)
    .then(res => res.json())
    .then((data: Experience) => {
      (document.getElementById('companyName') as HTMLInputElement).value = data.companyName;
      (document.getElementById('jobTitle') as HTMLInputElement).value = data.jobTitle;
      (document.getElementById('location') as HTMLInputElement).value = data.location;
      (document.getElementById('startDate') as HTMLInputElement).value = data.startDate || '';
      (document.getElementById('endDate') as HTMLInputElement).value = data.endDate || '';
      (document.getElementById('description') as HTMLTextAreaElement).value = data.description || '';
    })
    .catch(() => {
      errorDiv.textContent = 'Kunde inte hämta erfarenheten.';
      errorDiv.classList.remove('hidden');
    });
}

// Handle form submission (PUT request)
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Gather updated data from the form
  const updatedExperience: Experience = {
    companyName: (document.getElementById('companyName') as HTMLInputElement).value.trim(),
    jobTitle: (document.getElementById('jobTitle') as HTMLInputElement).value.trim(),
    location: (document.getElementById('location') as HTMLInputElement).value.trim(),
    startDate: (document.getElementById('startDate') as HTMLInputElement).value,
    endDate: (document.getElementById('endDate') as HTMLInputElement).value,
    description: (document.getElementById('description') as HTMLTextAreaElement).value.trim()
  };
  // Validate required fields
  if (!updatedExperience.companyName || !updatedExperience.jobTitle || !updatedExperience.location) {
    errorDiv.textContent = 'Fyll i företagsnamn, jobbtitel och plats!';
    errorDiv.classList.remove('hidden');
    return;
  }
  // Send a PUT request to update the experience
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedExperience)
    });

    if (!res.ok) {
      errorDiv.textContent = 'Uppdateringen misslyckades.';
      errorDiv.classList.remove('hidden');
      return;
    }

    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
    successDiv.classList.remove('hidden');

    setTimeout(() => {
      successDiv.classList.add('hidden');
    }, 3000);
  } catch {
    errorDiv.textContent = 'Kunde inte ansluta till servern.';
    errorDiv.classList.remove('hidden');
  }
});
