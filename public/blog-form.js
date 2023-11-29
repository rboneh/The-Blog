const form = document.getElementById('blog-form');
const submitButton = body .querySelector('button[type="submit"]');

submitButton.addEventListener('click', function(event) {
  event.preventDefault();

  const formData = new FormData(form);
  fetch('/submit-photography', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    console.log('Response data:', data);
  })
  .catch(error => {
    console.error('Error submitting form:', error);
  });
});