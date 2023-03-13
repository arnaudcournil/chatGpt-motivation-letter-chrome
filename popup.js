var website = "";

async function main() {
  website = await offreDetec();
  await show();
}

async function offreDetec() {
  let result = await execFunction("document.URL");
  if(result.includes("https://www.hellowork.com/")){
    return "Hello Work";
  }
  else if(result.includes("https://www.welcometothejungle.com/")){
    return "Welcome to the Jungle";
  }
  return "";
}

async function generate() {
  var title = "Pas sur un site d'annonces reconnu";
  var content = "Voici mon modèle de lettre de motivation :\n\n<lettre de motivation ici>\n\nJe vais t'envoyer des descriptions d'offres de stage et tu devras me renvoyer en sortie une lettre de motivation la plus adaptée possible au stage en utilisant mon modèle. Tu peux valoriser mes compétences mais ne crée pas de compétences qui ne sont pas inscrites dans mon modèle.\n\nVoici la première offre : \n\n";
  if(website == "Hello Work"){
    title = await execFunction("document.querySelector('h1.tw-flex').innerHTML.split('<')[0].trim()") + " - ";
    title += await execFunction("document.querySelector('h1.tw-flex span').innerHTML");
    content += title + "\n\n" + await execFunction("document.querySelector('.content').textContent") + await execFunction("document.querySelectorAll('.content')[1].textContent");
  }
  else if(website == "Welcome to the Jungle"){ 
    title = await execFunction("document.querySelector('.sc-12bzhsi-11').innerHTML") + " - ";   
    title += await execFunction("document.querySelector('.sc-12bzhsi-3').innerHTML");
    await execFunction("document.querySelectorAll('.sc-12bzhsi-17.jtMCMU')[1].remove()");
    content += title + "\n\n" + await execFunction("document.querySelector('.sc-12bzhsi-16').textContent");
  }
  return {title, content}
}

async function show()
{
  let offer = await generate();
  document.getElementById("offerTitle").innerHTML = offer["title"] + "<br>" + website;
  document.getElementById("offerQuery").value = offer["content"];
  document.getElementById("offerQuery").hidden = false;
  updateLink();
}

async function execFunction(functionStr) {
  let result = undefined;
  chrome.tabs.executeScript( {
      "code": functionStr
  }, results => {result = results});
  while(result == undefined) await new Promise(r => setTimeout(r, 1));
  return result[0];
}

async function updateLink() {
  document.getElementById("chatLink").href = "https://chat.openai.com/chat" + "?" + document.getElementById("offerQuery").value.replace(/\n/g, "%0A");
}

document.addEventListener('input', updateLink);

main();
