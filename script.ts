interface ContactForm {
    name: string;
    email: string;
    contact: string;
    subject: string;
    message: string;
}

const contactForm = document.getElementById("contactForm") as HTMLFormElement;
const responseMessage = document.getElementById("responseMessage") as HTMLElement;
  
const validateEmail = (email: string): boolean => {
   const regex = /\S+@\S+\.\S+/;
   return regex.test(email);
};
  
const validateContact = (contact: string): boolean => {
  const regex = /^\d{10}$/;
  return regex.test(contact);
};
  
const submitForm = async (formData: ContactForm) => {
  try {
    const response = await fetch("https://67176272b910c6a6e027d621.mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Submission Failed");
    }
    responseMessage.textContent = "Form Submitted Successfully!";
    responseMessage.style.color = "green";
  } catch (error) {
    responseMessage.textContent = "Submission Failed. Please try again.";
    responseMessage.style.color = "red";
  }
};
  
contactForm.addEventListener("submit", (event: Event) => {
  event.preventDefault(); 
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const contact = (document.getElementById("contact") as HTMLInputElement).value;
  const subject = (document.getElementById("subject") as HTMLInputElement).value;
  const message = (document.getElementById("message") as HTMLTextAreaElement).value;
  
  if (!name || !email || !contact || !subject || !message) {
    responseMessage.textContent = "Please fill in all the fields.";
    responseMessage.style.color = "red";
    return;
  }
  
 if (!validateEmail(email)) {
    responseMessage.textContent = "Please enter a valid email address.";
    responseMessage.style.color = "red";
    return;
  }
  
  if (!validateContact(contact)) {
    responseMessage.textContent = "Please enter a valid contact number(digits only).";
    responseMessage.style.color = "red";
    return;
  }
  const formData: ContactForm = { name, email, contact, subject, message };
  submitForm(formData);
});
  