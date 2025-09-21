import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function FormAlert({errors}) {
  return (
    <div className="flex items-center mt-2">
      <Alert variant="destructive">
        <AlertDescription>
          <ul className="">
            {errors.map((error, index)=>(
             <li key={index}>
                <div className="flex flex-row">
                <AlertCircleIcon className="m-1"/>
                <p className="p-1">{error.path.join(' > ').toUpperCase()} {error.message.toUpperCase()}</p>
                </div>
            </li>
            ))}    
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  )
}