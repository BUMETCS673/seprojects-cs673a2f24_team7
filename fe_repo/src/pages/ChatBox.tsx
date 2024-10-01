import { UploadIcon } from "../icons"
import { Textarea } from '../components'

export const ChatBox = () => {
  return (
    <div className="border-2 p-fined flex items-center">
      <div
        className="w-16 flex justify-center cursor-pointer"
        onClick={() => {
          // Upload files
          const input = document.createElement("input");
          input.type = 'file';
          input.accept = 'image/*,.pdf,.doc,.docx';
          input.addEventListener("change", handleFiles, false);
          function handleFiles() {
            if ((input.files?.length ?? 0) > 0) {
              console.log(input.files![0]);
            }
          }
          input.click();
        }}
      >
        <UploadIcon />
      </div>
      <Textarea
        className="flex-1"
      />
    </div>
  )
}

