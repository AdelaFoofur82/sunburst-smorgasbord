import { useRef } from 'react';


interface ImportJsonButtonProps {
  onUpload: (data: any) => void
}

const ImportJsonButton = ({ onUpload } : ImportJsonButtonProps) => {
  const inputFile = useRef(null) 

  const importNewFlavours = () => {
    inputFile.current.click();
  }

  const handleFileSubmission = (event) => {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      onUpload(evt.target.result);
    }
  }

  return (
    <div className="button-trigger" onClick={importNewFlavours}>
      <strong>Import</strong>
      <input
        type='file'
        ref={inputFile}
        onChange={handleFileSubmission}
        style={{display: 'none'}}
        accept="application/json"/>
    </div>
  )
};

export default ImportJsonButton;
