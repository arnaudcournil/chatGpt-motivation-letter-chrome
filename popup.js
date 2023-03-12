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
  var content = "Voici mon modèle de lettre de motivation :\n\nObjet : Candidature pour le stage de Data Scientist – Données Téléphonie Mobile – RATP\n\nMadame, Monsieur,\n\nActuellement étudiant en master (I) Data et Intelligence Artificielle à l’École Supérieure d'Ingénieurs Léonard-de-Vinci (ESILV - Paris La Défense), je vous soumets ma candidature pour présente ma candidature pour le stage de Data Scientist.\n\nJe suis intéressé par ce stage concernant le développement sur des sujets R&D pour les aéroports. J’apprécie particulièrement cette offre car il y a une grande variété de missions proposées et les valeurs de Alstef me plaisent : ambition, panssion, bienveillance …\n\nIssu d'une formation orientée data-science, je suis passionné par les domaines de la Data et de l'Intelligence Artificielle. J'ai acquis une bonne maîtrise de Python et de ses bibliothèques. Je suis également à jour avec les dernières avancées en matière de Machine Learning et Deep Learning ; ainsi qu’en science et analyse de données. \n\nDe plus, j'ai une bonne maîtrise des langages de gestions des données comme NoSql, Oracle SQL, MongoDB, ElasticSearch , Neo4j et des statistiques et probabilités notamment par le biais de R.\n\nLors de ma formation, j’ai eu l’occasion d’effectuer plusieurs semaines de formation soft skills concernant notamment la méthode Agile, le MTBI et me développement durable, ce qui m’a permis de développer des compétences d’intelligence collective et de travail en équipe.\n\nDynamique et investi, je pourrais gérer des charges de travail élevées et plusieurs projets simultanément. J’ai des facilités à apprendre et je saurais m’intégrer au sein de vos équipes et m’adapter très vite tout en restant rigoureux et efficace. \n\nJe suis disponible à partir du 3 avril 2023 pour une durée de 4-5 mois.\n\nJ’espère vivement que ma candidature saura retenir votre attention et je me tiens à votre disposition pour vous rencontrer, me présenter et répondre à vos questions.\n\nBien cordialement,\n\nArnaud Cournil\ncournil.arnaud94@gmail.com\n07 83 66 71 01\n\nJe vais t'envoyer des descriptions d'offres de stage et tu devras me renvoyer en sortie une lettre de motivation la plus adaptée possible au stage en utilisant mon modèle. Tu peux valoriser mes compétences mais ne crée pas de compétences qui ne sont pas inscrites dans mon modèle.\n\nVoici la première offre : \n\n";
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
