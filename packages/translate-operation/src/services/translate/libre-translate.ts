import axios from 'axios';

import BaseTranslate from './base-translate';

import type { AxiosInstance } from 'axios';

class LibreTranslate extends BaseTranslate {
  private httpInstance: AxiosInstance;

  constructor(
    endpoint: string,
    { headers }: { headers?: { value: string; header: string }[] } = {},
  ) {
    super();
    this.httpInstance = axios.create({
      baseURL: endpoint,
      headers: headers?.reduce(
        (acc, { header, value }) => ({ ...acc, [header]: value }),
        {},
      ),
    });
  }

  async translate(
    text: string,
    source: string,
    target: string,
  ): Promise<string> {
    if (!text) return '';
    const length = text.trimStart().trimEnd().length;
    if (length === 0) return '';

    const { data } = await this.httpInstance.post<{
      translatedText: string;
    }>('/translate', {
      q: text,
      source: this.transformLanguageCode(source),
      target: this.transformLanguageCode(target),
      format: 'html',
    });

    return data.translatedText;
  }

  async translateMany(texts: string[], source: string, target: string) {
    return Promise.all(
      texts.map((text) => this.translate(text, source, target)),
    );
  }

  async translateObject(
    object: Record<string, never>,
    source: string,
    target: string,
  ) {
    const keys = Object.keys(object);
    const values = Object.values(object);
    const translations = await this.translateMany(values, source, target);
    return keys.reduce((acc, key, index) => {
      return {
        ...acc,
        [key]: translations[index],
      };
    }, {});
  }
}

export default LibreTranslate;
