const typeSelect = document.getElementById('type');
const conditionalField = document.getElementById('conditional-field');
const conditionalLabel = document.getElementById('conditional-label');
const conditionalInput = document.getElementById('conditional-input');

typeSelect.addEventListener('change', () => {
  const val = typeSelect.value;

  if (val === 'student') {
    conditionalField.classList.remove('hidden');
    conditionalLabel.textContent = 'Student I#';
    conditionalInput.placeholder = '';
    conditionalInput.value = '';
  } else if (val === 'guest') {
    conditionalField.classList.remove('hidden');
    conditionalLabel.textContent = 'Access Code';
    conditionalInput.placeholder = '';
    conditionalInput.value = '';
  } else {
    conditionalField.classList.add('hidden');
    conditionalInput.value = '';
  }
});

document.getElementById('event-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const eventDate = document.getElementById('event-date').value;
  const type = typeSelect.value;
  const code = conditionalInput.value.trim();

  const errorBox = document.getElementById('error-box');
  const errorMsg = document.getElementById('error-msg');
  const ticket = document.getElementById('ticket');

  const showError = (msg) => {
    errorMsg.textContent = msg;
    errorBox.classList.remove('hidden');
    ticket.classList.add('hidden');
  };

  errorBox.classList.add('hidden');

  if (!firstName) return showError('First name is required.');
  if (!lastName) return showError('Last name is required.');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return showError('A valid email is required.');
  if (!eventDate) return showError('Event date is required.');

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const chosen = new Date(eventDate + 'T00:00:00');
  if (chosen <= today) return showError('Event date must be later than today.');

  if (!type) return showError('Please choose a type.');

  if (type === 'student') {
    if (!/^\d{9}$/.test(code)) return showError('Student I# must be 9 digits.');
  } else if (type === 'guest') {
    if (code !== 'EVENT131') return showError('Access Code must be EVENT131.');
  }

  document.getElementById('ticket-name').textContent = firstName + ' ' + lastName;
  document.getElementById('ticket-type').textContent = type;
  document.getElementById('ticket-date').textContent = eventDate;

  ticket.classList.remove('hidden');
});
