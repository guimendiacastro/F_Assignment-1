
const tr = document.getElementById('update_form1');

tr.addEventListener('submit', async function (event) {
  // stop the form from being submitted
  try {
  event.preventDefault();
  // extract data from form
  const data = new FormData(tr);
  // prepare data for POST parameters
  const params = JSON.stringify(Object.fromEntries(data));
  await fetch('http://127.0.0.1:8090/timetable/new',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: params
  });

  //  could then do something with the response e.g. repopulate a list if already displayed on the client-side and/or check for error
  alert('The Game has been Added Successfully');
  // get rid of the data entered in the form
  tr.reset();
} catch (error) {
  alert('Server is Down try Again Later');
}
});
