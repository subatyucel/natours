/*eslint-disable*/

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
      alert('Login successful');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } else throw new Error(data.message);
  } catch (e) {
    alert(e);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
