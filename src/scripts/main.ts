// Import the Experience type definition
import type { Experience } from "./types";

// Base URL of the backend API
const API_URL = "https://backend-moment3-1.onrender.com/api/experience";
const listElement = document.getElementById("experience-list");

// Fetch all experiences from the API and render them in the table
async function fetchExperiences() {
  try {
    const response = await fetch(API_URL);
    const data: Experience[] = await response.json();

    if (!listElement) return;

    listElement.innerHTML = "";
    data.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${item.companyName}</td>
          <td>${item.jobTitle}</td>
          <td>${item.location}</td>
          <td>${item.startDate || ''}</td>
          <td>${item.endDate || ''}</td>
          <td>${item.description || ''}</td>
          <td>
            <a href="/src/pages/edit.html?id=${item._id}" class="edit-link">Redigera</a>
            <button data-id="${item._id}" class="delete-btn">Radera</button>
          </td>
        `;
        listElement.appendChild(tr);
    });

    setupDeleteButtons();
  } catch (error) {
    console.error("Fel vid hämtning:", error);
  }
}

// Add click event listeners to all "Radera" (Delete) buttons
function setupDeleteButtons() {
  const buttons = document.querySelectorAll(".delete-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = (btn as HTMLButtonElement).dataset.id;
      if (!id) return;
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchExperiences();
    });
  });
}

fetchExperiences();
