import { SetMetadata } from '@nestjs/common'


// Docatetor for message Response
export const ResponseMessageKey = 'ResponseMessageKey'
export const ResponseMessage = (message: string) => SetMetadata(ResponseMessageKey, message)