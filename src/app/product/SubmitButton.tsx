'use client'
import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  isEditMode :boolean
}
export default function SubmitButton({isEditMode} : SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button type="submit"
            disabled={pending}
            className="bg-blue-600 text-white p-3 rounded-lg mr-2">
      { isEditMode ? ( pending ? '수정중...' : '수정하기')
                   : ( pending ? '추가중...' : '추가하기')}        
    </button>
  );
}

