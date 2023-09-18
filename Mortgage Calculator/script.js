function calculateMonthlyPayment() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value);
    const interestRate = parseFloat(document.getElementById('interest-rate').value);
    const loanTerm = parseInt(document.getElementById('loan-term').value);
  
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    const monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
  
    document.getElementById('result').innerText = 'Monthly Payment: ' + monthlyPayment.toFixed(2);
}