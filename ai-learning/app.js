const modules = [
  ["LLM & Generative AI Fundamentals","Tokens, context windows, inference, hallucination, embeddings, RAG vs fine-tuning."],
  ["Prompt Engineering & Structured Outputs","System prompts, few-shot prompting, JSON schemas, validation, prompt injection."],
  ["Python for AI Applications","FastAPI, Pydantic, async, retries, logging, testing and API design."],
  ["Embeddings, Vector Search & RAG","Chunking, metadata, vector stores, semantic search, reranking and grounding."],
  ["AI Agents & Tool Calling","Agent loops, tool schemas, state, handoffs, human approval and safe execution."],
  ["Model Context Protocol (MCP)","Servers, clients, tools, resources, transport, authentication and authorization."],
  ["AWS Bedrock & Enterprise GenAI","Model access, enterprise controls, IAM, guardrails, private connectivity and cost."],
  ["LLMOps & AI Observability","Tracing, token usage, latency, evaluations, regression tests and cost monitoring."],
  ["AI Security, Guardrails & Governance","Prompt injection, data leakage, RBAC, PII, auditability and tenant isolation."],
  ["Production AI Architecture","Model gateways, caching, RAG services, HA/DR, rate limits and fallback strategies."],
  ["AI for SRE / Platform Engineering","Incident triage, runbook search, K8s troubleshooting, CI/CD and Terraform analysis."],
  ["Senior-Level AI Interview Preparation","Architecture, security, reliability, governance, cost and trade-off communication."]
];

const roadmap = [
  ["Weeks 1–2","Foundations","LLM basics, Python, prompting, structured outputs and API fundamentals."],
  ["Weeks 3–4","RAG","Embeddings, vector search and a Kubernetes troubleshooting assistant."],
  ["Weeks 5–6","Agents","Tool calling, agent state and a read-only AI SRE incident agent."],
  ["Weeks 7–8","MCP","Build a Kubernetes MCP server with scoped, auditable operations."],
  ["Weeks 9–10","AWS + LLMOps","Bedrock, enterprise security, tracing, evaluations and cost controls."],
  ["Weeks 11–12","Production + Interviews","Flagship AI SRE platform, system design and resume-ready project stories."]
];

const projects = [
  ["01","Kubernetes RAG Troubleshooting Assistant",["Ingest runbooks","Create embeddings","Retrieve relevant evidence","Generate grounded responses"]],
  ["02","AI SRE Incident Agent",["Read-only infrastructure tools","Collect logs/events/metrics","Reason from evidence","Require approval for actions"]],
  ["03","Kubernetes MCP Server",["Expose controlled K8s tools","Use service-account RBAC","Audit all tool calls","Apply namespace scoping"]],
  ["04","AI-Powered SRE Operations Platform",["Combine RAG + Agents + MCP","Integrate Kubernetes and AWS","Add observability and evaluation","Deploy with production controls"]]
];

const interviews = [
  {
    title:"Design enterprise RAG for 10,000 employees",
    prompt:"How would you design a secure, scalable RAG platform for thousands of internal users and multiple data sources?",
    framework:["Clarify data sources, users, latency and freshness requirements","Design ingestion, chunking, embeddings and retrieval","Add identity-aware retrieval and document-level authorization","Use model gateway, caching, rate limits and provider fallback","Add evaluation, tracing, cost metrics and groundedness checks","Plan HA/DR, data residency, audit and rollout"]
  },
  {
    title:"Should an AI agent restart Kubernetes workloads?",
    prompt:"A team wants an agent to automatically restart production workloads when it detects an issue. How would you approach it?",
    framework:["Default to read-only diagnostics","Separate recommendation from execution","Use scoped RBAC and allow-listed tools","Require approval for risky production actions","Use dry-run, blast-radius controls and rollback","Audit every tool call and measure automated-remediation outcomes"]
  },
  {
    title:"Reduce hallucination in an operations assistant",
    prompt:"Your SRE assistant produces plausible but incorrect troubleshooting advice. What changes would you make?",
    framework:["Ground answers using high-quality retrieval","Improve chunking, metadata and reranking","Require evidence/citations for claims","Add abstention when evidence is weak","Create eval datasets from real incidents","Track groundedness and retrieval quality as release gates"]
  },
  {
    title:"Design observability for an AI platform",
    prompt:"Which signals should a production AI platform measure and why?",
    framework:["Latency and availability","Input/output token usage and cost","Model/provider errors and retries","Retrieval relevance and tool-call success","Evaluation quality and groundedness","Security/audit events and user feedback"]
  }
];

const storageKey = "aiLearningProgressV1";
let completed = new Set(JSON.parse(localStorage.getItem(storageKey) || "[]"));

const moduleGrid = document.getElementById("moduleGrid");
const progressPercent = document.getElementById("progressPercent");
const progressText = document.getElementById("progressText");
const progressRing = document.querySelector(".progress-ring");

function saveProgress(){ localStorage.setItem(storageKey, JSON.stringify([...completed])); }
function updateProgress(){
  const pct = Math.round((completed.size / modules.length) * 100);
  progressPercent.textContent = pct + "%";
  progressText.textContent = completed.size + " of " + modules.length + " modules completed";
  progressRing.style.setProperty("--progress", pct + "%");
}
function renderModules(){
  moduleGrid.innerHTML = "";
  modules.forEach((m,i)=>{
    const card = document.createElement("article");
    card.className = "module-card" + (completed.has(i) ? " completed" : "");
    card.innerHTML = `
      <div class="module-top">
        <span class="badge">Module ${String(i+1).padStart(2,"0")}</span>
        <input class="check" type="checkbox" aria-label="Mark ${m[0]} complete" ${completed.has(i) ? "checked" : ""}>
      </div>
      <h3>${m[0]}</h3>
      <p class="muted">${m[1]}</p>
    `;
    const check = card.querySelector(".check");
    check.addEventListener("change",()=>{
      check.checked ? completed.add(i) : completed.delete(i);
      saveProgress();
      renderModules();
      updateProgress();
    });
    moduleGrid.appendChild(card);
  });
}

const roadmapGrid = document.getElementById("roadmapGrid");
roadmap.forEach(([weeks,title,desc])=>{
  const card=document.createElement("article");
  card.className="week-card";
  card.innerHTML=`<strong>${weeks}</strong><h3>${title}</h3><p class="muted">${desc}</p>`;
  roadmapGrid.appendChild(card);
});

const projectGrid=document.getElementById("projectGrid");
projects.forEach(([n,title,items],idx)=>{
  const card=document.createElement("article");
  card.className="project-card"+(idx===3?" final":"");
  card.innerHTML=`<div class="number">${n}</div><h3>${title}</h3><ul>${items.map(x=>`<li>${x}</li>`).join("")}</ul>`;
  projectGrid.appendChild(card);
});

const questionList=document.getElementById("questionList");
const questionTitle=document.getElementById("questionTitle");
const questionPrompt=document.getElementById("questionPrompt");
const revealAnswer=document.getElementById("revealAnswer");
const answerContent=document.getElementById("answerContent");
let selected=-1;

interviews.forEach((q,i)=>{
  const btn=document.createElement("button");
  btn.type="button";
  btn.className="question-button";
  btn.textContent=q.title;
  btn.addEventListener("click",()=>{
    selected=i;
    document.querySelectorAll(".question-button").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    questionTitle.textContent=q.title;
    questionPrompt.textContent=q.prompt;
    revealAnswer.disabled=false;
    answerContent.hidden=true;
    answerContent.innerHTML="";
  });
  questionList.appendChild(btn);
});

revealAnswer.addEventListener("click",()=>{
  if(selected<0) return;
  answerContent.innerHTML="<h4>Answer framework</h4><ol>"+interviews[selected].framework.map(x=>"<li>"+x+"</li>").join("")+"</ol>";
  answerContent.hidden=false;
});

document.getElementById("resetProgress").addEventListener("click",()=>{
  completed=new Set();
  saveProgress();
  renderModules();
  updateProgress();
});

renderModules();
updateProgress();
