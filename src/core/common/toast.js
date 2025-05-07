export class Toast {
  // user render in the constructor of the page and call the showToast method every time you want to show a toast
  render() {
    let innerHTML = `
    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
  <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header">
      <strong class="me-auto">Notification</strong>
      <small>Just now</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body">
      This is your toast notification message!
    </div>
  </div>
</div>`
    document.getElementById("toast").innerHTML = innerHTML;
  }
  showToast(message, title = 'Notification') {
    // Get the toast element
    const toastEl = document.getElementById('liveToast');

    // Set the toast content
    toastEl.querySelector('.toast-body').textContent = message;
    toastEl.querySelector('.me-auto').textContent = title;

    // Create a toast instance and show it
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}