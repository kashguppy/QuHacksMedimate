// Placeholder medication data with times
const placeholderMeds = [
    { name: "Metformin", time: "8:00 AM" },
    { name: "Acetaminophen", time: "12:00 PM" },
    { name: "Lisinopril", time: "6:00 PM" }
];

let uploadedMedications = [];

// Handle Login
function goToUserInfoSection() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Hardcoded username and password
    const validUsername = "admin";
    const validPassword = "12345";

    if (username === validUsername && password === validPassword) {
        document.getElementById("loginScreen").classList.add("hidden");
        document.getElementById("userInfoSection").classList.remove("hidden");
    } else {
        alert("Invalid login credentials. Please try again.");
    }
}

// Handle User Info Submission
function goToMedicationSection() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;

    if (!name || !age || !weight) {
        alert("Please fill in all fields.");
        return;
    }

    localStorage.setItem("userName", name);
    localStorage.setItem("userAge", age);
    localStorage.setItem("userWeight", weight);

    document.getElementById("userInfoSection").classList.add("hidden");
    document.getElementById("medicationSection").classList.remove("hidden");
}

// Handle Medication Upload
function addMedication() {
    const fileInput = document.getElementById("medicationImage");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload an image.");
        return;
    }

    const newMedication = placeholderMeds[uploadedMedications.length % placeholderMeds.length];
    uploadedMedications.push(newMedication);

    const previewList = document.getElementById("medicationPreview");
    const listItem = document.createElement("li");
    listItem.textContent = `${newMedication.name} (Time: ${newMedication.time})`;
    previewList.appendChild(listItem);

    fileInput.value = "";
}

// Handle Transition to Journal Section
function goToJournalSection() {
    if (uploadedMedications.length === 0) {
        alert("Please add at least one medication.");
        return;
    }

    localStorage.setItem("medications", JSON.stringify(uploadedMedications));

    document.getElementById("medicationSection").classList.add("hidden");
    document.getElementById("journalSection").classList.remove("hidden");

    const medicationList = document.getElementById("medicationList");
    medicationList.innerHTML = uploadedMedications
        .map((med, index) =>
            `<li>
                <input type="checkbox" id="med-${index}">
                <label for="med-${index}">${med.name} - Time: ${med.time}</label>
            </li>`
        )
        .join("");
}

// Handle Saving Journal
function saveJournal() {
    const symptoms = document.getElementById("symptoms").value;
    const doctorContact = document.getElementById("doctorContact").value;

    if (!doctorContact) {
        alert("Please provide your doctor's contact information.");
        return;
    }

    alert(`Journal Saved:\nSymptoms: ${symptoms}\nDoctor Contact: ${doctorContact}`);
}
