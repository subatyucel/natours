/*eslint-disable*/

const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');

const login = async (email, password) => {
  try {
    const res = await fetch('http://localhost:3000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.status === 'success') {
      showAlert('success', 'Login successful');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } else {
      throw new Error(data.message);
    }
  } catch (e) {
    showAlert('error', e.message);
  }
};

const logout = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/v1/users/logout');
    const data = await res.json();

    if (data.status === 'success') location.reload(true);
    else throw new Error(data.message);
  } catch (e) {
    showAlert('error', e.message);
  }
};

//Type = success || error
const showAlert = (type, message) => {
  hideAlert();
  const HTML = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', HTML);
  window.setTimeout(hideAlert, 5000);
};

const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.remove();
};

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
