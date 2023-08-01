import { toast } from "react-hot-toast"

export const handleShowSuccessToast = (message: string) => {
    return toast.success(message)
}

export const handleShowErrorToast = (message: string) => {
    return toast.error(message)
}
