const form = document.getElementById('myForm');
const email = document.getElementById('email');
const emailError = document.querySelector("#email + span.error");

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
      emailError.textContent = ""; 
      emailError.className = "error"; 
  } else {
      showError();
  }
});

form.addEventListener('submit', async (event) => {
  
  event.preventDefault();

  if (!email.validity.valid) {
      // If it isn't, we display an appropriate error message
      showError();
      return;
  }

  const subject = form.elements.name.value;
  const message = form.elements.text.value; 

  const response = await fetch('https://localhost:7298/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ Subject: subject, Email: email.value, Message: message }),

  }); 

  if (!response.ok) {
    console.error(`Server responded with ${response.status}`);
    return;
  }
  const data = await response.json();
  console.log('Server response:', data);
  alert(JSON.stringify(data))
});


function showError() {
  if (email.validity.valueMissing) {
      emailError.textContent = "You need to enter an e-mail address.";
  } else if (email.validity.typeMismatch) {
      emailError.textContent = "Entered value needs to be an e-mail address.";
  } else if (email.validity.tooShort) {
      emailError.textContent = `E-mail should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  emailError.className = "error active";
}