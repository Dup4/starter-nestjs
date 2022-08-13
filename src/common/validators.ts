import { registerDecorator, ValidationOptions } from "class-validator";
import emojiRegex from "emoji-regex";

export function If<T>(
  callback: (value: T) => boolean,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: T) {
          return callback(value);
        },
      },
    });
  };
}

// class-validator's IsNumberString accepts floating numbers only, but I
// want to validate if it's a integer
export function IsIntString(validationOptions?: ValidationOptions) {
  return If(
    (value) => typeof value === "string" && Number.isInteger(Number(value)),
    validationOptions,
  );
}

// class-validator's IsPort accepts strings only, but I prefer
// writing port numbers as number
export function IsPortNumber(validationOptions?: ValidationOptions) {
  return If(
    (value) =>
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= 1 &&
      value <= 65535,
    validationOptions,
  );
}

export function isValidFilename(filename: string): boolean {
  const forbiddenCharacters = ["/", "\x00"];
  const reservedFilenames = [".", ".."];
  return (
    forbiddenCharacters.every((ch) => filename.indexOf(ch) === -1) &&
    !reservedFilenames.includes(filename)
  );
}

export function IsValidFilename(validationOptions?: ValidationOptions) {
  return If(
    (value) => typeof value === "string" && isValidFilename(value),
    validationOptions,
  );
}

export const MAX_EMOJI_LENGTH = 28;
export function isEmoji(str: string): boolean {
  return (
    emojiRegex().test(str) &&
    str.length >= 1 &&
    Buffer.byteLength(str, "utf-8") <= MAX_EMOJI_LENGTH
  );
}

export function IsEmoji(validationOptions?: ValidationOptions) {
  return If(
    (value) => typeof value === "string" && isEmoji(value),
    validationOptions,
  );
}
