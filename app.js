const qaListElement = document.querySelector("#qa-list");
const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#category-select");
const resultSummary = document.querySelector("#result-summary");
const totalCountElement = document.querySelector("#total-count");
const categoryCountElement = document.querySelector("#category-count");
const cardTemplate = document.querySelector("#qa-card-template");

const knowledgeBase = Array.isArray(window.QA_KB) ? window.QA_KB : [];

function uniqueCategories(items) {
  return [...new Set(items.map((item) => item.category))].sort((a, b) =>
    a.localeCompare(b, "zh-CN")
  );
}

function buildSearchText(item) {
  return [
    item.id,
    item.category,
    item.intent,
    item.answer,
    item.escalation,
    ...(item.keywords || []),
    ...(item.customerQuestions || [])
  ]
    .join(" ")
    .toLowerCase();
}

function createChip(text, className) {
  const chip = document.createElement("span");
  chip.className = className;
  chip.textContent = text;
  return chip;
}

function copyAnswer(button, answer) {
  navigator.clipboard.writeText(answer).then(() => {
    const previousText = button.textContent;
    button.textContent = "已复制";
    button.disabled = true;

    window.setTimeout(() => {
      button.textContent = previousText;
      button.disabled = false;
    }, 1200);
  });
}

function renderCards(items) {
  qaListElement.innerHTML = "";

  if (!items.length) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-state";
    emptyState.textContent = "没有找到匹配结果，可以换个关键词试试。";
    qaListElement.appendChild(emptyState);
    return;
  }

  items.forEach((item) => {
    const fragment = cardTemplate.content.cloneNode(true);
    const card = fragment.querySelector(".qa-card");
    const category = fragment.querySelector(".qa-category");
    const intent = fragment.querySelector(".qa-intent");
    const id = fragment.querySelector(".qa-id");
    const questions = fragment.querySelector(".qa-questions");
    const answer = fragment.querySelector(".qa-answer");
    const escalation = fragment.querySelector(".qa-escalation");
    const keywords = fragment.querySelector(".qa-keywords");
    const copyButton = fragment.querySelector(".copy-button");

    category.textContent = item.category;
    intent.textContent = item.intent;
    id.textContent = item.id;
    answer.textContent = item.answer;
    escalation.textContent = item.escalation;

    item.customerQuestions.forEach((question) => {
      questions.appendChild(createChip(question, "question-chip"));
    });

    item.keywords.forEach((keyword) => {
      keywords.appendChild(createChip(`#${keyword}`, "keyword-chip"));
    });

    copyButton.addEventListener("click", () => copyAnswer(copyButton, item.answer));
    card.dataset.search = buildSearchText(item);

    qaListElement.appendChild(fragment);
  });
}

function populateCategoryFilter(items) {
  uniqueCategories(items).forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function filterItems() {
  const keyword = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filteredItems = knowledgeBase.filter((item) => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesKeyword = !keyword || buildSearchText(item).includes(keyword);
    return matchesCategory && matchesKeyword;
  });

  resultSummary.textContent = `共找到 ${filteredItems.length} 条结果`;
  renderCards(filteredItems);
}

function init() {
  totalCountElement.textContent = String(knowledgeBase.length);
  categoryCountElement.textContent = String(uniqueCategories(knowledgeBase).length);
  populateCategoryFilter(knowledgeBase);
  resultSummary.textContent = `共收录 ${knowledgeBase.length} 条问答`;
  renderCards(knowledgeBase);

  searchInput.addEventListener("input", filterItems);
  categorySelect.addEventListener("change", filterItems);
}

init();
