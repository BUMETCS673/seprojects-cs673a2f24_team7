import { expect, test } from 'vitest';
import { sendMessage, uploadFile } from "./api";

test('sendMessage', () => {
  expect(sendMessage("I'm adam")).toEqual("Message accepted: I'm adam");
});

test('uploadFile', () => {
  // Create a Blob with some content
  const blob = new Blob(['Hello, world!'], { type: 'application/pdf;charset=utf-8' });

  // Convert Blob to File
  const file = new File([blob], 'test.pdf', { type: blob.type });
  expect(uploadFile(file)).toBeFalsy(); // Due to the return value is 'undefined'
});

