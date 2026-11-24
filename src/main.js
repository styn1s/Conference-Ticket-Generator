const MAX_SIZE = 50000 * 1024;
const TICKET_NUM_SIZE = 6;
const START_DATE = Temporal.PlainDate.from("2026-12-01");
const END_DATE = Temporal.PlainDate.from("2027-12-31");

const body = document.getElementById("body");
const mainSection = document.getElementById("main");
const heroSection = document.getElementById("hero");
const success = document.getElementById("success");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const ticketAvatar = document.getElementById("ticket-avatar");
const ticketFullName = document.getElementById("ticket-fullname");
const ticketEmail = document.getElementById("ticket-email");
const ticketGithub = document.getElementById("ticket-github");
const ticketNum = document.getElementById("ticket-number");
const ticketDate = document.getElementById("ticket-date");
const form = document.getElementById("ticket-form");
const dropzone = document.getElementById("dropzone");
const avatarWrapper = document.getElementById("avatar-wrapper");
const fileInput = document.getElementById("avatar-input");
const fileHint = document.getElementById("file-hint");
const fileHintIco = document.getElementById("file-hint-ico");
const nameInput = document.getElementById("fullname");
const githubInput = document.getElementById("github");
const emailInput = document.getElementById("email");
const emailHint = document.getElementById("email-hint");
const emailHintIco = document.getElementById("email-hint-ico");
const avatarIcon = document.getElementById("avatar-icon");
const btnsWrapper = document.getElementById("btnsWrapper");
const removeBtn = document.getElementById("remove-btn");
const changeBtn = document.getElementById("change-btn");
const dropzoneText = document.getElementById("dropzone-text");

fileInput.addEventListener("change", uploadAvatar);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkEmail(emailInput)) {
    showTicket();
  }
});

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

  let avatarLink = getImgUrl(file);
  avatarWrapper.style.backgroundImage = `url(${avatarLink})`;
  avatarIcon.style.display = "none";
  fileHint.innerHTML =
    '<span class="ticket-form__hint-ico" id="file-hint-ico"></span>Upload your photo (JPG or PNG, max size: 500KB).';
  fileHint.classList.remove("error");
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
    "<span class='ticket-form__hint-ico ico-error'></span>File too large. Please upload a photo under 500KB.";
  fileHint.classList.add("error");
}

function checkEmail(email) {
  let isValid = false;
  const emailPattern = /^[a-z0-9.+_%-]+@[a-z0-9.-]+\.[a-z]{2,63}$/i;

  if (!emailPattern.test(email.value)) {
    email.style.margin = "12px 0 0";
    emailHint.style.display = "block";
    emailHint.classList.add("error");
    emailHintIco.classList.add("ico-error");
  } else {
    emailHint.style.display = "none";
    email.style.margin = "10px 0 20px";
    isValid = true;
  }

  return isValid;
}

function showTicket() {
  let avatarLink = getImgUrl(fileInput.files[0]);
  let splitedName = nameInput.value.split(" ");

  ticketDate.innerText = getRandomDate(START_DATE, END_DATE);
  ticketAvatar.src = avatarLink;
  ticketFullName.innerText = nameInput.value;
  ticketGithub.innerText = githubInput.value;
  firstName.innerText = splitedName[0];
  lastName.innerText = splitedName[1];
  ticketEmail.innerText = emailInput.value;
  ticketNum.innerText = getTicketNum();

  mainSection.style.visibility = "hidden";
  heroSection.style.visibility = "hidden";
  success.style.visibility = "visible";
  body.classList.add("positioned-bg");
}

function getImgUrl(file) {
  return URL.createObjectURL(file);
}

function getTicketNum() {
  let ticketNum = Math.floor(Math.random() * 10000).toString();
  return "#" + ticketNum.padStart(TICKET_NUM_SIZE, "0");
}

function getRandomDate(start, end) {
  let totalDays = start.until(end, { largestUnit: "day" }).days;
  let randomDays = Math.floor(Math.random() * (totalDays + 1));
  const randomDate = start.add({ days: randomDays })

  return randomDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}