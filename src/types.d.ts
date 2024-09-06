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