const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');

function validateField(inputId, groupId, checkFn) {
  const value = document.getElementById(inputId).value.trim();
  const group = document.getElementById(groupId);
  const valid = checkFn(value);
  group.classList.toggle('error', !valid);
  return valid;
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const nameOk    = validateField('name',    'group-name',    v => v.length >= 2);
  const emailOk   = validateField('email',   'group-email',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));
  const subjectOk = validateField('subject', 'group-subject', v => v !== '');
  const messageOk = validateField('message', 'group-message', v => v.length >= 10);

  if (nameOk && emailOk && subjectOk && messageOk) {
    form.reset();
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }
});
