const MAX_SIZE = 500 * 1024;

const dropzone = document.getElementById("dropzone");
const avatarWrapper = document.getElementById("avatar-wrapper");
const fileInput = document.getElementById("avatar-input");
const fileHint = document.getElementById("file-hint");
const fileHintIco = document.getElementById("file-hint-ico");
const avatarIcon = document.getElementById("avatar-icon");
const btnsWrapper = document.getElementById("btnsWrapper");
const removeBtn = document.getElementById("remove-btn");
const changeBtn = document.getElementById("change-btn");
const dropzoneText = document.getElementById("dropzone-text");

fileInput.addEventListener("change", uploadAvatar);

dropzone.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropzone.addEventListener("drop", function (e) {
  e.preventDefault();
  fileInput.files = e.dataTransfer.files;
  uploadAvatar();
});

removeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  removeAvatar();
});

changeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fileInput.click();
});

function uploadAvatar() {
  const file = fileInput.files[0];
  if (!file) return;

  if (file.size > MAX_SIZE) {
    showFileError();
    return;
  }

  let avatarLink = URL.createObjectURL(file);
  avatarWrapper.style.backgroundImage = `url(${avatarLink})`;
  avatarIcon.style.display = "none";
  fileHint.innerText = "";
  showBtns();
}

function showBtns() {
  btnsWrapper.style.display = "block";
  dropzoneText.style.display = "none";
}

function removeAvatar() {
  avatarWrapper.style.backgroundImage = "none";
  btnsWrapper.style.display = "none";
  avatarIcon.style.display = "block";
  dropzoneText.style.display = "block";
}

function showFileError() {
  fileHint.innerHTML =
    "<span class='ticket-form__hint-ico ticket-form__hint-ico--error'></span>File too large. Please upload a photo under 500KB.";
  fileHint.classList.add("ticket-form__hint--error");
}
