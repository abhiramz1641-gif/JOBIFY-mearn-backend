const fs = require("fs");

// ----------------- DATA -----------------

// Comprehensive roles list
const roles = [
  "frontend developer","backend developer","full stack developer","software engineer","web developer",
  "mobile developer","ios developer","android developer","devops engineer","cloud engineer",
  "data engineer","machine learning engineer","ai engineer","data scientist","qa engineer",
  "automation tester","manual tester","database administrator","system analyst","security engineer",
  "technical lead","project manager","product manager","ui/ux designer","graphic designer",
  "business analyst","network engineer","embedded systems engineer","game developer",
  "software architect","solutions architect","security analyst","data analyst","research engineer",
  "scrum master","site reliability engineer","release manager","performance tester",
  "frontend lead","backend lead","fullstack lead","mobile lead","ios lead","android lead",
  "cloud architect","mlops engineer","ai researcher","etl developer","etl analyst",
  "big data engineer","data warehouse developer","business intelligence developer",
  "system administrator","linux administrator","windows administrator","network administrator",
  "penetration tester","cybersecurity engineer","ethical hacker","seo specialist",
  "content strategist","technical writer","software consultant","tech lead","lead engineer",
  "it manager","qa lead","qa manager","test manager","ui designer","ux designer",
  "graphic ui designer","interaction designer","motion designer","visual designer","game designer",
  "mobile ui designer","web designer","product designer","solution architect","enterprise architect",
  "security architect","application architect","integration architect","business architect",
  "enterprise analyst","it analyst","process analyst","cloud consultant","devops consultant",
  "fullstack consultant","backend consultant","frontend consultant","mobile consultant",
  "android consultant","ios consultant","scrum consultant","agile coach","software trainer",
  "technical trainer","it trainer","data trainer","ml trainer","ai trainer","research analyst",
  "data modeler","etl architect","pipeline engineer","etl architect","big data architect",
  "blockchain developer","solidity developer","smart contract developer","game programmer",
  "graphics programmer","firmware engineer","embedded programmer","iot engineer",
  "robotics engineer","automation engineer","process engineer","system engineer","network engineer"
];

// Comprehensive skills list
const skills = [
  "javascript","typescript","python","java","c","c++","c#","php","ruby","go","rust","kotlin","swift",
  "react","angular","vue","svelte","nextjs","nuxtjs","html","css","tailwind","bootstrap","material-ui","jquery",
  "node","express","django","flask","spring","laravel","fastapi","ruby on rails","asp.net","graphql","rest api",
  "mongodb","mysql","postgresql","redis","sqlite","oracle","mssql","cassandra","firebase","dynamodb",
  "aws","azure","gcp","docker","kubernetes","jenkins","git","ci/cd","terraform","ansible","linux","bash","powershell",
  "jest","mocha","cypress","selenium","pytest","junit","postman","pandas","numpy","scikit-learn",
  "tensorflow","keras","pytorch","matplotlib","seaborn","opencv","nlp","microservices","api","agile",
  "scrum","communication","problem solving","leadership","teamwork","etl","big data","hadoop","spark",
  "hive","pig","kafka","rabbitmq","airflow","tableau","power bi","looker","qlikview","salesforce",
  "crm","erp","sap","oracle apps","ci","cd","cloudformation","helm","prometheus","grafana","new relic",
  "elastic","logstash","kibana","splunk","nagios","zabbix","vmware","hyper-v","ansible","chef","puppet",
  "selenium webdriver","cucumber","behave","appium","restful api","soap api","oauth","jwt","openid",
  "react native","flutter","xamarin","unity","unreal engine","opencv","computer vision","nlp","text mining",
  "image processing","speech recognition","tensorflow lite","keras tflite","keras","fastai","pytorch-lightning",
  "deep learning","reinforcement learning","cnn","rnn","lstm","gru","gan","transformers","bert","finbert","gpt",
  "prompt engineering","ai prompt","prompt tuning","chatbot","dialogflow","rasa","microsoft bot framework",
  "business intelligence","data visualization","etl pipeline","pipeline","automation","ci/cd pipeline"
];



const skillVariations = {
  "node.js":"node","reactjs":"react","react.js":"react","c sharp":"c#","c plus plus":"c++",
  "vue.js":"vue","next.js":"nextjs","nuxt.js":"nuxtjs","asp.net core":"asp.net","tensorflow.js":"tensorflow",
  "pytorch lightning":"pytorch","fast.ai":"fastai","nlp processing":"nlp","open ai":"ai"
};

const roleVariations = {
  "software developer":"software engineer","web dev":"web developer","frontend dev":"frontend developer",
  "backend dev":"backend developer","fullstack developer":"full stack developer","ml engineer":"machine learning engineer",
  "ai dev":"ai engineer","qa tester":"qa engineer","ui designer":"ui/ux designer","ux designer":"ui/ux designer",
  "project lead":"project manager","product lead":"product manager","tech lead":"technical lead","devops lead":"devops engineer"
};





const parseResume = async (filePathOrBuffer, isBuffer = false) => {
  try {
    const pdfParse = (await import("pdf-parse")).default;
    const dataBuffer = isBuffer ? filePathOrBuffer : fs.readFileSync(filePathOrBuffer);
    const data = await pdfParse(dataBuffer);
    
    const text = data.text.toLowerCase();

    return {
      email: extractEmail(text),
      experience: extractExperience(text),
      role: extractRole(text),
      skills: extractSkills(text)
    };
  } catch (err) {
    console.error("Error parsing PDF:", err);
    throw err;
  }
};





const extractEmail = (text) => {
  const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
  return match ? match[0] : null;
};

const extractExperience = (text) => {
  const match = text.match(/(\d+)\+?\s*(years|yrs)/i);
  return match ? match[0] : null;
};

const extractRole = (text) => {
  let normalizedText = text;
  for (let key in roleVariations) {
    if (normalizedText.includes(key)) normalizedText = normalizedText.replaceAll(key, roleVariations[key]);
  }
  const found = roles.find(role => normalizedText.includes(role));
  return found || null;
};

const extractSkills = (text) => {
  let normalizedText = text;
  for (let key in skillVariations) {
    if (normalizedText.includes(key)) normalizedText = normalizedText.replaceAll(key, skillVariations[key]);
  }
  return skills.filter(skill => normalizedText.includes(skill));
};

module.exports = parseResume;
