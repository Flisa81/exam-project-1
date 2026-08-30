const API_BASE = "https://v2.api.noroff.dev";
const form = document.getElementById("create-post-form");
const token = localStorage.getItem("token");
const apiKey = localStorage.getItem("apiKey");
function safeJsonParse(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    return null;
  }
}

const user = safeJsonParse(localStorage.getItem("user")) || safeJsonParse(localStorage.getItem("profile")) || safeJsonParse(localStorage.getItem("userData"));

const mediaInput = document.getElementById("media");
const mediaSelect = document.getElementById("media-select");
const mediaPreview = document.getElementById("media-preview");
const messageBox = document.getElementById("form-message");


function normalizeImageUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  const imgurMatch = trimmed.match(/^https?:\/\/(?:www\.)?imgur\.com\/([a-zA-Z0-9]+)\/?$/);
  if (imgurMatch) {
    return `https://i.imgur.com/${imgurMatch[1]}.jpg`;
  }
  return trimmed;
}

// Redirect if not logged in
if (!token || !apiKey) {
  alert("You must be logged in to create a post.");
  window.location.href = "../account/login.html";
}

// Show image preview from typed URL
mediaInput.addEventListener("input", () => {
  const url = mediaInput.value.trim();
  if (url) {
    mediaPreview.src = url;
    mediaPreview.alt = "Preview image";
    mediaPreview.style.display = "block";
    mediaSelect.value = "";
  } else {
    mediaPreview.style.display = "none";
  }
});

// Show preview and update input from dropdown
mediaSelect.addEventListener("change", () => {
  const selected = mediaSelect.options[mediaSelect.selectedIndex];
  const url = selected.value;
  const alt = selected.dataset.alt || "Post image";

  mediaInput.value = url;

  if (url) {
    mediaPreview.src = url;
    mediaPreview.alt = alt;
    mediaPreview.style.display = "block";
  } else {
    mediaPreview.style.display = "none";
  }
});

// Submit post
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  messageBox.textContent = "";
  messageBox.classList.remove("success");

  const title = form.title.value.trim();
  const body = form.body.value.trim();
  const mediaUrl = normalizeImageUrl(mediaInput.value);
  const alt = mediaPreview.alt || title;

  if (!title || !body) {
    messageBox.textContent = "Title and body are required.";
    return;
  }

  const postData = { title, body };

  if (mediaUrl) {
    postData.media = {
      url: mediaUrl,
      alt: alt
    };
  }

  try {
    const res = await fetch(`${API_BASE}/social/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": apiKey
      },
      body: JSON.stringify(postData)
    });

    const data = await res.json();

    if (res.ok) {
      messageBox.textContent = "✅ Post created successfully!";
      messageBox.classList.add("success");

      // Clear form and image preview
      form.reset();
      mediaPreview.style.display = "none";
      mediaPreview.alt = "";
    } else {
      messageBox.textContent = data.errors?.[0]?.message || "Something went wrong.";
    }
  } catch (err) {
    console.error("Create post error:", err);
    messageBox.textContent = "Failed to create post. Please try again.";
  }
});
