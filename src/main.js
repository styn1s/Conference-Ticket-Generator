const dropzone = document.getElementById("dropzone");
const avatarWrapper = document.getElementById("avatar-wrapper");
const fileInput = document.getElementById("avatar-input");
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
})

changeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fileInput.click();
})

function uploadAvatar() {
  let avatarLink = URL.createObjectURL(fileInput.files[0]);
  avatarWrapper.style.backgroundImage = `url(${avatarLink})`;
  avatarIcon.style.display = "none";
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