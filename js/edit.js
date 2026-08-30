const API_BASE = "https://v2.api.noroff.dev";
const token = localStorage.getItem("token");
const apiKey = localStorage.getItem("apiKey");
const user = JSON.parse(localStorage.getItem("user"));

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

const form = document.getElementById("edit-post-form");
const mediaInput = document.getElementById("media");
const mediaSelect = document.getElementById("media-select");
const preview = document.getElementById("media-preview");
const messageBox = document.getElementById("form-message");
const deleteButton = document.getElementById("delete-post");

if (!token || !apiKey || !user) {
  alert("You must be logged in to edit a post.");
  window.location.href = "../account/login.html";
}

if (!postId) {
  form.innerHTML = "<p>Missing post ID.</p>";
}

function showMessage(text, success = false) {
  messageBox.textContent = text;
  messageBox.classList.toggle("success", success);
}

function getHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "X-Noroff-API-Key": apiKey,
  };
}

mediaInput?.addEventListener("input", () => {
  const url = mediaInput.value.trim();
  preview.src = url;
  preview.style.display = url ? "block" : "none";
  if (url) mediaSelect.value = "";
});

mediaSelect?.addEventListener("change", () => {
  const url = mediaSelect.value;
  mediaInput.value = url;
  preview.src = url;
  preview.alt = mediaSelect.options[mediaSelect.selectedIndex]?.textContent || "Post image";
  preview.style.display = url ? "block" : "none";
});

async function loadPostToEdit() {
  try {
    const res = await fetch(`${API_BASE}/social/posts/${postId}?_author=true`);
    const { data: post } = await res.json();

    if (!res.ok || !post) throw new Error("Post not found.");

    if (post.author?.name !== user.name) {
      alert("You are not the owner of this post.");
      window.location.href = "../index.html";
      return;
    }

    form.title.value = post.title || "";
    form.body.value = post.body || "";
    mediaInput.value = post.media?.url || "";

    if (post.media?.url) {
      preview.src = post.media.url;
      preview.alt = post.media.alt || post.title || "Post image";
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
    }
  } catch (err) {
    console.error("Error loading post:", err);
    form.innerHTML = `<p>Could not load the post. ${err.message}</p>`;
  }
}

form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  showMessage("");

  const title = form.title.value.trim();
  const body = form.body.value.trim();
  const mediaUrl = mediaInput.value.trim();

  if (!title || !body) {
    showMessage("Title and body are required.");
    return;
  }

  const postData = { title, body };

  if (mediaUrl) {
    postData.media = {
      url: mediaUrl,
      alt: preview.alt || title,
    };
  }

  try {
    const res = await fetch(`${API_BASE}/social/posts/${postId}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(postData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.errors?.[0]?.message || "Could not update post.");
    }

    showMessage("Post updated successfully.", true);
  } catch (err) {
    console.error("Update error:", err);
    showMessage(err.message || "Failed to update post.");
  }
});

deleteButton?.addEventListener("click", async () => {
  const confirmed = confirm("Are you sure you want to delete this post?");
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_BASE}/social/posts/${postId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.errors?.[0]?.message || "Could not delete post.");
    }

    alert("Post deleted successfully.");
    window.location.href = "../index.html";
  } catch (err) {
    console.error("Delete error:", err);
    showMessage(err.message || "Failed to delete post.");
  }
});

document.addEventListener("DOMContentLoaded", loadPostToEdit);
