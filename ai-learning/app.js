const modules = [
  {title:"LLM & Generative AI Fundamentals",summary:"Tokens, context windows, inference, hallucination, embeddings, RAG vs fine-tuning.",concepts:["Tokens are the units an LLM reads and generates. Token count affects cost, latency and context usage.","A context window is the maximum amount of input plus generated output a model can consider in one request.","Inference is the process of generating output from a trained model; training changes model weights, inference does not.","Hallucination means the model generates plausible but unsupported information. Grounding, retrieval and validation reduce the risk.","Embeddings convert text into numerical vectors so semantically similar content can be found through similarity search.","RAG adds external knowledge at request time; fine-tuning changes model behavior by training on examples."],practice:["Call an LLM API from Python.","Compare the same prompt at low and high temperature.","Record input/output token usage for several prompts.","Explain RAG vs fine-tuning using an SRE runbook example."],interview:["Why do LLMs hallucinate?","What is an embedding and where would you use one?","When would you choose RAG instead of fine-tuning?","What happens when a prompt exceeds the context window?"],checkpoint:"You can explain the LLM request lifecycle, tokens, embeddings, hallucination and RAG without relying on buzzwords."},
  {title:"Prompt Engineering & Structured Outputs",summary:"System prompts, few-shot prompting, JSON schemas, validation and prompt injection.",concepts:["System instructions establish high-level model behavior and constraints.","Few-shot prompting demonstrates desired behavior with representative examples.","Structured outputs make downstream automation safer by constraining responses to a known schema.","Prompt injection attempts to override trusted instructions or manipulate tool use.","A production prompt should define objective, context, constraints, output format and failure behavior.","Prompt quality should be evaluated with repeatable test cases rather than visual inspection alone."],practice:["Write a Kubernetes incident-triage system prompt.","Return severity, likely_causes and next_steps as validated JSON.","Add Pydantic validation and reject malformed responses.","Test the prompt with irrelevant, ambiguous and malicious input."],interview:["What makes a production prompt different from a chat prompt?","How do you make LLM output reliable for automation?","How would you defend against prompt injection?","Where should business rules live: prompt or application code?"],checkpoint:"You can create predictable prompts, schema-constrained responses and basic injection defenses."},
  {title:"Python for AI Applications",summary:"FastAPI, Pydantic, async, retries, logging, testing and API design.",concepts:["Python is commonly used to orchestrate model APIs, retrieval, agents and data processing.","FastAPI is useful for exposing AI capabilities through typed HTTP APIs.","Pydantic validates request, response and tool schemas.","Async I/O helps when an application waits on models, databases and external tools.","Retries should handle transient failures with backoff, but not repeat unsafe side effects blindly.","Observability starts with structured logs, correlation IDs, latency and error classification."],practice:["Build POST /ask using FastAPI.","Add request/response Pydantic models.","Add timeout, retry and exception handling.","Create health and readiness endpoints.","Write unit tests with the model client mocked."],interview:["Why use async in an AI service?","How would you handle provider timeouts?","What should a health check test?","How would you prevent retries from duplicating actions?"],checkpoint:"You can build and test a small production-shaped Python API around an LLM."},
  {title:"Embeddings, Vector Search & RAG",summary:"Chunking, metadata, vector stores, semantic search, reranking and grounding.",concepts:["RAG separates knowledge retrieval from language generation.","Chunking controls how documents are divided; poor chunking can destroy retrieval quality.","Metadata enables filtering by system, environment, team, document type or access level.","Vector similarity retrieves semantically related chunks rather than exact keyword matches.","Hybrid retrieval combines lexical and semantic search.","Reranking improves the ordering of candidate passages before they reach the model."],practice:["Ingest Kubernetes runbooks.","Create embeddings and store them in a vector database.","Query the store with a production incident question.","Return the answer with cited source chunks.","Create ten test questions and score retrieval relevance."],interview:["How do you choose chunk size?","What is top-k retrieval?","Why can a RAG system still hallucinate?","How would you implement access control in RAG?"],checkpoint:"You can explain and implement the end-to-end ingestion → retrieval → grounded-generation pipeline."},
  {title:"AI Agents & Tool Calling",summary:"Agent loops, tool schemas, state, handoffs, human approval and safe execution.",concepts:["Tool calling lets a model choose a predefined operation rather than inventing data.","An agent loop repeatedly observes state, chooses an action, receives a result and decides what to do next.","Tools should be narrow, typed and permission-scoped.","State tracks information accumulated during a workflow.","Human-in-the-loop approval is important before high-impact or irreversible operations.","Agent reliability depends more on tool design, constraints and evaluation than on giving the model broad permissions."],practice:["Implement get_pods(), get_events() and get_logs() as read-only tools.","Ask an agent to diagnose CrashLoopBackOff using those tools.","Record each tool call and result.","Add an approval gate before any simulated restart action."],interview:["What is the difference between a chatbot and an agent?","How should tools be designed?","When is human approval required?","How do you prevent an agent from taking an unsafe action?"],checkpoint:"You can build a read-only operational agent and explain its control boundaries."},
  {title:"Model Context Protocol (MCP)",summary:"Servers, clients, tools, resources, transport, authentication and authorization.",concepts:["MCP standardizes how AI applications discover and interact with external tools and context providers.","An MCP server exposes capabilities such as tools and resources to compatible clients.","Tools are actions; resources are context/data exposed for reading.","Enterprise MCP deployments need authentication, authorization, audit and tenant isolation.","An MCP server should not become an unrestricted infrastructure gateway.","The same least-privilege principles used for APIs and Kubernetes RBAC apply to MCP."],practice:["Create a basic MCP server.","Expose list_namespaces and list_pods.","Add a describe_pod tool.","Use a read-only Kubernetes service account.","Log caller, tool, parameters, duration and result status."],interview:["Why use MCP instead of custom integrations?","What is the difference between MCP tools and resources?","How would you secure an MCP server?","How would you expose production Kubernetes safely?"],checkpoint:"You can explain MCP architecture and implement a small, permission-scoped server."},
  {title:"AWS Bedrock & Enterprise GenAI",summary:"Model access, enterprise controls, IAM, guardrails, private connectivity and cost.",concepts:["Amazon Bedrock provides managed access to multiple foundation models through AWS services.","Enterprise design must consider IAM, encryption, logging, network boundaries and data handling.","Model choice should be based on quality, latency, cost, context needs and workload type.","Guardrails can add policy controls but do not replace application-level authorization.","Centralized model access can improve governance and cost visibility.","Production designs need quotas, fallback behavior and regional considerations."],practice:["Invoke a Bedrock model from Python.","Compare two models using the same evaluation prompts.","Design an IAM policy for an AI application role.","Draw a private enterprise Bedrock architecture.","Estimate monthly model cost for a sample workload."],interview:["Why would an enterprise choose Bedrock?","How would you secure Bedrock access?","How do you choose among foundation models?","What happens during a regional/model-provider failure?"],checkpoint:"You can discuss Bedrock as an enterprise platform rather than only as an API."},
  {title:"LLMOps & AI Observability",summary:"Tracing, token usage, latency, evaluations, regression tests and cost monitoring.",concepts:["LLMOps applies software delivery and operations discipline to AI applications.","Tracing should connect user request, retrieval, model calls, agent steps and tool calls.","Token usage is both a performance and financial signal.","Evaluations measure quality using repeatable datasets and scoring criteria.","Prompt/model changes should be tested like application releases.","Useful SLOs can include availability, latency, tool success and quality thresholds."],practice:["Capture model latency and token usage.","Trace a RAG request from query to retrieval to generation.","Create a small evaluation dataset.","Run regression checks before changing a prompt.","Create a dashboard design for quality, latency and cost."],interview:["What should you monitor in an LLM application?","How do you detect a quality regression?","Can an AI system have SLOs?","How do you control token cost?"],checkpoint:"You can propose meaningful operational metrics and a release-quality process for AI applications."},
  {title:"AI Security, Guardrails & Governance",summary:"Prompt injection, data leakage, RBAC, PII, auditability and tenant isolation.",concepts:["AI security includes conventional application security plus model-specific threats.","Prompt injection becomes especially dangerous when the model can call tools.","Authorization must be enforced outside the model.","Sensitive data should be minimized before being sent to a model.","Tool allowlists, parameter validation and output filtering reduce risk.","Governance requires traceability: who asked, what data was retrieved, which model/tool acted and what changed."],practice:["Create prompt-injection test cases.","Add an allowlist for permitted tools.","Redact secrets from sample log content.","Design RBAC for dev, QA and production AI access.","Create an audit-event schema."],interview:["Why is a system prompt not a security boundary?","How can RAG leak restricted data?","How would you secure agent tool use?","What should be present in an AI audit trail?"],checkpoint:"You can identify the major security boundaries and describe concrete mitigations."},
  {title:"Production AI Architecture",summary:"Model gateways, caching, RAG services, HA/DR, rate limits and fallback strategies.",concepts:["A production AI platform should separate user/API access, model access, retrieval, tools and governance.","A model gateway can centralize credentials, routing, quotas, logging and provider fallback.","Caching can reduce latency and cost but must respect user identity and data freshness.","Rate limiting protects both budget and downstream systems.","HA/DR planning includes application state, vector stores, metadata, model-provider dependencies and configuration.","Graceful degradation is often better than total failure."],practice:["Design a multi-tenant AI platform architecture.","Add a model gateway and provider fallback.","Define rate limits and budget controls.","Create an HA/DR plan.","List failure modes and expected degraded behavior."],interview:["What belongs in a model gateway?","How do you make an AI application highly available?","How do you design provider fallback safely?","What should be cached?"],checkpoint:"You can whiteboard an enterprise AI platform and explain reliability, security and cost trade-offs."},
  {title:"AI for SRE / Platform Engineering",summary:"Incident triage, runbook search, K8s troubleshooting, CI/CD and Terraform analysis.",concepts:["AI is most valuable when paired with trusted operational context and narrowly-scoped tools.","Incident assistants should collect evidence before recommending actions.","Runbooks and postmortems make strong RAG sources because they capture operational knowledge.","AI can summarize noisy logs, but conclusions should link back to evidence.","Deployment and IaC review are useful assistive use cases because outputs can be reviewed before execution.","Production automation should progress from observe → recommend → approve → automate."],practice:["Build a Kubernetes incident assistant.","Add runbook retrieval.","Add CI/CD log summarization.","Review a Terraform plan for risk.","Generate a post-incident summary from structured evidence."],interview:["Where would AI provide the most value in SRE?","What SRE tasks should not be fully automated?","How do you verify AI troubleshooting advice?","How would you measure success for an AI operations assistant?"],checkpoint:"You can present AI as an extension of operational engineering—not a replacement for engineering controls."},
  {title:"Senior-Level AI Interview Preparation",summary:"Architecture, security, reliability, governance, cost and trade-off communication.",concepts:["Senior interviews test system thinking more than API syntax.","Start by clarifying users, workload, data sensitivity, scale, latency and availability.","Discuss architecture together with security, observability, cost and operations.","Name failure modes and trade-offs explicitly.","Avoid claiming AI production experience you do not have; distinguish portfolio implementation from commercial experience.","Connect AI design decisions to engineering leadership and business outcomes."],practice:["Whiteboard enterprise RAG in 20 minutes.","Design a Kubernetes operations agent with approval controls.","Explain an AI incident from detection through audit.","Prepare two STAR stories from your portfolio projects.","Practice a 90-second AI profile introduction."],interview:["Design RAG for 10,000 employees.","Would you permit an AI agent to restart production pods?","How would you build AI platform observability?","How would you govern multiple models and providers?"],checkpoint:"You can lead a senior AI architecture discussion and clearly explain what you built, why, and what you would change for production."}
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
  {title:"Design enterprise RAG for 10,000 employees",prompt:"How would you design a secure, scalable RAG platform for thousands of internal users and multiple data sources?",framework:["Clarify data sources, users, latency and freshness requirements","Design ingestion, chunking, embeddings and retrieval","Add identity-aware retrieval and document-level authorization","Use model gateway, caching, rate limits and provider fallback","Add evaluation, tracing, cost metrics and groundedness checks","Plan HA/DR, data residency, audit and rollout"]},
  {title:"Should an AI agent restart Kubernetes workloads?",prompt:"A team wants an agent to automatically restart production workloads when it detects an issue. How would you approach it?",framework:["Default to read-only diagnostics","Separate recommendation from execution","Use scoped RBAC and allow-listed tools","Require approval for risky production actions","Use dry-run, blast-radius controls and rollback","Audit every tool call and measure automated-remediation outcomes"]},
  {title:"Reduce hallucination in an operations assistant",prompt:"Your SRE assistant produces plausible but incorrect troubleshooting advice. What changes would you make?",framework:["Ground answers using high-quality retrieval","Improve chunking, metadata and reranking","Require evidence/citations for claims","Add abstention when evidence is weak","Create eval datasets from real incidents","Track groundedness and retrieval quality as release gates"]},
  {title:"Design observability for an AI platform",prompt:"Which signals should a production AI platform measure and why?",framework:["Latency and availability","Input/output token usage and cost","Model/provider errors and retries","Retrieval relevance and tool-call success","Evaluation quality and groundedness","Security/audit events and user feedback"]}
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
        <input class="check" type="checkbox" aria-label="Mark ${m.title} complete" ${completed.has(i) ? "checked" : ""}>
      </div>
      <h3>${m.title}</h3>
      <p class="muted">${m.summary}</p>
      <button type="button" class="learn-button">Study module →</button>
      <div class="learning-material" hidden>
        <div class="material-block"><h4>What you need to understand</h4><ul>${m.concepts.map(x=>`<li>${x}</li>`).join("")}</ul></div>
        <div class="material-block"><h4>Hands-on practice</h4><ol>${m.practice.map(x=>`<li>${x}</li>`).join("")}</ol></div>
        <div class="material-block"><h4>Interview questions</h4><ul>${m.interview.map(x=>`<li>${x}</li>`).join("")}</ul></div>
        <div class="checkpoint"><strong>Completion checkpoint</strong><p>${m.checkpoint}</p></div>
      </div>
    `;
    const check = card.querySelector(".check");
    check.addEventListener("change",()=>{
      check.checked ? completed.add(i) : completed.delete(i);
      saveProgress();
      card.classList.toggle("completed", check.checked);
      updateProgress();
    });
    const learn = card.querySelector(".learn-button");
    const material = card.querySelector(".learning-material");
    learn.addEventListener("click",()=>{
      const opening = material.hidden;
      material.hidden = !opening;
      learn.textContent = opening ? "Hide learning material ↑" : "Study module →";
      card.classList.toggle("expanded", opening);
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
