/**
 * Generates an array of incremental numbers up to a specified maximum value.
 *
 * @template Max - The maximum value for the generated numbers.
 * @template IncrementalNumbers - The array of incremental numbers.
 * @param Max - The maximum value for the generated numbers.
 * @param IncrementalNumbers - The array of incremental numbers.
 * @returns The array of incremental numbers up to the specified maximum value.
 */
type Enumerate<Max extends number, IncrementalNumbers extends number[] = []> 
= IncrementalNumbers['length'] extends Max
  ? IncrementalNumbers[number]
  : Enumerate<Max, [...IncrementalNumbers, IncrementalNumbers['length']]>

/**
 * Represents a range of integer values between `Min` and `Max`.
 * The range is inclusive of both `Min` and `Max`.
 * @template Min - The minimum value of the range.
 * @template Max - The maximum value of the range.
 */
type IntRange<Min extends number, Max extends number> = 
  Exclude<Enumerate<Max>, Enumerate<Min>> | Max


interface navItem {
  name: string,
  link: string,
  tabLink?: boolean;
}

/**
 * Open Graph Protocol (OGP) メタデータを表します。
 * 
 * @property {string} [title] - グラフ内に表示されるオブジェクトのタイトル (og:title)。
 * @property {string} [description] - オブジェクトの1〜2文の説明 (og:description)。
 * @property {string} [type] - オブジェクトの種類、例: "website" (og:type)。
 * @property {string} [url] - オブジェクトの正規URL (og:url)。
 * @property {string} [image] - グラフ内でオブジェクトを表す画像URL (og:image)。
 * @property {string} [site_name] - サイト全体の名前 (og:site_name)。
 * @property {string} [locale] - タグがマークアップされているロケール、例: "en_US" (og:locale)。
 * @property {string} [audio] - このオブジェクトに付随するオーディオファイルのURL (og:audio)。
 * @property {string} [video] - このオブジェクトに付随するビデオファイルのURL (og:video)。
 * @property {string} [determiner] - 文中でタイトルの前に表示される単語 (og:determiner)。
 */
interface OGP {
  title?: string;        // og:title
  description?: string;  // og:description
  type?: string;         // og:type
  url?: string;          // og:url
  image?: string;        // og:image
  site_name?: string;    // og:site_name
  locale?: string;       // og:locale
  audio?: string;        // og:audio
  video?: string;        // og:video
  determiner?: string;   // og:determiner
}

declare const __SITE_NAME__: string;