import { describe, expect, it } from "vitest";
import { isEmoji } from "./validators";

describe("isEmoji", () => {
  it("valid emoji", () => {
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

  it("invalid emoji", () => {
    const invalidEmojiList = ["1", "a", "#", "@", "\""];

    it.each(invalidEmojiList)("", (emoji) => {
      expect(isEmoji(emoji)).toBe(false);
    });
  });
});
