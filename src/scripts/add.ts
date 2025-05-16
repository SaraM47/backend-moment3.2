const API_URL = 'https://backend-moment3-1.onrender.com/api/experience';

// Get references to the form and message containers
const form = document.getElementById('add-form') as HTMLFormElement;
const errorDiv = document.getElementById('error') as HTMLDivElement;
const successMessage = document.getElementById('success-message') as HTMLDivElement;

// Event listener for form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newExperience = {
    companyName: (document.getElementById('companyName') as HTMLInputElement).value.trim(),
    jobTitle: (document.getElementById('jobTitle') as HTMLInputElement).value.trim(),
    location: (document.getElementById('location') as HTMLInputElement).value.trim(),
    startDate: (document.getElementById('startDate') as HTMLInputElement).value,
    endDate: (document.getElementById('endDate') as HTMLInputElement).value,
    description: (document.getElementById('description') as HTMLTextAreaElement).value.trim()
  };

  // Client-side validation for required fields
  if (!newExperience.companyName || !newExperience.jobTitle || !newExperience.location) {
    errorDiv.textContent = 'Fyll i företagsnamn, jobbtitel och plats!';
    errorDiv.classList.remove('hidden'); 
    return;
  }

  // Send POST request to backend with form data
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExperience)
    });
    // Handle error from backend response
    if (!res.ok) {
      errorDiv.textContent = 'Fel vid sparande. Kontrollera att alla fält är ifyllda korrekt.';
      errorDiv.classList.remove('hidden'); 
      return;
    }

    // Clear error, reset form and show success message
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden'); 
    form.reset();

    successMessage.classList.remove('hidden');
    setTimeout(() => {
      successMessage.classList.add('hidden');
    }, 3000);
  } catch (err) {
    errorDiv.textContent = 'Kunde inte ansluta till servern.';
    errorDiv.classList.remove('hidden'); 
  }
});
