const MAX_SIZE = 5000 * 1024;
const TICKET_NUM_SIZE = 6;
const START_DATE = Temporal.PlainDate.from("2026-12-01");
const END_DATE = Temporal.PlainDate.from("2027-12-31");
const MARGIN = {
  add: "10px 0 20px",
  remove: "12px 0 0",
};

const body = document.getElementById("body");
const mainSection = document.getElementById("main");
const heroSection = document.getElementById("hero");
const success = document.getElementById("success");

const fullname = document.getElementById("fullname");
const fullnameHint = document.getElementById("fullname-hint");
const fullnameHintIco = document.getElementById("fullname-hint-ico");

const github = document.getElementById("github");
const githubHint = document.getElementById("github-hint");
const githubHintIco = document.getElementById("github-hint-ico");

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
  const emailError = checkEmail(emailInput);
  const fileError = checkFile(fileInput.files[0]);
  const nameError = checkName(nameInput);
  const githubError = checkGithub(githubInput);

  if (!emailError && !fileError && !nameError && !githubError) {
    showTicket();
  }
  if (fileError) {
    showError(fileHint, fileError);
  }
  if (nameError) {
    showError(fullnameHint, nameError);
  }
  if (emailError) {
    showError(emailHint, emailError);
  }
  if (githubError) {
    showError(githubHint, githubError);
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
  const errorMsg = checkFile(file);

  if (errorMsg) {
    showError(fileHint, errorMsg);
    return;
  }

  let avatarLink = getImgUrl(file);
  avatarWrapper.style.backgroundImage = `url(${avatarLink})`;
  avatarIcon.style.display = "none";
  fileHint.innerHTML =
    '<span class="ticket-form__hint-ico" id="file-hint-ico"></span>Upload your photo (JPG or PNG, max size: 5MB).';
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
  fileInput.value = "";
}

function showError(elem, errorMsg) {
  elem.innerHTML = `<span class='ticket-form__hint-ico ico-error'></span>${errorMsg}`;
  elem.classList.add("error");
  elem.style.display = "block";
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
  const randomDate = start.add({ days: randomDays });

  return randomDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function checkFile(file) {
  let errorMsg = "";

  if (!file) {
    errorMsg = "Please upload your photo (JPG or PNG, max size: 5MB).";
  } else if (file.size > MAX_SIZE) {
    errorMsg = "File too large. Please upload a photo under 5MB.";
    fileInput.value = "";
  }

  return errorMsg;
}

function checkEmail(email) {
  let errorMsg = "";
  const emailPattern = /^[a-z0-9.+_%-]+@[a-z0-9.-]+\.[a-z]{2,63}$/i;

  if (!emailPattern.test(email.value)) {
    errorMsg = "Please enter a valid email.";
    email.style.margin = MARGIN.remove;
  } else {
    email.style.margin = MARGIN.add;
    emailHint.style.display = "none";
  }

  return errorMsg;
}

function checkName(fullname) {
  let errorMsg = "";

  if (!fullname.value) {
    errorMsg = "Please enter your fullname.";
    fullname.style.margin = MARGIN.remove;
  } else if (
    fullname.value.split(" ").length === 1 ||
    fullname.value.split(" ").length > 2
  ) {
    errorMsg = "Fullname must consist of 2 words";
    fullname.style.margin = MARGIN.remove;
  } else {
    fullname.style.margin = MARGIN.add;
    fullnameHint.style.display = "none";
  }

  return errorMsg;
}

function checkGithub(nickname) {
  let errorMsg = "";

  if (!nickname.value) {
    errorMsg = "Please enter your nickname.";
    nickname.style.margin = MARGIN.remove;
  } else if (nickname.value.split(" ").length > 1) {
    errorMsg = "Nickname must consist of 1 word";
    nickname.style.margin = MARGIN.remove;
  } else if ([...nickname.value][0] != "@") {
    errorMsg = "Nickname must starting with '@'";
    nickname.style.margin = MARGIN.remove;
  } else {
    nickname.style.margin = MARGIN.add;
    githubHint.style.display = "none";
  }

  return errorMsg;
}
