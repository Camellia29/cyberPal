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
  explanation: "Always check the sender's address and never click on links in suspicious emails. Plus, it is requesting an urgent."
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
      <div class='fontsize' id="font-size-bar" style="text-align:center; margin: 10px 0;">
      <button onclick="setFontSize('font-small')">A</button>
      <button onclick="setFontSize('font-medium')">A+</button>
      <button onclick="setFontSize('font-large')">A++</button>
      </div>
      </header>
      ${hCard("🧠", "Scenario Quiz", "Answer questions about internet safety", "loadView('quiz')", "#dcd4f7")}
      ${hCard("📜", "Recipe Card", "Learn online safety steps", "loadView('recipe')", "#ffe0c7")}
      ${hCard("🤖", "Ask a Friend", "Chat with a virtual assistant", "loadView('ask')", "#c7f0ff")}
      ${hCard("📞", "Trusted Contact", "Add someone you trust to call in urgent situations", "loadView('contact')", "#d4f7ec")}
      ${hCard("💡", "Reminder", "Don't click links in emails from strangers", "loadView('reminder')", "#e0e0f0")}
    `;
  } else if (view === 'quiz') {

    renderQuizScenario(currentScenarioIndex);

  } else if (view === 'recipe') {
    content.innerHTML = `
      <header>
      <h1>Safety Tips</h1>
      </header>
        <div class="tips-container">
          <button class="tip-button" aria-expanded="false" aria-controls="tip1-body" id="tip1-btn">
            <span class="tip-icon">🛑</span> Stop and Think
          </button>
          <div class="tip-body" id="tip1-body" hidden>
            If you get a message or call asking for urgent action: <strong>pause</strong>. Scammers want you to rush.
          </div>

          <button class="tip-button" aria-expanded="false" aria-controls="tip2-body" id="tip2-btn">
            <span class="tip-icon">🙋‍♀️</span> Ask for Help
          </button>
          <div class="tip-body" id="tip2-body" hidden>
            Not sure? Show it to a friend or family member before doing anything.
          </div>

          <button class="tip-button" aria-expanded="false" aria-controls="tip3-body" id="tip3-btn">
            <span class="tip-icon">🔒</span> Keep Details Private
          </button>
          <div class="tip-body" id="tip3-body" hidden>
            Real banks <strong>never</strong> ask for your password or PIN by phone or email.
          </div>
          
          <button class="tip-button" aria-expanded="false" aria-controls="tip4-body" id="tip4-btn">
            <span class="tip-icon">📞</span> Verify Official Contacts
          </button>
          <div class="tip-body" id="tip4-body" hidden>
            Always use official phone numbers or websites to contact your bank or service provider to check suspicious messages.
          </div>

          <button class="tip-button" aria-expanded="false" aria-controls="tip5-body" id="tip5-btn">
            <span class="tip-icon">🤔</span> Trust Your Instincts
          </button>
          <div class="tip-body" id="tip5-body" hidden>
            If something feels off or too good to be true, take a moment to think it through. Scammers often create a sense of urgency.
          </div>
        </div>`;
          //   <div class="tip-example">
          //   <strong>Example:</strong><br>
          //   You get a call saying your internet will be cut off unless you pay right now. <br>
          //   <b> what should you do?</b><br>
          //   Hang up nd check with your real provider using their number from your bill or website.
          // </div>
        bindTipButtons();
  } else if (view === 'ask') {
    content.innerHTML = `
      <header>
      <h1>Ask a Friend</h1>
      </header>
      <div class="card">
        <p>Type your question:</p>
        <input type="text" id="question" placeholder="e.g., What is phishing?"/>
        <button onclick="askFriend()">Ask</button>
        <p id="answer"></p>
      </div>`;
  } else if (view === 'reminder') {
    content.innerHTML = `
      <header>
      <h1>Today's Tip</h1>
      </header>
      <div class="card">
        <p>💡</p><p> Don't click on links from unknown emails.</p> 
        <button class="speak-btn" onclick="speakText(this)">🔊 Read Aloud</button>
      </div>`;
  } else if (view === 'settings') {
    content.innerHTML = `
      <header>
      <h1>Settings</h1>
      </header>
      <div class="card">
        <p>Adjust text size:</p>
        <button onclick="setFontSize('font-small')">Small</button>
        <button onclick="setFontSize('font-medium')">Medium</button>
        <button onclick="setFontSize('font-large')">Large</button>
        <p>Other settings:</p>
        <button onclick="loadView('contact')">Trusted Contact</button>
      </div>`;
  } else if (view === 'contact') {
    const stored = JSON.parse(localStorage.getItem('trustedContact') || '{}');
    content.innerHTML = `
      <header>
      <h1>Trusted Contact</h1>
      </header>
      <div class="card">
        <p>Enter your trusted contact details below:</p>
        <label>Name:</label>
        <input type="text" id="trustedName" value="${stored.name || ''}" placeholder="e.g., Jane Doe">
        <label>Phone:</label>
        <input type="text" id="trustedPhone" value="${stored.phone || ''}" placeholder="e.g., 555-123-4567">
        <button onclick="saveTrustedContact()">Save</button>
        <p id="savedMsg"></p>
      </div>`;
  }
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


function askFriend() {
  const q = document.getElementById("question").value.toLowerCase();
  const a = document.getElementById("answer");
  if (q.includes("phishing")) {
    a.textContent = "Phishing is a trick to steal your info. Don't click unknown links.";
  } else {
    a.textContent = "Good question! Always ask someone you trust if unsure.";
  }
}

function saveTrustedContact() {
  const name = document.getElementById("trustedName").value;
  const phone = document.getElementById("trustedPhone").value;
  localStorage.setItem("trustedContact", JSON.stringify({ name, phone }));
  document.getElementById("savedMsg").textContent = "✅ Saved successfully!";
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
    isSpeakingScenario = false;
    return;
  }
  const question = document.querySelector('.quiz-question');
  if (question) {
    const utter = new SpeechSynthesisUtterance(question.textContent);
    utter.lang = 'en-UK';
    utter.onstart = () => { isSpeakingScenario = true; };
    utter.onend = () => { isSpeakingScenario = false; };
    speechSynthesis.speak(utter);
  }
}

// Quiz scenarios functions

function renderQuizScenario(index) {
  const content = document.getElementById('content');
  const scenario = quizScenarios[index];
  
  if (!scenario) {
    content.innerHTML = `
      <header><h1>Scenario Quiz Completed</h1></header>
      <div class="card">
        <p>Great job completing the quiz!</p>
        <button onclick="loadView('home')">Return Home</button>
      </div>`;
    return;
  }

  content.innerHTML = `
    <header><h1>Scenario Quiz</h1></header>
    <div class="card">
      <p class="quiz-question">${scenario.question}</p>
      ${scenario.options.map((opt, i) => `
        <button onclick="handleAnswer(${index}, ${i})">${opt.text}</button>
      `).join('')}
      <br><button class="speak-btn" onclick="speakCurrentScenario()">🔊 Read Aloud</button>
      <div id="quiz-feedback" style="margin-top:1em;"></div>
      <div style="margin-top:1em;">
        <button onclick="prevScenario()" ${index <= 0 ? "disabled" : ""}>Previous</button>
        <button onclick="nextScenario()" ${index >= quizScenarios.length - 1 ? "disabled" : ""}>Next</button>
      </div>
    </div>`;
}

function handleAnswer(scenarioIndex, optionIndex) {
  const scenario = quizScenarios[scenarioIndex];
  const option = scenario.options[optionIndex];
  const feedbackEl = document.getElementById('quiz-feedback');

  if (option.correct) {
    feedbackEl.innerHTML = `
      ✅ Great job! That was the safe choice.<br><em>${scenario.explanation}</em>`;
  } else {
    feedbackEl.innerHTML = `
      ⚠️ That could be risky. Here's why:<br><em>${scenario.explanation}</em>`;
  }
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
        if (tipBody) tipBody.hidden = false;
      }
    });
  });
}


