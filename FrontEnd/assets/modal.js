const modal = document.getElementById("myModal");

const btnModal = document.getElementById("buttonModal");

const span = document.getElementById("close");

btnModal.onclick = function (event) {
    event.preventDefault(); // Prevent link navigation(stopped brief opening of modal)
    modal.style.display = "block";
    btnModal.style.display = "none";
};

span.onclick = function () {
    modal.style.display = "none";
    btnModal.style.display = "block";
};