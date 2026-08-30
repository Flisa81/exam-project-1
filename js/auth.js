const API_BASE = "https://v2.api.noroff.dev";
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const message = document.getElementById("message");

function showMessage(text, type = "error") {
  if (!message) {
    alert(text);
    return;
  }

  message.textContent = text;
  message.classList.toggle("success", type === "success");
}

function setLoading(form, isLoading) {
  const button = form?.querySelector("button[type='submit']");
  if (!button) return;
  button.disabled = isLoading;
  button.textContent = isLoading ? "Please wait..." : button.dataset.defaultText;
}

function redirectToHome() {
  const isSubPage = location.pathname.includes("/account/") || location.pathname.includes("/post/");
  window.location.href = isSubPage ? "../index.html" : "./index.html";
}

async function createApiKey(token) {
  const response = await fetch(`${API_BASE}/auth/create-api-key`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: "Needle Thread Blog" }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.errors?.[0]?.message || "Could not create API key.");
  }

  return data.data.key;
}

if (loginForm) {
  const submitButton = loginForm.querySelector("button[type='submit']");
  if (submitButton) submitButton.dataset.defaultText = submitButton.textContent;

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim().toLowerCase();
    const password = loginForm.password.value.trim();

    if (!email || !password) {
      showMessage("Please enter both email and password.");
      return;
    }

    setLoading(loginForm, true);
    showMessage("");

    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Login failed. Check your email and password.");
      }

      const user = data.data;
      const token = user.accessToken;
      const apiKey = await createApiKey(token);

      localStorage.setItem("token", token);
      localStorage.setItem("apiKey", apiKey);
      localStorage.setItem("user", JSON.stringify(user));

      showMessage("Login successful. Redirecting...", "success");
      setTimeout(redirectToHome, 500);
    } catch (err) {
      console.error("Login error:", err);
      showMessage(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(loginForm, false);
    }
  });
}

if (registerForm) {
  const submitButton = registerForm.querySelector("button[type='submit']");
  if (submitButton) submitButton.dataset.defaultText = submitButton.textContent;

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = registerForm.name.value.trim();
    const email = registerForm.email.value.trim().toLowerCase();
    const password = registerForm.password.value.trim();
    const confirmPassword = registerForm["confirm-password"].value.trim();

    if (password !== confirmPassword) {
      showMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      showMessage("Password must be at least 8 characters.");
      return;
    }

    setLoading(registerForm, true);
    showMessage("");

    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors?.[0]?.message || "Registration failed.");
      }

      showMessage("Registration successful. You can now log in.", "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 800);
    } catch (err) {
      console.error("Registration error:", err);
      showMessage(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(registerForm, false);
    }
  });
}
