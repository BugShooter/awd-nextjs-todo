import { ElementHandle, Locator } from "@playwright/test";

const TODO_ITEMS = [
  "book a doctors appointment",
  "Take a 10-minute walk around your neighborhood.",
  "Write a gratitude list with five things you appreciate.",
  "Declutter a small area in your home, like a drawer or shelf.",
  "Try a new recipe and cook a simple meal for yourself.",
  "Send a positive text or email to a friend or family member.",
  "Spend 15 minutes stretching or practicing yoga.",
  "Read a chapter from a book you've been meaning to start.",
  "Listen to a podcast on a topic that interests you.",
  "Write a short poem or jot down your thoughts in a journal.",
  "Take a break and do a quick mindfulness meditation session.",
  "Organize your computer desktop or files.",
  "Plan a future weekend outing or activity.",
  "Learn a new word and try to use it in a sentence.",
  "Water your plants and give them some attention.",
  "Create a playlist of your favorite songs or discover new music.",
  "Watch a TED Talk or short educational video.",
  "Do a quick workout routine, like jumping jacks or squats.",
  "Take a few minutes to appreciate the beauty of nature around you.",
  "Solve a puzzle, like a crossword or Sudoku.",
  "Write a note of encouragement to yourself and place it where you'll see it regularly.",
];

function randomItem() {
  return TODO_ITEMS[Math.floor(Math.random() * TODO_ITEMS.length)];
}

export default randomItem;

export async function debugLocator(locator: Locator, name: string) {
  const count = await locator.count();
  console.log(`🔍 [DEBUG] ${name} → found elements: ${count}`);
  for (let i = 0; i < count; i++) {
    const text = await locator.nth(i).textContent();
    console.log(`   [${i}] textContent="${text?.trim()}"`);
  }
}

export async function logElementsInfo(elements: ElementHandle[]) {
  for (const el of elements) {
    const info = await el.evaluate(async (node: Element) => {
      const tagName = node.tagName;
      const attrs: Record<string, string> = {};
      for (let i = 0; i < node.attributes.length; i++) {
        const attr = node.attributes[i];
        attrs[attr.name] = attr.value;
      }
      const text = node.textContent?.trim() || "";
      return { tagName, attrs, text };
    });

    console.log(info);
  }
}
