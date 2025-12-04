document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const phoneNumber = document.getElementById("phoneNumber");
    const message = document.getElementById("message");

    //To validate the email and phone numebr
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPhone = (phone) => /^\d{10}$/.test(phone.replace(/\D/g, ""));

    //Validates the form on submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const fName = firstName.value.trim();
        const lName = lastName.value.trim();
        const emailVal = email.value.trim();
        const phoneVal = phoneNumber.value.trim();
        const messageVal = message.value.trim();

        //error
        if (fName === "" || lName === "") return alert("Please enter your full name.");
        if (!isValidEmail(emailVal)) return alert("Please enter a valid email address.");
        if (!isValidPhone(phoneVal)) return alert("Please enter a valid 10-digit phone number.");
        if (messageVal === "") return alert("Please enter a message.");

        //success
        alert("Thank you! Your message has been submitted.");
        form.reset();
    });
});
