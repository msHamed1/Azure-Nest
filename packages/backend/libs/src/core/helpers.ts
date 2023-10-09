import { SERVICE_QUEUE_TYPE } from "../enums/enum";

export function uuid():string { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


export function mobileType(): string {
    const productTypes = [SERVICE_QUEUE_TYPE.IPHONE, SERVICE_QUEUE_TYPE.SAMSUNG];
    const randomIndex = Math.floor(Math.random() * productTypes.length);
    return productTypes[randomIndex];
  }

  export function transformLogMessage(message :string,location:string , data:Array<any>=[]){

    return JSON.stringify({location,message, data})
  }


  export function getRandomMobileName() {
    const mobileNames = [
      "iPhone 12",
      "Samsung Galaxy S21",
      "iPhone 11 pro",
      "iPhone 13",
      "iPhone 14 pro max",
      "Samsung Galaxy S22",
      "Samsung Galaxy S23",
      "Samsung Galaxy S21+",
      "Samsung Galaxy S21s",
      "Samsung Galaxy S22s+",
      // Add more mobile names here
    ];
  
    // Generate a random index within the length of the mobileNames array
    const randomIndex = Math.floor(Math.random() * mobileNames.length);
  
    // Return the randomly selected mobile name
    return mobileNames[randomIndex];
  }