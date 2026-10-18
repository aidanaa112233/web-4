
/* =========================================
   POPEYES PREMIUM WEBSITE
   ASSIGNMENT 4 - JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // TASK 1 - FORM VALIDATION
    // =====================================

    function showError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);

        if (input && error) {
            input.classList.add("input-error");
            input.setAttribute("aria-invalid", "true");
            error.textContent = message;
        }
    }

    function clearError(inputId, errorId) {
        const input = document.getElementById(inputId);
        const error = document.getElementById(errorId);

        if (input && error) {
            input.classList.remove("input-error");
            input.removeAttribute("aria-invalid");
            error.textContent = "";
        }
    }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // REGISTRATION FORM

    const registrationForm =
        document.getElementById("registrationForm");

    if (registrationForm) {

        registrationForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("registerName").value.trim();

            const email =
                document.getElementById("registerEmail").value.trim();

            const password =
                document.getElementById("registerPassword").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const successMessage =
                document.getElementById("registrationSuccess");

            let isValid = true;

            successMessage.textContent = "";

            clearError("registerName", "registerNameError");
            clearError("registerEmail", "registerEmailError");
            clearError("registerPassword", "registerPasswordError");
            clearError("confirmPassword", "confirmPasswordError");

            // Validate name
            if (name === "") {
                showError(
                    "registerName",
                    "registerNameError",
                    "Please enter your name."
                );
                isValid = false;
            }

            // Validate email
            if (email === "") {
                showError(
                    "registerEmail",
                    "registerEmailError",
                    "Email is required."
                );
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError(
                    "registerEmail",
                    "registerEmailError",
                    "Please enter a valid email address."
                );
                isValid = false;
            }

            // Validate password
            if (password === "") {
                showError(
                    "registerPassword",
                    "registerPasswordError",
                    "Password is required."
                );
                isValid = false;
            } else if (password.length < 8) {
                showError(
                    "registerPassword",
                    "registerPasswordError",
                    "Password must be at least 8 characters."
                );
                isValid = false;
            }

            // Validate confirmation
            if (confirmPassword === "") {
                showError(
                    "confirmPassword",
                    "confirmPasswordError",
                    "Please confirm your password."
                );
                isValid = false;
            } else if (password !== confirmPassword) {
                showError(
                    "confirmPassword",
                    "confirmPasswordError",
                    "Passwords do not match."
                );
                isValid = false;
            }

            // Successful validation
            if (isValid) {
                successMessage.textContent =
                    "Registration successful! Demo validation completed.";

                registrationForm.reset();
            }
        });
    }

    // CONTACT FORM VALIDATION

    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("contactName").value.trim();

            const email =
                document.getElementById("contactEmail").value.trim();

            const subject =
                document.getElementById("contactSubject").value;

            const message =
                document.getElementById("contactMessage").value.trim();

            const successMessage =
                document.getElementById("contactSuccess");

            let isValid = true;

            successMessage.textContent = "";

            clearError("contactName", "contactNameError");
            clearError("contactEmail", "contactEmailError");
            clearError("contactSubject", "contactSubjectError");
            clearError("contactMessage", "contactMessageError");

            if (name === "") {
                showError(
                    "contactName",
                    "contactNameError",
                    "Please enter your full name."
                );
                isValid = false;
            }

            if (email === "") {
                showError(
                    "contactEmail",
                    "contactEmailError",
                    "Email is required."
                );
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError(
                    "contactEmail",
                    "contactEmailError",
                    "Please enter a valid email."
                );
                isValid = false;
            }

            if (subject === "") {
                showError(
                    "contactSubject",
                    "contactSubjectError",
                    "Please select a subject."
                );
                isValid = false;
            }

            if (message === "") {
                showError(
                    "contactMessage",
                    "contactMessageError",
                    "Please write your message."
                );
                isValid = false;
            }

            if (isValid) {
                successMessage.textContent =
                    "Your message passed validation! This is a demo form.";

                contactForm.reset();
            }
        });
    }

    // =====================================
    // TASK 2 - FAQ ACCORDION
    // =====================================

    const faqQuestions =
        document.querySelectorAll(".faq-question");

    faqQuestions.forEach(function (question) {

        question.addEventListener("click", function () {

            const faqItem = question.parentElement;

            const isOpen =
                faqItem.classList.contains("active");

            faqItem.classList.toggle("active");

            question.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );
        });
    });

    // =====================================
    // TASK 3 - POPUP SUBSCRIPTION FORM
    // =====================================

    const popup =
        document.getElementById("subscriptionPopup");

    const openPopupButtons =
        document.querySelectorAll("[data-open-popup]");

    const closePopupButtons =
        document.querySelectorAll("[data-close-popup]");

    let previousFocus = null;

    function openPopup() {
        if (!popup) return;

        previousFocus = document.activeElement;

        popup.classList.add("show");
        popup.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        const closeButton =
            popup.querySelector("[data-close-popup]");

        if (closeButton) {
            closeButton.focus();
        }
    }

    function closePopup() {
        if (!popup) return;

        popup.classList.remove("show");
        popup.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (previousFocus &&
            typeof previousFocus.focus === "function") {
            previousFocus.focus();
        }
    }

    openPopupButtons.forEach(function (button) {
        button.addEventListener("click", openPopup);
    });

    closePopupButtons.forEach(function (button) {
        button.addEventListener("click", closePopup);
    });

    if (popup) {

        // Close when clicking outside popup box
        popup.addEventListener("click", function (event) {

            if (event.target === popup) {
                closePopup();
            }
        });

        // Close using Escape key
        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape" &&
                popup.classList.contains("show")) {
                closePopup();
            }
        });
    }

    // SUBSCRIPTION FORM

    const subscriptionForm =
        document.getElementById("subscriptionForm");

    if (subscriptionForm) {

        subscriptionForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("subscriberName").value.trim();

            const email =
                document.getElementById("subscriberEmail").value.trim();

            const message =
                document.getElementById("subscriptionMessage");

            if (name === "") {
                message.style.color = "#dc3545";
                message.textContent =
                    "Please enter your name.";
                return;
            }

            if (!isValidEmail(email)) {
                message.style.color = "#dc3545";
                message.textContent =
                    "Please enter a valid email.";
                return;
            }

            message.style.color = "#198754";
            message.textContent =
                "Subscription successful! Demo completed.";

            subscriptionForm.reset();
        });
    }

    // =====================================
    // TASK 4 - CHANGE BACKGROUND COLOR
    // =====================================

    const changeColorBtn =
        document.getElementById("changeColorBtn");

    const resetColorBtn =
        document.getElementById("resetColorBtn");

    const backgroundColors = [
        "#fffaf4",
        "#fff0dd",
        "#ffe8e8",
        "#e8f4ff",
        "#eaf8ec",
        "#f3eaff"
    ];

    let colorIndex = 0;

    if (changeColorBtn) {

        changeColorBtn.addEventListener("click", function () {

            colorIndex =
                (colorIndex + 1) % backgroundColors.length;

            document.body.style.backgroundColor =
                backgroundColors[colorIndex];
        });
    }

    if (resetColorBtn) {

        resetColorBtn.addEventListener("click", function () {

            colorIndex = 0;

            document.body.style.backgroundColor =
                backgroundColors[0];
        });
    }

    // =====================================
    // TASK 5 - CURRENT DATE AND TIME
    // =====================================

    const currentDateElement =
        document.getElementById("currentDate");

    const currentTimeElement =
        document.getElementById("currentTime");

    function updateDateTime() {

        if (!currentDateElement || !currentTimeElement) {
            return;
        }

        const now = new Date();

        const dateOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long"
        };

        const timeOptions = {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        };

        currentDateElement.textContent =
            now.toLocaleDateString("en-US", dateOptions);

        currentTimeElement.textContent =
            now.toLocaleTimeString("en-US", timeOptions);
    }

    if (currentDateElement && currentTimeElement) {

        updateDateTime();

        // Update every second
        setInterval(updateDateTime, 1000);
    }

});
