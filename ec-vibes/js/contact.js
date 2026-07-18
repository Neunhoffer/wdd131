const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

const nameGroup = document.getElementById('group-name');
const emailGroup = document.getElementById('group-email');
const subjectGroup = document.getElementById('group-subject');
const messageGroup = document.getElementById('group-message');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener('submit', e => {
  e.preventDefault();

  let formIsValid = true;

  const nameValue = nameInput.value.trim();
  if (nameValue.length < 2) {
    nameGroup.classList.add('error');
    formIsValid = false;
  } else {
    nameGroup.classList.remove('error');
  }

  const emailValue = emailInput.value.trim();
  if (!emailPattern.test(emailValue)) {
    emailGroup.classList.add('error');
    formIsValid = false;
  } else {
    emailGroup.classList.remove('error');
  }

  const subjectValue = subjectInput.value.trim();
  if (subjectValue === '') {
    subjectGroup.classList.add('error');
    formIsValid = false;
  } else {
    subjectGroup.classList.remove('error');
  }

  const messageValue = messageInput.value.trim();
  if (messageValue.length < 10) {
    messageGroup.classList.add('error');
    formIsValid = false;
  } else {
    messageGroup.classList.remove('error');
  }

  if (formIsValid) {
    form.reset();
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }
});
