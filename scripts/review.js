document.addEventListener("DOMContentLoaded", () => {
    const smiles = document.querySelectorAll(".smiles img");
    const smileText = document.querySelector(".smile-text");

    // Define messages for each rating
    const messages = [
        "Це було жахливо",
        "Це було не дуже",
        "Це було посередньо",
        "Це було добре",
        "Найкраще що я куштував"
    ];

    // Function to handle smile click
    smiles.forEach((smile, index) => {
        smile.addEventListener("click", () => {
            // Remove active class from all smiles
            smiles.forEach(img => img.classList.remove("active"));

            // Add active class to the clicked smile
            smile.classList.add("active");

            // Update the text based on the clicked smile's data-value
            smileText.textContent = messages[index];
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit-review");
    const successModal = document.getElementById("success-modal");
    const closeSuccessModal = document.getElementById("close-success-modal");

    // Show the success modal when "Submit Review" is clicked
    submitButton.addEventListener("click", () => {
        // Validate input fields (optional step)
        const name = document.querySelector('input[type="text"]').value.trim();
        const email = document.querySelector('input[type="email"]').value.trim();
        const review = document.getElementById("review").value.trim();

        // Check if all fields are filled
        if (name && email && review) {
            successModal.style.display = "flex"; // Show modal
        } else {
            alert("Будь ласка, заповніть усі поля"); // Optional validation message
        }
    });

    // Close the success modal when the close button is clicked
    closeSuccessModal.addEventListener("click", () => {
        successModal.style.display = "none";
        window.location.href = "index.html";
    });

    // Optional: Close the modal if the user clicks outside the modal content
    window.addEventListener("click", (event) => {
        if (event.target === successModal) {
            successModal.style.display = "none";
        }
    });
});
