var text = "";

if(document.URL.includes("https://chat.openai.com/chat?")){
    text = decodeURI(document.URL.slice(document.URL.indexOf("?") + 1));
}

window.onload = async function() {
    await new Promise(r => setTimeout(r, 1500));
    document.querySelector("textarea").value = text;
    document.querySelector("textarea").parentElement.querySelector("button").click()
}