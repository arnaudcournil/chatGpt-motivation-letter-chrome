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
    return "Welcome To The Jungle";
  }
  return "";
}

async function generate() {
  var title = "Pas sur un site d'annonces reconnu";
  var content = "<placer ici la lettre de motivation>";
  if(website == "Hello Work"){
    title = await execFunction("document.querySelector('h1.tw-flex').innerHTML.split('<')[0].trim()") + " - ";
    title += await execFunction("document.querySelector('h1.tw-flex span').innerHTML");
    content += title + "\n\n" + await execFunction("document.querySelector('.content').textContent") + await execFunction("document.querySelectorAll('.content')[1].textContent");
  }
  else if(website == "Welcome To The Jungle"){ 
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
}

async function execFunction(functionStr) {
  let result = undefined;
  chrome.tabs.executeScript( {
      "code": functionStr
  }, results => {result = results});
  while(result == undefined) await new Promise(r => setTimeout(r, 1));
  return result[0];
}

main();
