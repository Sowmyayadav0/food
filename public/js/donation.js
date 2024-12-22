document.getElementById('submit-btn').onclick = function () {
    const amount = document.querySelector('input[name="amount"]:checked')?.value || document.getElementById('other-amount').value;
    const plate = document.getElementById('plate').checked ? 'Yes' : 'No';
    const captcha = document.getElementById('captcha').value;

    if (captcha !== '12') {
        alert('Captcha is incorrect!');
        return;
    }

    document.getElementById('receipt-amount').textContent = amount;
    document.getElementById('receipt-plate').textContent = plate;
    document.getElementById('receipt').style.display = 'block';
};
