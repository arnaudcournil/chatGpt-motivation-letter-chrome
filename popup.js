var website = "";
var lang = "fr";
var highlighted = false;
var websiteUrl = "";
var alreadyScraped = false;

async function main() {
  init();
  websiteUrl = await execFunction("document.URL");
  website = await offreDetec();
  await show();
}

async function init() {
  highlighted = await execFunction('document.getElementsByClassName("chatgpt-extension-marked").length != 0 && document.getElementsByClassName("chatgpt-extension-marked")[0].style.backgroundColor != ""');
  if(highlighted){
    document.getElementById("highlightSwitch").checked = true;
  }
  if(await execFunction('Array.from(document.querySelectorAll(".chatgpt-extension-marked")).some(e => e.hidden && true)')) {
    alreadyScraped = true;
  }
}

async function offreDetec() {
  if(websiteUrl.includes("https://www.hellowork.com/")){
    return "Hello Work";
  }
  else if(websiteUrl.includes("https://www.welcometothejungle.com/")){
    return "Welcome to the Jungle";
  }
  return "";
}

async function generate() {
  let title = "Pas sur un site d'annonces reconnu";
  if(lang == "fr"){
    var content = "Voici mon modèle de lettre de motivation :\n\nObjet : Candidature pour le stage de Data Scientist – Données Téléphonie Mobile – RATP\n\nMadame, Monsieur,\n\nActuellement étudiant en master 2 Data et Intelligence Artificielle à l’École Supérieure d'Ingénieurs Léonard-de-Vinci (ESILV - Paris La Défense), je vous soumets ma candidature pour le stage de Data Scientist.\n\nJe suis intéressé par ce stage concernant le développement sur des sujets R&D pour les métros. J’apprécie particulièrement cette offre car il y a une grande variété de missions proposées et les valeurs de la RATP me plaisent : ambition, panssion, bienveillance …\n\nIssu d'une formation orientée data-science, je suis passionné par les domaines de la Data et de l'Intelligence Artificielle. J'ai acquis une bonne maîtrise de Python et de ses bibliothèques. Je suis également à jour avec les dernières avancées en matière de Machine Learning et Deep Learning ; ainsi qu’en science et analyse de données. \n\nDe plus, j'ai une bonne maîtrise des langages de gestions des données comme NoSql, Oracle SQL, MongoDB, ElasticSearch , Neo4j et des statistiques et probabilités notamment par le biais de R.\n\nLors de ma formation, j’ai eu l’occasion d’effectuer plusieurs semaines de formation soft skills concernant notamment la méthode Agile, le MTBI et me développement durable, ce qui m’a permis de développer des compétences d’intelligence collective et de travail en équipe.\n\nDynamique et investi, je pourrais gérer des charges de travail élevées et plusieurs projets simultanément. J’ai des facilités à apprendre et je saurais m’intégrer au sein de vos équipes et m’adapter très vite tout en restant rigoureux et efficace. \n\nJe suis disponible à partir du février 2024 pour une durée de 6 mois.\n\nJ’espère vivement que ma candidature saura retenir votre attention et je me tiens à votre disposition pour vous rencontrer, me présenter et répondre à vos questions.\n\nBien cordialement,\n\nArnaud Cournil\ncournil.arnaud94@gmail.com\n07 83 66 71 01\n\nJe vais t'envoyer des descriptions d'offres de stage et tu devras me renvoyer en sortie une lettre de motivation la plus adaptée possible au stage en utilisant mon modèle. Tu peux valoriser mes compétences mais ne crée pas de compétences qui ne sont pas inscrites dans mon modèle.\n\nVoici la première offre :\n\n";
  }
  else if(lang == "en"){
    var content = "Here is my sample cover letter:\n\nSubject: Application for Data Scientist internship - Mobile Telephony data - RATP\n\nDear Madam or Sir,\n\nCurrently studying for a Master 2 in Data and Artificial Intelligence at the École Supérieure d'Ingénieurs Léonard-de-Vinci (ESILV - Paris La Défense), I would like to submit my application for a Data Scientist internship.\n\nI'm interested in this internship to develop R&D projects for metros. I particularly like this offer because there's a wide variety of tasks on offer and I like the values of RATP: ambition, panssion, benevolence...\n\nWith a background in data science, I'm passionate about Data and Artificial Intelligence. I've acquired a good command of Python and its libraries. I'm also up to date with the latest advances in Machine Learning and Deep Learning, as well as in data science and analysis. \n\nIn addition, I have a good command of data management languages such as NoSql, Oracle SQL, MongoDB, ElasticSearch , Neo4j and statistics and probability, notably through R.\n\nDuring my training, I had the opportunity to attend several weeks of soft skills training, notably on the Agile method, MTBI and sustainable development, which enabled me to develop collective intelligence and teamwork skills.\n\nDynamic and committed, I can handle heavy workloads and several projects simultaneously. I'm a quick learner and I'll fit in well with your teams, adapting quickly while remaining rigorous and efficient. \n\nI am available from February 2024 for a period of 6 months.\n\nI sincerely hope that my application will be of interest to you, and would be delighted to meet you, introduce myself and answer any questions you may have.\n\nBest regards,\n\nArnaud Cournil\ncournil.arnaud94@gmail.com\n07 83 66 71 01\n\nI'm going to send you descriptions of internship opportunities, and you'll need to send me a cover letter that's as suitable as possible for the internship, using my template. You can use my skills, but don't create skills that aren't in my template.\n\nHere's the first offer:\n\n"
  }
  if(website == "Hello Work"){
    title = await execFunction("document.getElementsByClassName('tw-block tw-typo-xl sm:tw-typo-3xl tw-mb-2')[0].innerHTML") + " - ";
    title += await execFunction(`document.getElementsByClassName("tw-typo-m tw-text-grey after:tw-content-[',']")[0].innerHTML`);
    // Mark content
    // ...
  }
  else if(website == "Welcome to the Jungle"){ 
    title = await execFunction("document.querySelector('.dziaPt').innerHTML") + " - ";   
    title += await execFunction("document.querySelector('.hzokih').innerHTML");
    content += title + "\n\n";
    // Mark content
    if(!alreadyScraped)
    {
      await execFunction(`
        document.querySelector('.sc-12bzhsi-16').innerHTML = '<div class="chatgpt-extension-marked" style="display: inline-block;">' + document.querySelector('.sc-12bzhsi-16').innerHTML + '</div>'
      `);
      alreadyScraped = true;
    }
  }

  //get marked content
  for(let i = 0; i < await execFunction('document.getElementsByClassName("chatgpt-extension-marked").length'); i++)
  {
    if(i != 0) content += "\n\n";
    content += await execFunction("document.querySelectorAll('.chatgpt-extension-marked')[" + i + "].textContent");
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
  document.getElementById("chatLink").href = "https://chat.openai.com/?" + document.getElementById("offerQuery").value.replace(/\n/g, "%0A");
}

document.addEventListener('input', updateLink);
document.getElementById("langSwitch").addEventListener('click', () => {
  if(lang == "fr"){
    lang = "en";
  }
  else if(lang == "en"){
    lang = "fr";
  }
  show();
});
document.getElementById("highlightSwitch").addEventListener('click', () => {
  highlighted = !highlighted;
  execFunction("document.querySelectorAll('.chatgpt-extension-marked').forEach((e) => {e.style.backgroundColor = '" + (highlighted ? "rgba(0,191,255)" : "") + "'})");
});
document.getElementById("deleteButton").addEventListener('click', async () => {
  await execFunction(`
    location.reload();
  `);
  //Déchargement de la page
  while(await execFunction('document.getElementsByClassName("chatgpt-extension-marked").length') != 0) await new Promise(r => setTimeout(r, 1));
  //Rechargement de la page
  await execFunction(`
    window.onload = (() => {
      let colored = ` + highlighted + `;
      document.body.innerHTML = '<div class="chatgpt-extension-marked" style="' + (colored ? 'background-color: rgb(0, 191, 255);' : '') + '" hidden=""></div>' + document.body.innerHTML;
    })
  `);
  await show();
});
document.getElementById("reloadButton").addEventListener('click', async () => {
  await execFunction(`
    location.reload();
  `);
  //Déchargement de la page
  while(await execFunction('document.getElementsByClassName("chatgpt-extension-marked").length') != 0) await new Promise(r => setTimeout(r, 1));
  //Rechargement de la page
  await execFunction("window.onload = (() => {})")
  alreadyScraped = false;
  await show();
  await execFunction("document.querySelectorAll('.chatgpt-extension-marked').forEach((e) => {e.style.backgroundColor = '" + (highlighted ? "rgba(0,191,255)" : "") + "'})");
});
document.getElementById("addSelectionButton").addEventListener('click', async () => {
  await execFunction(`
    (() => {
      let sel = window.getSelection();
      if (!sel.isCollapsed) {
        let colored = ` + highlighted + `;
        let range = sel.getRangeAt(0);
        let markup = '<div class="chatgpt-extension-marked" style="display: inline-block;' + (colored ? 'background-color: rgb(0, 191, 255);' : '') + '">' + range.toString() + '</div>';
        range.deleteContents();
        range.insertNode(document.createRange().createContextualFragment(markup));
      }
    })()
  `);
  await show();
});

chrome.contextMenus.create({
  title: "Ajouter à la variable content",
  contexts: ["selection"],
  onclick: function(info, tab) {
      let sel = window.getSelection();
      if (!sel.isCollapsed) {
          let colored = highlighted;
          let range = sel.getRangeAt(0);
          let markup = '<div class="chatgpt-extension-marked" style="display: inline-block;' + (colored ? 'background-color: rgb(0, 191, 255);' : '') + '">' + range.toString() + '</div>';
          range.deleteContents();
          range.insertNode(document.createRange().createContextualFragment(markup));
      }
  }
});

main();