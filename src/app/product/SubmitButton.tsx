'use client'
//useFormStatus : 
// <form> 내부의 자식 컴포넌트에서 
// 폼의 제출 상태(pending)만 가져오고 싶을 때 사용
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