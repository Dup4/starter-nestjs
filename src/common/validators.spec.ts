import { describe, expect, it, suite } from "vitest";
import { isEmoji } from "./validators";

describe("isEmoji", () => {
  suite("valid emoji", () => {
    expect(isEmoji("👍")).toBe(true);

    const emojiList = [
      "👍",
      "👎",
      "😄",
      "😕",
      "❤️",
      "🤔",
      "🤣",
      "🌿",
      "🍋",
      "🕊",
    ];

    it.each(emojiList)("", (emoji) => {
      expect(isEmoji(emoji)).toBe(true);
    });
  });

  suite("invalid emoji", () => {
    const invalidEmojiList = ["1", "a", "#", "@", "\""];

    it.each(invalidEmojiList)("", (emoji) => {
      expect(isEmoji(emoji)).toBe(false);
    });
  });
});
