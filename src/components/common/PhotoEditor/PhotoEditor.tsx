import React, { FC, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import styles from './PhotoEditor.module.css';
import cn from 'classnames';
import { base64StringtoFile } from '../../../utils/ImageFileUtils';
import { Button } from "antd";

type PropsType = {
  savePhoto: (image: File) => Promise<any>
  image: string
  setEditMode: (isEditMode: boolean) => void
}

const PhotoEditor: FC<PropsType> = ({ savePhoto, image, setEditMode }) => {
  const [cropper, setCropper] = useState<any>();

  const onCrop = () => {
    const croppedBase64 = cropper.getCroppedCanvas().toDataURL();
    const croppedImage = base64StringtoFile(croppedBase64, 'image.png');
    savePhoto(croppedImage).then(() => {
      setEditMode(false);
    })
  }

  return <div className={styles.photoEditor}>
    <div>
      <Cropper
        style={{ height: "500px", width: "500px" }}
        aspectRatio={1}
        preview=".img-preview"
        src={image}
        viewMode={1}
        guides={true}
        minCropBoxHeight={10}
        minCropBoxWidth={10}
        background={false}
        responsive={true}
        autoCropArea={1}
        checkOrientation={false}
        onInitialized={(instance) => {
          setCropper(instance);
        }}
      />
    </div>
    <div>
      <h1 className={styles.imgPreviewTitle}>Preview</h1>
      <div className={cn('img-preview', styles.imgPreview)} style={{ width: "150px", height: "150px" }} />
      <Button type="primary" className={styles.imgPreviewBtn} onClick={onCrop}>Crop image</Button>
    </div>
    <button className={styles.closeEditor} onClick={() => setEditMode(false)}>
      <svg fill="#f0f8ff" viewBox="0 0 329.26933 329" xmlns="http://www.w3.org/2000/svg"><path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" /></svg>
    </button>
  </div>
};

export default PhotoEditor;