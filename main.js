const quizScenarios = [
  {
    id: 1,
    question: "You receive an email from your bank asking you to confirm your account details via a link. What should you do?",
    options: [
      { text: "Click the link and enter details", correct: false },
      { text: "Call the bank directly using a phone number you know", correct: true },
      { text: "Reply to the email asking for more info", correct: false }
    ],
    explanation: "Banks never ask for personal info via email. Calling them directly ensures your information stays safe."
  },
  {
  id: 2,
  question: `<img src="scam_examples/amazon.png" alt="Screenshot of amazon scam email" style="max-width:100%;height:auto;">
  <br> Is this message a scam or genuine?`,
  options: [
    { text: "It's a scam", correct: true },
    { text: "It's a genuine message", correct: false }
  ],
  explanation: "This message is a scam. Genuine companies like Amazon never ask you to verify your account this way. Don't click the link or enter any information. Delete the email and, if in doubt, always access your account by going directly to amazon.co.uk (or .com) in your browser."
  },
  {
    id: 3,
    question: "You get a phone call saying you won a prize but must pay a fee first. What is your best response?",
    options: [
      { text: "Pay the fee to claim the prize", correct: false },
      { text: "Hang up and do not give any personal or payment info", correct: true },
      { text: "Ask for caller's name and address", correct: false }
    ],
    explanation: "Legitimate prizes don't require payment upfront. Scammers use urgency to trick you. Always be cautious."
  },
  {
  id: 4,
  question: `<img src="scam_examples/HSBC_scam.png" alt="Screenshot of HSBC scam message" style="max-width:100%;height:auto;">
  <br> Is this message a scam or genuine?`,
  options: [
    { text: "It's a scam", correct: true },
    { text: "It's a genuine message", correct: false }
  ],
  explanation: "The link and urgent request to visit it are red flags. Contact your bank."
},
];

let currentScenarioIndex = 0;


function loadView(view) {
  speechSynthesis.cancel(); // Stop any speech when changing views
  const content = document.getElementById('content');

  if (view === 'home') {
    content.innerHTML = `
      <header>
      <h1>Welcome back!</h1>
      <h2>How can I assist you today?</h2>
      </header>
      ${hCard("<big>🔠</big>", "Font Size", "Increase font size to your liking", "loadView('fontSize')", "#dcd4f7")}
      ${hCard("<big>🧠</big>", "Scenario Quiz", "Answer questions about internet safety", "loadView('quiz')", "#ffe0c7")}
      ${hCard("<big>🗣️</big>", "General Advice", "Learn online safety steps", "loadView('advice')", "#c7f0ff")}
      ${hCard("<big>📞</big>", "Trusted Contact", "Add someone you trust to call in case of emergency", "loadView('contact')", "#d4f7ec")}
      ${hCard("<big>💡</big>", "Daily Tips", "Read today's tip", "loadView('reminder')", "#e0e0f0")}
    `;
  } else if (view === 'quiz') {

    renderQuizScenario(currentScenarioIndex);

  } else if (view === 'advice') {
    content.innerHTML = getBackButtonHtml() + `
      <header>
      <h1>🗣️ Security Tips</h1>
      </header>
        <div class="tips-container">
          <button class="tip-button" aria-expanded="false" aria-controls="tip1-body" id="tip1-btn">
            <span class="tip-icon">🛑</span> Stop and Think <div class="hCard-arrow">›</div>
          </button>
          <div class="tip-body" id="tip1-body" hidden>
            If you get a message or call asking for urgent action: <strong>pause</strong>. Scammers want you to rush.
          </div>

          <button class="tip-button" aria-expanded="false" aria-controls="tip2-body" id="tip2-btn">
            <span class="tip-icon">🙋‍♀️</span> Ask for Help <div class="hCard-arrow">›</div>
          </button>
          <div class="tip-body" id="tip2-body" hidden>
            Not sure? Show it to a friend or family member <strong>before</strong> doing anything.
          </div>

          <button class="tip-button" aria-expanded="false" aria-controls="tip3-body" id="tip3-btn">
            <span class="tip-icon">🔒</span> Keep Details Private <div class="hCard-arrow">›</div>
          </button>
          <div class="tip-body" id="tip3-body" hidden>
            Real banks <strong>never</strong> ask for your password or PIN by phone or email.
          </div>
          
          <button class="tip-button" aria-expanded="false" aria-controls="tip4-body" id="tip4-btn">
            <span class="tip-icon">📞</span> Verify Official Contacts <div class="hCard-arrow">›</div>
          </button>
          <div class="tip-body" id="tip4-body" hidden>
            <strong>Always</strong> use official phone numbers or websites to contact your bank or service provider to check suspicious messages.
          </div>

          <button class="tip-button" aria-expanded="false" aria-controls="tip5-body" id="tip5-btn">
            <span class="tip-icon">🤔</span> Trust Your Instincts <div class="hCard-arrow">›</div>
          </button>
          <div class="tip-body" id="tip5-body" hidden>
            If something feels off or too good to be true, <strong>take a moment</strong> to think it through. Scammers often create a sense of urgency.
          </div>
        </div>`;
        bindTipButtons();
  } else if (view === 'reminder') {
    content.innerHTML = getBackButtonHtml() +`
    <header>
      <h1>💡 Today's Tip</h1>
    </header>
    <div class="card">
      <p><big>☞</big> ${getDailyTip()}</p>
      <button class="speak-btn" onclick="speakText(this)">🔊 Read Aloud</button>
    </div>
  `;
  } else if (view === 'fontSize') {
    content.innerHTML = getBackButtonHtml() + `
      <header>
      <h1>Settings</h1>
      </header>
      <div class="card">
        <p>Adjust text size:</p>
        <button onclick="setFontSize('font-small')">A</button>
        <button onclick="setFontSize('font-medium')">A+</button>
        <button onclick="setFontSize('font-large')">A++</button>
        <p>Other settings:</p>
        <button onclick="loadView('contact')">Trusted Contact</button>
      </div>`;
  } else if (view === 'contact') {
    const stored = JSON.parse(localStorage.getItem('trustedContact') || '{}');

    let savedContactHTML = '';
    if (stored.name && stored.phone) {
      savedContactHTML = `
        <div style="background:#e8f5e9; padding:0.75em; border-radius:8px; margin-bottom:1em;">
          <strong>Saved Contact:</strong><br>
          ${stored.name} : ${stored.phone}
        </div>`;
    }

    content.innerHTML = getBackButtonHtml() + `
      <header>
      <h1>📞 Trusted Contact</h1>
      </header>
      <div class="card">
        ${savedContactHTML}
        <p>Enter your trusted contact details below:</p>
        <label>Name:</label>
        <input type="text" id="trustedName" value="${''}" placeholder="e.g., Jane Doe">
        <label>Phone:</label>
        <input type="text" id="trustedPhone" value="${''}" placeholder="e.g., +44 808 157 0192">
        <button onclick="saveTrustedContact()">Save</button>
        <p id="savedMsg" style="margin-top:0.75em;"></p>
      </div>`;
    }
}

function getBackButtonHtml() {
  return `
  <button id="back-btn" onclick="loadView('home')" 
    aria-label="Go back to home">
    ←
  </button>`;
}

function hCard(icon, title, desc, action, bg) {
  return `
    <div class="hCard" style="background:${bg}">
      <button class="hCard-button" onclick="${action}">
        <div class="hCard-left">
          <div class="hCard-title">${icon} ${title}</div>
          <div class="hCard-desc">${desc}</div>
        </div>
      </button>
      <div class="hCard-arrow">›</div>
    </div>`;
}

function feedback(correct) {
  const feedbackEl = document.getElementById("quiz-feedback");
  if (correct) {
    feedbackEl.innerHTML = `
      <br>✅ Great job! That was the safe choice.
    `;
  } else {
    feedbackEl.innerHTML = `
      <br>⚠️ That's a common scam tactic but don't worry, now you know how to spot it next time.
      <br>Remember: always verify with your bank or trusted contact if unsure.
    `;
  }
}

const dailyTips = [
  "Don't click on links from unknown emails.",
  "Always check the sender's address before acting.",
  "Banks will never ask for your PIN by email or phone.",
  "If something feels urgent or off, take a moment to pause.",
  "Use a separate email for signing up to new services.",
  "Never share personal details unless you're sure who's asking."
];

function getDailyTip() {
  // Use date to select tip of the day (rotates by day)
  const today = new Date();
  const tipIndex = today.getDate() % dailyTips.length; // Simple rotation
  return dailyTips[tipIndex];
}

function saveTrustedContact() {
  const nameEl = document.getElementById("trustedName");
  const phoneEl = document.getElementById("trustedPhone");
  const msgEl = document.getElementById("savedMsg");

  const name = nameEl.value.trim();
  const phone = phoneEl.value.trim();

  const phonePattern = /^(?:0|\+?44)(?:\d\s?){9,10}$/;

  msgEl.style.color = "red";

  if (!name) {
    msgEl.textContent = "❌ Please enter a name.";
    return;
  }
  if (!phone) {
    msgEl.textContent = "❌ Please enter a phone number.";
    return;
  }
  if (!phonePattern.test(phone)) {
    msgEl.textContent = "❌ Please enter a Uk phone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192.";
    return;
  }

  // If all checks pass — save and confirm
  localStorage.setItem("trustedContact", JSON.stringify({ name, phone }));
  msgEl.style.color = "green";
  msgEl.textContent = "✅ Trusted contact saved successfully!";
}


function setActiveTab(button) {
  document.querySelectorAll('.tab-bar button').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

window.onload = () => loadView('home');

function setFontSize(className) {
  document.documentElement.classList.remove('font-small', 'font-medium', 'font-large');
  document.documentElement.classList.add(className);
}

let currentUtterance = null;

function speakText(button) {
  if (currentUtterance) {
    speechSynthesis.cancel();
    currentUtterance = null;
    return;
  }
  const prev = button.previousElementSibling;
  const text = prev ? prev.textContent : "";
  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = "en-UK";
  speechSynthesis.speak(currentUtterance);
}

// Add a button to read the current scenario aloud
// This will be used in the quiz view to read the question aloud

let isSpeakingScenario = false;

function speakCurrentScenario() {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    return;
  }
  const scenario = quizScenarios[currentScenarioIndex];
  if (scenario) {
    // Combine question and options for a full read-out
    let utteranceText = scenario.question.replace(/<[^>]+>/g, ""); // Strip HTML
    scenario.options.forEach((opt, idx) => {
      const letter = String.fromCharCode(65 + idx); // A, B, C, ...
      utteranceText += ` Option ${letter}: ${opt.text}.`;
    });
    const utter = new SpeechSynthesisUtterance(utteranceText);
    utter.lang = 'en-UK';
    speechSynthesis.speak(utter);
  }
}

// Quiz scenarios functions

function renderQuizScenario(index) {
  const content = document.getElementById('content');
  const scenario = quizScenarios[index];
  if (!scenario) {
    content.innerHTML = getBackButtonHtml() + `
    <p>No scenario found.</p>`;
    return;
  }

  content.innerHTML = getBackButtonHtml() + `
    <header><h1>🧠 Scenario Quiz</h1></header>
    <div class="card">
      <p class="quiz-question">${scenario.question}</p>
      ${scenario.options.map((opt, i) => `
        <button onclick="handleAnswer(${index}, ${i})">${opt.text}</button>
      `).join('')}
      <br><button class="speak-btn" onclick="speakCurrentScenario()">🔊 Read Aloud</button>
      <div id="quiz-feedback" style="margin-top:1em;"></div>
        <div style="margin-top:1em; text-align: center;", class="arrow-nav">
        <button class="arrow-btn prev-arrow" onclick="prevScenario()" ${index <= 0 ? "disabled" : ""}>&#8592;</button>
        <button class="arrow-btn next-arrow" onclick="nextScenario()" ${index >= quizScenarios.length - 1 ? "disabled" : ""}>&#8594;</button>
        </div>
    </div>`;
}


function handleAnswer(scenarioIndex, optionIndex) {
  const scenario = quizScenarios[scenarioIndex];
  const option = scenario.options[optionIndex];
  const feedbackEl = document.getElementById('quiz-feedback');
  let feedbackText;

  if (option.correct) {
    feedbackText = `✅ Great job! That was the safe choice. ${scenario.explanation}`;
  } else {
    feedbackText = `⚠️ That could be risky. Here's why: ${scenario.explanation}`;
  }
  feedbackEl.innerHTML = feedbackText;

   // Scroll feedback into view
  feedbackEl.scrollIntoView({ behavior: "smooth", block: "start" });

  // Read out the feedback (after ensuring any previous synth is canceled)
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(feedbackText.replace(/<[^>]+>/g, ""));
  utter.lang = 'en-UK';
  speechSynthesis.speak(utter);
}

function prevScenario() {
  if (currentScenarioIndex > 0) {
    currentScenarioIndex--;
    renderQuizScenario(currentScenarioIndex);
  }
}

function nextScenario() {
  if (currentScenarioIndex < quizScenarios.length - 1) {
    currentScenarioIndex++;
    renderQuizScenario(currentScenarioIndex);
  }
}

// Recipe card functions
function bindTipButtons() {
  const buttons = document.querySelectorAll('.tip-button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';

      // Close all tips
      buttons.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        const body = document.getElementById(btn.getAttribute('aria-controls'));
        if (body) body.hidden = true;
      });

      // Open the clicked tip if it was closed
      if (!expanded) {
        button.setAttribute('aria-expanded', 'true');
        const tipBody = document.getElementById(button.getAttribute('aria-controls'));
        if (tipBody) {
          tipBody.hidden = false;

          // 🗣 Speak the title + body content
          speechSynthesis.cancel(); // stop any ongoing speech
          const titleText = button.innerText.replace('›', '').trim(); // button label without arrow
          const bodyText = tipBody.innerText.trim();
          const utterText = `${titleText}. ${bodyText}`;
          const utter = new SpeechSynthesisUtterance(utterText);
          utter.lang = 'en-UK';
          speechSynthesis.speak(utter);
        }
      } else {
        // If closing the same tip, stop speech
        speechSynthesis.cancel();
      }
    });
  });
}



