const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelectorAll(".nav-links a");
const pageHeader = document.querySelector(".site-header, .daily-site-header");
const scrollProgress = document.querySelector(".scroll-progress");

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

const syncNavTone = () => {
  if (!nav || !pageHeader) {
    return;
  }

  nav.classList.toggle("is-solid", window.scrollY > 80);
};

const syncScrollProgress = () => {
  if (!scrollProgress) {
    return;
  }

  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  scrollProgress.style.width = `${Math.min(progress * 100, 100)}%`;
};

const lensData = {
  user: {
    kicker: "User Context",
    title: "用户到底在什么场景里被卡住？",
    body: "我会先拆用户、同行人、时间、预算、距离、风险和偏好。需求表达往往很短，但背后有很多隐性约束，AI 工作流要先把这些约束看见。",
    tags: ["Intent", "Memory", "Hidden Needs"],
  },
  workflow: {
    kicker: "Workflow Design",
    title: "哪些步骤应该交给模型，哪些步骤要保留人工确认？",
    body: "我会把任务拆成输入、理解、候选生成、解释、确认和执行。Agent 的价值来自连续动作，也来自它知道什么时候停下来等用户确认。",
    tags: ["Tool Use", "State", "Human-in-the-loop"],
  },
  eval: {
    kicker: "Evaluation",
    title: "怎样证明它真的比原流程更好？",
    body: "我会把体验目标转成可检查标准，例如少排队、路线不绕、低卡、亲子友好、可执行。再用 eval case 和失败重排去检查系统是否稳定。",
    tags: ["Eval Case", "Guardrail", "Regression"],
  },
  business: {
    kicker: "Business Signal",
    title: "它能否进入真实业务循环？",
    body: "我会看成本、转化、复用、运营协同和商业指标。一个 AI 功能需要解释价值，也要能接进现有业务动作，形成可持续的迭代闭环。",
    tags: ["Cost", "Conversion", "Iteration"],
  },
};

const lensTabs = document.querySelectorAll(".lens-tab");
const lensKicker = document.querySelector("[data-lens-kicker]");
const lensTitle = document.querySelector("[data-lens-title]");
const lensBody = document.querySelector("[data-lens-body]");
const lensTags = document.querySelector("[data-lens-tags]");

lensTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const current = lensData[tab.dataset.lens];
    if (!current || !lensKicker || !lensTitle || !lensBody || !lensTags) {
      return;
    }

    lensTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    lensKicker.textContent = current.kicker;
    lensTitle.textContent = current.title;
    lensBody.textContent = current.body;
    lensTags.replaceChildren(
      ...current.tags.map((tag) => {
        const item = document.createElement("li");
        item.textContent = tag;
        return item;
      })
    );
  });
});

syncNavTone();
syncScrollProgress();
window.addEventListener("scroll", syncNavTone, { passive: true });
window.addEventListener("scroll", syncScrollProgress, { passive: true });
window.addEventListener("resize", syncNavTone);
window.addEventListener("resize", syncScrollProgress);
