  /**
   * Represents an Generator that will use the corn
   */
  export interface IGenerator {

    
    /**
     * The name of the Generator .
     */
    extractorName: string;
    /**
     * Generate data 
     * 
     */
    generate(): void;
  }