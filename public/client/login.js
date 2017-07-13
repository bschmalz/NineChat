const submitUser = (event, isSignup) => {
  event.preventDefault();
  const type = isSignup ? 'signup' : 'login';
  const username = document.getElementById(`${type}-username`).value;
  const password = document.getElementById(`${type}-password`).value;

  const xhr = new XMLHttpRequest;
  xhr.open('POST', `http://localhost:3000/${type}`);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ username, password }));
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      console.log(xhr.response);
      window.location.replace('http://localhost:3000/');
    }
  }
};

const initSignupModal = () => {
  const modal = document.getElementById('signup-modal');
  const signupLink = document.getElementById('signup-link');
  const closeButton = document.getElementById('close-button');

  signupLink.onclick = () => modal.style.display = 'block';
  closeButton.onclick = () => modal.style.display = 'none';

  window.onclick = (event) => {
    if (event.target === modal) modal.style.display = 'none';
  };
};

const onDocumentReady = () => {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');

  loginForm.addEventListener('submit', event => submitUser(event, false));
  signupForm.addEventListener('submit', event => submitUser(event, true));

  initSignupModal();
};

document.onreadystatechange = () => {
  if (document.readyState === 'complete') onDocumentReady();
};
