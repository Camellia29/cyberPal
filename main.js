const questions = {
  "How do I spot a phishing email?": "Look for urgency, spelling errors, and unfamiliar senders.",
  "What is a strong password?": "A strong password is long, includes letters, numbers, and symbols.",
  "What should I do if I get scammed?": "Don't panic. Contact your bank and report it to local authorities.",
  "How can I stay safe online?": "Use antivirus software, avoid unknown links, and keep your software updated."
};

function respond() {
  const options = Object.keys(questions);
  const chatArea = document.getElementById("response");

  chatArea.innerHTML = "<strong>Select a question:</strong><br>";
  options.forEach(q => {
    const btn = document.createElement("button");
    btn.textContent = q;
    btn.style.display = "block";
    btn.style.margin = "10px auto";
    btn.onclick = () => {
      chatArea.innerHTML = `<p><strong>Question:</strong> ${q}</p><p><strong>Answer:</strong> ${questions[q]}</p>`;
    };
    chatArea.appendChild(btn);
  });
}
