
function loadView(view) {
  const content = document.getElementById('content');
  document.getElementById('title').textContent = {
  }[view];

  if (view === 'home') {
    content.innerHTML = `
      <header>
      <h1>Welcome back!</h1>
      <h2>How can I assist you today?</h2>
      </header>
      ${hCard("🧠", "Scenario Quiz", "Answer questions about internet safety", "loadView('quiz')", "#dcd4f7")}
      ${hCard("📘", "Recipe Card", "Learn online safety steps", "loadView('recipe')", "#ffe0c7")}
      ${hCard("🤖", "Ask a Friend", "Chat with a virtual assistant", "loadView('ask')", "#c7f0ff")}
      ${hCard("📞", "Emergency Contact", "Add someone to call in urgent situations", "loadView('emergency')", "#d4f7ec")}
      ${hCard("💡", "Reminder", "Don’t click links in emails from strangers", "loadView('reminder')", "#e0e0f0")}
    `;
  } else if (view === 'quiz') {
    content.innerHTML = `
      <header>
      <h1>Scenario Quiz</h1>
      </header>
      <div class="card">
        <p>You receive an email from your 'bank' asking to confirm your account. What do you do?</p>
        <button onclick="feedback(true)">Call the bank directly</button>
        <button onclick="feedback(false)">Click the link in the email</button>
        <div id="quiz-feedback"></div>
      </div>`;
  } else if (view === 'recipe') {
    content.innerHTML = `
      <header>
      <h1>Safety Tips</h1>
      </header>
      <div class="card">
        <h3>How to stay safe online</h3>
        <p>1. Use strong passwords<br>2. Don’t share personal info<br>3. Ask someone if unsure</p>
      </div>`;
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
      <div class="tCard">
        <p>💡 Don’t click on links from unknown emails.</p>
      </div>`;
  } else if (view === 'settings') {
    content.innerHTML = `
      <header>
      <h1>Settings</h1>
      </header>
      <div class="card">
        <p>Adjust text size:</p>
        <button onclick="document.body.style.fontSize='16px'">Small</button>
        <button onclick="document.body.style.fontSize='18px'">Medium</button>
        <button onclick="document.body.style.fontSize='22px'">Large</button>
        <button onclick="loadView('emergency')">Emergency Contact</button>
      </div>`;
  } else if (view === 'emergency') {
    const stored = JSON.parse(localStorage.getItem('emergencyContact') || '{}');
    content.innerHTML = `
      <header>
      <h1>Emergency Contact</h1>
      </header>
      <div class="card">
        <p>Enter your emergency contact details below:</p>
        <label>Name:</label>
        <input type="text" id="emergencyName" value="${stored.name || ''}" placeholder="e.g., Jane Doe">
        <label>Phone:</label>
        <input type="text" id="emergencyPhone" value="${stored.phone || ''}" placeholder="e.g., 555-123-4567">
        <button onclick="saveEmergencyContact()">Save</button>
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
  document.getElementById("quiz-feedback").textContent =
    correct ? "✅ That's right!" : "❌ That could be dangerous!";
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

function saveEmergencyContact() {
  const name = document.getElementById("emergencyName").value;
  const phone = document.getElementById("emergencyPhone").value;
  localStorage.setItem("emergencyContact", JSON.stringify({ name, phone }));
  document.getElementById("savedMsg").textContent = "✅ Saved successfully!";
}

function setActiveTab(button) {
  document.querySelectorAll('.tab-bar button').forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

window.onload = () => loadView('home');
