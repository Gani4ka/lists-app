import type { Dispatch, SetStateAction } from 'react';

import type { AIResponseObject } from '@app/api/AI';

export function parseContentAsArray(
  response: AIResponseObject,
  setErrorMessage: Dispatch<SetStateAction<string>>
): string[] {
  if (!response?.message?.content) {
    setErrorMessage('Invalid response. Try again.');
  }

  return response.message.content.split('\n').map((item) => {
    item.trim();
    item.replace(/^[-•*]+\s*/, '');
    return item;
  });
}
