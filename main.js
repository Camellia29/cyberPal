const questions = {
  "How do I spot a phishing email?": "Look for urgency, spelling errors, and unfamiliar senders.",
  "What is a strong password?": "A strong password is long, includes letters, numbers, and symbols.",
  "What should I do if I get scammed?": "Don't panic. Contact your bank and report it to local authorities.",
  "How can I stay safe online?": "Use antivirus software, avoid unknown links, and keep your software updated."
};

const tips = [
  "Never share your passwords with anyone.",
  "Look out for spelling mistakes in emails — they often mean scams.",
  "Banks will never ask you for your PIN via phone or text.",
  "Hover over links before clicking to see where they really go."
];

const scenarios = [
  {
    situation: "You received an email saying your account will close today unless you verify information. What do you do?",
    options: ["Click on the link provided", "Delete the email immediately", "Reply to ask for more details"],
    correct: 1
  }
];

const quizzes = [
  {
    question: "What is a common sign of a phishing email?",
    choices: ["Perfect spelling", "Urgent tone", "Sent by a friend"],
    correct: 1,
    explanation: "Phishing emails often use urgency to trick you into acting quickly."
  }
];

function speak(text) {
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-GB';
    utter.rate = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

function showSection(name) {
  const content = document.getElementById("content");
  const title = document.getElementById("page-title");
  content.innerHTML = "";

  if (name === "home") {
    title.textContent = "Welcome back!";
    content.innerHTML = `
      <button onclick="showSection('chat')">Chat with Cyber Companion</button>
      <button onclick="showSection('scenarios')">Practice Scenarios</button>
      <button onclick="showSection('report')">Report Suspicious Activity</button>
      <button onclick="showSection('quiz')">Cyber Quiz</button>
    `;
  }

  if (name === "chat") {
    title.textContent = "Cyber Companion";
    const container = document.createElement("div");
    container.className = "card";
    container.innerHTML = "<p>How can I assist you?</p>";
    Object.keys(questions).forEach(q => {
      const btn = document.createElement("button");
      btn.textContent = q;
      btn.onclick = () => {
        container.innerHTML = `<p><strong>Q:</strong> ${q}</p><p><strong>A:</strong> ${questions[q]}</p>
        <button class="speak-btn" onclick="speak('${questions[q]}')">🔊 Hear it</button>`;
      };
      container.appendChild(btn);
    });
    content.appendChild(container);
  }

  if (name === "scenarios") {
    title.textContent = "Practice Scenarios";
    const sc = scenarios[0];
    const box = document.createElement("div");
    box.className = "card";
    box.innerHTML = `<p>${sc.situation}</p>`;
    sc.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => {
        const correct = i === sc.correct;
        box.innerHTML += `<p class="feedback"><strong>${correct ? "Correct!" : "Try again."}</strong><br>The correct action is to delete the email.</p>`;
      };
      box.appendChild(btn);
    });
    content.appendChild(box);
  }

  if (name === "report") {
    title.textContent = "Report Suspicious Activity";
    content.innerHTML = `
      <div class="card">
        <p>⚠️ <strong>Report now!</strong></p>
        <p>Describe the message or call you want to report:</p>
        <textarea id="report-text" placeholder="Type here..."></textarea>
        <button onclick="submitReport()">Submit Report</button>
        <div id="report-feedback"></div>
      </div>
    `;
  }

  if (name === "quiz") {
    title.textContent = "Cyber Quiz";
    const q = quizzes[0];
    const box = document.createElement("div");
    box.className = "card";
    box.innerHTML = `<p>${q.question}</p>`;
    q.choices.forEach((choice, i) => {
      const btn = document.createElement("button");
      btn.textContent = choice;
      btn.onclick = () => {
        const correct = i === q.correct;
        const result = correct ? "✅ Correct!" : "❌ Not quite...";
        const full = `${result} ${q.explanation}`;
        box.innerHTML += `<p class="feedback">${full}</p><button class="speak-btn" onclick="speak('${full}')">🔊 Hear it</button>`;
      };
      box.appendChild(btn);
    });
    content.appendChild(box);
  }
}

function submitReport() {
  const text = document.getElementById("report-text").value.trim();
  const feedback = document.getElementById("report-feedback");
  if (text === "") {
    feedback.innerHTML = "<p class='feedback'>⚠️ Please enter a description before submitting.</p>";
  } else {
    feedback.innerHTML = "<p class='feedback'>✅ Thank you! Your report was submitted. Cyber Companion recommends deleting the message and avoiding further contact.</p>";
  }
}

showSection("home");
