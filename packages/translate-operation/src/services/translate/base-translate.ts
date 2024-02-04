abstract class BaseTranslate {
  abstract translate(
    text: string,
    source: string,
    target: string,
  ): Promise<string>;

  abstract translateMany(
    texts: string[],
    source: string,
    target: string,
  ): Promise<string[]>;

  abstract translateObject(
    object: Record<string, string>,
    source: string,
    target: string,
  ): Promise<Record<string, string>>;

  protected transformLanguageCode = (code: string) => {
    const [language] = code.split('-');
    return language;
  };
}

export default BaseTranslate;
