"use strict";

window.onload = () => {
    const form = document.getElementById("add-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const experience = {
            "companyname": form.elements["companyname"].value,
            "jobtitle": form.elements["jobtitle"].value,
            "location": form.elements["location"].value,
            "startdate": form.elements["startdate"].value,
            "enddate": form.elements["enddate"].value,
            "description": form.elements["description"].value
        };

        saveWorkExperience(experience);

        form.reset();
    });
}

async function saveWorkExperience(experience) {
    const url = "https://back-end-moment2.onrender.com/api/experience";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "content-type": "Application/json"
            },
            body: JSON.stringify(experience)
        });

        validateResponse(response);
    } catch (err) {
        console.error(err);
    }
}

function sendMessage(message, error) {
    const container = document.getElementById("message");
    container.classList.add(error ? "error" : "success");
    container.innerHTML = `
        <p>${message}</p>
    `;
    container.style.display = "flex";

    setTimeout(() => {
        container.innerHTML = "";
        container.style.display = "none";
    }, "3000");
}

async function validateResponse(res) {
    const data = await res.json();
    if (res.ok) return sendMessage(data.message, false);
    try {
        console.error(`Received status ${res.status}: ${data.message ?? "[No message]"}`);
        sendMessage(data.message);
    } catch (err) {
        console.error(err);
    }
}