const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const form = document.querySelector('#reservation-form');
const formNote = document.querySelector('#form-note');

if (form) {
  const today = new Date().toISOString().split('T')[0];
  const dateInput = form.querySelector('input[name="date"]');
  if (dateInput) dateInput.min = today;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = 'Asztalfoglalás - Makka Burg';
    const body = [
      'Szia Makka Burg!',
      '',
      'Asztalt szeretnék foglalni az alábbi adatokkal:',
      `Név: ${data.get('name') || ''}`,
      `E-mail: ${data.get('email') || ''}`,
      `Telefonszám: ${data.get('phone') || ''}`,
      `Dátum: ${data.get('date') || ''}`,
      `Időpont: ${data.get('time') || ''}`,
      `Létszám: ${data.get('guests') || ''}`,
      `Üzenet: ${data.get('message') || '-'}`,
      '',
      'Köszönöm!'
    ].join('\n');

    const url = `mailto:info@makkaburg.hu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    if (formNote) {
      formNote.textContent = 'Megnyitottam az e-mail programot. Küldés előtt nézd át az adatokat.';
    }
  });
}
