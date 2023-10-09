  /**
   * Represents an extractor that will use the corn
   */
  export interface IExtractor {

    
    /**
     * The name of the extractor.
     */
    extractorName: string;
    /**
     * Extracts data 
     * 
     */
    extract(): void;
  }