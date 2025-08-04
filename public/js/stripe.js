/*eslint-disable*/

const stripe = Stripe(
  'pk_test_51Rs2LjRwiZLOWrFb3jpFIAufFVpEvHqBjZSC1qGJILWfzURJ9lc7V12YvxeRQi4HErCaCOqhOlX8QMmF82jgAM4E006FPVY9Ty',
);

const bookBtn = document.getElementById('book-tour');
const bookTour = async (tourId) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    const data = await res.json();
    console.log(data);

    await stripe.redirectToCheckout({
      sessionId: data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
