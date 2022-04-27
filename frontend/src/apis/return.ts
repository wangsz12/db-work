import { mockAPIReturn } from "@/utils"
import { ReturnRequest } from "@/utils/types"

export function returnBook({cardID, lendID}: ReturnRequest) {
  console.log('cardID, lendID: ', cardID, lendID)
  return mockAPIReturn()
}