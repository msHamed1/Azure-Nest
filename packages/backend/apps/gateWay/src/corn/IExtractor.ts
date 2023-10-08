/**
 * Represents the extracted data with its type, data and whether it has been mapped or not.
 */

  /**
   * Represents an extractor that can extract data of type `ExtractedData` using a configuration of type `Config`.
   */
  export interface IExtractor< Config> {

    
    /**
     * The name of the extractor.
     */
    extractorName: string;
    /**
     * Extracts data using the provided configuration.
     * @param config The configuration to use for extraction.
     */
    extract(config: Config): void;
  }